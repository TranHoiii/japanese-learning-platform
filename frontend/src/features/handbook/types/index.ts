export type HandbookCategoryType =
  | "grammar"
  | "vocabulary"
  | "kanji"
  | "conversation"
  | "notes";

export type HandbookLevel = "BEGINNER" | "N5" | "N4" | "N3" | "ALL";

export interface HandbookCategoryMeta {
  id: HandbookCategoryType;
  name: string;
  japaneseName: string;
  description: string;
  icon: string;
  badge: string;
  color: string;
}

export interface ArticleExample {
  id: string;
  japanese: string;
  reading: string;
  romaji?: string;
  vietnamese: string;
  explanation?: string;
  context?: string;
}

export interface ArticleComparisonItem {
  subject: string;
  nuance: string;
  formula?: string;
  example: string;
  exampleTranslation: string;
  caution?: string;
}

export interface ArticleComparison {
  title: string;
  description?: string;
  items: ArticleComparisonItem[];
  summary?: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
  type?: "text" | "table" | "rule" | "pattern" | "dialogue";
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface ArticleRelatedLink {
  category: HandbookCategoryType;
  slug: string;
  title: string;
  reason?: string;
}

export interface HandbookArticle {
  id: string;
  slug: string;
  categoryId: HandbookCategoryType;
  title: string;
  japaneseTitle?: string;
  summary: string;
  level: HandbookLevel;
  tags: string[];
  readTimeMinutes: number;
  updatedAt: string;
  sections: ArticleSection[];
  examples: ArticleExample[];
  notes: string[];
  warnings: string[];
  comparisons?: ArticleComparison;
  relatedArticles: ArticleRelatedLink[];
}

export interface SearchFilterOptions {
  query?: string;
  category?: HandbookCategoryType | "all";
  level?: HandbookLevel | "all";
  tag?: string;
}
