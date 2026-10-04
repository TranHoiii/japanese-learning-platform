import { api } from "./api";
import {
  AdminListening,
  AdminListeningRequest,
  AdminListeningQuestion,
  AdminListeningQuestionRequest,
  ApiResponse,
} from "../types/admin";

export const adminListeningApi = {
  getListenings: async (lessonId?: number): Promise<AdminListening[]> => {
    const params = lessonId ? { lessonId } : {};
    const res = await api.get<ApiResponse<AdminListening[]>>("/admin/listenings", { params });
    return res.data.data;
  },

  getById: async (id: number): Promise<AdminListening> => {
    const res = await api.get<ApiResponse<AdminListening>>(`/admin/listenings/${id}`);
    return res.data.data;
  },

  create: async (data: AdminListeningRequest): Promise<AdminListening> => {
    const res = await api.post<ApiResponse<AdminListening>>("/admin/listenings", data);
    return res.data.data;
  },

  update: async (id: number, data: AdminListeningRequest): Promise<AdminListening> => {
    const res = await api.put<ApiResponse<AdminListening>>(`/admin/listenings/${id}`, data);
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/listenings/${id}`);
  },

  // Questions
  getQuestions: async (listeningId: number): Promise<AdminListeningQuestion[]> => {
    const res = await api.get<ApiResponse<AdminListeningQuestion[]>>(`/admin/listenings/${listeningId}/questions`);
    return res.data.data;
  },

  createQuestion: async (
    listeningId: number,
    data: AdminListeningQuestionRequest
  ): Promise<AdminListeningQuestion> => {
    const res = await api.post<ApiResponse<AdminListeningQuestion>>(
      `/admin/listenings/${listeningId}/questions`,
      data
    );
    return res.data.data;
  },

  updateQuestion: async (
    listeningId: number,
    questionId: number,
    data: AdminListeningQuestionRequest
  ): Promise<AdminListeningQuestion> => {
    const res = await api.put<ApiResponse<AdminListeningQuestion>>(
      `/admin/listenings/${listeningId}/questions/${questionId}`,
      data
    );
    return res.data.data;
  },

  deleteQuestion: async (listeningId: number, questionId: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/listenings/${listeningId}/questions/${questionId}`);
  },
};
