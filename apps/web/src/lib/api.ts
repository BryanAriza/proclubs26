import axios from 'axios';
import type {
  ClubSearchResult,
  ClubInfo,
  ClubOverallStats,
  MemberStats,
  MatchStats,
  Platform,
} from '@proclubs/shared';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 15000,
});

export const clubsApi = {
  searchClubs: async (
    platform: Platform,
    name: string,
  ): Promise<ClubSearchResult[]> => {
    const { data } = await api.get('/clubs/search', {
      params: { platform, name },
    });
    return data;
  },

  getClubInfo: async (
    platform: Platform,
    clubId: string,
  ): Promise<ClubInfo> => {
    const { data } = await api.get(`/clubs/${clubId}/info`, {
      params: { platform },
    });
    return data;
  },

  getClubOverall: async (
    platform: Platform,
    clubId: string,
  ): Promise<ClubOverallStats> => {
    const { data } = await api.get(`/clubs/${clubId}/overall`, {
      params: { platform },
    });
    return data;
  },

  getClubMembers: async (
    platform: Platform,
    clubId: string,
  ): Promise<MemberStats[]> => {
    const { data } = await api.get(`/clubs/${clubId}/members`, {
      params: { platform },
    });
    return data;
  },

  getClubMatches: async (
    platform: Platform,
    clubId: string,
    type?: string,
  ): Promise<MatchStats[]> => {
    const { data } = await api.get(`/clubs/${clubId}/matches`, {
      params: { platform, type },
    });
    return data;
  },
};
