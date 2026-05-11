import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
};

export default function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}: PropsWithChildren<ButtonProps>) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-brand-500 text-white shadow-sm hover:bg-brand-600 focus:ring-brand-500',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500',
    outline: 'border-2 border-slate-200 text-slate-900 hover:bg-slate-50 focus:ring-slate-500',
  };

  return (
    <button className={`${base} ${variantStyles[variant]} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
