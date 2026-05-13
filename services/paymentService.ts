import API from '@/lib/api';
import type { AxiosResponse } from 'axios';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function unwrapResponse<T>(response: AxiosResponse<unknown>): T {
  const body = response.data;
  const extract = (payload: unknown): unknown => {
    if (!isRecord(payload)) return payload;
    const keys = ['payments', 'data'] as const;
    for (const key of keys) {
      if (key in payload && payload[key] !== undefined) {
        return payload[key];
      }
    }
    return payload;
  };

  if (body && typeof body === 'object') {
    if ('data' in body && body.data !== undefined) {
      return extract(body.data) as T;
    }
    return extract(body) as T;
  }

  return body as T;
}

export const paymentService = {
  initiateMPesaSTK: async (phoneNumber: string, amount: number, jobId: string): Promise<unknown> => {
    try {
      const response = await API.post('/payments/stkpush', {
        phone: phoneNumber,
        amount,
        jobId,
      });
      return unwrapResponse<unknown>(response);
    } catch (error) {
      throw error;
    }
  },

  verifyPayment: async (transactionRef: string): Promise<unknown> => {
    try {
      const response = await API.post('/payments/verify', { transactionId: transactionRef });
      return unwrapResponse<unknown>(response);
    } catch (error) {
      throw error;
    }
  },

  getPaymentHistory: async (): Promise<unknown[]> => {
    try {
      const response = await API.get('/payments/history');
      return unwrapResponse<unknown[]>(response);
    } catch (error) {
      throw error;
    }
  },

  getPaymentStatus: async (transactionId: string): Promise<unknown> => {
    try {
      const response = await API.post('/payments/verify', { transactionId });
      return unwrapResponse<unknown>(response);
    } catch (error) {
      throw error;
    }
  },
};
