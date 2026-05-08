import FeaturedJobs from '@/components/features/featured-jobs';
import HeroSection from '@/components/features/hero-section';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Search Canada jobs</p>
            <h2 className="text-3xl font-semibold text-slate-900">Find roles by province, category, or visa sponsorship</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Verified jobs</p>
            <p className="mt-3 text-sm text-slate-600">Every listing is reviewed and approved for Kenyan candidates.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Secure payments</p>
            <p className="mt-3 text-sm text-slate-600">M-Pesa support ensures easy payment without hidden charges.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Fast mobile access</p>
            <p className="mt-3 text-sm text-slate-600">Built to perform on low-end Android devices and limited data plans.</p>
          </div>
        </div>
      </section>

      <FeaturedJobs />

      <section className="rounded-[32px] border border-slate-200 bg-brand-500 px-8 py-10 text-white shadow-card sm:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-100">Ready to apply?</p>
            <h2 className="mt-4 text-3xl font-semibold">Create your account and start your Canada job application today.</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/register" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-600 hover:bg-slate-100">
              Register now
            </a>
            <a href="/jobs" className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Browse jobs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
