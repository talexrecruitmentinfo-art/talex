import Button from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-12 shadow-card sm:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">
            Verified Canada jobs for Kenyan applicants
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Find visa-sponsored opportunities in Canada with fast local support.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Browse verified employer-backed roles, submit your profile, pay safely with M-Pesa, and track your application progress from Kenya.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary">Start Application</Button>
            </Link>
          </div>
        </div>
        <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl sm:p-10">
          <div className="rounded-3xl bg-slate-800/90 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Fast application path</p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
              <p>✅ Secure M-Pesa payment</p>
              <p>✅ Verified sponsors only</p>
              <p>✅ Low-data mobile experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
