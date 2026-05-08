'use client';

import { create } from 'zustand';

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

      // TODO: Replace with actual M-Pesa API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      set({
        paymentStatus: 'stk_sent',
        transactionId: 'TXN-' + Date.now(),
      });

      // Simulate success after STK sent
      await new Promise((resolve) => setTimeout(resolve, 3000));

      set({
        paymentStatus: 'success',
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
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Mock check
      set({ isProcessing: false });
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
