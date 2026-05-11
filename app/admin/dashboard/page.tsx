import { Users, Briefcase, FileCheck, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { icon: Users, label: 'Total Users', value: '8,540', detail: '+12% this month' },
    { icon: Briefcase, label: 'Active Jobs', value: '623', detail: '+45 posted' },
    { icon: FileCheck, label: 'Applications', value: '18,240', detail: '+340 this month' },
    { icon: TrendingUp, label: 'Revenue', value: 'KES 6,412,500', detail: '+15% growth' },
  ];

  const latestApplications = [
    { candidate: 'Jane Doe', position: 'Frontend Engineer', status: 'Shortlisted', date: 'May 9, 2026' },
    { candidate: 'Samuel K.', position: 'Product Manager', status: 'Interview', date: 'May 8, 2026' },
    { candidate: 'Naledi M.', position: 'Operations Lead', status: 'Reviewed', date: 'May 7, 2026' },
  ];

  const topPanels = [
    { name: 'Nairobi Sales', value: '34%', color: 'from-brand-500 to-blue-500' },
    { name: 'Support', value: '18%', color: 'from-cyan-500 to-sky-500' },
    { name: 'Recruitment', value: '48%', color: 'from-emerald-500 to-lime-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-navy-600 to-brand-500 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Welcome back, Admin</p>
            <h1 className="mt-3 text-4xl font-semibold">Talex Admin Dashboard</h1>
            <p className="mt-3 max-w-2xl text-slate-200">Monitor platform activity, review applications, and manage jobs from one admin panel.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 text-slate-100 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <PieChart className="h-7 w-7" />
              <div>
                <p className="text-sm text-slate-300">Monthly growth</p>
                <p className="text-2xl font-semibold">+15%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="mt-3 text-sm text-slate-500">{stat.detail}</p>
                </div>
                <div className="rounded-3xl bg-brand-50 p-3 text-brand-600">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Revenue Overview</h2>
              <p className="text-sm text-slate-500">Revenue and application trends for the month.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Updated 2h ago</span>
          </div>
          <div className="space-y-6">
            <div className="h-64 rounded-3xl bg-slate-50 p-6">
              <div className="relative h-full">
                <div className="absolute left-0 right-0 top-0 flex justify-between text-xs text-slate-400">
                  <span>10K</span>
                  <span>7.5K</span>
                  <span>5K</span>
                  <span>2.5K</span>
                  <span>0</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 pt-6">
                  {[60, 90, 80, 110, 100, 130, 120].map((height, index) => (
                    <div key={index} className="flex-1">
                      <div className="mx-auto h-full w-full max-w-[16px] rounded-full bg-brand-500" style={{ height: `${height}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {topPanels.map((panel, idx) => (
                <div key={idx} className={`rounded-3xl border border-slate-200 p-4 bg-gradient-to-br ${panel.color} text-white`}>
                  <p className="text-sm opacity-90">{panel.name}</p>
                  <p className="mt-4 text-2xl font-semibold">{panel.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Application status</h2>
                <p className="text-sm text-slate-500">Latest candidate updates.</p>
              </div>
              <BarChart3 className="h-6 w-6 text-slate-500" />
            </div>
            <div className="space-y-4">
              {latestApplications.map((item, idx) => (
                <div key={idx} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.candidate}</p>
                      <p className="text-sm text-slate-600">{item.position}</p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{item.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
                <p className="text-sm text-slate-500">Jump to the most important admin workflows.</p>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                { label: 'Create a job listing', href: '/admin/jobs/create' },
                { label: 'Review new applications', href: '/admin/applications' },
                { label: 'Check payment reports', href: '/admin/payments' },
              ].map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className="block rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
