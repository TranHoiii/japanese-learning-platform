export type ReviewStatus = "PENDING" | "COMPLETED" | "SKIPPED";

export type ReviewResult = "AGAIN" | "HARD" | "GOOD" | "EASY";

export type ReviewContentType =
  | "VOCABULARY"
  | "GRAMMAR"
  | "KANJI"
  | "LISTENING"
  | "READING"
  | "EXERCISE";

export interface ReviewItemResponse {
  id: number;
  contentType: ReviewContentType;
  contentId: number;
  wrongCount: number;
  correctCount: number;
  priority: number;
  lastReviewedAt: string | null;
  nextReviewAt: string | null;
  status: ReviewStatus;
  title?: string | null;
  lessonId?: number | null;
  lessonNumber?: number | null;
}

export interface CreateReviewItemRequest {
  contentType: ReviewContentType;
  contentId: number;
}

export interface ReviewResultRequest {
  result: ReviewResult;
}
