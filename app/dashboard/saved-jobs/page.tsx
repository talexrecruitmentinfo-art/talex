export default function SavedJobsPage() {
  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Saved jobs</p>
        <h1 className="text-3xl font-semibold text-slate-900">Jobs you want to revisit</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {['Hospitality Supervisor', 'IT Support Specialist'].map((job) => (
          <div key={job} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="font-semibold text-slate-900">{job}</p>
            <p className="mt-2 text-sm text-slate-600">Tap the job card to continue your application.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
