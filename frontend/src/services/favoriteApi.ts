import { api } from "./api";
import {
  Favorite,
  FavoriteCheckResponse,
  FavoriteContentType,
  CreateFavoriteRequest,
} from "../types/favorite";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const favoriteApi = {
  getFavorites: async (): Promise<Favorite[]> => {
    const res = await api.get<ApiResponse<Favorite[]>>("/favorites");
    return res.data.data;
  },

  addFavorite: async (
    contentType: FavoriteContentType,
    contentId: number
  ): Promise<Favorite> => {
    const payload: CreateFavoriteRequest = { contentType, contentId };
    const res = await api.post<ApiResponse<Favorite>>("/favorites", payload);
    return res.data.data;
  },

  checkFavorite: async (
    contentType: FavoriteContentType,
    contentId: number
  ): Promise<FavoriteCheckResponse> => {
    const res = await api.get<ApiResponse<FavoriteCheckResponse>>("/favorites/check", {
      params: { contentType, contentId },
    });
    return res.data.data;
  },

  deleteFavorite: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/favorites/${id}`);
  },
};
