import type { LessonProgressResponse } from "../types/progress";

export type SkillKey = "vocabulary" | "grammar" | "kanji" | "listening" | "reading" | "exercise";

export interface SkillMeta {
  key: SkillKey;
  label: string;
  emoji: string;
  /** route segment after /:level/lessons/:id/ */
  path: string;
  /** soft tinted surface + text (idle chip) */
  tint: string;
  /** chip once the skill is completed */
  done: string;
  /** progress bar fill */
  bar: string;
  /** text accent */
  text: string;
  /** field on LessonProgressResponse */
  progressField: keyof LessonProgressResponse;
  /** field on ProgressSummaryResponse (mastery %) */
  masteryField?: "vocabularyMastery" | "grammarMastery" | "kanjiMastery" | "listeningMastery" | "readingMastery";
}

export const SKILLS: SkillMeta[] = [
  {
    key: "vocabulary",
    label: "Từ vựng",
    emoji: "📚",
    path: "vocabulary",
    tint: "bg-indigo-50 text-indigo-800 hover:bg-indigo-100",
    done: "bg-indigo-600 text-white hover:bg-indigo-700",
    bar: "bg-indigo-500",
    text: "text-indigo-700",
    progressField: "vocabularyProgress",
    masteryField: "vocabularyMastery",
  },
  {
    key: "grammar",
    label: "Ngữ pháp",
    emoji: "⛩️",
    path: "grammar",
    tint: "bg-sky-50 text-sky-800 hover:bg-sky-100",
    done: "bg-sky-600 text-white hover:bg-sky-700",
    bar: "bg-sky-500",
    text: "text-sky-700",
    progressField: "grammarProgress",
    masteryField: "grammarMastery",
  },
  {
    key: "kanji",
    label: "Kanji",
    emoji: "🈁",
    path: "kanji",
    tint: "bg-amber-50 text-amber-800 hover:bg-amber-100",
    done: "bg-amber-500 text-amber-950 hover:bg-amber-600",
    bar: "bg-amber-500",
    text: "text-amber-700",
    progressField: "kanjiProgress",
    masteryField: "kanjiMastery",
  },
  {
    key: "listening",
    label: "Nghe",
    emoji: "🎧",
    path: "listening",
    tint: "bg-purple-50 text-purple-800 hover:bg-purple-100",
    done: "bg-purple-600 text-white hover:bg-purple-700",
    bar: "bg-purple-500",
    text: "text-purple-700",
    progressField: "listeningProgress",
    masteryField: "listeningMastery",
  },
  {
    key: "reading",
    label: "Đọc",
    emoji: "📖",
    path: "reading",
    tint: "bg-rose-50 text-rose-800 hover:bg-rose-100",
    done: "bg-rose-500 text-white hover:bg-rose-600",
    bar: "bg-rose-500",
    text: "text-rose-700",
    progressField: "readingProgress",
    masteryField: "readingMastery",
  },
  {
    key: "exercise",
    label: "Bài tập",
    emoji: "✏️",
    path: "exercise",
    tint: "bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
    done: "bg-emerald-600 text-white hover:bg-emerald-700",
    bar: "bg-emerald-500",
    text: "text-emerald-700",
    progressField: "exerciseProgress",
  },
];

/** Progress (0-100) of one skill inside a lesson, or null when the backend has no data. */
export function skillProgress(progress: LessonProgressResponse | undefined, skill: SkillMeta): number | null {
  if (!progress) return null;
  const value = progress[skill.progressField];
  return typeof value === "number" ? value : null;
}

/** The first skill of a lesson the learner has not completed yet — the natural "next step". */
export function nextSkill(progress: LessonProgressResponse | undefined): SkillMeta {
  if (!progress) return SKILLS[0];
  return SKILLS.find((s) => (skillProgress(progress, s) ?? 0) < 100) ?? SKILLS[0];
}
