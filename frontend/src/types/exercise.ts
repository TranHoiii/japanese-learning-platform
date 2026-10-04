export type ExerciseType = 'LESSON' | 'REVIEW';

export type QuestionType =
  | 'MULTIPLE_CHOICE'
  | 'FILL_BLANK'
  | 'MATCHING'
  | 'LISTENING'
  | 'SENTENCE_ORDER'
  | 'MIXED';

export interface QuestionOption {
  id: number;
  optionText: string;
  isCorrect?: boolean;
  sortOrder: number;
}

export interface ExerciseQuestion {
  id: number;
  exerciseId: number;
  questionText: string;
  questionType: QuestionType;
  explanation?: string | null;
  sortOrder: number;
  options: QuestionOption[];
}

export interface Exercise {
  id: number;
  lessonId: number;
  title: string;
  description?: string | null;
  exerciseType: ExerciseType;
  contentType: string;
  sortOrder: number;
  questionCount: number;
  questions?: ExerciseQuestion[];
}

export interface ExerciseAnswerRequest {
  questionId: number;
  selectedOptionId?: number | null;
  answerText?: string | null;
}

export interface ExerciseSubmitRequest {
  answers: ExerciseAnswerRequest[];
}

export interface ExerciseQuestionResult {
  questionId: number;
  isCorrect: boolean;
  selectedOptionId?: number | null;
  correctOptionId?: number | null;
  answerText?: string | null;
  correctAnswerText?: string | null;
  explanation?: string | null;
}

export interface ExerciseSubmitResponse {
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  results: ExerciseQuestionResult[];
}
