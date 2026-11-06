import type { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  children: ReactNode;
}

/** Pulsante riutilizzabile con varianti coerenti col tema dark. */
export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base =
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/80',
    ghost: 'bg-surface-3 text-zinc-200 hover:bg-border-soft',
    danger: 'bg-red-900/60 text-red-200 hover:bg-red-900',
  } as const;
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
