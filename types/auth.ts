export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileCompletion: number;
  createdAt: string;
  role: 'USER' | 'ADMIN';
  resume?: string | null;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};
