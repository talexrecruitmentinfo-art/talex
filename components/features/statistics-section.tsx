'use client';

import { Users, Briefcase, CheckCircle } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  {
    label: 'Applications Submitted',
    value: '2,500+',
    icon: <Briefcase className="h-6 w-6 text-brand-500" />,
  },
  {
    label: 'Active Jobs',
    value: '150+',
    icon: <Users className="h-6 w-6 text-brand-500" />,
  },
  {
    label: 'Approved Applicants',
    value: '890+',
    icon: <CheckCircle className="h-6 w-6 text-brand-500" />,
  },
];

export default function StatisticsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-2xl bg-gradient-to-r from-navy-600 to-navy-700 p-8 sm:p-12 shadow-lg">
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <p className="text-4xl font-bold text-white sm:text-5xl">{stat.value}</p>
                <p className="mt-2 text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
