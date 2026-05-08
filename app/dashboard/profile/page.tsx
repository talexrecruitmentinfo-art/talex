'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileInput } from '@/lib/validation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileInput) => {
    try {
      setIsSubmitting(true);
      // TODO: Call API to update profile
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Profile</p>
          <h1 className="text-3xl font-semibold text-slate-900">Your profile details</h1>
        </div>
        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Full name</label>
              <Input 
                placeholder="John Doe"
                {...register('fullName')}
                disabled={isSubmitting}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Date of birth</label>
              <Input 
                type="date"
                {...register('dateOfBirth')}
                disabled={isSubmitting}
              />
              {errors.dateOfBirth && (
                <p className="text-xs text-red-500">{errors.dateOfBirth.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <Input 
                placeholder="+254712345678"
                {...register('phone')}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <Input 
                type="email" 
                placeholder="name@example.com"
                {...register('email')}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Gender</label>
              <select 
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                {...register('gender')}
                disabled={isSubmitting}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Nationality</label>
              <Input 
                placeholder="Kenyan"
                {...register('nationality')}
                disabled={isSubmitting}
              />
              {errors.nationality && (
                <p className="text-xs text-red-500">{errors.nationality.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Address</label>
            <Input 
              placeholder="Toronto, ON"
              {...register('address')}
              disabled={isSubmitting}
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save profile'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
