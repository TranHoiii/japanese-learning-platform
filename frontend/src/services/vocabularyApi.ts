import { api } from "./api";
import { Vocabulary, Level, Lesson } from "../types/vocabulary";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const vocabularyApi = {
  getLevels: async (): Promise<Level[]> => {
    const res = await api.get<ApiResponse<Level[]>>("/levels");
    return res.data.data;
  },

  getLessonsByLevel: async (levelId: number): Promise<Lesson[]> => {
    const res = await api.get<ApiResponse<Lesson[]>>(`/levels/${levelId}/lessons`);
    return res.data.data;
  },

  getLessonById: async (lessonId: number): Promise<Lesson> => {
    const res = await api.get<ApiResponse<Lesson>>(`/lessons/${lessonId}`);
    return res.data.data;
  },

  getVocabulariesByLesson: async (lessonId: number): Promise<Vocabulary[]> => {
    const res = await api.get<ApiResponse<Vocabulary[]>>(`/lessons/${lessonId}/vocabularies`);
    return res.data.data;
  },

  getVocabularyById: async (id: number): Promise<Vocabulary> => {
    const res = await api.get<ApiResponse<Vocabulary>>(`/vocabularies/${id}`);
    return res.data.data;
  },

  searchVocabularies: async (query: string): Promise<Vocabulary[]> => {
    const res = await api.get<ApiResponse<Vocabulary[]>>(`/vocabularies/search?q=${encodeURIComponent(query)}`);
    return res.data.data;
  },

  getAllVocabularies: async (): Promise<Vocabulary[]> => {
    const res = await api.get<ApiResponse<Vocabulary[]>>("/vocabularies");
    return res.data.data;
  },
};
