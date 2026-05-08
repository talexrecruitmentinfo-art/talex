'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState, LoginRequest, RegisterRequest } from '@/types/auth';

interface AuthStore extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials: LoginRequest) => {
        try {
          set({ isLoading: true, error: null });

          // TODO: Replace with actual API call
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock successful login
          const mockUser: User = {
            id: '1',
            name: 'John Doe',
            email: credentials.email,
            phone: '+254712345678',
            profileCompletion: 75,
            createdAt: new Date().toISOString(),
            role: 'user',
          };

          const mockToken = 'mock-jwt-token-' + Date.now();

          set({
            user: mockUser,
            token: mockToken,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data: RegisterRequest) => {
        try {
          set({ isLoading: true, error: null });

          // TODO: Replace with actual API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            email: data.email,
            phone: data.phone,
            profileCompletion: 0,
            createdAt: new Date().toISOString(),
            role: 'user',
          };

          const mockToken = 'mock-jwt-token-' + Date.now();

          set({
            user: mockUser,
            token: mockToken,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
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
