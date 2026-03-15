import { contactMetadata } from '@/lib/seo';
import { JsonLd, localBusinessJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { ContactSection } from '@/components/sections/ContactSection';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata = contactMetadata();

export default function ContactPage() {
  return (
    <PageWrapper>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/en' },
          { name: 'Contact', url: '/en/contact' },
        ])}
      />
      <Breadcrumbs items={[
        { label: 'Home', href: '/en' },
        { label: 'Contact Us' },
      ]} />
      <h1 className="text-4xl md:text-5xl font-bold mb-12">Contact Us</h1>
      <ContactSection />
    </PageWrapper>
  );
}
