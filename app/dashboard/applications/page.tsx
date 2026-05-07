export default function ApplicationsPage() {
  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Applications</p>
          <h1 className="text-3xl font-semibold text-slate-900">Your submitted applications</h1>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-900">
            <tr>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {[
              { job: 'Hospitality Supervisor', payment: 'Paid', status: 'Submitted', date: '2026-05-15' },
              { job: 'IT Support Specialist', payment: 'Pending', status: 'Reviewed', date: '2026-05-10' },
            ].map((application) => (
              <tr key={application.job}>
                <td className="px-4 py-4">{application.job}</td>
                <td className="px-4 py-4">{application.payment}</td>
                <td className="px-4 py-4">{application.status}</td>
                <td className="px-4 py-4">{application.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
