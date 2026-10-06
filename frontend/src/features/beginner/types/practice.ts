/**
 * Practice & Quiz Session Data Models
 * Temporary in-memory state only. NO backend persistence or progress tracking.
 */

export type PracticeCategory =
  | "hiragana"
  | "katakana"
  | "pronunciation"
  | "numbers"
  | "mixed";

export type PracticeTimerMode = "unlimited" | "60s";

export type PracticeQuestionType =
  | "character-recognition"
  | "romaji-to-kana"
  | "sound-group"
  | "confused-kana"
  | "loanword-recognition"
  | "pronunciation-rule"
  | "mora-count"
  | "pitch-accent"
  | "counter-selection"
  | "number-reading"
  | "date-reading"
  | "time-reading";

export interface PracticeOption {
  id: string;
  label: string;
  sublabel?: string;
  isCorrect: boolean;
}

export interface PracticeQuestion {
  id: string;
  category: "hiragana" | "katakana" | "pronunciation" | "numbers";
  type: PracticeQuestionType;
  prompt: string;
  promptKana?: string;
  promptRomaji?: string;
  promptHint?: string;
  options: PracticeOption[];
  explanationVi: string;
  audioUrl?: string | null;
  difficulty?: "easy" | "medium" | "hard";
}

export interface WrongQuestionRecord {
  question: PracticeQuestion;
  selectedOptionId: string;
  selectedOptionLabel: string;
  correctOptionLabel: string;
}

export interface PracticeSessionResult {
  category: PracticeCategory;
  categoryTitle: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  wrongRecords: WrongQuestionRecord[];
  isTimeout: boolean;
}

export interface PracticeModeCard {
  id: PracticeCategory;
  titleVi: string;
  icon: string;
  descriptionVi: string;
  badgeVi: string;
  targetCount: number;
}
