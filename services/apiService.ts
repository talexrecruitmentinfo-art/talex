import API from '@/lib/api';
import type { AxiosResponse } from 'axios';
import type { AuthResponse, LoginRequest, RegisterRequest, User, AdminUser } from '@/types/auth';
import type { Application, CreateApplicationRequest, ApplicationStatus } from '@/types/application';
import type { Job } from '@/types/job';
import type { Notification } from '@/types/notification';
import type { Profile, UpdateProfileRequest } from '@/types/profile';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function unwrapResponse<T>(response: AxiosResponse<unknown>): T {
  const body = response.data;
  const extract = (payload: unknown): unknown => {
    if (!isRecord(payload)) return payload;
    if ('user' in payload && 'token' in payload) {
      return payload;
    }
    const keys = [
      'jobs',
      'job',
      'applications',
      'application',
      'profile',
      'notifications',
      'documents',
      'users',
      'payments',
      'supportRequests',
      'document',
      'user',
    ] as const;
    for (const key of keys) {
      if (key in payload && payload[key] !== undefined) {
        return payload[key];
      }
    }
    return payload;
  };

  if (body && typeof body === 'object') {
    if ('data' in body && body.data !== undefined) {
      const dataPayload = body.data;
      if (isRecord(dataPayload) && 'user' in dataPayload && 'token' in dataPayload) {
        return dataPayload as T;
      }
      return extract(dataPayload) as T;
    }
    if (isRecord(body) && 'user' in body && 'token' in body) {
      return body as T;
    }
    return extract(body) as T;
  }

  return body as T;
}

/**
 * Auth Service
 */
export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await API.post('/auth/login', data);
    return unwrapResponse<AuthResponse>(res);
  },

  register: async (data: RegisterRequest | FormData): Promise<AuthResponse> => {
    const config = data instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    const res = await API.post('/auth/register', data, config);
    return unwrapResponse<AuthResponse>(res);
  },

  verify: async (token: string): Promise<void> => {
    await API.get(`/auth/verify/${token}`);
  },

  refresh: async (): Promise<AuthResponse> => {
    const res = await API.post('/auth/refresh');
    return unwrapResponse<AuthResponse>(res);
  },

  logout: async (): Promise<void> => {
    await API.post('/auth/logout');
  },

  forgotPassword: async (email: string): Promise<void> => {
    await API.post('/auth/forgot-password', { email });
  },

  resetPassword: async (data: { token: string; newPassword: string }): Promise<void> => {
    await API.post('/auth/reset-password', data);
  },
};

/**
 * Job Service
 */
export const jobServiceAPI = {
  getAll: async (filters?: Record<string, unknown>): Promise<Job[]> => {
    const res = await API.get('/jobs', { params: filters });
    return unwrapResponse<Job[]>(res);
  },

  getJobs: async (filters?: Record<string, unknown>): Promise<Job[]> => {
    const res = await API.get('/jobs', { params: filters });
    return unwrapResponse<Job[]>(res);
  },

  getById: async (id: string): Promise<Job | null> => {
    const res = await API.get(`/jobs/${id}`);
    return unwrapResponse<Job | null>(res);
  },

  search: async (params?: Record<string, unknown>): Promise<Job[]> => {
    const res = await API.get('/jobs/search', { params });
    return unwrapResponse<Job[]>(res);
  },

  create: async (data: Record<string, unknown>): Promise<Job> => {
    const res = await API.post('/admin/jobs/create', data);
    return unwrapResponse<Job>(res);
  },

  update: async (id: string, data: Record<string, unknown>): Promise<Job> => {
    const res = await API.put(`/admin/jobs/update/${id}`, data);
    return unwrapResponse<Job>(res);
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
    return unwrapResponse<Application[]>(res);
  },

  getById: async (id: string): Promise<Application | null> => {
    const res = await API.get(`/applications/${id}`);
    return unwrapResponse<Application | null>(res);
  },

  create: async (data: CreateApplicationRequest): Promise<Application> => {
    const res = await API.post('/applications/create', data);
    return unwrapResponse<Application>(res);
  },

  applyJob: async (jobId: string, data: CreateApplicationRequest): Promise<Application> => {
    const res = await API.post('/applications/create', { ...data, jobId });
    return unwrapResponse<Application>(res);
  },

  updateStatus: async (id: string, status: ApplicationStatus): Promise<Application> => {
    const res = await API.post('/admin/applications/update-status', {
      applicationId: id,
      status,
    });
    return unwrapResponse<Application>(res);
  },
};

/**
 * Support Service
 */
export const supportService = {
  create: async (data: {
    subject: string;
    category: string;
    message: string;
    priority?: string;
    name?: string;
    email?: string;
  }): Promise<unknown> => {
    const res = await API.post('/support', data);
    return unwrapResponse<unknown>(res);
  },

  getAll: async (): Promise<unknown[]> => {
    const res = await API.get('/support');
    return unwrapResponse<unknown[]>(res);
  },

  reply: async (requestId: string, reply: string): Promise<unknown> => {
    const res = await API.post('/admin/support-requests/reply', { requestId, reply });
    return unwrapResponse<unknown>(res);
  },
};

/**
 * Profile Service
 */
export const profileService = {
  get: async (): Promise<Profile | null> => {
    const res = await API.get('/profile');
    return unwrapResponse<Profile | null>(res);
  },

  update: async (data: UpdateProfileRequest): Promise<Profile> => {
    const res = await API.put('/profile', data);
    return unwrapResponse<Profile>(res);
  },
};

/**
 * About Service
 */
export const aboutService = {
  getInfo: async (): Promise<unknown> => {
    const res = await API.get('/about');
    return unwrapResponse<unknown>(res);
  },
};

/**
 * Notification Service
 */
export const notificationService = {
  getAll: async (): Promise<Notification[]> => {
    const res = await API.get('/notifications');
    return unwrapResponse<Notification[]>(res);
  },

  markAsRead: async (id: string): Promise<void> => {
    await API.post(`/notifications/read/${id}`);
  },
};

/**
 * Payment Service
 */
export const paymentService = {
  stkpush: async (phoneNumber: string, amount: number, jobId?: string): Promise<{ transactionId: string }> => {
    const res = await API.post('/payments/stkpush', { phone: phoneNumber, amount, jobId });
    return unwrapResponse<{ transactionId: string }>(res);
  },

  callback: async (data: Record<string, unknown>): Promise<void> => {
    await API.post('/payments/callback', data);
  },

  verify: async (transactionId: string): Promise<{ status: string }> => {
    const res = await API.post('/payments/verify', { transactionId });
    return unwrapResponse<{ status: string }>(res);
  },
};

/**
 * Upload Service
 */
export const uploadService = {
  uploadResume: async (file: File): Promise<{ fileUrl?: string }> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;
    const formData = new FormData();
    formData.append('resume', file);

    const response = await fetch('/api/upload/upload-resume', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to upload resume');
    }

    return response.json();
  },

  getDocuments: async (): Promise<unknown[]> => {
    const res = await API.get('/upload/documents');
    return unwrapResponse<unknown[]>(res);
  },
};

/**
 * Admin Service
 */
export const adminService = {
  getApplications: async (): Promise<Application[]> => {
    const res = await API.get('/admin/applications');
    return unwrapResponse<Application[]>(res);
  },

  updateApplicationStatus: async (applicationId: string, status: ApplicationStatus): Promise<Application> => {
    const res = await API.post('/admin/applications/update-status', { applicationId, status });
    return unwrapResponse<Application>(res);
  },

  updateApplicationStage: async (applicationId: string, stage: string): Promise<Application> => {
    const res = await API.put(`/admin/applications/${applicationId}/stage`, { stage });
    return unwrapResponse<Application>(res);
  },

  getSupportRequests: async (): Promise<unknown[]> => {
    const res = await API.get('/admin/support-requests');
    return unwrapResponse<unknown[]>(res);
  },

  replySupportRequest: async (requestId: string, reply: string): Promise<unknown> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;
    const response = await fetch('/api/admin/support-requests/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ requestId, reply }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to reply to support request');
    }

    return response.json();
  },

  getUsers: async (): Promise<AdminUser[]> => {
    const res = await API.get('/admin/users');
    return unwrapResponse<AdminUser[]>(res);
  },

    getUserById: async (userId: string): Promise<AdminUser> => {
      const res = await API.get(`/admin/users/${userId}`);
      return unwrapResponse<AdminUser>(res);
    },

    banUser: async (userId: string, ban: boolean): Promise<unknown> => {
      const res = await API.post(`/admin/users/${userId}/ban`, { ban });
      return unwrapResponse<unknown>(res);
    },

    resetUserPassword: async (userId: string): Promise<unknown> => {
      const res = await API.post(`/admin/users/${userId}/password`);
      return unwrapResponse<unknown>(res);
    },

    deleteUser: async (userId: string): Promise<unknown> => {
      const res = await API.delete(`/admin/users/${userId}`);
      return unwrapResponse<unknown>(res);
    },

    updateUser: async (userId: string, data: Partial<AdminUser>): Promise<AdminUser> => {
      const res = await API.put(`/admin/users/${userId}`, data);
      return unwrapResponse<AdminUser>(res);
    },

  getDashboard: async (): Promise<unknown> => {
    const res = await API.get('/admin/dashboard');
    return unwrapResponse<unknown>(res);
  },
};

/**
 * Report Service
 */
export const reportService = {
  generate: async (data: {
    type: string;
    details?: string;
    name?: string;
    email?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<unknown> => {
    const res = await API.post('/report', data);
    return unwrapResponse<unknown>(res);
  },
};
