import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Dashboard overview</p>
            <h1 className="text-3xl font-semibold text-slate-900">Your profile at a glance</h1>
          </div>
          <Link href="/dashboard/profile" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">
            Complete profile
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Applications', value: '4' },
            { label: 'Saved jobs', value: '7' },
            { label: 'Notifications', value: '3' },
            { label: 'Profile completion', value: '78%' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
