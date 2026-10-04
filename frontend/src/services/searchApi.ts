import { api } from "./api";
import { SearchParams, SearchResponse } from "../types/search";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const searchApi = {
  searchContent: async (params: SearchParams): Promise<SearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("q", params.q);

    if (params.type) {
      queryParams.append("type", params.type);
    }
    if (params.level) {
      queryParams.append("level", params.level);
    }
    if (params.page !== undefined && params.page !== null) {
      queryParams.append("page", params.page.toString());
    }
    if (params.size !== undefined && params.size !== null) {
      queryParams.append("size", params.size.toString());
    }

    const res = await api.get<ApiResponse<SearchResponse>>(`/search?${queryParams.toString()}`);
    return res.data.data;
  },
};
