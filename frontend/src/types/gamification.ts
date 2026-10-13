export interface GamificationStats {
  userId?: number;
  totalXp: number;
  streak: number;
  bestStreak: number;
  dailyGoal: number;
  level: number;
  levelTitle: string;
  lastActiveDate: string | null;
  unlockedBadges: string[];
}

export interface LeaderboardUser {
  rank: number;
  userId: number;
  fullName: string;
  avatarUrl: string | null;
  totalXp: number;
  level: number;
  levelTitle: string;
  streak: number;
  isCurrentUser: boolean;
}

export interface BadgeItem {
  id: string;
  title: string;
  japaneseTitle: string;
  description: string;
  icon: string;
  tier: "BRONZE" | "SILVER" | "GOLD" | "DIAMOND";
  isUnlocked: boolean;
  unlockedAt: string | null;
  progressPercent: number;
  target: number;
  current: number;
}
