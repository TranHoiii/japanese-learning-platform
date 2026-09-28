import { api } from "./api";
import { Grammar, GrammarExample } from "../types/grammar";
import { ApiResponse } from "./vocabularyApi";

export const grammarApi = {
  getGrammarsByLesson: async (lessonId: number): Promise<Grammar[]> => {
    const res = await api.get<ApiResponse<Grammar[]>>(`/lessons/${lessonId}/grammars`);
    return res.data.data;
  },

  getGrammarById: async (id: number): Promise<Grammar> => {
    const res = await api.get<ApiResponse<Grammar>>(`/grammars/${id}`);
    return res.data.data;
  },

  getExamplesByGrammar: async (id: number): Promise<GrammarExample[]> => {
    const res = await api.get<ApiResponse<GrammarExample[]>>(`/grammars/${id}/examples`);
    return res.data.data;
  },
};
