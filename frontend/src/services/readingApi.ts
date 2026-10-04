import { api } from "./api";
import { ReadingContent, ReadingSubmitRequest, ReadingSubmitResponse } from "../types/reading";
import { ApiResponse } from "./vocabularyApi";

export const readingApi = {
  getReadingsByLesson: async (lessonId: number): Promise<ReadingContent[]> => {
    const res = await api.get<ApiResponse<ReadingContent[]>>(`/lessons/${lessonId}/readings`);
    return res.data.data;
  },

  getReadingById: async (id: number): Promise<ReadingContent> => {
    const res = await api.get<ApiResponse<ReadingContent>>(`/readings/${id}`);
    return res.data.data;
  },

  submitReading: async (id: number, payload: ReadingSubmitRequest): Promise<ReadingSubmitResponse> => {
    const res = await api.post<ApiResponse<ReadingSubmitResponse>>(`/readings/${id}/submit`, payload);
    return res.data.data;
  },
};
