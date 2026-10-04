export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Level
export interface AdminLevel {
  id: number;
  code: string;
  name: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface AdminLevelRequest {
  code: string;
  name: string;
  description?: string | null;
  sortOrder: number;
  isActive?: boolean;
}

// Lesson
export interface AdminLesson {
  id: number;
  levelId: number;
  levelCode: string;
  lessonNumber: number;
  title: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface AdminLessonRequest {
  levelId: number;
  lessonNumber: number;
  title: string;
  description?: string | null;
  sortOrder: number;
  isActive?: boolean;
}

// Vocabulary
export interface AdminVocabulary {
  id: number;
  lessonId: number;
  lessonNumber: number | null;
  levelCode: string | null;
  hiragana: string;
  kanji: string | null;
  hanViet: string | null;
  meaning: string;
  partOfSpeech: string | null;
  audioUrl: string | null;
  notes: string | null;
}

export interface AdminVocabularyRequest {
  lessonId: number;
  hiragana: string;
  kanji?: string | null;
  hanViet?: string | null;
  meaning: string;
  partOfSpeech?: string | null;
  audioUrl?: string | null;
  notes?: string | null;
}

// Grammar
export interface AdminGrammarExample {
  id: number;
  grammarId: number;
  japanese: string;
  furigana: string | null;
  translation: string | null;
  explanation: string | null;
  sortOrder: number;
}

export interface AdminGrammarExampleRequest {
  japanese: string;
  furigana?: string | null;
  translation?: string | null;
  explanation?: string | null;
  sortOrder: number;
}

export interface AdminGrammar {
  id: number;
  lessonId: number;
  lessonNumber: number | null;
  levelCode: string | null;
  pattern: string;
  meaning: string | null;
  usage: string | null;
  explanation: string | null;
  notes: string | null;
  sortOrder: number;
  examples: AdminGrammarExample[];
}

export interface AdminGrammarRequest {
  lessonId: number;
  pattern: string;
  meaning?: string | null;
  usage?: string | null;
  explanation?: string | null;
  notes?: string | null;
  sortOrder: number;
  examples?: AdminGrammarExampleRequest[];
}

// Kanji
export interface AdminKanji {
  id: number;
  kanji: string;
  hanViet: string | null;
  onyomi: string | null;
  kunyomi: string | null;
  meaning: string | null;
  strokeCount: number | null;
  strokeOrderUrl: string | null;
  mnemonic: string | null;
  mnemonicImageUrl: string | null;
  assignedLessonIds: number[];
}

export interface AdminKanjiRequest {
  kanji: string;
  hanViet?: string | null;
  onyomi?: string | null;
  kunyomi?: string | null;
  meaning?: string | null;
  strokeCount?: number | null;
  strokeOrderUrl?: string | null;
  mnemonic?: string | null;
  mnemonicImageUrl?: string | null;
}

export interface AdminLessonKanjiAssignRequest {
  sortOrder?: number;
}

// Listening
export interface AdminListeningOption {
  id: number;
  questionId: number;
  content: string;
  correct: boolean;
  sortOrder: number;
}

export interface AdminListeningOptionRequest {
  content: string;
  correct: boolean;
  sortOrder: number;
}

export interface AdminListeningQuestion {
  id: number;
  listeningId: number;
  question: string;
  questionType: string;
  explanation: string | null;
  sortOrder: number;
  options: AdminListeningOption[];
}

export interface AdminListeningQuestionRequest {
  question: string;
  questionType: string;
  explanation?: string | null;
  sortOrder: number;
  options?: AdminListeningOptionRequest[];
}

export interface AdminListening {
  id: number;
  lessonId: number;
  lessonNumber: number | null;
  levelCode: string | null;
  title: string;
  audioUrl: string | null;
  transcript: string | null;
  description: string | null;
  sortOrder: number;
  questions: AdminListeningQuestion[];
}

export interface AdminListeningRequest {
  lessonId: number;
  title: string;
  audioUrl?: string | null;
  transcript?: string | null;
  description?: string | null;
  sortOrder: number;
  questions?: AdminListeningQuestionRequest[];
}

// Reading
export interface AdminReadingOption {
  id: number;
  questionId: number;
  content: string;
  correct: boolean;
  sortOrder: number;
}

export interface AdminReadingOptionRequest {
  content: string;
  correct: boolean;
  sortOrder: number;
}

export interface AdminReadingQuestion {
  id: number;
  readingId: number;
  question: string;
  questionType: string;
  explanation: string | null;
  imageUrl: string | null;
  sortOrder: number;
  options: AdminReadingOption[];
}

export interface AdminReadingQuestionRequest {
  question: string;
  questionType: string;
  explanation?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
  options?: AdminReadingOptionRequest[];
}

export interface AdminReading {
  id: number;
  lessonId: number;
  lessonNumber: number | null;
  levelCode: string | null;
  title: string;
  content: string;
  translation: string | null;
  imageUrl: string | null;
  sortOrder: number;
  questions: AdminReadingQuestion[];
}

export interface AdminReadingRequest {
  lessonId: number;
  title: string;
  content: string;
  translation?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
  questions?: AdminReadingQuestionRequest[];
}

// Exercise
export interface AdminQuestionOption {
  id: number;
  questionId: number;
  optionText: string;
  correct: boolean;
  sortOrder: number;
}

export interface AdminQuestionOptionRequest {
  optionText: string;
  correct: boolean;
  sortOrder: number;
}

export interface AdminQuestion {
  id: number;
  exerciseId: number;
  questionText: string;
  questionType: string;
  explanation: string | null;
  sortOrder: number;
  options: AdminQuestionOption[];
}

export interface AdminQuestionRequest {
  questionText: string;
  questionType: string;
  explanation?: string | null;
  sortOrder: number;
  options?: AdminQuestionOptionRequest[];
}

export interface AdminExercise {
  id: number;
  lessonId: number;
  lessonNumber: number | null;
  levelCode: string | null;
  title: string;
  description: string | null;
  exerciseType: string;
  contentType: string;
  sortOrder: number;
  questions: AdminQuestion[];
}

export interface AdminExerciseRequest {
  lessonId: number;
  title: string;
  description?: string | null;
  exerciseType: string;
  contentType: string;
  sortOrder: number;
  questions?: AdminQuestionRequest[];
}
