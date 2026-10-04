import { api } from "./api";
import { Exercise, ExerciseQuestion, ExerciseSubmitRequest, ExerciseSubmitResponse } from "../types/exercise";
import { ApiResponse } from "./vocabularyApi";

export const exerciseApi = {
  getAllExercises: async (lessonId?: number): Promise<Exercise[]> => {
    const url = lessonId ? `/exercises?lessonId=${lessonId}` : "/exercises";
    const res = await api.get<ApiResponse<Exercise[]>>(url);
    // Sort strictly by sortOrder ASC
    return (res.data.data || []).sort((a, b) => a.sortOrder - b.sortOrder);
  },

  getExercisesByLesson: async (lessonId: number): Promise<Exercise[]> => {
    const res = await api.get<ApiResponse<Exercise[]>>(`/lessons/${lessonId}/exercises`);
    return (res.data.data || []).sort((a, b) => a.sortOrder - b.sortOrder);
  },

  getExerciseById: async (id: number): Promise<Exercise> => {
    const res = await api.get<ApiResponse<Exercise>>(`/exercises/${id}`);
    const exercise = res.data.data;
    if (exercise && exercise.questions) {
      exercise.questions.sort((a, b) => a.sortOrder - b.sortOrder);
      exercise.questions.forEach((q) => {
        if (q.options) {
          q.options.sort((a, b) => a.sortOrder - b.sortOrder);
        }
      });
    }
    return exercise;
  },

  getExerciseQuestions: async (id: number): Promise<ExerciseQuestion[]> => {
    const res = await api.get<ApiResponse<ExerciseQuestion[]>>(`/exercises/${id}/questions`);
    const questions = res.data.data || [];
    questions.sort((a, b) => a.sortOrder - b.sortOrder);
    questions.forEach((q) => {
      if (q.options) {
        q.options.sort((a, b) => a.sortOrder - b.sortOrder);
      }
    });
    return questions;
  },

  submitExercise: async (id: number, payload: ExerciseSubmitRequest): Promise<ExerciseSubmitResponse> => {
    const res = await api.post<ApiResponse<ExerciseSubmitResponse>>(`/exercises/${id}/submit`, payload);
    return res.data.data;
  },
};
