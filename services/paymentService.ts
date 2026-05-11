import API from '@/lib/api';

export const paymentService = {
  initiateMPesaSTK: async (phoneNumber: string, amount: number, jobId: string) => {
    try {
      const response = await API.post('/payments/mpesa-stk-push', {
        phoneNumber,
        amount,
        jobId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyPayment: async (transactionRef: string) => {
    try {
      const response = await API.get(`/payments/verify/${transactionRef}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPaymentHistory: async () => {
    try {
      const response = await API.get('/payments/history');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPaymentStatus: async (transactionId: string) => {
    try {
      const response = await API.get(`/payments/status/${transactionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
