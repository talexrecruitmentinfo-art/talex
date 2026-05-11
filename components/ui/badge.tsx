import { type PropsWithChildren } from 'react';

type BadgeProps = {
  variant?: 'success' | 'warning' | 'info' | 'error' | 'default';
};

export default function Badge({ children, variant = 'info' }: PropsWithChildren<BadgeProps>) {
  const base = 'inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider';
  const styles: Record<string, string> = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
    error: 'bg-brand-100 text-brand-700',
    default: 'bg-slate-100 text-slate-700',
  };

  return <span className={`${base} ${styles[variant] || styles.default}`.trim()}>{children}</span>;
}
