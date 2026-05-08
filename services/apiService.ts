import { api } from '@/lib/api';
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
    // TODO: Replace with actual API endpoint
    console.log('Calling AUTH LOGIN API:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            name: 'John Doe',
            email: data.email,
            phone: '+254712345678',
            profileCompletion: 75,
            createdAt: new Date().toISOString(),
            role: 'user',
          },
          token: 'mock-token-' + Date.now(),
        });
      }, 1000);
    });
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling AUTH REGISTER API:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            email: data.email,
            phone: data.phone,
            profileCompletion: 0,
            createdAt: new Date().toISOString(),
            role: 'user',
          },
          token: 'mock-token-' + Date.now(),
        });
      }, 1000);
    });
  },

  logout: async (): Promise<void> => {
    // TODO: Replace with actual API endpoint
    return Promise.resolve();
  },
};

/**
 * Job Service
 */
export const jobServiceAPI = {
  getAll: async (filters?: Record<string, any>): Promise<Job[]> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling JOBS LIST API:', filters);
    return Promise.resolve([]);
  },

  getById: async (id: string): Promise<Job | null> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling JOBS GET API:', id);
    return Promise.resolve(null);
  },

  create: async (data: any): Promise<Job> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling JOBS CREATE API:', data);
    return Promise.resolve({} as Job);
  },

  update: async (id: string, data: any): Promise<Job> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling JOBS UPDATE API:', id, data);
    return Promise.resolve({} as Job);
  },

  delete: async (id: string): Promise<void> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling JOBS DELETE API:', id);
    return Promise.resolve();
  },
};

/**
 * Application Service
 */
export const applicationService = {
  getAll: async (): Promise<Application[]> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling APPLICATIONS LIST API');
    return Promise.resolve([]);
  },

  getById: async (id: string): Promise<Application | null> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling APPLICATIONS GET API:', id);
    return Promise.resolve(null);
  },

  create: async (data: CreateApplicationRequest): Promise<Application> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling APPLICATIONS CREATE API:', data);
    return Promise.resolve({} as Application);
  },

  updateStatus: async (id: string, status: string): Promise<Application> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling APPLICATIONS UPDATE STATUS API:', id, status);
    return Promise.resolve({} as Application);
  },
};

/**
 * Profile Service
 */
export const profileService = {
  get: async (): Promise<Profile | null> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling PROFILE GET API');
    return Promise.resolve(null);
  },

  update: async (data: UpdateProfileRequest): Promise<Profile> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling PROFILE UPDATE API:', data);
    return Promise.resolve({} as Profile);
  },
};

/**
 * Notification Service
 */
export const notificationService = {
  getAll: async (): Promise<Notification[]> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling NOTIFICATIONS LIST API');
    return Promise.resolve([]);
  },

  markAsRead: async (id: string): Promise<void> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling NOTIFICATIONS MARK AS READ API:', id);
    return Promise.resolve();
  },

  delete: async (id: string): Promise<void> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling NOTIFICATIONS DELETE API:', id);
    return Promise.resolve();
  },
};

/**
 * Payment Service
 */
export const paymentService = {
  initiatePayment: async (amount: number, phoneNumber: string): Promise<{ transactionId: string }> => {
    // TODO: Replace with actual M-Pesa API call
    console.log('Calling PAYMENT INITIATE API:', amount, phoneNumber);
    return Promise.resolve({ transactionId: 'TXN-' + Date.now() });
  },

  checkStatus: async (transactionId: string): Promise<{ status: string }> => {
    // TODO: Replace with actual API endpoint
    console.log('Calling PAYMENT CHECK STATUS API:', transactionId);
    return Promise.resolve({ status: 'success' });
  },
};
