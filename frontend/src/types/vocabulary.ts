export interface Level {
  id: number;
  code: string;
  name: string;
  description: string | null;
  sortOrder: number;
  active: boolean;
}

export interface Lesson {
  id: number;
  levelId: number;
  lessonNumber: number;
  title: string;
  description: string | null;
  sortOrder: number;
  active: boolean;
}

export interface Vocabulary {
  id: number;
  lessonId: number;
  hiragana: string;
  kanji: string | null;
  hanViet: string | null;
  meaning: string;
  partOfSpeech: string | null;
  audioUrl: string | null;
  notes: string | null;
}
