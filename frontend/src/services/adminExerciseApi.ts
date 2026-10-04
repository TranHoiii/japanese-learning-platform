import { api } from "./api";
import {
  AdminExercise,
  AdminExerciseRequest,
  AdminQuestion,
  AdminQuestionRequest,
  ApiResponse,
} from "../types/admin";

export const adminExerciseApi = {
  getExercises: async (lessonId?: number): Promise<AdminExercise[]> => {
    const params = lessonId ? { lessonId } : {};
    const res = await api.get<ApiResponse<AdminExercise[]>>("/admin/exercises", { params });
    return res.data.data;
  },

  getById: async (id: number): Promise<AdminExercise> => {
    const res = await api.get<ApiResponse<AdminExercise>>(`/admin/exercises/${id}`);
    return res.data.data;
  },

  create: async (data: AdminExerciseRequest): Promise<AdminExercise> => {
    const res = await api.post<ApiResponse<AdminExercise>>("/admin/exercises", data);
    return res.data.data;
  },

  update: async (id: number, data: AdminExerciseRequest): Promise<AdminExercise> => {
    const res = await api.put<ApiResponse<AdminExercise>>(`/admin/exercises/${id}`, data);
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/exercises/${id}`);
  },

  // Questions
  getQuestions: async (exerciseId: number): Promise<AdminQuestion[]> => {
    const res = await api.get<ApiResponse<AdminQuestion[]>>(`/admin/exercises/${exerciseId}/questions`);
    return res.data.data;
  },

  createQuestion: async (exerciseId: number, data: AdminQuestionRequest): Promise<AdminQuestion> => {
    const res = await api.post<ApiResponse<AdminQuestion>>(`/admin/exercises/${exerciseId}/questions`, data);
    return res.data.data;
  },

  updateQuestion: async (
    exerciseId: number,
    questionId: number,
    data: AdminQuestionRequest
  ): Promise<AdminQuestion> => {
    const res = await api.put<ApiResponse<AdminQuestion>>(
      `/admin/exercises/${exerciseId}/questions/${questionId}`,
      data
    );
    return res.data.data;
  },

  deleteQuestion: async (exerciseId: number, questionId: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/exercises/${exerciseId}/questions/${questionId}`);
  },
};
