'use client';

import { type PropsWithChildren } from 'react';
import Link from 'next/link';

const navigation = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/jobs', label: 'Jobs' },
  { href: '/admin/applications', label: 'Applications' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/payments', label: 'Payments' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="border-b border-slate-300 bg-white px-4 py-4 shadow-sm sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="text-lg font-semibold">Admin Panel</div>
          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">Secure admin access</div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
          <p className="mb-6 text-sm uppercase tracking-[0.2em] text-slate-500">Admin</p>
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
