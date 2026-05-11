import Link from 'next/link';
import { FileCheck, Clock, Bookmark, Bell, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { icon: FileCheck, label: 'Applications', value: '18', detail: '3 new this week', color: 'brand' },
    { icon: Clock, label: 'Pending review', value: '6', detail: 'Waiting for feedback', color: 'blue' },
    { icon: CheckCircle, label: 'Offers', value: '2', detail: 'Review before you accept', color: 'green' },
    { icon: Bell, label: 'Notifications', value: '5', detail: 'New messages and updates', color: 'yellow' },
  ];

  const activityRows = [
    { job: 'Senior Frontend Dev', company: 'MapleTech', status: 'Reviewed', date: 'May 1, 2024' },
    { job: 'Project Manager', company: 'Global Co', status: 'Submitted', date: 'Apr 28, 2024' },
    { job: 'UX Designer', company: 'Design Inc', status: 'Approved', date: 'Apr 25, 2024' },
  ];

  const timelineSteps = [
    { title: 'Applied', description: 'Your application has been submitted', completed: true },
    { title: 'Interview', description: 'Waiting for interview schedule', completed: true },
    { title: 'Offer', description: 'Offer decision expected soon', completed: false },
    { title: 'Onboarding', description: 'Complete onboarding documents', completed: false },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-navy-600 to-brand-500 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Welcome back, John!</p>
            <h1 className="mt-3 text-4xl font-semibold">Your application hub</h1>
            <p className="mt-3 max-w-2xl text-slate-200">See the latest updates for your job applications, recommended roles, and next steps.</p>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-white/10 px-6 py-5 shadow-soft ring-1 ring-white/20">
            <div className="rounded-2xl bg-white/15 p-3 text-brand-100">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-slate-200">Application success rate</p>
              <p className="text-2xl font-semibold">78%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorStyles = {
            brand: 'bg-brand-50 text-brand-600',
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-emerald-50 text-emerald-600',
            yellow: 'bg-yellow-50 text-amber-600',
          } as const;

          return (
            <div key={idx} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
                </div>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${colorStyles[stat.color]}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Application progress</h2>
              <p className="text-sm text-slate-500">Track the next stages for your top application.</p>
            </div>
            <Link href="/dashboard/applications" className="text-sm font-semibold text-brand-600 hover:text-brand-700">View all</Link>
          </div>
          <div className="space-y-4">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900">
                  {idx + 1}
                </div>
                <div className="grow">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${step.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {step.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{step.description}</p>
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
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
          <table className="w-full text-left text-sm text-slate-600">
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
