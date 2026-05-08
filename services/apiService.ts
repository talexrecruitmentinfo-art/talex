import API from '@/lib/api';
import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';
import type { Application, CreateApplicationRequest } from '@/types/application';
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
    // TODO: Call backend logout endpoint if needed
    return Promise.resolve();
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

  create: async (data: any): Promise<Job> => {
    const res = await API.post('/jobs', data);
    return res.data;
  },

  update: async (id: string, data: any): Promise<Job> => {
    const res = await API.put(`/jobs/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await API.delete(`/jobs/${id}`);
  },
};

/**
 * Application Service
 */
export const applicationService = {
  getAll: async (): Promise<Application[]> => {
    const res = await API.get('/applications');
    return res.data;
  },

  getById: async (id: string): Promise<Application | null> => {
    const res = await API.get(`/applications/${id}`);
    return res.data;
  },

  create: async (data: CreateApplicationRequest): Promise<Application> => {
    const res = await API.post('/applications', data);
    return res.data;
  },

  updateStatus: async (id: string, status: string): Promise<Application> => {
    const res = await API.put(`/applications/${id}/status`, { status });
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
    await API.put(`/notifications/${id}/read`);
  },

  delete: async (id: string): Promise<void> => {
    await API.delete(`/notifications/${id}`);
  },
};

/**
 * Payment Service
 */
export const paymentService = {
  initiatePayment: async (amount: number, phoneNumber: string): Promise<{ transactionId: string }> => {
    const res = await API.post('/payments/initiate', { amount, phoneNumber });
    return res.data;
  },

  checkStatus: async (transactionId: string): Promise<{ status: string }> => {
    const res = await API.get(`/payments/status/${transactionId}`);
    return res.data;
  },
};
