import { api } from "./api";
import { AdminKanji, AdminKanjiRequest, ApiResponse } from "../types/admin";

export const adminKanjiApi = {
  getAll: async (): Promise<AdminKanji[]> => {
    const res = await api.get<ApiResponse<AdminKanji[]>>("/admin/kanjis");
    return res.data.data;
  },

  getById: async (id: number): Promise<AdminKanji> => {
    const res = await api.get<ApiResponse<AdminKanji>>(`/admin/kanjis/${id}`);
    return res.data.data;
  },

  create: async (data: AdminKanjiRequest): Promise<AdminKanji> => {
    const res = await api.post<ApiResponse<AdminKanji>>("/admin/kanjis", data);
    return res.data.data;
  },

  update: async (id: number, data: AdminKanjiRequest): Promise<AdminKanji> => {
    const res = await api.put<ApiResponse<AdminKanji>>(`/admin/kanjis/${id}`, data);
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/kanjis/${id}`);
  },
};
