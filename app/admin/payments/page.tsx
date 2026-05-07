export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Payments</p>
        <h1 className="text-3xl font-semibold text-slate-900">Track application fees</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-900">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {[
              { user: 'Mary W.', amount: 'KES 500', status: 'Success' },
              { user: 'James K.', amount: 'KES 500', status: 'Pending' },
            ].map((payment) => (
              <tr key={payment.user}>
                <td className="px-4 py-4">{payment.user}</td>
                <td className="px-4 py-4">{payment.amount}</td>
                <td className="px-4 py-4">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
