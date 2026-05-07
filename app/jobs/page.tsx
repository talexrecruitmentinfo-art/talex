import JobCard from '@/components/features/job-card';
import { jobs } from '@/constants/jobs';

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Job listings</p>
            <h1 className="text-3xl font-semibold text-slate-900">Browse Canada roles for Kenyan job seekers</h1>
          </div>
          <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">{jobs.length} roles available</div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input type="search" placeholder="Search roles, province or company" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none">
                  <option>Filter by province</option>
                  <option>Ontario</option>
                  <option>British Columbia</option>
                  <option>Alberta</option>
                </select>
              </div>
            </div>
            <div className="grid gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-card">
            <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Filters</p>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Category</p>
                <div className="mt-3 grid gap-2">
                  <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" /> Hospitality</label>
                  <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" /> IT</label>
                  <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" /> Construction</label>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Visa Sponsorship</p>
                <div className="mt-3 grid gap-2">
                  <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" /> Sponsor available</label>
                  <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" /> Open to non-sponsor</label>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
