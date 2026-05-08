'use client';

import { create } from 'zustand';
import type { Job } from '@/types/job';
import { jobServiceAPI } from '@/services/apiService';

interface JobStore {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  setSelectedJob: (job: Job | null) => void;
  clearError: () => void;
}

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  selectedJob: null,
  isLoading: false,
  error: null,

  fetchJobs: async () => {
    try {
      set({ isLoading: true, error: null });
      const jobs = await jobServiceAPI.getAll();
      set({ jobs, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch jobs',
        isLoading: false,
      });
    }
  },

  fetchJobById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const job = await jobServiceAPI.getById(id);
      set({ selectedJob: job, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch job',
        isLoading: false,
      });
    }
  },

  setSelectedJob: (job: Job | null) => {
    set({ selectedJob: job });
  },

  clearError: () => {
    set({ error: null });
  },
}));
