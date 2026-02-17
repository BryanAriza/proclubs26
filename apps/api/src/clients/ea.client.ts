import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { EAFCApiService } from 'eafc-clubs-api';

@Injectable()
export class EAClient {
  private readonly logger = new Logger(EAClient.name);
  private readonly baseURL: string;
  private readonly timeout: number;
  private readonly useMocks: boolean;
  private readonly eafcApi: EAFCApiService;
  
  // Base URLs for club crests (extraídas de proclubs.ea.com)
  private readonly CREST_BASE_URL = 'https://media.contentapi.ea.com/content/dam/eacom/fc/pro-clubs/crests/';
  private readonly CUSTOM_CREST_BASE_URL = 'https://eafc24.content.easports.com/fifa/fltOnlineAssets/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fcweb/crests/256x256/l';
  private readonly DEFAULT_CREST_URL = 'https://media.contentapi.ea.com/content/dam/eacom/fc/pro-clubs/crests/default.png';

  constructor(private readonly httpService: HttpService) {
    this.baseURL = process.env.EA_BASE_URL || 'https://proclubs.ea.com/api/fc';
    this.timeout = 15000;
    this.useMocks = process.env.USE_MOCKS === 'true';
    this.eafcApi = new EAFCApiService();

    if (this.useMocks) {
      this.logger.warn('🔧 MOCK MODE ENABLED - Using mock data instead of EA API');
    } else {
      this.logger.log('🌍 REAL API MODE - Using eafc-clubs-api library');
    }
  }

  async searchClubs(platform: string, clubName: string): Promise<any> {
    if (this.useMocks) {
      return this.getMockSearchResults(clubName);
    }

    try {
      this.logger.log(`Searching clubs: ${clubName} on ${platform}`);
      const mappedPlatform = this.mapPlatform(platform);
      const result = await this.eafcApi.searchClub({
        platform: mappedPlatform,
        clubName,
      });
      return result;
    } catch (error) {
      this.logger.error(`Search error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw this.normalizeError(error);
    }
  }

  async getClubInfo(platform: string, clubId: string): Promise<any> {
    if (this.useMocks) {
      return this.getMockClubInfo(clubId);
    }

    try {
      this.logger.log(`Getting club info: ${clubId} on ${platform}`);
      const mappedPlatform = this.mapPlatform(platform);
      const result = await this.eafcApi.clubInfo({
        platform: mappedPlatform,
        clubIds: clubId,
      });
      this.logger.log(`✅ Raw API response for club info: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Get club info error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw this.normalizeError(error);
    }
  }

  async getClubStats(platform: string, clubId: string): Promise<any> {
    if (this.useMocks) {
      return this.getMockClubStats(clubId);
    }

    try {
      this.logger.log(`Getting club stats: ${clubId} on ${platform}`);
      const mappedPlatform = this.mapPlatform(platform);
      const result = await this.eafcApi.overallStats({
        platform: mappedPlatform,
        clubIds: clubId,
      });
      this.logger.log(`✅ Raw API response for club stats: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Get club stats error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw this.normalizeError(error);
    }
  }

  async getClubMembers(platform: string, clubId: string): Promise<any> {
    if (this.useMocks) {
      return this.getMockClubMembers(clubId);
    }

    try {
      this.logger.log(`Getting club members: ${clubId} on ${platform}`);
      const mappedPlatform = this.mapPlatform(platform);
      
      // Obtener estadísticas actuales y de carrera en paralelo
      const [memberStats, careerStats] = await Promise.all([
        this.eafcApi.memberStats({
          platform: mappedPlatform,
          clubId: clubId,
        }),
        this.eafcApi.memberCareerStats({
          platform: mappedPlatform,
          clubId: clubId,
        }),
      ]);

      this.logger.log(`👥 Raw API response for memberStats: ${JSON.stringify(memberStats).substring(0, 500)}...`);
      this.logger.log(`📈 Raw API response for careerStats: ${JSON.stringify(careerStats).substring(0, 500)}...`);

      // Combinar las estadísticas
      return {
        currentStats: memberStats,
        careerStats: careerStats,
      };
    } catch (error) {
      this.logger.error(`Get club members error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw this.normalizeError(error);
    }
  }

  async getClubMatches(
    platform: string,
    clubId: string,
    matchType?: string,
  ): Promise<any> {
    if (this.useMocks) {
      return this.getMockClubMatches(clubId, matchType);
    }

    try {
      this.logger.log(`Getting club matches: ${clubId} on ${platform}`);
      const mappedPlatform = this.mapPlatform(platform);
      const mappedMatchType = this.mapMatchType(matchType);
      const result = await this.eafcApi.matchesStats({
        platform: mappedPlatform,
        clubIds: clubId,
        matchType: mappedMatchType,
      });
      this.logger.log(`⚽ Raw API response for matches: ${JSON.stringify(result).substring(0, 500)}...`);
      return result;
    } catch (error) {
      this.logger.error(`Get club matches error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw this.normalizeError(error);
    }
  }

  private mapPlatform(platform: string): 'common-gen5' | 'common-gen4' | 'nx' {
    const lowerPlatform = platform?.toLowerCase() || '';
    
    // PS5, Xbox Series S|X = gen5
    if (lowerPlatform.includes('ps5') || lowerPlatform.includes('common-gen5') || lowerPlatform === 'xboxseriesxs') {
      return 'common-gen5';
    }
    
    // PS4, Xbox One = gen4
    if (lowerPlatform.includes('ps4') || lowerPlatform.includes('common-gen4') || lowerPlatform === 'xboxone') {
      return 'common-gen4';
    }
    
    // PC = nx
    if (lowerPlatform.includes('pc') || lowerPlatform === 'nx') {
      return 'nx';
    }
    
    // Default to gen5
    return 'common-gen5';
  }

  private mapMatchType(matchType?: string): 'leagueMatch' | 'playoffMatch' {
    if (matchType === 'playoffs' || matchType === 'playoffMatch') {
      return 'playoffMatch';
    }
    return 'leagueMatch';
  }

  /**
   * Construye la URL del escudo del club basado en crestId o customCrestId
   * Retorna primary y fallback para intentar múltiples URLs
   */
  buildCrestUrl(crestId?: string | number | null, customCrestId?: string | number | null): { primary: string; fallback: string | null } {
    const crestIdStr = crestId ? String(crestId) : '';
    const customCrestIdStr = customCrestId ? String(customCrestId) : '';

    let primary = this.DEFAULT_CREST_URL;
    let fallback: string | null = null;

    // Prioridad: customCrestId > crestId > default
    if (customCrestIdStr && customCrestIdStr !== '0') {
      primary = `${this.CUSTOM_CREST_BASE_URL}${customCrestIdStr}.png`;
      // Si el custom falla, intentar con el crest regular como fallback
      if (crestIdStr && crestIdStr !== '0') {
        fallback = `${this.CREST_BASE_URL}${crestIdStr}.png`;
      }
    } else if (crestIdStr && crestIdStr !== '0') {
      primary = `${this.CREST_BASE_URL}${crestIdStr}.png`;
    }

    return { primary, fallback };
  }

  private async request(
    method: string,
    url: string,
    config: any = {},
  ): Promise<any> {
    const requestConfig = {
      method,
      url,
      timeout: this.timeout,
      headers: {
        'User-Agent': 'ProClubs-API/1.0',
        Accept: 'application/json',
        ...config.headers,
      },
      ...config,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.request(requestConfig),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
          this.logger.warn(`Timeout on ${url}, retrying...`);
          try {
            const retryResponse = await firstValueFrom(
              this.httpService.request(requestConfig),
            );
            return retryResponse.data;
          } catch (retryError) {
            this.logger.error(`Retry failed for ${url}`);
            throw this.normalizeError(retryError);
          }
        }

        if (error.response?.status && error.response.status >= 500) {
          this.logger.warn(`Server error on ${url}, retrying...`);
          try {
            const retryResponse = await firstValueFrom(
              this.httpService.request(requestConfig),
            );
            return retryResponse.data;
          } catch (retryError) {
            throw this.normalizeError(retryError);
          }
        }

        throw this.normalizeError(error);
      }

      throw error;
    }
  }

  private normalizeError(error: any) {
    if (error instanceof AxiosError) {
      const status = error.response?.status || 503;
      const message =
        error.response?.data?.message ||
        error.message ||
        'EA API request failed';

      return {
        statusCode: status,
        message,
        error: 'EA_API_ERROR',
      };
    }

    return {
      statusCode: 500,
      message: 'Internal server error',
      error: 'INTERNAL_ERROR',
    };
  }

  // Mock data methods
  private getMockSearchResults(clubName: string) {
    this.logger.log(`🔍 Mock search for: "${clubName}"`);
    return [
      {
        clubId: '12345',
        name: `${clubName} United`,
        clubInfo: {
          name: `${clubName} United`,
          regionId: 1,
          teamId: 123,
          customKit: {
            clubColors: ['#FF0000', '#0000FF'],
            crestAssetId: '241551',
          },
        },
      },
      {
        clubId: '67890',
        name: `${clubName} FC`,
        clubInfo: {
          name: `${clubName} FC`,
          regionId: 2,
          teamId: 456,
          customKit: {
            clubColors: ['#00FF00', '#FFFF00'],
            crestAssetId: '241550',
          },
        },
      },
      {
        clubId: '11111',
        name: `Real ${clubName}`,
        clubInfo: {
          name: `Real ${clubName}`,
          regionId: 3,
          teamId: 789,
          customKit: {
            clubColors: ['#FFFFFF', '#000000'],
            crestAssetId: '241549',
          },
        },
      },
    ];
  }

  private getMockClubInfo(clubId: string) {
    return {
      [clubId]: {
        name: `Mock Club ${clubId}`,
        clubId,
        regionId: 1,
        teamId: 123,
        customKit: {
          clubColors: ['#FF0000', '#0000FF'],
          crestAssetId: '12345',
        },
        memberCount: 15,
      },
    };
  }

  private getMockClubStats(clubId: string) {
    const wins = Math.floor(Math.random() * 50) + 30;
    const losses = Math.floor(Math.random() * 30) + 10;
    const ties = Math.floor(Math.random() * 15) + 5;
    const gamesPlayed = wins + losses + ties;
    const goalsFor = Math.floor(gamesPlayed * (Math.random() * 1.5 + 2)); // 2-3.5 goles por partido
    const goalsAgainst = Math.floor(gamesPlayed * (Math.random() * 1.2 + 1)); // 1-2.2 goles en contra
    
    const recentResults = [];
    for (let i = 0; i < 5; i++) {
      const rand = Math.random();
      recentResults.push(rand > 0.6 ? 'W' : rand > 0.3 ? 'L' : 'D');
    }
    
    return {
      [clubId]: [
        {
          divisionRating: Math.floor(Math.random() * 1000) + 1000, // 1000-2000
          skillRating: Math.floor(Math.random() * 1000) + 1200, // 1200-2200
          division: Math.floor(Math.random() * 10) + 1, // 1-10
          wins,
          losses,
          ties,
          gamesPlayed,
          goalsFor,
          goalsAgainst,
          recentResults,
          titlesWon: Math.floor(Math.random() * 5),
          seasons: Math.floor(Math.random() * 10) + 1,
        },
      ],
    };
  }

  private getMockClubMembers(clubId: string) {
    const memberCount = Math.floor(Math.random() * 10) + 8; // 8-18 jugadores
    const members: any = {};
    
    const positions = ['GK', 'LB', 'CB', 'RB', 'LWB', 'RWB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST', 'CF'];
    const names = ['Martínez', 'González', 'Rodríguez', 'Fernández', 'López', 'García', 'Pérez', 'Silva', 'Torres', 'Sánchez', 'Ramírez', 'Cruz', 'Moreno', 'Romero', 'Herrera', 'Vargas', 'Castro', 'Ortiz'];
    
    for (let i = 0; i < memberCount; i++) {
      const playerId = `player${i + 1}`;
      const position = positions[Math.floor(Math.random() * positions.length)];
      const gamesPlayed = Math.floor(Math.random() * 50) + 20;
      const isAttacker = ['ST', 'CF', 'LW', 'RW', 'CAM'].includes(position);
      const isDefender = ['GK', 'CB', 'LB', 'RB', 'LWB', 'RWB'].includes(position);
      
      members[playerId] = {
        playerId,
        name: `${names[i % names.length]}${i + 1}`,
        position,
        gamesPlayed,
        goals: isAttacker ? Math.floor(Math.random() * 40) + 5 : Math.floor(Math.random() * 8),
        assists: isAttacker ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 15),
        cleanSheets: isDefender ? Math.floor(Math.random() * 20) : 0,
        averageRating: Number((Math.random() * 2 + 7).toFixed(1)), // 7.0-9.0
        redCards: Math.floor(Math.random() * 3),
        yellowCards: Math.floor(Math.random() * 10),
        passAccuracy: Number((Math.random() * 15 + 75).toFixed(1)), // 75-90%
        shotsPerGame: Number((Math.random() * 4).toFixed(1)),
        tacklesPerGame: Number((Math.random() * 3).toFixed(1)),
        manOfTheMatch: Math.floor(Math.random() * 8),
        proName: `PRO_${names[i % names.length]}`,
        proPos: position,
        proOverall: Math.floor(Math.random() * 15) + 80, // 80-95
      };
    }
    
    return { members };
  }

  private getMockClubMatches(clubId: string, matchType?: string) {
    const matchCount = Math.floor(Math.random() * 10) + 15; // 15-25 partidos
    const matches = [];
    const opponentNames = ['Real Madrid FC', 'Barcelona United', 'Bayern Stars', 'PSG Elite', 'Manchester Legends', 'Liverpool FC', 'Juventus Pro', 'Milan AC', 'Inter Warriors', 'Chelsea Blues'];
    
    for (let i = 0; i < matchCount; i++) {
      const myScore = Math.floor(Math.random() * 6);
      const opponentScore = Math.floor(Math.random() * 6);
      const result = myScore > opponentScore ? 3 : myScore < opponentScore ? 0 : 1;
      const opponentId = `opponent${i + 1}`;
      
      matches.push({
        matchId: `match${i + 1}`,
        timestamp: Math.floor(Date.now() / 1000) - (i * 3600 * 24), // Un partido por día
        clubs: {
          [clubId]: {
            clubId,
            result,
            score: myScore,
            teamSide: i % 2 === 0 ? 'home' : 'away',
            clubName: `Tu Club`,
          },
          [opponentId]: {
            clubId: opponentId,
            result: result === 3 ? 0 : result === 0 ? 3 : 1,
            score: opponentScore,
            teamSide: i % 2 === 0 ? 'away' : 'home',
            clubName: opponentNames[i % opponentNames.length],
          },
        },
        players: {
          player1: {
            playerId: 'player1',
            name: 'Jugador1',
            goals: Math.floor(Math.random() * 3),
            assists: Math.floor(Math.random() * 2),
            rating: (Math.random() * 2 + 7).toFixed(1),
            position: 'ST',
          },
        },
        matchType: matchType || 'league',
      });
    }
    
    return matches;
  }
}
