import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export default function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}: PropsWithChildren<ButtonProps>) {
  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2';
  const variantStyles =
    variant === 'primary'
      ? 'bg-brand-500 text-white shadow-sm hover:bg-brand-600'
      : variant === 'secondary'
      ? 'bg-slate-100 text-slate-900 hover:bg-slate-200'
      : 'bg-transparent text-slate-700 hover:bg-slate-100';

  return (
    <button className={`${base} ${variantStyles} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
