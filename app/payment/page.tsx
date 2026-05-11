'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { CreditCard, Phone, Lock, Loader } from 'lucide-react';

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    if (!/^254\d{9}$|^0\d{9}$/.test(phoneNumber)) {
      toast.error('Please enter a valid Kenyan phone number');
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch('/api/payments/mpesa-stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: searchParams.get('jobId'),
          applicationId: searchParams.get('applicationId'),
          phoneNumber,
          amount: 500,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      toast.success('Payment prompt sent to your phone!');
      router.push('/applications/success?tracking=TALEX' + Math.random().toString(36).substr(2, 9).toUpperCase());
    } catch (error) {
      toast.error('Failed to initiate payment. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">Secure Payment</p>
          <h1 className="mt-3 text-4xl font-bold">Complete Your Application</h1>
          <p className="mt-2 text-slate-300">Pay the application fee using M-Pesa to submit your documents.</p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Payment Summary */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-6">Payment Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-500/20 p-3 text-blue-300">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">Application Fee</p>
                    <p className="font-semibold text-white">Job Application</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">KES 500</p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-3xl p-4">
                <p className="text-sm text-emerald-200">
                  ✓ Your documents are securely stored
                </p>
              </div>
            </div>

            {/* Security Badge */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Lock className="h-4 w-4 text-blue-400" />
                <p className="text-xs">Secured by M-Pesa • PCI Compliant</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white shadow-2xl p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Payment Method</h2>

            {/* Applicant Info */}
            <div className="bg-slate-50 rounded-3xl p-4 mb-6">
              <div className="space-y-2">
                <p className="text-sm text-slate-600">Applicant Name</p>
                <p className="font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">Total Amount</p>
                <p className="text-3xl font-bold text-brand-600">KES 500</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-semibold text-slate-900">
                M-Pesa Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="254712345678 or 0712345678"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-500 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
                  disabled={isProcessing}
                />
              </div>
              <p className="text-xs text-slate-500">Enter your Kenyan phone number that has M-Pesa enabled.</p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-4 mb-6">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">How it works:</span> Click "Pay Now" and an M-Pesa prompt will appear on your phone. Enter your M-Pesa PIN to complete the payment.
              </p>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing || !phoneNumber.trim()}
              className="w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 text-base font-semibold text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  Pay KES 500 Now
                </>
              )}
            </button>

            {/* Footer Text */}
            <p className="text-xs text-center text-slate-500 mt-4">
              By proceeding, you agree to our Terms & Conditions and Privacy Policy
            </p>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex items-center justify-center gap-6 text-white/70">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="text-sm">Secure Payment</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm">M-Pesa Integration</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span className="text-sm">✓ Instant Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
