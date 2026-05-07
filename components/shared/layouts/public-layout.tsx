import { type PropsWithChildren } from 'react';
import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
