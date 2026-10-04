export interface ReadingOption {
  id: number;
  content: string;
  sortOrder: number;
}

export interface ReadingQuestion {
  id: number;
  question: string;
  questionType: 'MULTIPLE_CHOICE' | 'SINGLE_CHOICE' | 'TRUE_FALSE';
  imageUrl?: string | null;
  sortOrder: number;
  options: ReadingOption[];
}

export interface ReadingContent {
  id: number;
  lessonId: number;
  title: string;
  content: string;
  translation?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
  questions: ReadingQuestion[];
}

export interface ReadingAnswerRequest {
  questionId: number;
  selectedOptionId?: number | null;
}

export interface ReadingSubmitRequest {
  answers: ReadingAnswerRequest[];
}

export interface ReadingQuestionResult {
  questionId: number;
  isCorrect: boolean;
  selectedOptionId?: number | null;
  correctOptionId?: number | null;
  explanation?: string | null;
}

export interface ReadingSubmitResponse {
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  results: ReadingQuestionResult[];
}
