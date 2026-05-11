import { Users, Briefcase, FileCheck, TrendingUp, Activity } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { icon: Users, label: 'Total Users', value: '1,280', change: '+12% this month' },
    { icon: Briefcase, label: 'Active Jobs', value: '450', change: '+45 posted' },
    { icon: FileCheck, label: 'Applications', value: '2,500+', change: '+340 this month' },
    { icon: TrendingUp, label: 'Revenue', value: 'KES 1.25M', change: '+15% growth' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-500 to-navy-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-blue-100">Platform management and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft hover:shadow-card transition">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="mt-2 text-xs text-green-600 font-medium">{stat.change}</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-3">
                  <Icon className="h-6 w-6 text-brand-600" />
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
            { label: 'Create Job', href: '/admin/jobs/create' },
            { label: 'Review Applications', href: '/admin/applications' },
            { label: 'View Payments', href: '/admin/payments' },
          ].map((action, idx) => (
            <Link
              key={idx}
              href={action.href}
              className="rounded-lg border-2 border-slate-200 bg-white p-6 text-center hover:border-brand-500 hover:bg-brand-50 transition"
            >
              <Activity className="h-8 w-8 mx-auto mb-3 text-slate-600" />
              <p className="font-semibold text-slate-900">{action.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
          <Link href="/admin/reports" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View reports →
          </Link>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">User</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Action</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Details</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { user: 'John Mwangi', action: 'Applied for job', details: 'Senior Developer at TechCorp', time: '2 hours ago' },
                  { user: 'Admin', action: 'Posted new job', details: 'Project Manager - Ontario', time: '5 hours ago' },
                  { user: 'Sarah K.', action: 'Payment received', details: 'Ksh 500 - Application fee', time: '1 day ago' },
                ].map((activity, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{activity.user}</td>
                    <td className="px-6 py-4 text-slate-600">{activity.action}</td>
                    <td className="px-6 py-4 text-slate-600">{activity.details}</td>
                    <td className="px-6 py-4 text-slate-600">{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <h3 className="font-bold text-slate-900 mb-4">System Status</h3>
        <div className="space-y-3">
          {[
            { name: 'API Server', status: 'Active' },
            { name: 'Database', status: 'Active' },
            { name: 'M-Pesa Integration', status: 'Active' },
            { name: 'Email Service', status: 'Active' },
          ].map((service, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-700">{service.name}</span>
              <span className="inline-flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-semibold text-green-700">{service.status}</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
