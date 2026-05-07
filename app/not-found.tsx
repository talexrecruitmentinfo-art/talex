import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-card">
      <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Page not found</p>
      <h1 className="text-4xl font-semibold text-slate-900">We couldn’t find that page</h1>
      <p className="max-w-xl text-sm leading-7 text-slate-600">Return to the homepage or explore current Canada job listings.</p>
      <Link href="/" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600">
        Back to home
      </Link>
    </div>
  );
}
