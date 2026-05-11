'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  jobId: string;
  jobTitle: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({
  isOpen,
  jobId,
  jobTitle,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (!/^254\d{9}$|^0\d{9}$/.test(phoneNumber)) {
      setError('Please enter a valid Kenyan phone number (e.g., 254712345678 or 0712345678)');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulating STK push - replace with actual M-Pesa integration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call your backend API to initiate M-Pesa STK push
      const response = await fetch('/api/payments/mpesa-stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          phoneNumber,
          amount: 500,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      // Success - redirect or show success message
      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to initiate payment. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-2xl bg-white shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="border-b border-slate-200 bg-gradient-to-r from-navy-50 to-blue-50 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Complete Payment</h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1 hover:bg-slate-200 transition"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit} className="space-y-6 p-6">
                {/* Job Info */}
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm text-slate-600">Applying for</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {jobTitle}
                  </p>
                </div>

                {/* Phone Number Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-2">
                    M-Pesa Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="254712345678 or 0712345678"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setError('');
                    }}
                    disabled={isProcessing}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 focus:border-brand-500 focus:outline-none disabled:opacity-50"
                  />
                  <p className="mt-1 text-xs text-slate-600">
                    The phone number must be registered with M-Pesa
                  </p>
                </div>

                {/* Payment Details */}
                <div className="space-y-2 rounded-lg bg-brand-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Application Fee</span>
                    <span className="font-semibold text-slate-900">KES 500</span>
                  </div>
                  <div className="border-t border-brand-200 pt-2 flex items-center justify-between">
                    <span className="font-medium text-slate-900">Total</span>
                    <span className="text-lg font-bold text-brand-600">KES 500</span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-red-50 border border-red-200 p-3"
                  >
                    <p className="text-sm text-red-600">{error}</p>
                  </motion.div>
                )}

                {/* Terms */}
                <p className="text-xs text-slate-600 text-center">
                  By proceeding, you agree to our{' '}
                  <a href="/terms" className="text-brand-600 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy-policy" className="text-brand-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-center font-semibold text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Pay KES 500 & Submit'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isProcessing}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
