export type SearchContentType =
  | "VOCABULARY"
  | "GRAMMAR"
  | "KANJI"
  | "LISTENING"
  | "READING"
  | "EXERCISE";

export interface SearchResultItem {
  contentType: SearchContentType;
  contentId: number;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  level?: string | null;
  lessonId?: number | null;
  lessonTitle?: string | null;
}

export interface SearchResponse {
  query: string;
  total: number;
  page: number;
  size: number;
  items: SearchResultItem[];
}

export interface SearchParams {
  q: string;
  type?: SearchContentType;
  level?: string;
  page?: number;
  size?: number;
}
