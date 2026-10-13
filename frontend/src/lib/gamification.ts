/**
 * Learning gamification: XP, daily goal, streak, level, backend sync, badges & leaderboard.
 *
 * Persisted in localStorage per user, automatically synchronized with backend API
 * (/api/v1/gamification/*) when authenticated.
 */
import { useSyncExternalStore } from "react";
import { gamificationApi } from "../services/gamificationApi";
import { BadgeItem } from "../types/gamification";

export const DAILY_GOAL_OPTIONS = [20, 50, 100] as const;
const DEFAULT_DAILY_GOAL = 50;
const STORAGE_PREFIX = "jlp.gamification.v1.";
const MAX_DAYS_KEPT = 90;
const MAX_CLAIMED_KEYS = 3000;
const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365];

/** XP values for learning actions (single source of truth). */
export const XP_REWARDS = {
  flashcardForgot: 2,
  flashcardMedium: 5,
  flashcardMastered: 8,
  reviewAgain: 2,
  reviewHard: 4,
  reviewGood: 6,
  reviewEasy: 8,
  contentCompleted: 10,
  sessionBonus: 15,
} as const;

interface PersistedState {
  v: 1;
  totalXp: number;
  dailyGoal: number;
  /** date (YYYY-MM-DD, local) → XP earned that day */
  days: Record<string, number>;
  streak: number;
  bestStreak: number;
  lastActive: string | null;
  /** keys of one-time rewards already granted */
  claimed: string[];
  goalCelebratedOn: string | null;
}

export type GamificationEvent =
  | { type: "xp"; amount: number; label?: string }
  | { type: "goal" }
  | { type: "streak"; days: number }
  | { type: "levelup"; level: number }
  | { type: "celebrate"; title: string; subtitle?: string };

export interface WeekDay {
  date: string;
  label: string;
  xp: number;
  active: boolean;
  isToday: boolean;
  isFuture: boolean;
}

export interface GamificationSnapshot {
  totalXp: number;
  level: number;
  levelTitle: string;
  /** XP earned inside the current level */
  levelXp: number;
  /** XP needed to span the current level */
  levelSpan: number;
  levelPercent: number;
  xpToday: number;
  dailyGoal: number;
  goalPercent: number;
  goalReached: boolean;
  streak: number;
  bestStreak: number;
  activeToday: boolean;
  /** streak exists but nothing learned yet today */
  streakAtRisk: boolean;
  week: WeekDay[];
}

/* ───────────────────────── helpers ───────────────────────── */

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const dayKey = (d: Date = new Date()): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const addDays = (d: Date, n: number): Date => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
};

/** Level n starts at 50·n·(n−1) XP: 100, 300, 600, 1000… */
export const xpForLevel = (level: number): number => 50 * level * (level - 1);

export const levelFromXp = (xp: number): number =>
  Math.max(1, Math.floor((1 + Math.sqrt(1 + (4 * xp) / 50)) / 2));

const LEVEL_TITLES: { from: number; title: string }[] = [
  { from: 1, title: "Người mới · 初心者" },
  { from: 3, title: "Học trò · 見習い" },
  { from: 6, title: "Học viên · 学生" },
  { from: 10, title: "Chăm chỉ · 努力家" },
  { from: 15, title: "Cao thủ · 達人" },
  { from: 25, title: "Sensei · 先生" },
];

const titleForLevel = (level: number): string => {
  let title = LEVEL_TITLES[0].title;
  for (const t of LEVEL_TITLES) if (level >= t.from) title = t.title;
  return title;
};

const emptyState = (): PersistedState => ({
  v: 1,
  totalXp: 0,
  dailyGoal: DEFAULT_DAILY_GOAL,
  days: {},
  streak: 0,
  bestStreak: 0,
  lastActive: null,
  claimed: [],
  goalCelebratedOn: null,
});

const WEEK_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

/* ───────────────────────── store ───────────────────────── */

type Listener = () => void;
type EventListener = (event: GamificationEvent) => void;

let userKey = "guest";
let state: PersistedState = emptyState();
let snapshot: GamificationSnapshot | null = null;
let snapshotDay = "";
const listeners = new Set<Listener>();
const eventListeners = new Set<EventListener>();
let syncTimer: ReturnType<typeof setTimeout> | null = null;

const storageKey = () => `${STORAGE_PREFIX}${userKey}`;

function load(): PersistedState {
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return { ...emptyState(), ...parsed, v: 1 };
  } catch {
    return emptyState();
  }
}

function persist() {
  try {
    localStorage.setItem(storageKey(), JSON.stringify(state));
  } catch {
    /* storage may be full or disabled — best-effort */
  }
}

function invalidate() {
  snapshot = null;
  listeners.forEach((l) => l());
}

function emit(event: GamificationEvent) {
  eventListeners.forEach((l) => l(event));
}

function scheduleBackendSync() {
  if (userKey === "guest") return;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(async () => {
    try {
      await gamificationApi.syncStats({
        totalXp: state.totalXp,
        streak: state.streak,
        bestStreak: state.bestStreak,
        dailyGoal: state.dailyGoal,
        lastActiveDate: state.lastActive,
        claimedBadges: state.claimed,
      });
    } catch {
      // offline-resilient: best-effort sync
    }
  }, 1500);
}

function effectiveStreak(s: PersistedState, today: string): number {
  if (!s.lastActive) return 0;
  const yesterday = dayKey(addDays(new Date(), -1));
  return s.lastActive === today || s.lastActive === yesterday ? s.streak : 0;
}

function buildSnapshot(): GamificationSnapshot {
  const today = dayKey();
  const now = new Date();
  const xpToday = state.days[today] ?? 0;
  const level = levelFromXp(state.totalXp);
  const levelStart = xpForLevel(level);
  const levelSpan = xpForLevel(level + 1) - levelStart;
  const levelXp = state.totalXp - levelStart;
  const streak = effectiveStreak(state, today);

  // Monday-first week containing today
  const mondayOffset = (now.getDay() + 6) % 7;
  const week: WeekDay[] = WEEK_LABELS.map((label, i) => {
    const d = addDays(now, i - mondayOffset);
    const key = dayKey(d);
    const xp = state.days[key] ?? 0;
    return {
      date: key,
      label,
      xp,
      active: xp > 0,
      isToday: key === today,
      isFuture: key > today,
    };
  });

  return {
    totalXp: state.totalXp,
    level,
    levelTitle: titleForLevel(level),
    levelXp,
    levelSpan,
    levelPercent: Math.min(100, Math.round((levelXp / levelSpan) * 100)),
    xpToday,
    dailyGoal: state.dailyGoal,
    goalPercent: Math.min(100, Math.round((xpToday / state.dailyGoal) * 100)),
    goalReached: xpToday >= state.dailyGoal,
    streak,
    bestStreak: Math.max(state.bestStreak, streak),
    activeToday: xpToday > 0,
    streakAtRisk: streak > 0 && xpToday === 0,
    week,
  };
}

function getSnapshot(): GamificationSnapshot {
  const today = dayKey();
  if (!snapshot || snapshotDay !== today) {
    snapshot = buildSnapshot();
    snapshotDay = today;
  }
  return snapshot;
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function pruneDays() {
  const keys = Object.keys(state.days).sort();
  if (keys.length > MAX_DAYS_KEPT) {
    for (const k of keys.slice(0, keys.length - MAX_DAYS_KEPT)) delete state.days[k];
  }
}

/* ───────────────────────── public API ───────────────────────── */

export const gamification = {
  /** Switch to the data of another user (or "guest" when logged out) and sync with backend. */
  async setUser(id: number | string | null | undefined) {
    const next = id === null || id === undefined ? "guest" : String(id);
    if (next === userKey && snapshot) return;
    userKey = next;
    state = load();
    invalidate();

    if (userKey !== "guest") {
      try {
        const remote = await gamificationApi.getStats();
        if (remote) {
          let updated = false;
          if (remote.totalXp > state.totalXp) {
            state.totalXp = remote.totalXp;
            updated = true;
          }
          if (remote.bestStreak > state.bestStreak) {
            state.bestStreak = remote.bestStreak;
            updated = true;
          }
          if (updated) {
            persist();
            invalidate();
          }
        }
      } catch {
        // offline fallback
      }
    }
  },

  /** Grant XP for a learning action. Returns the XP granted. */
  award(amount: number, label?: string): number {
    if (!Number.isFinite(amount) || amount <= 0) return 0;

    const today = dayKey();
    const yesterday = dayKey(addDays(new Date(), -1));
    const before = state.days[today] ?? 0;
    const prevLevel = levelFromXp(state.totalXp);

    state.days[today] = before + amount;
    state.totalXp += amount;

    let streakMilestone: number | null = null;
    if (state.lastActive !== today) {
      state.streak = state.lastActive === yesterday ? state.streak + 1 : 1;
      state.lastActive = today;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      if (STREAK_MILESTONES.includes(state.streak)) streakMilestone = state.streak;
    }

    const after = state.days[today];
    const goalJustReached =
      before < state.dailyGoal && after >= state.dailyGoal && state.goalCelebratedOn !== today;
    if (goalJustReached) state.goalCelebratedOn = today;

    const newLevel = levelFromXp(state.totalXp);
    pruneDays();
    persist();
    invalidate();

    emit({ type: "xp", amount, label });
    if (goalJustReached) emit({ type: "goal" });
    if (streakMilestone) emit({ type: "streak", days: streakMilestone });
    if (newLevel > prevLevel) emit({ type: "levelup", level: newLevel });

    scheduleBackendSync();
    return amount;
  },

  /** Grant XP only the first time `key` is seen (e.g. "VOCABULARY:12"). */
  awardOnce(key: string, amount: number, label?: string): boolean {
    if (state.claimed.includes(key)) return false;
    state.claimed.push(key);
    if (state.claimed.length > MAX_CLAIMED_KEYS) {
      state.claimed = state.claimed.slice(-MAX_CLAIMED_KEYS);
    }
    gamification.award(amount, label);
    return true;
  },

  /** Fire a confetti celebration without XP (e.g. finishing a session). */
  celebrate(title: string, subtitle?: string) {
    emit({ type: "celebrate", title, subtitle });
  },

  setDailyGoal(goal: number) {
    state.dailyGoal = goal;
    persist();
    invalidate();
    scheduleBackendSync();
  },

  subscribe,
  getSnapshot,

  /** Subscribe to one-off events (XP popups, confetti, level-ups…). */
  onEvent(listener: EventListener): () => void {
    eventListeners.add(listener);
    return () => eventListeners.delete(listener);
  },
};

export function useGamification(): GamificationSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/** Compute system badges based on current learning achievements */
export function getSystemBadges(snapshot: GamificationSnapshot): BadgeItem[] {
  const totalXp = snapshot.totalXp;
  const streak = Math.max(snapshot.streak, snapshot.bestStreak);

  return [
    {
      id: "badge-first-step",
      title: "Tân Thủ Nhập Môn",
      japaneseTitle: "初めの一歩",
      description: "Đạt được 50 điểm XP tích lũy đầu tiên trên hệ thống.",
      icon: "🌸",
      tier: "BRONZE",
      isUnlocked: totalXp >= 50,
      unlockedAt: totalXp >= 50 ? "Đã mở khóa" : null,
      progressPercent: Math.min(100, Math.round((totalXp / 50) * 100)),
      target: 50,
      current: totalXp,
    },
    {
      id: "badge-streak-3",
      title: "Ngọn Lửa Tam Nhật",
      japaneseTitle: "三日坊主克服",
      description: "Duy trì chuỗi học tập liên tục trong 3 ngày.",
      icon: "🔥",
      tier: "BRONZE",
      isUnlocked: streak >= 3,
      unlockedAt: streak >= 3 ? "Đã mở khóa" : null,
      progressPercent: Math.min(100, Math.round((streak / 3) * 100)),
      target: 3,
      current: streak,
    },
    {
      id: "badge-streak-7",
      title: "Chiến Binh Thất Nhật",
      japaneseTitle: "七日連続",
      description: "Học tập chuyên cần trong suốt 7 ngày liên tiếp không ngắt quãng.",
      icon: "⛩️",
      tier: "SILVER",
      isUnlocked: streak >= 7,
      unlockedAt: streak >= 7 ? "Đã mở khóa" : null,
      progressPercent: Math.min(100, Math.round((streak / 7) * 100)),
      target: 7,
      current: streak,
    },
    {
      id: "badge-xp-500",
      title: "Học Viên Chăm Chỉ",
      japaneseTitle: "努力の結晶",
      description: "Vượt mốc 500 điểm XP trên hành trình chinh phục tiếng Nhật.",
      icon: "⚡",
      tier: "SILVER",
      isUnlocked: totalXp >= 500,
      unlockedAt: totalXp >= 500 ? "Đã mở khóa" : null,
      progressPercent: Math.min(100, Math.round((totalXp / 500) * 100)),
      target: 500,
      current: totalXp,
    },
    {
      id: "badge-streak-30",
      title: "Kỷ Luật Thép (30 Ngày)",
      japaneseTitle: "鉄の規律",
      description: "Duy trì chuỗi học tập kiên định trong 30 ngày liên tiếp.",
      icon: "🛡️",
      tier: "GOLD",
      isUnlocked: streak >= 30,
      unlockedAt: streak >= 30 ? "Đã mở khóa" : null,
      progressPercent: Math.min(100, Math.round((streak / 30) * 100)),
      target: 30,
      current: streak,
    },
    {
      id: "badge-xp-1000",
      title: "Đại Tông Sư (Master)",
      japaneseTitle: "達人の境地",
      description: "Chạm mốc vinh quang 1.000 XP và trở thành tấm gương sáng.",
      icon: "👑",
      tier: "DIAMOND",
      isUnlocked: totalXp >= 1000,
      unlockedAt: totalXp >= 1000 ? "Đã mở khóa" : null,
      progressPercent: Math.min(100, Math.round((totalXp / 1000) * 100)),
      target: 1000,
      current: totalXp,
    },
  ];
}
