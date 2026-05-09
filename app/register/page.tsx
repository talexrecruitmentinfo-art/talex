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

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
              Talex
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Create your account
            </h1>
            <p className="text-sm text-slate-600">
              Build your Talex profile and get matched with verified Canadian roles.
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {errorMessage && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  {...register('name')}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com"
                  {...register('email')}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create password"
                  {...register('password')}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>


              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>

              <p className="text-center text-sm text-slate-700">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
                  Sign in
                </Link>
              </p>
            </form>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4">
              <p className="text-xs text-slate-600">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="font-medium text-brand-600 hover:text-brand-700">
                  terms of service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="font-medium text-brand-600 hover:text-brand-700">
                  privacy policy
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
