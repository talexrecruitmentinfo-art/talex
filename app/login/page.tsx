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
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

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
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-br from-navy-50 via-white to-blue-50 px-4 py-12 sm:px-6 lg:px-8 flex items-center">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy-100 mb-4">
            <Lock className="h-7 w-7 text-navy-600" />
          </div>
          <h1 className="text-3xl font-bold text-navy-900">Sign In</h1>
          <p className="mt-2 text-slate-600">Access your Talex Jobs application portal</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  placeholder="your.email@example.com"
                  type="email"
                  className="pl-10"
                  {...register('email')}
                  disabled={isSubmitting || isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-brand-500 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-900">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                  Forgot password?
                </Link>
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
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-brand-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="rounded-lg bg-brand-50 border border-brand-200 p-3 text-sm text-brand-700">
                ⚠️ {submitError}
              </div>
            )}

            {/* Submit Button */}
            <Button className="w-full h-11 font-semibold" disabled={isSubmitting || isLoading}>
              {isSubmitting || isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-500">Don&apos;t have an account?</span>
              </div>
            </div>

            {/* Register Link */}
            <Link href="/register" className="block w-full rounded-lg border-2 border-slate-200 px-4 py-2.5 text-center font-semibold text-slate-900 hover:bg-slate-50 transition">
              Create Account
            </Link>
          </form>

          {/* Info Box */}
          <div className="mt-6 rounded-lg bg-navy-50 border border-navy-100 p-4">
            <p className="text-xs text-navy-700">
              🔒 <span className="font-medium">Secure Login</span><br/>
              Your credentials are encrypted and used only to authenticate your access.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-xs text-slate-600 space-y-2">
          <p>Need help? <Link href="/contact" className="text-brand-600 font-semibold hover:underline">Contact Support</Link></p>
          <p><Link href="/privacy-policy" className="hover:text-slate-900">Privacy Policy</Link> • <Link href="/terms" className="hover:text-slate-900">Terms</Link></p>
        </div>
      </div>
    </div>
  );
}
