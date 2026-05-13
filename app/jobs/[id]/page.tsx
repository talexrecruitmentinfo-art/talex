'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import PaymentModal from '@/components/shared/payment-modal';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { applicationService } from '@/services/apiService';
import { jobServiceAPI } from '@/services/apiService';
import type { Job } from '@/types/job';

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const fetchedJob = await jobServiceAPI.getById(params.id);
        if (!fetchedJob) {
          setError('Job not found.');
          setJob(null);
          return;
        }
        setJob(fetchedJob);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load job details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const handleApply = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    try {
      await applicationService.create({ jobId: params.id, paymentId: transactionId });
      toast.success('Payment successful! Application submitted.');
      router.push('/applications/success?tracking=TALEX' + Math.random().toString(36).substr(2, 9).toUpperCase());
    } catch (error) {
      toast.error('Unable to create the application after payment. Please contact support.');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <div className="text-slate-600">Loading job details...</div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-soft">
        {error || 'Job not found.'}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">{job.category}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">{job.title}</h1>
            <p className="mt-2 text-sm text-slate-600">{job.company} · {job.location} · {job.type}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
            <p className="font-semibold">Salary</p>
            <p className="mt-2">{job.salary}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Job description</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{job.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Requirements</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-brand-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">Benefits</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {job.benefits.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-brand-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-card">
            <div className="space-y-5">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Apply section</p>
                <p className="mt-3 text-sm text-slate-600">Complete your profile and pay the application fee to submit.</p>
                <button
                  onClick={handleApply}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  {user ? 'Apply Now' : 'Login to Apply'}
                </button>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Deadline</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{job.deadline}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <PaymentModal
        isOpen={paymentModalOpen}
        jobId={job.id}
        jobTitle={job.title}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
