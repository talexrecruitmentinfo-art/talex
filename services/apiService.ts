import API from '@/lib/api';
import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';
import type { Application, CreateApplicationRequest, ApplicationStatus } from '@/types/application';
import type { Job } from '@/types/job';
import type { Notification } from '@/types/notification';
import type { Profile, UpdateProfileRequest } from '@/types/profile';

/**
 * Auth Service
 */
export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await API.post('/auth/login', data);
    return res.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await API.post('/auth/register', data);
    return res.data;
  },

  logout: async (): Promise<void> => {
    await API.post('/auth/logout');
  },

  refresh: async (): Promise<AuthResponse> => {
    const res = await API.post('/auth/refresh');
    return res.data;
  },

  verify: async (token: string): Promise<void> => {
    await API.get(`/auth/verify/${token}`);
  },

  resetPassword: async (email: string, newPassword: string): Promise<void> => {
    await API.post('/auth/reset-password', { email, newPassword });
  },
};

/**
 * Job Service
 */
export const jobServiceAPI = {
  getAll: async (filters?: Record<string, any>): Promise<Job[]> => {
    const res = await API.get('/jobs', { params: filters });
    return res.data;
  },

  getById: async (id: string): Promise<Job | null> => {
    const res = await API.get(`/jobs/${id}`);
    return res.data;
  },

  search: async (params?: Record<string, any>): Promise<Job[]> => {
    const res = await API.get('/jobs/search', { params });
    return res.data;
  },

  create: async (data: any): Promise<Job> => {
    const res = await API.post('/admin/jobs/create', data);
    return res.data;
  },

  update: async (id: string, data: any): Promise<Job> => {
    const res = await API.put(`/admin/jobs/update/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await API.delete(`/admin/jobs/delete/${id}`);
  },
};

/**
 * Application Service
 */
export const applicationService = {
  getAll: async (): Promise<Application[]> => {
    const res = await API.get('/applications/user');
    return res.data;
  },

  getById: async (id: string): Promise<Application | null> => {
    const res = await API.get(`/applications/${id}`);
    return res.data;
  },

  create: async (data: CreateApplicationRequest): Promise<Application> => {
    const res = await API.post('/applications/create', data);
    return res.data;
  },

  updateStatus: async (id: string, status: ApplicationStatus): Promise<Application> => {
    const res = await API.patch('/admin/applications/update-status', {
      applicationId: id,
      status,
    });
    return res.data;
  },
};

/**
 * Support Service
 */
export const supportService = {
  create: async (data: {
    category: string;
    subject: string;
    message: string;
    name: string;
    email: string;
  }): Promise<any> => {
    const res = await API.post('/support', data);
    return res.data;
  },

  getAll: async (): Promise<any[]> => {
    const res = await API.get('/support');
    return res.data;
  },
};

/**
 * Profile Service
 */
export const profileService = {
  get: async (): Promise<Profile | null> => {
    const res = await API.get('/profile');
    return res.data;
  },

  update: async (data: UpdateProfileRequest): Promise<Profile> => {
    const res = await API.put('/profile', data);
    return res.data;
  },
};

/**
 * Notification Service
 */
export const notificationService = {
  getAll: async (): Promise<Notification[]> => {
    const res = await API.get('/notifications');
    return res.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await API.patch(`/notifications/read/${id}`);
  },
};

/**
 * Payment Service
 */
export const paymentService = {
  initiatePayment: async (phoneNumber: string, amount: number): Promise<{ transactionId: string }> => {
    const res = await API.post('/payments/stkpush', { phone: phoneNumber, amount });
    return res.data;
  },

  verify: async (transactionId: string): Promise<{ status: string }> => {
    const res = await API.post('/payments/verify', { transactionId });
    return res.data;
  },
};

/**
 * Upload Service
 */
export const uploadService = {
  uploadResume: async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('resume', file);
    const res = await API.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};

/**
 * Admin Service
 */
export const adminService = {
  updateJob: async (id: string, data: any): Promise<Job> => {
    const res = await API.put(`/admin/jobs/update/${id}`, data);
    return res.data;
  },

  deleteJob: async (id: string): Promise<void> => {
    await API.delete(`/admin/jobs/delete/${id}`);
  },

  getApplications: async (): Promise<Application[]> => {
    const res = await API.get('/admin/applications');
    return res.data;
  },

  updateApplicationStatus: async (applicationId: string, status: ApplicationStatus): Promise<Application> => {
    const res = await API.patch('/admin/applications/update-status', { applicationId, status });
    return res.data;
  },

  getSupportRequests: async (): Promise<any[]> => {
    const res = await API.get('/admin/support-requests');
    return res.data;
  },

  replySupportRequest: async (requestId: string, reply: string): Promise<any> => {
    const res = await API.patch('/admin/support-requests/reply', { requestId, reply });
    return res.data;
  },

  getUsers: async (): Promise<any[]> => {
    const res = await API.get('/admin/users');
    return res.data;
  },

  getPayments: async (): Promise<any[]> => {
    const res = await API.get('/admin/payments');
    return res.data;
  },

  getDashboard: async (): Promise<any> => {
    const res = await API.get('/admin/dashboard');
    return res.data;
  },
};

/**
 * Report Service
 */
export const reportService = {
  generate: async (payload: { type: string; startDate?: string; endDate?: string }): Promise<any> => {
    const res = await API.post('/report', payload);
    return res.data;
  },
};
