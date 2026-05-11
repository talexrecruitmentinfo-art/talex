import Link from 'next/link';
import Badge from '@/components/ui/badge';
import type { Job } from '@/types/job';
import { MapPin, Calendar, Briefcase, DollarSign, Bookmark } from 'lucide-react';

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-soft hover:shadow-card transition overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-navy-50 to-blue-50 px-6 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{job.company}</p>
            <h3 className="mt-1 text-lg font-bold text-navy-900">{job.title}</h3>
          </div>
          <Badge variant={job.sponsored ? 'success' : 'info'}>
            {job.sponsored ? '✓ Sponsored' : 'Standard'}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-brand-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-600">Category</p>
              <p className="text-sm font-semibold text-slate-900">{job.category || 'Technical'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-600">Province</p>
              <p className="text-sm font-semibold text-slate-900">{job.province}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-brand-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-600">Salary</p>
              <p className="text-sm font-semibold text-slate-900">{job.salary}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-brand-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-600">Deadline</p>
              <p className="text-sm font-semibold text-slate-900">{job.deadline || 'Open'}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2">{job.description}</p>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex items-center gap-3">
        <Link
          href={`/jobs/${job.id}`}
          className="flex-1 inline-flex items-center justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition"
        >
          View Details
        </Link>
        <button className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-100 transition">
          <Bookmark className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
