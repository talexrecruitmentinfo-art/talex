'use client';

import { FormEvent, useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Link from 'next/link';
import { toast } from 'sonner';
import { authService } from '@/services/apiService';
import { getErrorMessage } from '@/utils/helpers';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);

    try {
      await authService.forgotPassword(email.trim().toLowerCase());
      setFormSuccess('If this account exists, a reset link has been sent to your email.');
      toast.success('Reset link sent');
      setEmail('');
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Unable to send password reset instructions.');
      setFormError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Talex</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Reset your password</h1>
            <p className="text-sm text-slate-600">Enter your email to receive password recovery instructions.</p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              {formError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{formError}</div>
              )}

              {formSuccess && (
                <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{formSuccess}</div>
              )}

              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending reset link...' : 'Send reset link'}
              </Button>

              <Link
                href="/login"
                className="block rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to sign in
              </Link>
            </form>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4">
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-900">Tip:</span> Check your email for recovery instructions. Links are valid for 24 hours.
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-slate-600">
            Remember your password?{' '}
            <Link href="/login" className="font-semibold text-brand-500 hover:text-brand-600">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
