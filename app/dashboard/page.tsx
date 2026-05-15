import Link from 'next/link';
import { FileCheck, Clock, CheckCircle, Bookmark, Bell, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { icon: FileCheck, label: 'Applications Submitted', value: '18', detail: '3 new this week', color: 'government' },
    { icon: Clock, label: 'Under Review', value: '6', detail: 'Awaiting assessment', color: 'blue' },
    { icon: CheckCircle, label: 'Offers Received', value: '2', detail: 'Ready for consideration', color: 'green' },
    { icon: Bell, label: 'Notifications', value: '5', detail: 'Official updates', color: 'yellow' },
  ];

  const activityRows = [
    { job: 'Senior Frontend Developer', company: 'MapleTech Solutions', status: 'Under Review', date: 'May 1, 2026' },
    { job: 'Project Manager', company: 'Global Enterprises Ltd', status: 'Application Received', date: 'Apr 28, 2026' },
    { job: 'UX Designer', company: 'Design Innovations Inc', status: 'Approved', date: 'Apr 25, 2026' },
  ];

  const timelineSteps = [
    { title: 'Application Submitted', description: 'Your application has been officially received', completed: true },
    { title: 'Document Verification', description: 'Documents are being verified by authorities', completed: true },
    { title: 'Interview Process', description: 'Interview scheduling in progress', completed: false },
    { title: 'Final Decision', description: 'Awaiting final approval decision', completed: false },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-government-primary to-government-secondary p-8 text-white shadow-government">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-government-gray">Welcome to your portal</p>
            <h1 className="mt-3 text-4xl font-semibold">Applicant Dashboard</h1>
            <p className="mt-3 max-w-2xl text-government-gray">Access your official application status, track progress, and manage your Canadian employment opportunities.</p>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-white/10 px-6 py-5 shadow-government ring-1 ring-white/20">
            <div className="rounded-2xl bg-white/15 p-3 text-government-accent">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-government-gray">Success Rate</p>
              <p className="text-2xl font-semibold">78%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorStyles = {
            government: 'bg-government-primary/10 text-government-primary',
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-emerald-50 text-emerald-600',
            yellow: 'bg-yellow-50 text-amber-600',
          } as const;

          return (
            <div key={idx} className="rounded-3xl border border-government-gray bg-white p-6 shadow-government transition hover:shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-government-gray">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-government-dark">{stat.value}</p>
                </div>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${colorStyles[stat.color as keyof typeof colorStyles]}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-government-gray">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="space-y-6 rounded-3xl border border-government-gray bg-white p-6 shadow-government">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-government-dark">Application Progress</h2>
              <p className="text-sm text-government-gray">Official status of your current application process.</p>
            </div>
            <Link href="/dashboard/applications" className="text-sm font-semibold text-government-primary hover:text-government-secondary">View all applications</Link>
          </div>
          <div className="space-y-4">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl border border-government-gray bg-government-light text-sm font-semibold text-government-dark">
                  {idx + 1}
                </div>
                <div className="grow">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-government-dark">{step.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${step.completed ? 'bg-green-100 text-green-700' : 'bg-government-gray text-government-dark'}`}>
                      {step.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-government-gray">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Recommended next step</h2>
              <p className="text-sm text-slate-500">Complete your profile and stay ready for the next match.</p>
            </div>
            <Bookmark className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Upload your resume</p>
              <p className="mt-2 text-sm text-slate-600">An updated resume increases interview invites by 42%.</p>
              <Link href="/resume-upload" className="mt-4 inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">Upload CV</Link>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Review saved jobs</p>
              <p className="mt-2 text-sm text-slate-600">Keep your saved roles human-reviewed and ready to apply.</p>
              <Link href="/dashboard/saved-jobs" className="mt-4 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100">View saved jobs</Link>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Recent applications</h2>
            <p className="text-sm text-slate-500">Latest statuses from the jobs you applied to.</p>
          </div>
          <Link href="/dashboard/applications" className="text-sm font-semibold text-brand-600 hover:text-brand-700">View details →</Link>
        </div>
        <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200">
          <table className="min-w-[720px] w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-6 py-4 font-medium">Job Title</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {activityRows.map((activity, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{activity.job}</td>
                  <td className="px-6 py-4">{activity.company}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{activity.status}</span>
                  </td>
                  <td className="px-6 py-4">{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
