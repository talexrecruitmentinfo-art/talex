'use client';

import { create } from 'zustand';
import { paymentService as apiPaymentService } from '@/services/apiService';

interface PaymentState {
  isProcessing: boolean;
  paymentStatus: 'idle' | 'processing' | 'stk_sent' | 'success' | 'failed' | 'timeout';
  error: string | null;
  transactionId: string | null;
}

interface PaymentStore extends PaymentState {
  initiatePayment: (amount: number, phoneNumber: string, jobId: string) => Promise<void>;
  checkPaymentStatus: (transactionId: string) => Promise<void>;
  resetPayment: () => void;
  clearError: () => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  isProcessing: false,
  paymentStatus: 'idle',
  error: null,
  transactionId: null,

  initiatePayment: async (amount: number, phoneNumber: string, jobId: string) => {
    try {
      set({
        isProcessing: true,
        paymentStatus: 'processing',
        error: null,
      });

      const result = await apiPaymentService.stkpush(phoneNumber, amount);

      set({
        paymentStatus: 'stk_sent',
        transactionId: result.transactionId,
        isProcessing: false,
      });
    } catch (error) {
      set({
        paymentStatus: 'failed',
        error: error instanceof Error ? error.message : 'Payment failed',
        isProcessing: false,
      });
      throw error;
    }
  },

  checkPaymentStatus: async (transactionId: string) => {
    try {
      set({ isProcessing: true });
      const result = await apiPaymentService.verify(transactionId);
      set({
        paymentStatus: result.status === 'success' ? 'success' : 'failed',
        isProcessing: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to check payment status',
        isProcessing: false,
      });
    }
  },

  resetPayment: () => {
    set({
      isProcessing: false,
      paymentStatus: 'idle',
      error: null,
      transactionId: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
