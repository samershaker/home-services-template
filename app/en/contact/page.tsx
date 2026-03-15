import { contactMetadata } from '@/lib/seo';
import { JsonLd, localBusinessJsonLd } from '@/lib/seo';
import { ContactSection } from '@/components/sections/ContactSection';
import { PageWrapper } from '@/components/layout/PageWrapper';

export const metadata = contactMetadata();

export default function ContactPage() {
  return (
    <PageWrapper title="Contact Us">
      <JsonLd data={localBusinessJsonLd()} />
      <ContactSection />
    </PageWrapper>
  );
}
