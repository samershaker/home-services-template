import type { SectionProps } from '@/lib/types';

interface PageWrapperProps extends SectionProps {
  title?: string;
}

export function PageWrapper({ title, className = '', children }: PageWrapperProps) {
  return (
    <main className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 ${className}`}>
      {title && (
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
          {title}
        </h1>
      )}
      {children}
    </main>
  );
}
