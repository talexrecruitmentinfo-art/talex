export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Admin overview</p>
            <h1 className="text-3xl font-semibold text-slate-900">Site analytics and management</h1>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Users', value: '1,280' },
            { label: 'Jobs', value: '24' },
            { label: 'Applications', value: '172' },
            { label: 'Revenue', value: 'KES 86,000' },
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
