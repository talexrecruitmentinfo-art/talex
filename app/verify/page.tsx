'use client';

import Link from 'next/link';

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-card">
          <div className="space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Talex</p>
            <h1 className="text-3xl font-semibold text-slate-900">Verify your account</h1>
            <p className="text-sm text-slate-600">
              Thank you for registering. A verification email has been sent to your inbox. Follow the link to complete your account setup.
            </p>
          </div>

          <div className="mt-8 space-y-4 rounded-3xl bg-slate-50 p-6 text-sm text-slate-600">
            <p>
              If you don&apos;t see the email, check your spam folder or try again in a few minutes.
            </p>
            <p>
              Once verified, return to{' '}
              <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
                sign in
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
