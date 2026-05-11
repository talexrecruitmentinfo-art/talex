import JobCard from '@/components/features/job-card';
import { featuredJobs } from '@/constants/jobs';
import { Sparkles } from 'lucide-react';

export default function FeaturedJobs() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-500" />
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">Featured</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Popular Opportunities</h2>
        <p className="text-slate-600">Trusted Canadian employers actively hiring from Kenya</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        {featuredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
