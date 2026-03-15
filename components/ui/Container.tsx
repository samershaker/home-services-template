import { cn } from '@/lib/utils';

const maxWidths = {
  narrow: 'max-w-4xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-full',
} as const;

type ContainerVariant = keyof typeof maxWidths;

interface ContainerProps {
  variant?: ContainerVariant;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function Container({
  variant = 'default',
  className,
  children,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', maxWidths[variant], className)}
    >
      {children}
    </Component>
  );
}
