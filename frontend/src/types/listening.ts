export interface ListeningOption {
  id: number;
  content: string;
  sortOrder: number;
}

export interface ListeningQuestion {
  id: number;
  question: string;
  questionType: 'MULTIPLE_CHOICE' | 'SINGLE_CHOICE' | 'TRUE_FALSE';
  explanation?: string | null;
  sortOrder: number;
  options: ListeningOption[];
}

export interface ListeningContent {
  id: number;
  lessonId: number;
  title: string;
  audioUrl: string;
  transcript: string | null;
  description: string | null;
  sortOrder: number;
  questions: ListeningQuestion[];
}

export interface QuestionAnswerRequest {
  questionId: number;
  selectedOptionId: number;
}

export interface ListeningSubmitRequest {
  answers: QuestionAnswerRequest[];
}

export interface QuestionResult {
  questionId: number;
  isCorrect: boolean;
  selectedOptionId: number | null;
  correctOptionId: number | null;
  explanation: string | null;
}

export interface ListeningSubmitResponse {
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  results: QuestionResult[];
}
