export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileCompletion: number;
  createdAt: string;
  role: 'user' | 'admin';
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
  phoneNumber: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};
