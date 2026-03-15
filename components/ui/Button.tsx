'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'bg-brand-primary text-white hover:opacity-90 shadow-md hover:shadow-lg',
  secondary:
    'border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white',
  accent:
    'bg-brand-accent text-white hover:opacity-90 shadow-md hover:shadow-lg',
  ghost:
    'bg-transparent text-DEFAULT hover:bg-surface',
} as const;

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: 'button';
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'a';
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-brand transition-all duration-200 cursor-pointer whitespace-nowrap',
      variants[variant],
      sizes[size],
      className
    );

    if ('as' in props && props.as === 'a') {
      const { as: _, ...anchorProps } = props;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    const { as: _, ...buttonProps } = props as ButtonAsButton;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ─── Phone Call Button ────────────────────────────────

interface PhoneButtonProps {
  phone: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

export function PhoneButton({
  phone,
  variant = 'accent',
  size = 'md',
  className,
  children,
}: PhoneButtonProps) {
  const href = `tel:${phone.replace(/[^+\d]/g, '')}`;

  return (
    <Button as="a" href={href} variant={variant} size={size} className={className}>
      {children ?? phone}
    </Button>
  );
}
