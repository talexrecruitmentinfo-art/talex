import API from '@/lib/api';
import type { AxiosResponse } from 'axios';
import type { Job } from '@/types/job';

function unwrapResponse<T>(response: AxiosResponse<unknown>): T {
  const body = response.data;
  if (body && typeof body === 'object' && body !== null) {
    const record = body as Record<string, unknown>;
    if (record.data !== undefined) return record.data as T;
    if (record.job !== undefined) return record.job as T;
    if (record.jobs !== undefined) return record.jobs as T;
    if (record.users !== undefined) return record.users as T;
    if (record.payments !== undefined) return record.payments as T;
    if (record.applications !== undefined) return record.applications as T;
  }
  return body as T;
}

export const adminService = {
  // Jobs Management
  createJob: async (jobData: Partial<Job>) => {
    try {
      const response = await API.post('/admin/jobs/create', jobData);
      return unwrapResponse<Job>(response);
    } catch (error) {
      throw error;
    }
  },

  updateJob: async (jobId: string, jobData: Partial<Job>) => {
    try {
      const response = await API.put(`/admin/jobs/update/${jobId}`, jobData);
      return unwrapResponse<Job>(response);
    } catch (error) {
      throw error;
    }
  },

  deleteJob: async (jobId: string) => {
    try {
      const response = await API.delete(`/admin/jobs/delete/${jobId}`);
      return unwrapResponse<unknown>(response);
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
      return unwrapResponse<unknown[]>(response);
    } catch (error) {
      throw error;
    }
  },

  approveApplication: async (applicationId: string) => {
    try {
      const response = await API.post(`/admin/applications/${applicationId}/approve`);
      return unwrapResponse<unknown>(response);
    } catch (error) {
      throw error;
    }
  },

  rejectApplication: async (applicationId: string, reason: string) => {
    try {
      const response = await API.post(`/admin/applications/${applicationId}/reject`, { reason });
      return unwrapResponse<unknown>(response);
    } catch (error) {
      throw error;
    }
  },

  shortlistApplication: async (applicationId: string) => {
    try {
      const response = await API.post(`/admin/applications/${applicationId}/shortlist`);
      return unwrapResponse<unknown>(response);
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
      return unwrapResponse<unknown[]>(response);
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId: string) => {
    try {
      const response = await API.get(`/admin/users/${userId}`);
      return unwrapResponse<unknown>(response);
    } catch (error) {
      throw error;
    }
  },

  banUser: async (userId: string, ban: boolean) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;
      const response = await fetch(`/api/admin/users/${userId}/ban`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ban }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to ban/unban user');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  resetUserPassword: async (userId: string) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;
      const response = await fetch(`/api/admin/users/${userId}/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to reset user password');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId: string, userData: Record<string, unknown>) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update user');
      }

      return response.json();
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
      return unwrapResponse<unknown>(response);
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
