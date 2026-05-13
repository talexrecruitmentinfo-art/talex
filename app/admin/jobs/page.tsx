'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { jobServiceAPI } from '@/services/apiService';
import type { Job } from '@/types/job';

export default function AdminJobsPage() {
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'ADMIN') {
      setError('Access denied. Admins only.');
      setIsLoading(false);
      return;
    }

    const loadJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const jobsData = await jobServiceAPI.getJobs();
        setJobs(jobsData || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load jobs';
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [user]);

  const handleDelete = async (jobId: string) => {
    if (!jobId || deletingId) return;
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      setDeletingId(jobId);
      await jobServiceAPI.delete(jobId);
      setJobs((prev) => prev.filter((job) => (job.id || job._id) !== jobId));
      toast.success('Job deleted successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete job';
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  if (!user) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">Please log in to manage jobs.</p>
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
        <p className="text-slate-600">Loading jobs...</p>
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Jobs management</p>
          <h1 className="text-3xl font-semibold text-slate-900">Manage job listings</h1>
        </div>
        <Link href="/admin/jobs/create" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">
          Create job
        </Link>
      </div>
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-card">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-900">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Applications</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-600">
                  No jobs found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const jobId = job.id || job._id || '';
                return (
                  <tr key={jobId || job.title}>
                    <td className="px-4 py-4">{job.title || 'Untitled'}</td>
                    <td className="px-4 py-4">{job.applications ?? 0}</td>
                    <td className="px-4 py-4">{job.status || 'Active'}</td>
                    <td className="px-4 py-4 space-x-2">
                      {jobId ? (
                        <Link
                          href={`/admin/jobs/edit/${jobId}`}
                          className="inline-flex rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                        >
                          Edit
                        </Link>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => handleDelete(jobId)}
                        disabled={!jobId || deletingId === jobId}
                        className="inline-flex rounded-full bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Delete
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
