export interface GrammarExample {
  id: number;
  japanese: string;
  furigana: string | null;
  translation: string;
  explanation: string | null;
  sortOrder: number;
}

export interface Grammar {
  id: number;
  lessonId: number;
  pattern: string;
  meaning: string | null;
  usage: string | null;
  explanation: string | null;
  notes: string | null;
  sortOrder: number;
  examples: GrammarExample[];
}
