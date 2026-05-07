export default function AdminUsersPage() {
  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Users</p>
        <h1 className="text-3xl font-semibold text-slate-900">Manage registered users</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-900">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {[
              { name: 'Grace O.', email: 'grace@example.com', status: 'Active' },
              { name: 'Peter N.', email: 'peter@example.com', status: 'Pending' },
            ].map((user) => (
              <tr key={user.email}>
                <td className="px-4 py-4">{user.name}</td>
                <td className="px-4 py-4">{user.email}</td>
                <td className="px-4 py-4">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
