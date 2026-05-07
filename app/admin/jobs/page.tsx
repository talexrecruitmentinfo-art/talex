import Link from 'next/link';

export default function AdminJobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Jobs management</p>
          <h1 className="text-3xl font-semibold text-slate-900">Manage job listings</h1>
        </div>
        <Link href="/admin/jobs/create" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">
          Create job
        </Link>
      </div>
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-card">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-900">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Applications</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {[
              { title: 'Hospitality Supervisor', applications: 18, status: 'Active' },
              { title: 'IT Support Specialist', applications: 12, status: 'Active' },
            ].map((row) => (
              <tr key={row.title}>
                <td className="px-4 py-4">{row.title}</td>
                <td className="px-4 py-4">{row.applications}</td>
                <td className="px-4 py-4">{row.status}</td>
                <td className="px-4 py-4 space-x-2">
                  <Link href="/admin/jobs/edit/1" className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200">
                    Edit
                  </Link>
                  <button className="rounded-full bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-700">Pause</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
