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
  imageUrl?: string | null;
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

export interface BlankResponse {
  blankId: string;
  value: string;
}

export interface ExerciseAnswerRequest {
  questionId: number;
  selectedOptionId?: number | null;
  answerText?: string | null;
  responses?: BlankResponse[];
}

export interface ExerciseSubmitRequest {
  answers: ExerciseAnswerRequest[];
}

export interface BlankResult {
  blankId: string;
  isCorrect: boolean;
  userAnswer?: string | null;
  correctAnswer?: string | null;
  autoGraded?: boolean;
}

export interface ExerciseQuestionResult {
  questionId: number;
  isCorrect: boolean;
  selectedOptionId?: number | null;
  correctOptionId?: number | null;
  answerText?: string | null;
  correctAnswerText?: string | null;
  explanation?: string | null;
  autoGraded?: boolean;
  blankResults?: BlankResult[];
}

export interface ExerciseSubmitResponse {
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  results: ExerciseQuestionResult[];
}

