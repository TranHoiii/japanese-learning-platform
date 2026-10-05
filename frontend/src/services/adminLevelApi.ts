import { api } from "./api";
import { AdminLevel, AdminLevelRequest, ApiResponse } from "../types/admin";

export const adminLevelApi = {
  getAll: async (): Promise<AdminLevel[]> => {
    const res = await api.get<ApiResponse<AdminLevel[]>>("/admin/levels");
    return res.data.data;
  },

  getById: async (id: number): Promise<AdminLevel> => {
    const res = await api.get<ApiResponse<AdminLevel>>(`/admin/levels/${id}`);
    return res.data.data;
  },

  create: async (data: AdminLevelRequest): Promise<AdminLevel> => {
    const res = await api.post<ApiResponse<AdminLevel>>("/admin/levels", data);
    return res.data.data;
  },

  update: async (id: number, data: AdminLevelRequest): Promise<AdminLevel> => {
    const res = await api.put<ApiResponse<AdminLevel>>(`/admin/levels/${id}`, data);
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/levels/${id}`);
  },
};
