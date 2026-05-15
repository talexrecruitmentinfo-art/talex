import { Users, Briefcase, FileCheck, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { icon: Users, label: 'Registered Applicants', value: '8,540', detail: '+12% this month' },
    { icon: Briefcase, label: 'Active Positions', value: '623', detail: '+45 posted' },
    { icon: FileCheck, label: 'Applications Processed', value: '18,240', detail: '+340 this month' },
    { icon: TrendingUp, label: 'Processing Revenue', value: 'KES 6,412,500', detail: '+15% growth' },
  ];

  const latestApplications = [
    { candidate: 'Jane Doe', position: 'Frontend Engineer', status: 'Shortlisted', date: 'May 9, 2026' },
    { candidate: 'Samuel K.', position: 'Product Manager', status: 'Interview Scheduled', date: 'May 8, 2026' },
    { candidate: 'Naledi M.', position: 'Operations Lead', status: 'Under Review', date: 'May 7, 2026' },
  ];

  const topPanels = [
    { name: 'Nairobi Operations', value: '34%', color: 'from-government-primary to-government-secondary' },
    { name: 'Support Services', value: '18%', color: 'from-cyan-500 to-sky-500' },
    { name: 'Recruitment Division', value: '48%', color: 'from-emerald-500 to-lime-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-government-primary to-government-secondary p-8 text-white shadow-government">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-government-gray">Government Administration Portal</p>
            <h1 className="mt-3 text-4xl font-semibold">Administrative Dashboard</h1>
            <p className="mt-3 max-w-2xl text-government-gray">Official oversight and management of the Canadian employment portal for Kenyan professionals.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 text-white ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <PieChart className="h-7 w-7" />
              <div>
                <p className="text-sm text-government-gray">Monthly Performance</p>
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
            <div key={idx} className="rounded-3xl border border-government-gray bg-white p-6 shadow-government transition hover:shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-government-gray">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-government-dark">{stat.value}</p>
                  <p className="mt-3 text-sm text-government-gray">{stat.detail}</p>
                </div>
                <div className="rounded-3xl bg-government-primary/10 p-3 text-government-primary">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-government-gray bg-white p-6 shadow-government">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-government-dark">Processing Overview</h2>
              <p className="text-sm text-government-gray">Monthly application and revenue statistics.</p>
            </div>
            <span className="rounded-full bg-government-light px-3 py-1 text-xs font-semibold text-government-dark">Updated 2h ago</span>
          </div>
          <div className="space-y-6">
            <div className="h-64 rounded-3xl bg-government-light p-6">
              <div className="relative h-full">
                <div className="absolute left-0 right-0 top-0 flex justify-between text-xs text-government-gray">
                  <span>10K</span>
                  <span>7.5K</span>
                  <span>5K</span>
                  <span>2.5K</span>
                  <span>0</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 pt-6">
                  {[60, 90, 80, 110, 100, 130, 120].map((height, index) => (
                    <div key={index} className="flex-1">
                      <div className="mx-auto h-full w-full max-w-[16px] rounded-full bg-government-primary" style={{ height: `${height}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {topPanels.map((panel, idx) => (
                <div key={idx} className={`rounded-3xl border border-government-gray p-4 bg-gradient-to-br ${panel.color} text-white`}>
                  <p className="text-sm opacity-90">{panel.name}</p>
                  <p className="mt-4 text-2xl font-semibold">{panel.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-government-gray bg-white p-6 shadow-government">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold text-government-dark">Application Status</h2>
                <p className="text-sm text-government-gray">Latest applicant processing updates.</p>
              </div>
              <BarChart3 className="h-6 w-6 text-government-gray" />
            </div>
            <div className="space-y-4">
              {latestApplications.map((item, idx) => (
                <div key={idx} className="rounded-3xl bg-government-light p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-government-dark">{item.candidate}</p>
                      <p className="text-sm text-government-gray">{item.position}</p>
                    </div>
                    <span className="rounded-full bg-government-primary/10 px-3 py-1 text-xs font-semibold text-government-primary">{item.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-government-gray">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-government-gray bg-white p-6 shadow-government">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold text-government-dark">Administrative Actions</h2>
                <p className="text-sm text-government-gray">Access key government portal management functions.</p>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                { label: 'Create Employment Position', href: '/admin/jobs/create' },
                { label: 'Review Applications', href: '/admin/applications' },
                { label: 'Payment Processing Reports', href: '/admin/payments' },
              ].map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className="block rounded-3xl border border-government-gray bg-government-light px-4 py-4 text-sm font-semibold text-government-dark hover:bg-government-gray"
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
