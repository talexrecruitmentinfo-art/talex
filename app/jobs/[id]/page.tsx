'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import PaymentModal from '@/components/shared/payment-modal';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // For now, we'll use a mock job since we can't fetch on client side easily
  // In a real app, you'd fetch this data
  const job = {
    id: params.id,
    title: 'Hospitality Supervisor',
    company: 'Canadian Hospitality Group',
    location: 'Toronto, Ontario',
    type: 'Full-time',
    category: 'Hospitality',
    salary: 'CA$ 45,000 - 55,000/year',
    description: 'We are seeking an experienced Hospitality Supervisor to join our team in Toronto. This role involves managing daily operations, supervising staff, and ensuring excellent guest experiences.',
    requirements: [
      'Minimum 3 years hospitality management experience',
      'Valid work permit or eligible for visa sponsorship',
      'Strong leadership and communication skills',
      'Knowledge of hospitality industry standards'
    ],
    benefits: [
      'Competitive salary with performance bonuses',
      'Visa sponsorship for qualified candidates',
      'Health insurance and retirement plan',
      'Professional development opportunities'
    ],
    deadline: '2026-06-30'
  };

  // Since we're using mock data, job always exists
  // if (!job) {
  //   notFound();
  // }

  const handleApply = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    toast.success('Payment successful! Application submitted.');
    router.push('/applications/success?tracking=TALEX' + Math.random().toString(36).substr(2, 9).toUpperCase());
  };

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
