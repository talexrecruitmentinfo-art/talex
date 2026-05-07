export default function AdminApplicationsPage() {
  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Applications</p>
        <h1 className="text-3xl font-semibold text-slate-900">Review applicant progress</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-900">
            <tr>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {[
              { applicant: 'Mary W.', job: 'Hospitality Supervisor', status: 'Reviewed' },
              { applicant: 'James K.', job: 'IT Support Specialist', status: 'Shortlisted' },
            ].map((item) => (
              <tr key={item.applicant}>
                <td className="px-4 py-4">{item.applicant}</td>
                <td className="px-4 py-4">{item.job}</td>
                <td className="px-4 py-4">{item.status}</td>
                <td className="px-4 py-4 space-x-2">
                  <button className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700">Approve</button>
                  <button className="rounded-full bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-700">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
