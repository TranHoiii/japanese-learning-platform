import { api } from "./api";
import {
  AdminReading,
  AdminReadingRequest,
  AdminReadingQuestion,
  AdminReadingQuestionRequest,
  ApiResponse,
} from "../types/admin";

export const adminReadingApi = {
  getReadings: async (lessonId?: number): Promise<AdminReading[]> => {
    const params = lessonId ? { lessonId } : {};
    const res = await api.get<ApiResponse<AdminReading[]>>("/admin/readings", { params });
    return res.data.data;
  },

  getById: async (id: number): Promise<AdminReading> => {
    const res = await api.get<ApiResponse<AdminReading>>(`/admin/readings/${id}`);
    return res.data.data;
  },

  create: async (data: AdminReadingRequest): Promise<AdminReading> => {
    const res = await api.post<ApiResponse<AdminReading>>("/admin/readings", data);
    return res.data.data;
  },

  update: async (id: number, data: AdminReadingRequest): Promise<AdminReading> => {
    const res = await api.put<ApiResponse<AdminReading>>(`/admin/readings/${id}`, data);
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/readings/${id}`);
  },

  // Questions
  getQuestions: async (readingId: number): Promise<AdminReadingQuestion[]> => {
    const res = await api.get<ApiResponse<AdminReadingQuestion[]>>(`/admin/readings/${readingId}/questions`);
    return res.data.data;
  },

  createQuestion: async (
    readingId: number,
    data: AdminReadingQuestionRequest
  ): Promise<AdminReadingQuestion> => {
    const res = await api.post<ApiResponse<AdminReadingQuestion>>(
      `/admin/readings/${readingId}/questions`,
      data
    );
    return res.data.data;
  },

  updateQuestion: async (
    readingId: number,
    questionId: number,
    data: AdminReadingQuestionRequest
  ): Promise<AdminReadingQuestion> => {
    const res = await api.put<ApiResponse<AdminReadingQuestion>>(
      `/admin/readings/${readingId}/questions/${questionId}`,
      data
    );
    return res.data.data;
  },

  deleteQuestion: async (readingId: number, questionId: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/readings/${readingId}/questions/${questionId}`);
  },
};
