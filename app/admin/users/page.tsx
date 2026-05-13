'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { adminService } from '@/services/apiService';
import type { AdminUser } from '@/types/auth';

export default function AdminUsersPage() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actioningId, setActioningId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'ADMIN') {
      setError('Access denied. Admins only.');
      setIsLoading(false);
      return;
    }

    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const usersData = await adminService.getUsers();
        setUsers(usersData || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load users';
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [user]);

  const getUserId = (userItem: AdminUser): string => userItem.id || userItem._id || userItem.email;

  const handleBan = async (userId: string) => {
    if (actioningId) return;
    if (!window.confirm('Are you sure you want to ban this user?')) return;

    try {
      setActioningId(userId);
      await adminService.banUser(userId, true);
      setUsers((prev) =>
        prev.map((userItem) =>
          getUserId(userItem) === userId
            ? { ...userItem, status: 'Banned' }
            : userItem
        )
      );
      toast.success('User banned successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to ban user';
      toast.error(message);
    } finally {
      setActioningId(null);
    }
  };

  const handleResetPassword = async (userId: string) => {
    if (actioningId) return;
    try {
      setActioningId(userId);
      await adminService.resetUserPassword(userId);
      toast.success('Password reset email sent successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reset password';
      toast.error(message);
    } finally {
      setActioningId(null);
    }
  };

  if (!user) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">Please log in to manage users.</p>
      </div>
    );
  }

  if (user.role !== 'ADMIN') {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-red-600 font-semibold">Access Denied</p>
        <p className="text-slate-600 mt-2">Only administrators can view this page.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Users</p>
        <h1 className="text-3xl font-semibold text-slate-900">Manage registered users</h1>
        <p className="text-sm text-slate-600 mt-2">Ban, edit, or reset passwords for your user accounts.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-900">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-600">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((userItem) => {
                const userId = getUserId(userItem);
                const status = userItem.status || 'Active';

                return (
                  <tr key={userId}>
                    <td className="px-4 py-4">{userItem.name || userItem.fullName || 'Unknown'}</td>
                    <td className="px-4 py-4">{userItem.email}</td>
                    <td className="px-4 py-4">{userItem.role || 'USER'}</td>
                    <td className="px-4 py-4">{status}</td>
                    <td className="px-4 py-4 space-x-2">
                      <Link
                        href={`/admin/users/edit/${userId}`}
                        className="inline-flex rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleBan(userId)}
                        disabled={actioningId === userId || status.toLowerCase() === 'banned'}
                        className="inline-flex rounded-full bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {status.toLowerCase() === 'banned' ? 'Banned' : 'Ban'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResetPassword(userId)}
                        disabled={actioningId === userId}
                        className="inline-flex rounded-full bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Reset password
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
