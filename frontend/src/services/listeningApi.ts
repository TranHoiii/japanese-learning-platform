import { api } from "./api";
import { ListeningContent, ListeningSubmitRequest, ListeningSubmitResponse } from "../types/listening";
import { ApiResponse } from "./vocabularyApi";

export const listeningApi = {
  getListeningsByLesson: async (lessonId: number): Promise<ListeningContent[]> => {
    const res = await api.get<ApiResponse<ListeningContent[]>>(`/lessons/${lessonId}/listenings`);
    return res.data.data;
  },

  getListeningById: async (id: number): Promise<ListeningContent> => {
    const res = await api.get<ApiResponse<ListeningContent>>(`/listenings/${id}`);
    return res.data.data;
  },

  submitListening: async (id: number, payload: ListeningSubmitRequest): Promise<ListeningSubmitResponse> => {
    const res = await api.post<ApiResponse<ListeningSubmitResponse>>(`/listenings/${id}/submit`, payload);
    return res.data.data;
  },
};
