import API from '@/lib/api';
import type { Job } from '@/types/job';

export const adminService = {
  // Jobs Management
  createJob: async (jobData: Partial<Job>) => {
    try {
      const response = await API.post('/admin/jobs', jobData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateJob: async (jobId: string, jobData: Partial<Job>) => {
    try {
      const response = await API.put(`/admin/jobs/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteJob: async (jobId: string) => {
    try {
      const response = await API.delete(`/admin/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllJobs: async (page?: number, limit?: number) => {
    try {
      const response = await API.get('/admin/jobs', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Applications Management
  getAllApplications: async (page?: number, limit?: number, status?: string) => {
    try {
      const response = await API.get('/admin/applications', {
        params: { page, limit, status },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  approveApplication: async (applicationId: string) => {
    try {
      const response = await API.post(`/admin/applications/${applicationId}/approve`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  rejectApplication: async (applicationId: string, reason: string) => {
    try {
      const response = await API.post(`/admin/applications/${applicationId}/reject`, { reason });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  shortlistApplication: async (applicationId: string) => {
    try {
      const response = await API.post(`/admin/applications/${applicationId}/shortlist`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Users Management
  getAllUsers: async (page?: number, limit?: number) => {
    try {
      const response = await API.get('/admin/users', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId: string) => {
    try {
      const response = await API.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deactivateUser: async (userId: string) => {
    try {
      const response = await API.post(`/admin/users/${userId}/deactivate`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Payments Management
  getAllPayments: async (page?: number, limit?: number) => {
    try {
      const response = await API.get('/admin/payments', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPaymentById: async (paymentId: string) => {
    try {
      const response = await API.get(`/admin/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Analytics
  getAnalytics: async () => {
    try {
      const response = await API.get('/admin/analytics');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getApplicationStats: async () => {
    try {
      const response = await API.get('/admin/analytics/applications');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRevenueStats: async () => {
    try {
      const response = await API.get('/admin/analytics/revenue');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
