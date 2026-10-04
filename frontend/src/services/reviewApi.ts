import { api } from "./api";
import {
  ReviewItemResponse,
  ReviewStatus,
  CreateReviewItemRequest,
  ReviewResultRequest,
} from "../types/review";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const reviewApi = {
  getReviewItems: async (status?: ReviewStatus): Promise<ReviewItemResponse[]> => {
    const params = status ? { status } : undefined;
    const res = await api.get<ApiResponse<ReviewItemResponse[]>>("/review", { params });
    return res.data.data;
  },

  getDueReviewItems: async (): Promise<ReviewItemResponse[]> => {
    const res = await api.get<ApiResponse<ReviewItemResponse[]>>("/review/due");
    return res.data.data;
  },

  createReviewItem: async (data: CreateReviewItemRequest): Promise<ReviewItemResponse> => {
    const res = await api.post<ApiResponse<ReviewItemResponse>>("/review", data);
    return res.data.data;
  },

  updateReviewItem: async (
    id: number,
    data: ReviewResultRequest
  ): Promise<ReviewItemResponse> => {
    const res = await api.put<ApiResponse<ReviewItemResponse>>(`/review/${id}`, data);
    return res.data.data;
  },

  deleteReviewItem: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/review/${id}`);
  },
};
