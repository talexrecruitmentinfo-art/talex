'use client';

import { create } from 'zustand';
import type { Application, CreateApplicationRequest, ApplicationStatus } from '@/types/application';
import { applicationService } from '@/services/apiService';

interface ApplicationStore {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  fetchApplications: () => Promise<void>;
  createApplication: (data: CreateApplicationRequest) => Promise<void>;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => Promise<void>;
  clearError: () => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: [],
  isLoading: false,
  error: null,

  fetchApplications: async () => {
    try {
      set({ isLoading: true, error: null });
      const applications = await applicationService.getAll();
      set({ applications, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch applications',
        isLoading: false,
      });
    }
  },

  createApplication: async (data: CreateApplicationRequest) => {
    try {
      set({ isLoading: true, error: null });
      const newApplication = await applicationService.create(data);
      set((state) => ({
        applications: [...state.applications, newApplication],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create application',
        isLoading: false,
      });
      throw error;
    }
  },

  updateApplicationStatus: async (id: string, status: ApplicationStatus) => {
    try {
      set({ isLoading: true, error: null });
      const updatedApplication = await applicationService.updateStatus(id, status);
      set((state) => ({
        applications: state.applications.map((app) =>
          app.id === id ? updatedApplication : app
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update application',
        isLoading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
