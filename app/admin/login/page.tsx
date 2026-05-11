'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validation';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading, clearError } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    const payload = {
      email: data.email.toLowerCase().trim(),
      password: data.password.trim(),
    };

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      clearError();
      
      const loggedInUser = await login(payload);
      
      if (!loggedInUser) {
        throw new Error('Login failed. User data not received.');
      }
      
      toast.success('Login successful!');
      
      if (loggedInUser.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else if (loggedInUser.role === 'USER') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-950 px-4 py-10 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-[36px] bg-slate-900/95 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div className="rounded-[30px] bg-slate-800 p-8 text-white shadow-soft">
            <div className="inline-flex items-center gap-3 rounded-full bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-200">
              <ShieldCheck className="h-5 w-5 text-brand-300" />
              Admin access only
            </div>
            <div className="mt-8 space-y-4">
              <h1 className="text-3xl font-semibold">Admin portal</h1>
              <p className="text-slate-300">Sign in with your admin credentials to manage jobs, users, applications, and payments.</p>
            </div>
            <div className="mt-8 space-y-4 rounded-[28px] bg-slate-950/70 p-5 ring-1 ring-white/10">
              <p className="text-sm text-slate-300">Secure access for administrators only. Keep details confidential and sign out when finished.</p>
              <div className="space-y-3 rounded-3xl bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Quick tips</p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Use your registered admin email</li>
                  <li>• Reset password if you lose access</li>
                  <li>• Monitor activity and reports</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] bg-white p-8 shadow-soft">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Admin sign in</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-500">Please use your administrator credentials to continue.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    className="pl-10"
                    {...register('email')}
                    disabled={isSubmitting || isLoading}
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-900">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="pl-10"
                    {...register('password')}
                    disabled={isSubmitting || isLoading}
                  />
                </div>
                {errors.password && <p className="text-xs text-rose-500">{errors.password.message}</p>}
              </div>

              {submitError && (
                <div className="rounded-3xl bg-rose-50 border border-rose-100 p-3 text-sm text-rose-700">{submitError}</div>
              )}

              <Button className="w-full h-12 text-base font-semibold" disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
