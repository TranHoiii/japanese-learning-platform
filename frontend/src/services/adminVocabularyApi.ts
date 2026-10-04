import { api } from "./api";
import { AdminVocabulary, AdminVocabularyRequest, ApiResponse } from "../types/admin";

export const adminVocabularyApi = {
  getVocabularies: async (params?: { lessonId?: number; levelId?: number }): Promise<AdminVocabulary[]> => {
    const res = await api.get<ApiResponse<AdminVocabulary[]>>("/admin/vocabularies", { params });
    return res.data.data;
  },

  getById: async (id: number): Promise<AdminVocabulary> => {
    const res = await api.get<ApiResponse<AdminVocabulary>>(`/admin/vocabularies/${id}`);
    return res.data.data;
  },

  create: async (data: AdminVocabularyRequest): Promise<AdminVocabulary> => {
    const res = await api.post<ApiResponse<AdminVocabulary>>("/admin/vocabularies", data);
    return res.data.data;
  },

  update: async (id: number, data: AdminVocabularyRequest): Promise<AdminVocabulary> => {
    const res = await api.put<ApiResponse<AdminVocabulary>>(`/admin/vocabularies/${id}`, data);
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/vocabularies/${id}`);
  },
};
