'use client';

import Link from 'next/link';

export default function AdminReportsPage() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Reports</p>
        <h1 className="text-3xl font-semibold text-slate-900">Admin Reports</h1>
        <p className="text-sm text-slate-600">This section will show your operational reports once available.</p>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
        <p className="font-semibold">Coming soon</p>
        <p className="mt-2">Run analytics and operational reports from the admin portal.</p>
      </div>

      <div className="mt-6">
        <Link href="/admin/dashboard" className="inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
