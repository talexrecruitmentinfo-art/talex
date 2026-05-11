import Link from 'next/link';
import { Briefcase, FileCheck, Clock, CheckCircle, AlertCircle, Download, Settings } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-500 to-navy-600 p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="mt-2 text-blue-100">Track your Canada job applications and manage your profile</p>
          </div>
          <div className="hidden sm:block text-blue-200">
            <Briefcase className="h-16 w-16 opacity-50" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: FileCheck, label: 'Applications', value: '4', color: 'brand' },
          { icon: Clock, label: 'Pending Review', value: '2', color: 'blue' },
          { icon: CheckCircle, label: 'Approved', value: '1', color: 'green' },
          { icon: AlertCircle, label: 'Notifications', value: '3', color: 'yellow' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          const colorClasses = {
            brand: 'bg-brand-50 text-brand-600',
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            yellow: 'bg-yellow-50 text-yellow-600',
          };
          return (
            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-card transition">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Briefcase, label: 'Browse Jobs', href: '/jobs' },
            { icon: Download, label: 'Upload CV', href: '/dashboard/profile' },
            { icon: Settings, label: 'Update Profile', href: '/dashboard/profile' },
          ].map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                href={action.href}
                className="rounded-lg border-2 border-slate-200 bg-white p-6 text-center hover:border-brand-500 hover:bg-brand-50 transition"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 mb-3">
                  <Icon className="h-6 w-6 text-slate-600" />
                </div>
                <p className="font-semibold text-slate-900">{action.label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Applications */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Recent Applications</h2>
          <Link href="/dashboard/applications" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Job Title</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Company</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Date Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { job: 'Senior Developer', company: 'Tech Corp', status: 'Reviewed', date: '2024-05-01' },
                  { job: 'Project Manager', company: 'Global Co', status: 'Submitted', date: '2024-04-28' },
                  { job: 'UI/UX Designer', company: 'Design Inc', status: 'Approved', date: '2024-04-25' },
                ].map((app, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{app.job}</td>
                    <td className="px-6 py-4 text-slate-600">{app.company}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        app.status === 'Reviewed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{app.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Profile Completion */}
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <h3 className="font-bold text-slate-900 mb-4">Profile Completion</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Overall Progress</span>
              <span className="text-sm font-semibold text-slate-900">78%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full w-3/4 bg-brand-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            📝 Complete your profile to increase your chances of getting matched with opportunities.
          </p>
          <Link href="/dashboard/profile" className="inline-flex rounded-lg bg-brand-500 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-600 transition">
            Complete Profile
          </Link>
        </div>
      </section>
    </div>
  );
}
