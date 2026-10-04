import { api } from "./api";
import { AuthResponse, LoginRequest, RegisterRequest, User } from "../types/auth";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await api.post<ApiResponse<AuthResponse>>("/auth/register", data);
    return res.data.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await api.post<ApiResponse<AuthResponse>>("/auth/login", data);
    return res.data.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const res = await api.get<ApiResponse<User>>("/auth/me");
    return res.data.data;
  },
};
