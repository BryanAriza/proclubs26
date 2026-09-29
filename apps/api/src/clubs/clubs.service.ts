import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import {
  ClubSearchResult,
  ClubInfo,
  ClubOverallStats,
  MemberStats,
  MatchStats,
  Platform,
  PlayoffAchievement,
} from '@proclubs/shared';
import { EAClient } from '../clients/ea.client';

const DIVISION_LABELS: Record<number, string> = {
  1: 'Elite',
  2: 'División 1',
  3: 'División 2',
  4: 'División 3',
  5: 'División 4',
  6: 'División 5',
};

const FINISH_LABELS: Record<number, string> = {
  1: 'Campeón',
  2: 'Subcampeón',
  3: 'Competitivo',
  4: 'Media tabla',
  5: 'También participó',
  6: 'Participante',
};

const DIVISION_CREST_BASE =
  'https://media.contentapi.ea.com/content/dam/eacom/fc/pro-clubs/divisioncrest';

function mapPlayoffAchievements(raw: unknown): PlayoffAchievement[] {
  if (!Array.isArray(raw)) return [];

  return raw.flatMap((entry) => {
    const division = parseOptionalNumber(entry?.bestDivision);
    if (division == null || !DIVISION_LABELS[division]) return [];

    const finish = parseOptionalNumber(entry?.bestFinishGroup);
    const seasonId = entry?.seasonId ?? entry?.season_id;
    const seasonName =
      typeof entry?.seasonName === 'string' && entry.seasonName
        ? entry.seasonName
        : `Temporada ${seasonId ?? ''}`.trim();

    return [{
      seasonName,
      divisionLabel: DIVISION_LABELS[division],
      finishLabel: finish != null ? FINISH_LABELS[finish] || '—' : '—',
      crestUrl: `${DIVISION_CREST_BASE}${division}.png`,
    }];
  });
}

function parseOptionalNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '' || value === 'null') {
    return null;
  }
  const parsed = parseInt(String(value), 10);
  return Number.isNaN(parsed) ? null : parsed;
}

@Injectable()
export class ClubsService {
  private readonly logger = new Logger(ClubsService.name);

  constructor(private readonly eaClient: EAClient) {}

  async searchClubs(
    platform: string,
    name: string,
  ): Promise<ClubSearchResult[]> {
    if (!name || name.trim().length < 2) {
      throw new BadRequestException('Club name must be at least 2 characters');
    }

    try {
      const data = await this.eaClient.searchClubs(platform, name);

      if (!Array.isArray(data)) {
        this.logger.warn('Search returned non-array data');
        return [];
      }

      return data.map((club: any) => {
        const crestId = club.clubInfo?.customKit?.crestId || club.clubInfo?.crestId;
        const customCrestId = club.clubInfo?.customKit?.customCrestId || club.clubInfo?.customCrestId || club.clubInfo?.customKit?.crestAssetId;
        const crestUrls = this.eaClient.buildCrestUrl(crestId, customCrestId);
        
        const currentDivision = parseOptionalNumber(club.currentDivision);

        return {
          clubId: club.clubId || '',
          name: club.name || club.clubInfo?.name || club.clubName || '',
          platform: platform as Platform,
          regionId: club.clubInfo?.regionId || null,
          currentDivision: currentDivision != null && DIVISION_LABELS[currentDivision]
            ? currentDivision
            : null,
          wins: parseOptionalNumber(club.wins) ?? 0,
          losses: parseOptionalNumber(club.losses) ?? 0,
          ties: parseOptionalNumber(club.ties) ?? 0,
          gamesPlayed: parseOptionalNumber(club.gamesPlayed) ?? 0,
          customKit: club.clubInfo?.customKit ? {
            clubColors: club.clubInfo.customKit.clubColors,
            crestAssetId: club.clubInfo.customKit.crestAssetId,
            crestUrl: crestUrls.primary,
            crestUrlFallback: crestUrls.fallback,
          } : null,
        };
      });
    } catch (error: any) {
      this.logger.error(`Search clubs error: ${error.message}`);
      if (error.statusCode) {
        throw error;
      }
      throw new BadRequestException('Failed to search clubs');
    }
  }

  async getClubInfo(platform: string, clubId: string): Promise<ClubInfo> {
    try {
      const data = await this.eaClient.getClubInfo(platform, clubId);

      const clubData = data[clubId];
      if (!clubData) {
        throw new NotFoundException(`Club ${clubId} not found`);
      }

      return {
        clubId,
        name: clubData.name || '',
        platform: platform as Platform,
        regionId: clubData.regionId || 0,
        teamId: clubData.teamId || 0,
        customKit: clubData.customKit || null,
        memberCount: clubData.memberCount || null,
      };
    } catch (error: any) {
      this.logger.error(`Get club info error: ${error.message}`);
      if (error.statusCode === 404) {
        throw new NotFoundException(`Club ${clubId} not found`);
      }
      throw error;
    }
  }

  private async lookupCurrentDivision(
    platform: string,
    clubId: string,
  ): Promise<number | null> {
    try {
      const info = await this.eaClient.getClubInfo(platform, clubId);
      const name = info?.[clubId]?.name;
      if (!name || String(name).trim().length < 1) return null;

      const results = await this.eaClient.searchClubs(
        platform,
        String(name).slice(0, 32),
      );
      if (!Array.isArray(results)) return null;

      const match = results.find((club) => String(club.clubId) === String(clubId));
      const division = parseOptionalNumber(match?.currentDivision);
      return division != null && DIVISION_LABELS[division] ? division : null;
    } catch (error: any) {
      this.logger.warn(
        `Current division lookup failed for ${clubId}: ${error.message}`,
      );
      return null;
    }
  }

  async getClubOverall(
    platform: string,
    clubId: string,
  ): Promise<ClubOverallStats> {
    try {
      const [data, achievementsRaw, currentDivision] = await Promise.all([
        this.eaClient.getClubStats(platform, clubId),
        this.eaClient.getPlayoffAchievements(platform, clubId),
        this.lookupCurrentDivision(platform, clubId),
      ]);
      
      this.logger.log(`📊 Processing club stats data: ${JSON.stringify(data)}`);

      // La API retorna un array directamente
      let stats;
      if (Array.isArray(data) && data.length > 0) {
        stats = data[0];
      } else {
        this.logger.error(`Unexpected data structure: ${JSON.stringify(data)}`);
        throw new NotFoundException(`Stats for club ${clubId} not found`);
      }

      if (!stats) {
        throw new NotFoundException(`Stats for club ${clubId} not found`);
      }

      // Construir array de resultados recientes desde lastMatch0-9
      const recentResults: string[] = [];
      for (let i = 0; i <= 9; i++) {
        const matchResult = stats[`lastMatch${i}`];
        if (matchResult === '3') recentResults.push('W');
        else if (matchResult === '1') recentResults.push('L');
        else if (matchResult === '2') recentResults.push('D');
        else if (matchResult !== '-1') break; // Detener si no hay más partidos
      }

      return {
        clubId,
        platform: platform as Platform,
        divisionRating: stats.skillRating ? parseInt(stats.skillRating) : null,
        skillRating: stats.skillRating ? parseInt(stats.skillRating) : null,
        division: parseOptionalNumber(stats.bestDivision),
        currentDivision,
        reputationTier: parseOptionalNumber(stats.reputationtier),
        wins: stats.wins ? parseInt(stats.wins) : 0,
        losses: stats.losses ? parseInt(stats.losses) : 0,
        ties: stats.ties ? parseInt(stats.ties) : 0,
        gamesPlayed: stats.gamesPlayed ? parseInt(stats.gamesPlayed) : 0,
        goalsFor: stats.goals ? parseInt(stats.goals) : 0,
        goalsAgainst: stats.goalsAgainst ? parseInt(stats.goalsAgainst) : 0,
        recentResults: recentResults.slice(0, 5), // Solo los últimos 5
        titlesWon: stats.promotions ? parseInt(stats.promotions) : 0,
        seasons: stats.leagueAppearances ? parseInt(stats.leagueAppearances) : 0,
        playoffAchievements: mapPlayoffAchievements(achievementsRaw),
      };
    } catch (error: any) {
      this.logger.error(`Get club overall error: ${error.message}`);
      if (error.statusCode === 404) {
        throw new NotFoundException(`Stats for club ${clubId} not found`);
      }
      throw error;
    }
  }

  async getClubMembers(
    platform: string,
    clubId: string,
  ): Promise<MemberStats[]> {
    try {
      const data = await this.eaClient.getClubMembers(platform, clubId);

      this.logger.log(`👥 Processing club members data - currentStats keys: ${Object.keys(data.currentStats || {}).length}, careerStats keys: ${Object.keys(data.careerStats || {}).length}`);

      // Verificar si data tiene la estructura esperada
      const currentStats = data.currentStats || data;
      const careerStats = data.careerStats || {};

      // Obtener miembros de currentStats o members
      const membersData = currentStats.members || currentStats || {};
      const membersList = Array.isArray(membersData)
        ? membersData
        : Object.values(membersData);

      if (membersList.length === 0) {
        this.logger.warn(`No members found for club ${clubId}`);
        return [];
      }

      const asNumber = (value: unknown) => {
        const parsed = parseFloat(String(value ?? ''));
        return Number.isNaN(parsed) ? 0 : parsed;
      };

      return membersList.map((member: any, index) => {
        const career = careerStats[member?.name] || careerStats[member?.playerId] || {};
        const cleanSheets =
          asNumber(member.cleanSheetsDef) + asNumber(member.cleanSheetsGK) ||
          asNumber(member.cleanSheets || member.cleansheetsany || career.cleanSheets);
        const passSuccessRate = asNumber(
          member.passSuccessRate ?? member.passAccuracy ?? career.passSuccessRate,
        );

        return {
          playerId: member.playerId || member.name || String(index),
          name: member.name || member.proName || 'Unknown',
          position: member.proPos || member.position || member.favoritePosition || 'N/A',
          gamesPlayed: asNumber(member.gamesPlayed),
          goals: asNumber(member.goals),
          assists: asNumber(member.assists),
          cleanSheets,
          averageRating: asNumber(member.ratingAve || member.averageRating),
          redCards: asNumber(member.redCards || member.redcards),
          yellowCards: asNumber(member.yellowCards),
          passesMade: asNumber(member.passesMade),
          passSuccessRate,
          passAccuracy: passSuccessRate,
          tacklesMade: asNumber(member.tacklesMade),
          tackleSuccessRate: asNumber(member.tackleSuccessRate),
          winRate: asNumber(member.winRate),
          shotSuccessRate: asNumber(member.shotSuccessRate),
          manOfTheMatch: asNumber(member.manOfTheMatch || member.mom),
          proName: member.proName || member.name || null,
          proPos: member.proPos || member.position || member.pos || null,
          proOverall: member.proOverall ? parseInt(member.proOverall, 10) : null,
          favoritePosition: member.favoritePosition || null,
        };
      });
    } catch (error: any) {
      this.logger.error(`Get club members error: ${error.message}`);
      throw error;
    }
  }
     

  async getClubMatches(
    platform: string,
    clubId: string,
    matchType?: string,
  ): Promise<MatchStats[]> {
    try {
      const data = await this.eaClient.getClubMatches(
        platform,
        clubId,
        matchType,
      );

      this.logger.log(`⚽ Processing matches data - Total matches: ${Array.isArray(data) ? data.length : 'not an array'}`);
      
      if (!Array.isArray(data)) {
        this.logger.warn(`Matches returned non-array data: ${JSON.stringify(data).substring(0, 200)}`);
        return [];
      }

      // Log del primer partido para ver la estructura completa
      if (data.length > 0) {
        this.logger.log(`📋 Full match structure: ${JSON.stringify(data[0], null, 2)}`);
        
        // Log específico de players si existen
        if (data[0].players) {
          const firstPlayerId = Object.keys(data[0].players)[0];
          if (firstPlayerId) {
            this.logger.log(`👤 First player structure: ${JSON.stringify(data[0].players[firstPlayerId], null, 2)}`);
          }
        }
      }

      return data.map((match: any) => {
        // Mapear clubes con información detallada
        const clubs: any = {};
        if (match.clubs) {
          Object.keys(match.clubs).forEach(clubKey => {
            const club = match.clubs[clubKey];
            clubs[clubKey] = {
              clubId: club.details?.clubId || club.clubId || clubKey,
              clubName: club.details?.name || club.clubName || club.name || 'Unknown',
              result: parseInt(club.result || '0'),
              score: parseInt(club.score || '0'),
              teamSide: club.teamSide || 'home',
              goals: parseInt(club.goals || club.score || '0'),
              goalsAgainst: parseInt(club.goalsAgainst || '0'),
              shotPercentage: club.shotPercentage ? parseFloat(club.shotPercentage) : null,
              passPct: club.passPct ? parseFloat(club.passPct) : null,
              tackles: club.tackles ? parseInt(club.tackles) : null,
              possessionPct: club.possessionPct ? parseFloat(club.possessionPct) : null,
            };
          });
        }

        // Mapear jugadores con estadísticas detalladas
        // La estructura es: players[clubId][playerId] = {...}
        const players: any = {};
        if (match.players) {
          Object.keys(match.players).forEach(clubKey => {
            const clubPlayers = match.players[clubKey];
            if (typeof clubPlayers === 'object') {
              Object.keys(clubPlayers).forEach(playerId => {
                const player = clubPlayers[playerId];
                const passes = parseInt(player.passattempts || '0');
                const passesCompleted = parseInt(player.passesmade || '0');
                const passAccuracy = passes > 0 ? (passesCompleted / passes) * 100 : 0;
                
                players[playerId] = {
                  playerId: playerId,
                  name: player.playername || 'Unknown',
                  vProName: player.playername || null,
                  position: player.pos || 'N/A',
                  vProPosition: player.pos || null,
                  goals: parseInt(player.goals || '0'),
                  assists: parseInt(player.assists || '0'),
                  shots: parseInt(player.shots || '0'),
                  shotsOnTarget: 0, // No viene en los datos
                  passes: passes,
                  passesCompleted: passesCompleted,
                  passAccuracy: passAccuracy,
                  tackles: parseInt(player.tackleattempts || '0'),
                  tacklesWon: parseInt(player.tacklesmade || '0'),
                  interceptions: 0, // No viene en los datos
                  rating: player.rating ? parseFloat(player.rating) : null,
                  redCards: parseInt(player.redcards || '0'),
                  yellowCards: 0, // No viene en los datos
                  saves: parseInt(player.saves || '0'),
                  manOfTheMatch: parseInt(player.mom || '0'),
                  team: clubKey === clubId ? '0' : '1',
                  clubId: clubKey,
                };
              });
            }
          });
        }

        return {
          matchId: match.matchId || match.matchid || '',
          timestamp: parseInt(match.timestamp || match.timeAgo || '0'),
          clubs,
          players,
          matchType: match.matchType || match.matchtype || matchType || 'league',
        };
      });
    } catch (error: any) {
      this.logger.error(`Get club matches error: ${error.message}`);
      if (error.statusCode === 404) {
        throw new NotFoundException(`Matches for club ${clubId} not found`);
      }
      throw error;
    }
  }
}
