'use client';

import { lazy, Suspense, useMemo } from 'react';
import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  const key = name.toLowerCase().replace(/_/g, '-');

  const LucideIcon = useMemo(() => {
    if (key in dynamicIconImports) {
      return lazy(dynamicIconImports[key as keyof typeof dynamicIconImports]);
    }
    return null;
  }, [key]);

  if (!LucideIcon) {
    return null;
  }

  return (
    <Suspense fallback={<span style={{ width: size, height: size }} />}>
      <LucideIcon size={size} className={className} {...props} />
    </Suspense>
  );
}
