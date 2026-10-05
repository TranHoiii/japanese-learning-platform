import { api } from "./api";
import {
  AdminGrammar,
  AdminGrammarRequest,
  AdminGrammarExample,
  AdminGrammarExampleRequest,
  ApiResponse,
} from "../types/admin";

export const adminGrammarApi = {
  getGrammars: async (params?: { lessonId?: number; levelId?: number }): Promise<AdminGrammar[]> => {
    const res = await api.get<ApiResponse<AdminGrammar[]>>("/admin/grammars", { params });
    return res.data.data;
  },

  getById: async (id: number): Promise<AdminGrammar> => {
    const res = await api.get<ApiResponse<AdminGrammar>>(`/admin/grammars/${id}`);
    return res.data.data;
  },

  create: async (data: AdminGrammarRequest): Promise<AdminGrammar> => {
    const res = await api.post<ApiResponse<AdminGrammar>>("/admin/grammars", data);
    return res.data.data;
  },

  update: async (id: number, data: AdminGrammarRequest): Promise<AdminGrammar> => {
    const res = await api.put<ApiResponse<AdminGrammar>>(`/admin/grammars/${id}`, data);
    return res.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/grammars/${id}`);
  },

  // Examples
  getExamples: async (grammarId: number): Promise<AdminGrammarExample[]> => {
    const res = await api.get<ApiResponse<AdminGrammarExample[]>>(`/admin/grammars/${grammarId}/examples`);
    return res.data.data;
  },

  createExample: async (grammarId: number, data: AdminGrammarExampleRequest): Promise<AdminGrammarExample> => {
    const res = await api.post<ApiResponse<AdminGrammarExample>>(`/admin/grammars/${grammarId}/examples`, data);
    return res.data.data;
  },

  updateExample: async (
    grammarId: number,
    exampleId: number,
    data: AdminGrammarExampleRequest
  ): Promise<AdminGrammarExample> => {
    const res = await api.put<ApiResponse<AdminGrammarExample>>(
      `/admin/grammars/${grammarId}/examples/${exampleId}`,
      data
    );
    return res.data.data;
  },

  deleteExample: async (grammarId: number, exampleId: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/admin/grammars/${grammarId}/examples/${exampleId}`);
  },
};
