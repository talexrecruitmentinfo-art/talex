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

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      const loggedInUser = await login(payload);
      toast.success('Login successful!');
      if (loggedInUser.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else if (loggedInUser.role === 'USER') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard'); // fallback
      }
    } catch {
      toast.error(error || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
              Talex
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Sign in to Talex
            </h1>
            <p className="text-sm text-slate-600">
              Access your dashboard, manage applications, and connect with Canadian recruiters.
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="text"
                  {...register('email')}
                  disabled={isSubmitting || isLoading}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password')}
                    disabled={isSubmitting || isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <Button className="w-full" disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading ? 'Signing in...' : 'Sign in'}
              </Button>

              <p className="text-center text-sm text-slate-700">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-700">
                  Register
                </Link>
              </p>
            </form>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4">
              <p className="text-xs text-slate-600">
                Your sign-in details are secure and used only to match you with verified opportunities.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
