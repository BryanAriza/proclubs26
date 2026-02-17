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
} from '@proclubs/shared';
import { EAClient } from '../clients/ea.client';

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
        
        return {
          clubId: club.clubId || '',
          name: club.name || club.clubInfo?.name || '',
          platform: platform as Platform,
          regionId: club.clubInfo?.regionId || null,
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

  async getClubOverall(
    platform: string,
    clubId: string,
  ): Promise<ClubOverallStats> {
    try {
      const data = await this.eaClient.getClubStats(platform, clubId);
      
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
        division: stats.bestDivision ? parseInt(stats.bestDivision) : null,
        wins: stats.wins ? parseInt(stats.wins) : 0,
        losses: stats.losses ? parseInt(stats.losses) : 0,
        ties: stats.ties ? parseInt(stats.ties) : 0,
        gamesPlayed: stats.gamesPlayed ? parseInt(stats.gamesPlayed) : 0,
        goalsFor: stats.goals ? parseInt(stats.goals) : 0,
        goalsAgainst: stats.goalsAgainst ? parseInt(stats.goalsAgainst) : 0,
        recentResults: recentResults.slice(0, 5), // Solo los últimos 5
        titlesWon: stats.promotions ? parseInt(stats.promotions) : 0,
        seasons: stats.leagueAppearances ? parseInt(stats.leagueAppearances) : 0,
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
      
      if (Object.keys(membersData).length === 0) {
        this.logger.warn(`No members found for club ${clubId}`);
        return [];
      }

      return Object.keys(membersData).map((playerId) => {
        const member = membersData[playerId];
        const career = careerStats[playerId] || {};
        
        return {
          playerId: member.playerId || playerId,
          name: member.name || member.proName || 'Unknown',
          position: member.position || member.proPos || 'N/A',
          gamesPlayed: parseInt(member.gamesPlayed || '0'),
          goals: parseInt(member.goals || '0'),
          assists: parseInt(member.assists || '0'),
          cleanSheets: parseInt(member.cleanSheets || member.cleansheetsany || '0'),
          averageRating: parseFloat(member.averageRating || member.ratingAve || '0'),
          redCards: parseInt(member.redCards || member.redcards || '0'),
          yellowCards: parseInt(member.yellowCards || '0'),
          passAccuracy: member.passAccuracy ? parseFloat(member.passAccuracy) : null,
          shotsPerGame: member.shotsPerGame ? parseFloat(member.shotsPerGame) : null,
          tacklesPerGame: member.tacklesPerGame ? parseFloat(member.tacklesPerGame) : null,
          manOfTheMatch: parseInt(member.manOfTheMatch || member.mom || '0'),
          proName: member.proName || member.name || null,
          proPos: member.proPos || member.position || member.pos || null,
          proOverall: member.proOverall ? parseInt(member.proOverall) : null,
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
