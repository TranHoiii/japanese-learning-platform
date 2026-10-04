import { api } from "./api";
import {
  ProgressSummaryResponse,
  LessonProgressResponse,
  UpdateLessonProgressRequest,
  ContentProgressResponse,
  UpdateContentProgressRequest,
  ProgressContentType,
} from "../types/progress";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const progressApi = {
  getProgressSummary: async (): Promise<ProgressSummaryResponse> => {
    const res = await api.get<ApiResponse<ProgressSummaryResponse>>("/progress");
    return res.data.data;
  },

  getLessonProgresses: async (): Promise<LessonProgressResponse[]> => {
    const res = await api.get<ApiResponse<LessonProgressResponse[]>>("/progress/lessons");
    return res.data.data;
  },

  getLessonProgress: async (lessonId: number): Promise<LessonProgressResponse> => {
    const res = await api.get<ApiResponse<LessonProgressResponse>>(`/progress/lessons/${lessonId}`);
    return res.data.data;
  },

  updateLessonProgress: async (
    lessonId: number,
    data: UpdateLessonProgressRequest
  ): Promise<LessonProgressResponse> => {
    const res = await api.put<ApiResponse<LessonProgressResponse>>(
      `/progress/lessons/${lessonId}`,
      data
    );
    return res.data.data;
  },

  getContentProgresses: async (
    contentType?: ProgressContentType
  ): Promise<ContentProgressResponse[]> => {
    const params = contentType ? { contentType } : undefined;
    const res = await api.get<ApiResponse<ContentProgressResponse[]>>("/progress/content", {
      params,
    });
    return res.data.data;
  },

  updateContentProgress: async (
    data: UpdateContentProgressRequest
  ): Promise<ContentProgressResponse> => {
    const res = await api.put<ApiResponse<ContentProgressResponse>>("/progress/content", data);
    return res.data.data;
  },
};
