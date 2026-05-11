import API from '@/lib/api';
import type { Application } from '@/types/application';

export const applicationService = {
  submitApplication: async (jobId: string, formData: Record<string, any>) => {
    try {
      const response = await API.post(`/applications/submit/${jobId}`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyApplications: async () => {
    try {
      const response = await API.get('/applications/my-applications');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getApplicationById: async (applicationId: string) => {
    try {
      const response = await API.get(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getApplicationStatus: async (applicationId: string) => {
    try {
      const response = await API.get(`/applications/${applicationId}/status`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  withdrawApplication: async (applicationId: string) => {
    try {
      const response = await API.post(`/applications/${applicationId}/withdraw`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
