export type FavoriteContentType =
  | "VOCABULARY"
  | "GRAMMAR"
  | "KANJI"
  | "LISTENING"
  | "READING"
  | "EXERCISE";

export interface Favorite {
  id: number;
  contentType: FavoriteContentType;
  contentId: number;
  createdAt: string;
}

export interface FavoriteCheckResponse {
  favorited: boolean;
  favoriteId: number | null;
}

export interface CreateFavoriteRequest {
  contentType: FavoriteContentType;
  contentId: number;
}
