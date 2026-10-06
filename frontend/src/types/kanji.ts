export interface KanjiCompound {
  id?: number;
  word: string;
  reading: string;
  meaning?: string;
  exampleSentence?: string;
}

export interface Kanji {
  id: number;
  kanji: string;
  hanViet: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  strokeCount?: number;
  strokeOrderUrl?: string;
  mnemonic?: string;
  mnemonicImageUrl?: string;
  compounds?: KanjiCompound[];
  levelCode?: string;
  lessonNumber?: number;
}

export interface PaginatedKanjiResponse {
  content: Kanji[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
}
