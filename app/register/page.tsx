'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validation';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setErrorMessage(null);
      setIsSubmitting(true);

      const payload = {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password.trim(),
      };

      console.log(payload);

      await registerUser(payload);
      toast.success('Account created successfully! Please verify your email to continue.');
      router.push('/verify');
    } catch {
      setErrorMessage('Registration failed. Please check your details and try again.');
      toast.error('Registration failed. Please try again.');
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
            <User className="h-7 w-7 text-navy-600" />
          </div>
          <h1 className="text-3xl font-bold text-navy-900">Create Account</h1>
          <p className="mt-2 text-slate-600">Join thousands of Kenyans working in Canada</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Error Message */}
            {errorMessage && (
              <div className="rounded-lg bg-brand-50 border border-brand-200 p-3 text-sm text-brand-700">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Full Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-900">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input 
                  id="name" 
                  placeholder="John Mwangi Kipchoge"
                  className="pl-10"
                  {...register('name')}
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-brand-500 font-medium">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  className="pl-10"
                  {...register('email')}
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-brand-500 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-900">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  className="pl-10 pr-12"
                  {...register('password')}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-900">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="pl-10 pr-12"
                  {...register('confirmPassword')}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-brand-500 font-medium">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button className="w-full h-11 font-semibold" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-500">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link href="/login" className="block w-full rounded-lg border-2 border-slate-200 px-4 py-2.5 text-center font-semibold text-slate-900 hover:bg-slate-50 transition">
              Sign In
            </Link>
          </form>

          {/* Terms Agreement */}
          <div className="mt-6 rounded-lg bg-navy-50 border border-navy-100 p-4 space-y-3 text-xs text-navy-700">
            <div className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5 text-brand-500" />
              <p>
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="font-semibold text-brand-600 hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy-policy" className="font-semibold text-brand-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5 text-brand-500" />
              <p>Email verification required to complete registration</p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-xs text-slate-600">
          <p><Link href="/privacy-policy" className="hover:text-slate-900">Privacy Policy</Link> • <Link href="/terms" className="hover:text-slate-900">Terms</Link></p>
        </div>
      </div>
    </div>
  );
}
