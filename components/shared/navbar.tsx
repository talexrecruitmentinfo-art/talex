'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/jobs', label: 'Jobs' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/report', label: 'Report' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1 text-4xl font-bold sm:text-5xl">
          <span className="text-red-500">T</span>
          <span className="text-blue-500">a</span>
          <span className="text-green-500">l</span>
          <span className="text-purple-500">e</span>
          <span className="text-orange-500">x</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Login
          </Link>
          <Link href="/register" className="hidden rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 sm:inline-flex">
            Register
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className="text-lg">☰</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white p-4 md:hidden">
          <div className="space-y-3">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                {item.label}
              </Link>
            ))}
            <Link href="/login" className="block rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Login
            </Link>
            <Link href="/register" className="block rounded-2xl bg-brand-500 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-600">
              Register
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
