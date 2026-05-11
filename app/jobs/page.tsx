import JobCard from '@/components/features/job-card';
import { jobs } from '@/constants/jobs';
import { Search, Filter } from 'lucide-react';

export default function JobsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-500 to-navy-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Browse Canada Jobs</h1>
        <p className="mt-2 text-blue-100">Verified opportunities for Kenyan professionals</p>
        <div className="mt-4 inline-flex bg-white/20 px-4 py-2 rounded-lg text-blue-100">
          <span className="font-semibold">{jobs.length}+</span>
          <span className="ml-2">Active positions</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Jobs List */}
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="relative col-span-2 sm:col-span-2">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search roles, companies..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
                <select className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
                  <option>All Provinces</option>
                  <option>Ontario</option>
                  <option>British Columbia</option>
                  <option>Alberta</option>
                  <option>Manitoba</option>
                  <option>Quebec</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft h-fit sticky top-navbar">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-brand-600" />
            <h3 className="font-bold text-slate-900">Filters</h3>
          </div>

          {/* Category Filter */}
          <div className="space-y-4">
            <div className="pb-4 border-b border-slate-200">
              <label className="block font-semibold text-slate-900 mb-3 text-sm">Category</label>
              <div className="space-y-2">
                {['Technology', 'Healthcare', 'Construction', 'Hospitality', 'Finance'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-brand-500"
                    />
                    <span className="text-sm text-slate-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Visa Sponsorship Filter */}
            <div className="pb-4 border-b border-slate-200">
              <label className="block font-semibold text-slate-900 mb-3 text-sm">Visa Sponsorship</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-brand-500"
                  />
                  <span className="text-sm text-slate-700">Sponsor Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-brand-500"
                  />
                  <span className="text-sm text-slate-700">No Sponsorship Required</span>
                </label>
              </div>
            </div>

            {/* Salary Range Filter */}
            <div>
              <label className="block font-semibold text-slate-900 mb-3 text-sm">Salary Range</label>
              <div className="space-y-2">
                {['40K - 60K', '60K - 80K', '80K - 100K', '100K+'].map((range) => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-brand-500"
                    />
                    <span className="text-sm text-slate-700">CAD ${range}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button className="w-full mt-6 rounded-lg border-2 border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition">
              Reset Filters
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
