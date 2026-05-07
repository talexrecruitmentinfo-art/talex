'use client';

import { type PropsWithChildren } from 'react';
import Link from 'next/link';

const navigation = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/applications', label: 'Applications' },
  { href: '/dashboard/saved-jobs', label: 'Saved Jobs' },
  { href: '/dashboard/notifications', label: 'Notifications' },
  { href: '/dashboard/profile', label: 'Profile' },
  { href: '/dashboard/settings', label: 'Settings' },
];

export default function DashboardLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
        <div className="mx-auto max-w-7xl text-sm font-semibold text-slate-900">Dashboard</div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
          <p className="mb-6 text-sm uppercase tracking-[0.2em] text-slate-500">Menu</p>
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </aside>
        <section className="space-y-6">{children}</section>
      </div>
    </div>
  );
}
