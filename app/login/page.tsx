'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validation';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, clearError } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-br from-slate-100 via-white to-sky-100 px-4 py-10 sm:px-6 lg:px-10 flex items-center justify-center">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="hidden flex-col justify-between rounded-[32px] bg-navy-900 p-10 text-white shadow-xl lg:flex">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              <ShieldCheck className="h-5 w-5 text-brand-300" />
              Secure candidate portal
            </div>
            <div className="mt-10 space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Welcome back</p>
                <h1 className="mt-4 text-4xl font-semibold">Sign in to Talex</h1>
              </div>
              <p className="max-w-xl text-slate-300">Manage your Canadian job applications, track status updates, and get matched with verified employers faster.</p>
            </div>
          </div>

          <div className="space-y-4 rounded-[24px] bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-brand-300" />
              <p className="text-sm text-slate-200 font-semibold">Fast onboarding</p>
            </div>
            <p className="text-sm text-slate-300">Upload your resume and get recommended roles that match your profile.</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-brand-500/15 text-brand-300 flex items-center justify-center">✓</div>
              <p className="text-sm text-slate-300">Tracked applications</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="mb-8 space-y-3 text-center sm:text-left">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-50 text-brand-600 sm:mx-0">
              <Lock className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Candidate login</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-500">Sign in to manage your job applications and profile.</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  className="pl-10"
                  {...register('email')}
                  disabled={isSubmitting || isLoading}
                />
              </div>
              {errors.email && <p className="text-xs text-brand-500 font-medium">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-900">Password</label>
                <Link href="/forgot-password" className="text-xs font-semibold text-brand-600 hover:text-brand-700">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-12"
                  {...register('password')}
                  disabled={isSubmitting || isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-brand-500 font-medium">{errors.password.message}</p>}
            </div>

            {submitError && (
              <div className="rounded-3xl bg-rose-50 border border-rose-100 p-3 text-sm text-rose-700">⚠️ {submitError}</div>
            )}

            <Button className="w-full h-12 text-base font-semibold" disabled={isSubmitting || isLoading}>
              {isSubmitting || isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-medium text-slate-900">Need help signing in?</p>
            <p className="mt-1">Contact support or reset your password if you have trouble accessing your account.</p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>New to Talex?</span>
            <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-700">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
