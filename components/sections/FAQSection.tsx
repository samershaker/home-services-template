'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { business, faqs as defaultFaqs } from '@/lib/config';
import { fadeUp, stagger, ease } from '@/lib/animations';
import type { FAQ } from '@/lib/types';

/* ═══════════════════════════════════════════
   FAQ SECTION — Accordion with glassmorphic cards,
   smooth height animation, and Schema.org structured data.
   ═══════════════════════════════════════════ */

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQ[];
  className?: string;
}

// ─── Chevron Icon ─────────────────────────────────────

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3, ease: ease.smooth as unknown as number[] }}
      className="text-brand-accent flex-shrink-0"
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  );
}

// ─── Accordion Item ───────────────────────────────────

function AccordionItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] overflow-hidden"
    >
      {/* Top specular highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Question button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-heading text-base sm:text-lg font-semibold text-white leading-tight">
          {faq.question}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {/* Answer (animated height) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: ease.smooth as unknown as number[] },
              opacity: { duration: 0.3, delay: 0.1 },
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="h-px bg-gradient-to-r from-brand-accent/20 via-white/10 to-transparent mb-4" />
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Schema.org FAQ Structured Data ───────────────────

function FAQJsonLd({ faqs }: { faqs: FAQ[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Main Section ─────────────────────────────────────

export function FAQSection({
  title = 'Frequently Asked Questions',
  subtitle,
  faqs = defaultFaqs,
  className = '',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const defaultSubtitle = `Got questions? We've got answers. Here's what ${business.name} customers ask most.`;

  if (!faqs || faqs.length === 0) return null;

  return (
    <>
      <FAQJsonLd faqs={faqs} />

      <section className={`py-24 md:py-32 px-6 ${className}`}>
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: ease.smooth as unknown as number[] }}
            className="text-center mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-brand-accent mb-4">
              Common Questions
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed">
              {subtitle ?? defaultSubtitle}
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-4"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
