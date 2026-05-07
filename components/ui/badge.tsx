import { type PropsWithChildren } from 'react';

type BadgeProps = {
  variant?: 'success' | 'warning' | 'info';
};

export default function Badge({ children, variant = 'info' }: PropsWithChildren<BadgeProps>) {
  const base = 'inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]';
  const styles =
    variant === 'success'
      ? 'bg-emerald-100 text-emerald-700'
      : variant === 'warning'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-sky-100 text-sky-700';

  return <span className={`${base} ${styles}`.trim()}>{children}</span>;
}
