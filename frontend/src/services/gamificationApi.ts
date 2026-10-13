import { api } from "./api";
import { GamificationStats, LeaderboardUser, BadgeItem } from "../types/gamification";
import { ApiResponse } from "./vocabularyApi";

// Default benchmark learners for offline / initial state
const FALLBACK_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    userId: 101,
    fullName: "Kenji Tanaka",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    totalXp: 1420,
    level: 12,
    levelTitle: "Chăm chỉ · 努力家",
    streak: 14,
    isCurrentUser: false,
  },
  {
    rank: 2,
    userId: 102,
    fullName: "Nguyễn Minh Anh",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    totalXp: 1180,
    level: 10,
    levelTitle: "Chăm chỉ · 努力家",
    streak: 9,
    isCurrentUser: false,
  },
  {
    rank: 3,
    userId: 103,
    fullName: "Sakura Takahashi",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    totalXp: 950,
    level: 8,
    levelTitle: "Học viên · 学生",
    streak: 7,
    isCurrentUser: false,
  },
  {
    rank: 4,
    userId: 104,
    fullName: "Trần Hoàng Nam",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    totalXp: 760,
    level: 7,
    levelTitle: "Học viên · 学生",
    streak: 5,
    isCurrentUser: false,
  },
  {
    rank: 5,
    userId: 105,
    fullName: "Lê Bảo Trâm",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    totalXp: 520,
    level: 5,
    levelTitle: "Học trò · 見習い",
    streak: 4,
    isCurrentUser: false,
  },
];

export const gamificationApi = {
  getStats: async (): Promise<GamificationStats | null> => {
    try {
      const res = await api.get<ApiResponse<GamificationStats>>("/gamification/stats");
      return res.data.data;
    } catch {
      return null;
    }
  },

  syncStats: async (payload: {
    totalXp: number;
    streak: number;
    bestStreak: number;
    dailyGoal: number;
    lastActiveDate: string | null;
    claimedBadges: string[];
  }): Promise<GamificationStats | null> => {
    try {
      const res = await api.post<ApiResponse<GamificationStats>>("/gamification/sync", payload);
      return res.data.data;
    } catch {
      return null;
    }
  },

  getLeaderboard: async (period = "all_time"): Promise<LeaderboardUser[]> => {
    try {
      const res = await api.get<ApiResponse<LeaderboardUser[]>>("/gamification/leaderboard", {
        params: { period },
      });
      return res.data.data || FALLBACK_LEADERBOARD;
    } catch {
      return FALLBACK_LEADERBOARD;
    }
  },

  getBadges: async (): Promise<BadgeItem[]> => {
    try {
      const res = await api.get<ApiResponse<BadgeItem[]>>("/gamification/badges");
      return res.data.data;
    } catch {
      return [];
    }
  },
};
