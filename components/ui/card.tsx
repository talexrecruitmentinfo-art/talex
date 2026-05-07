import { type PropsWithChildren } from 'react';

export default function Card({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      {children}
    </div>
  );
}
