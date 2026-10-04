import { api } from "./api";
import { AdminLesson, AdminLessonRequest, ApiResponse } from "../types/admin";

export const adminLessonApi = {
  getLessons: async (levelId?: number): Promise<AdminLesson[]> => {
    const params = levelId ? { levelId } : {};
    const res = await api.get<ApiResponse<AdminLesson[]>>("/admin/lessons", { params });
    return res.data.data;
  },

  getById: async (id: number): Promise<AdminLesson> => {
    const res = await api.get<ApiResponse<AdminLesson>>(`/admin/lessons/${id}`);
    return res.data.data;
  },

  create: async (data: AdminLessonRequest): Promise<AdminLesson> => {
    const res = await api.post<ApiResponse<AdminLesson>>("/admin/lessons", data);
    return res.data.data;
  },

  update: async (id: number, data: AdminLessonRequest): Promise<AdminLesson> => {
    const res = await api.put<ApiResponse<AdminLesson>>(`/admin/lessons/${id}`, data);
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/lessons/${id}`);
  },

  assignKanji: async (lessonId: number, kanjiId: number, sortOrder?: number): Promise<void> => {
    await api.post<ApiResponse<void>>(`/admin/lessons/${lessonId}/kanjis/${kanjiId}`, { sortOrder });
  },

  unassignKanji: async (lessonId: number, kanjiId: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/lessons/${lessonId}/kanjis/${kanjiId}`);
  },
};
