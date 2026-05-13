'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { adminService } from '@/services/apiService';

export default function AdminEditUserPage() {
  const { user } = useAuthStore();
  const params = useParams();
  const router = useRouter();
  const userId = params?.id as string;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('USER');
  const [status, setStatus] = useState('Active');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    if (!user) return;

    if (user.role !== 'ADMIN') {
      setError('Access denied. Admins only.');
      setIsLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await adminService.getUserById(userId);
        setName(userData.name || userData.fullName || '');
        setEmail(userData.email || '');
        setRole(userData.role || 'USER');
        setStatus(userData.status || 'Active');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [userId, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId) return;

    try {
      setIsSubmitting(true);
      await adminService.updateUser(userId, { name, email, role });
      toast.success('User details updated successfully');
      router.push('/admin/users');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">Please log in to edit a user.</p>
      </div>
    );
  }

  if (user.role !== 'ADMIN') {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-red-600 font-semibold">Access Denied</p>
        <p className="text-slate-600 mt-2">Only administrators can edit users.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Edit user</p>
        <h1 className="text-3xl font-semibold text-slate-900">Update account details</h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500"
              required
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Role</label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Status</label>
            <input
              value={status}
              disabled
              className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-600 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/users')}
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
