import JobCard from '@/components/features/job-card';
import { featuredJobs } from '@/constants/jobs';

export default function FeaturedJobs() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Featured jobs</p>
          <h2 className="text-3xl font-semibold text-slate-900">Popular visa-sponsored roles</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-600">Explore trusted Canadian employers with fast onboarding for Kenyan applicants.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        {featuredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
