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
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    const formData = new FormData();
    formData.append('fullName', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }

    console.log('REGISTER PAYLOAD:', { name: data.name, email: data.email, hasResume: !!resumeFile });

    try {
      setIsSubmitting(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await registerUser(formData as any);

      toast.success('Account created successfully!');
      router.push('/dashboard/profile');
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log((err as any)?.response?.data);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeFileName(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <div className="text-4xl font-bold">
              <span className="text-red-500">T</span>
              <span className="text-blue-500">a</span>
              <span className="text-green-500">l</span>
              <span className="text-purple-500">e</span>
              <span className="text-orange-500">x</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create your account
            </h1>
            <p className="text-sm text-slate-600">
              Join thousands of Kenyan job seekers finding Canada opportunities.
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

              <div className="space-y-2">
                <label htmlFor="resume" className="block text-sm font-medium text-slate-700">
                  Resume (Optional)
                </label>
                <div className="relative">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className="block w-full cursor-pointer rounded-lg border-2 border-dashed border-slate-300 px-4 py-8 text-center text-sm hover:border-slate-400 transition-colors"
                  >
                    {resumeFileName ? (
                      <span className="text-slate-700 font-medium">{resumeFileName}</span>
                    ) : (
                      <span className="text-slate-500">Click to upload resume (PDF, DOC, DOCX)</span>
                    )}
                  </label>
                </div>
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
                By registering, you agree to our{' '}
                <Link href="/terms" className="font-medium text-brand-600 hover:text-brand-700">
                  terms of service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="font-medium text-brand-600 hover:text-brand-700">
                  privacy policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
