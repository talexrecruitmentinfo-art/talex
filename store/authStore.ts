'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState, LoginRequest, RegisterRequest } from '@/types/auth';
import { authService } from '@/services/apiService';

interface AuthStore extends AuthState {
  login: (credentials: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setState: (state: Partial<AuthState>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials: LoginRequest): Promise<User> => {
        try {
          set({ isLoading: true, error: null });

          const response = await authService.login(credentials);

          // Handle wrapped response structure: { success, message, data: { token, user } }
          const responseAny = response as any;
          let user = null;
          let token = null;

          if (responseAny.success && responseAny.data) {
            // Wrapped structure: response.data.user and response.data.token
            user = responseAny.data.user;
            token = responseAny.data.token;
          } else if (responseAny.data) {
            // Alternative wrapped: response.data.user and response.data.token
            user = responseAny.data.user;
            token = responseAny.data.token;
          } else if (responseAny.user) {
            // Unwrapped fallback: response.user and response.token
            user = responseAny.user;
            token = responseAny.token;
          }

          if (!user || !token) {
            throw new Error('Server did not return required user data or token');
          }

          set({
            user,
            token,
            isLoading: false,
          });

          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }

          return user;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data: RegisterRequest) => {
        try {
          set({ isLoading: true, error: null });

          const response = await authService.register(data);

          // Handle wrapped response structure: { success, message, data: { token, user } }
          const responseAny = response as any;
          let user = null;
          let token = null;

          if (responseAny.success && responseAny.data) {
            // Wrapped structure: response.data.user and response.data.token
            user = responseAny.data.user;
            token = responseAny.data.token;
          } else if (responseAny.data) {
            // Alternative wrapped: response.data.user and response.data.token
            user = responseAny.data.user;
            token = responseAny.data.token;
          } else if (responseAny.user) {
            // Unwrapped fallback: response.user and response.token
            user = responseAny.user;
            token = responseAny.token;
          }

          if (!user || !token) {
            throw new Error('Server did not return required user data or token');
          }

          set({
            user,
            token,
            isLoading: false,
          });

          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true, error: null });
          await authService.logout();
        } catch {
          // Ignore failures during logout action
        } finally {
          set({
            user: null,
            token: null,
            error: null,
            isLoading: false,
          });

          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
          }
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setState: (state: Partial<AuthState>) => set(state),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
