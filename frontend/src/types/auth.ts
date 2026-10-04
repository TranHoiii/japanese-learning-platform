export type Role = "USER" | "ADMIN";

export interface User {
  id: number;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  role: Role;
  status: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}
