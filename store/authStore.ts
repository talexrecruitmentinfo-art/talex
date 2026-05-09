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
          console.log('Full Login response:', response); // Debug: see entire response
          console.log('Response keys:', Object.keys(response)); // Debug: see response structure
          
          // Handle different response formats
          let user: any = response.user;
          let token = response.token;
          
          // If response itself is the user (nested differently)
          const responseAny = response as any;
          if (!user && responseAny.id) {
            user = responseAny;
          }
          
          console.log('Extracted user:', user); // Debug: see what we extracted
          console.log('Extracted token:', token); // Debug: see token

          if (!user) {
            throw new Error('Server did not return user data. Response structure: ' + JSON.stringify(response));
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
          console.error('Login error:', errorMessage, error); // Debug log
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
          const { user, token } = response;

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
            error: error instanceof Error ? error.message : 'Login failed',
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
