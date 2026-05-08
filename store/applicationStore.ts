'use client';

import { create } from 'zustand';
import type { Application, CreateApplicationRequest, ApplicationStatus } from '@/types/application';

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
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock data
      const mockApplications: Application[] = [
        {
          id: '1',
          userId: '1',
          jobId: '1',
          status: 'submitted',
          paymentStatus: 'completed',
          appliedAt: new Date().toISOString(),
          jobTitle: 'Hospitality Supervisor',
          company: 'True North Staffing',
        },
        {
          id: '2',
          userId: '1',
          jobId: '2',
          status: 'reviewed',
          paymentStatus: 'pending',
          appliedAt: new Date().toISOString(),
          jobTitle: 'IT Support Specialist',
          company: 'Maple Cloud Services',
        },
      ];

      set({ applications: mockApplications, isLoading: false });
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
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newApplication: Application = {
        id: Math.random().toString(36).substr(2, 9),
        userId: '1',
        jobId: data.jobId,
        status: 'submitted',
        paymentStatus: data.paymentStatus as any,
        appliedAt: new Date().toISOString(),
        jobTitle: 'New Job',
        company: 'Company',
      };

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
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      set((state) => ({
        applications: state.applications.map((app) =>
          app.id === id ? { ...app, status } : app
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
