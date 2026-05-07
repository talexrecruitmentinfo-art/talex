import Link from 'next/link';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import type { Job } from '@/types/job';

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{job.company}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{job.title}</h3>
        </div>
        <Badge variant={job.sponsored ? 'success' : 'info'}>{job.sponsored ? 'Sponsored' : 'Standard'}</Badge>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{job.description}</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <p className="text-sm text-slate-700"><span className="font-semibold">Province:</span> {job.province}</p>
        <p className="text-sm text-slate-700"><span className="font-semibold">Salary:</span> {job.salary}</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link href="/login" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
          View
        </Link>
        <Button variant="secondary">Save</Button>
      </div>
    </div>
  );
}
