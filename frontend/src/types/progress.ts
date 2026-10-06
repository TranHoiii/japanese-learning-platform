export type LearningStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type ProgressContentType =
  | "VOCABULARY"
  | "GRAMMAR"
  | "KANJI"
  | "LISTENING"
  | "READING"
  | "EXERCISE";

export interface ProgressSummaryResponse {
  overallProgress: number;
  completedLessons: number;
  totalLessons: number;
  inProgressLessons: number;
  vocabularyMastery?: number;
  kanjiMastery?: number;
  grammarMastery?: number;
  listeningMastery?: number;
  readingMastery?: number;
}

export interface LessonProgressResponse {
  lessonId: number;
  lessonNumber: number;
  lessonTitle: string;
  progressPercent: number;
  status: LearningStatus;
  lastAccessedAt: string | null;
  completedAt: string | null;
  vocabularyProgress?: number | null;
  grammarProgress?: number | null;
  kanjiProgress?: number | null;
  listeningProgress?: number | null;
  readingProgress?: number | null;
  exerciseProgress?: number | null;
}

export interface UpdateLessonProgressRequest {
  progressPercent: number;
}

export interface ContentProgressResponse {
  contentType: ProgressContentType;
  contentId: number;
  progressPercent: number;
  status: LearningStatus;
  lastAccessedAt: string | null;
  completedAt: string | null;
  patternOpened?: boolean;
  contentViewed?: boolean;
  examplesViewed?: boolean;
}

export interface UpdateContentProgressRequest {
  contentType: ProgressContentType;
  contentId: number;
  progressPercent?: number;
  patternOpened?: boolean;
  contentViewed?: boolean;
  examplesViewed?: boolean;
}
