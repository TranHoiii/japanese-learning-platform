import { api } from "./api";
import { Kanji, KanjiCompound, PaginatedKanjiResponse } from "../types/kanji";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const kanjiApi = {
  getKanjisByLessonId: async (lessonId: number): Promise<Kanji[]> => {
    const response = await api.get<ApiResponse<Kanji[]>>(`/lessons/${lessonId}/kanjis`);
    return response.data.data;
  },

  getAllKanjis: async (page = 0, size = 20, q?: string): Promise<PaginatedKanjiResponse> => {
    const response = await api.get<ApiResponse<PaginatedKanjiResponse>>("/kanjis", {
      params: { page, size, q },
    });
    return response.data.data;
  },

  getKanjiById: async (id: number): Promise<Kanji> => {
    const response = await api.get<ApiResponse<Kanji>>(`/kanjis/${id}`);
    return response.data.data;
  },

  getCompoundsByKanjiId: async (kanjiId: number): Promise<KanjiCompound[]> => {
    const response = await api.get<ApiResponse<KanjiCompound[]>>(`/kanjis/${kanjiId}/compounds`);
    return response.data.data;
  },

  searchKanjis: async (query: string, page = 0, size = 20): Promise<PaginatedKanjiResponse> => {
    const response = await api.get<ApiResponse<PaginatedKanjiResponse>>("/kanjis/search", {
      params: { q: query, page, size },
    });
    return response.data.data;
  },
};
