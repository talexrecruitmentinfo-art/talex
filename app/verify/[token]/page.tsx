'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/apiService';
import Button from '@/components/ui/button';
import { toast } from 'sonner';

interface VerifyPageProps {
  params: {
    token: string;
  };
}

export default function VerifyTokenPage({ params }: VerifyPageProps) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('Verifying your account...');

  useEffect(() => {
    const verify = async () => {
      if (!params.token) return;

      setStatus('loading');
      try {
        await authService.verify(params.token);
        setStatus('success');
        setMessage('Your account has been verified successfully. You can now sign in.');
        toast.success('Account verification successful!');
      } catch {
        setStatus('error');
        setMessage(
          'Verification failed or the link has expired. Please request a new verification email or contact support.'
        );
      }
    };

    verify();
  }, [params.token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Talex</p>
            <h1 className="text-3xl font-semibold text-slate-900">Email verification</h1>
            <p className="text-sm text-slate-600">{message}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {status === 'success' ? (
              <Button type="button" onClick={() => router.push('/login')}>
                Go to Login
              </Button>
            ) : status === 'error' ? (
              <Link
                href="/login"
                className="inline-flex justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Back to Login
              </Link>
            ) : (
              <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-600">Please wait while we verify your account.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
