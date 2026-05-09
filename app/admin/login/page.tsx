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
      toast.success('Login successful!');
      
      if (loggedInUser.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else if (loggedInUser.role === 'USER') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard'); // fallback
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
    <div className="mx-auto max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Admin sign in</p>
        <h1 className="text-3xl font-semibold text-slate-900">Admin access</h1>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <Input
            type="email"
            placeholder="admin@example.com"
            {...register('email')}
            disabled={isSubmitting || isLoading}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <Input
            type="password"
            placeholder="Enter password"
            {...register('password')}
            disabled={isSubmitting || isLoading}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        {submitError && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {submitError}
          </div>
        )}
        <Button className="w-full" disabled={isSubmitting || isLoading}>
          {isSubmitting || isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
}
