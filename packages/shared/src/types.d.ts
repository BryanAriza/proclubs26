export type Platform = 'common-gen5' | 'common-gen4' | 'nx';
export interface ClubSearchResult {
    clubId: string;
    name: string;
    platform: Platform;
    regionId?: number;
    customKit?: {
        clubColors?: string[];
    };
}
export interface ClubInfo {
    clubId: string;
    name: string;
    platform: Platform;
    regionId: number;
    teamId: number;
    customKit?: {
        clubColors?: string[];
        crestAssetId?: string;
    };
    memberCount?: number;
}
export interface ClubOverallStats {
    clubId: string;
    platform: Platform;
    divisionRating?: number;
    skillRating?: number;
    division?: number | null;
    currentDivision?: number | null;
    reputationTier?: number | null;
    wins: number;
    losses: number;
    ties: number;
    gamesPlayed: number;
    goalsFor: number;
    goalsAgainst: number;
    recentResults?: string[];
    titlesWon?: number;
    seasons?: number;
    playoffAchievements?: PlayoffAchievement[];
}
export interface PlayoffAchievement {
    seasonName: string;
    divisionLabel: string;
    finishLabel: string;
    crestUrl: string;
}
export interface MemberStats {
    playerId: string;
    name: string;
    position: string;
    gamesPlayed: number;
    goals: number;
    assists: number;
    cleanSheets?: number;
    averageRating: number;
    redCards?: number;
    yellowCards?: number;
    passAccuracy?: number;
    shotsPerGame?: number;
    tacklesPerGame?: number;
    manOfTheMatch?: number;
    proName?: string;
    proPos?: string;
    proOverall?: number;
}
export type MatchType = 'league' | 'playoff' | 'friendly' | 'tournament';
export interface MatchStats {
    matchId: string;
    timestamp: number;
    clubs: {
        [clubId: string]: {
            clubId: string;
            result?: number;
            score?: number;
            teamSide?: string;
            clubName?: string;
        };
    };
    players?: {
        [playerId: string]: {
            playerId: string;
            name?: string;
            goals?: number;
            assists?: number;
            rating?: string;
            position?: string;
        };
    };
    matchType?: MatchType;
}
export interface ApiError {
    statusCode: number;
    message: string;
    error?: string;
}
export interface SearchQuery {
    platform: Platform;
    name: string;
}
export interface ClubQuery {
    platform: Platform;
    clubId: string;
}
export interface MatchesQuery extends ClubQuery {
    type?: MatchType;
}
