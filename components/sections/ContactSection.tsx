'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { business, services, features, contact } from '@/lib/config';
import { fadeUp, stagger } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/cinematic/ScrollReveal';

export function ContactSection({ className = '' }: { className?: string }) {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClasses =
    'w-full rounded-brand border border-white/10 bg-surface px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-muted outline-none transition-colors focus:border-brand-accent focus:ring-1 focus:ring-brand-accent';

  return (
    <section className={`py-20 ${className}`}>
      <Container>
        <ScrollReveal className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-lg text-muted">
            Ready to get started? Contact us today.
          </p>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {/* Address */}
            <motion.div variants={fadeUp} className="flex flex-col gap-1">
              <h3 className="font-heading text-lg font-semibold">Address</h3>
              <a
                href={`https://maps.google.com/?q=${contact.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-brand-accent"
              >
                {contact.fullAddress}
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeUp} className="flex flex-col gap-1">
              <h3 className="font-heading text-lg font-semibold">Phone</h3>
              <a
                href={contact.phoneHref}
                className="text-muted transition-colors hover:text-brand-accent"
              >
                {contact.phone}
              </a>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp} className="flex flex-col gap-1">
              <h3 className="font-heading text-lg font-semibold">Email</h3>
              <a
                href={contact.emailHref}
                className="text-muted transition-colors hover:text-brand-accent"
              >
                {contact.email}
              </a>
            </motion.div>

            {/* Business Hours */}
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <h3 className="font-heading text-lg font-semibold">
                Business Hours
              </h3>
              <div className="flex flex-col gap-1 text-sm text-muted">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span>{business.hours.regular}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>{business.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>{business.hours.sunday}</span>
                </div>
                {business.hours.emergency && (
                  <div className="mt-1 flex justify-between font-medium text-brand-accent">
                    <span>Emergency</span>
                    <span>{business.hours.emergency}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          {features.contactForm && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {submitted ? (
                <div className="flex h-full items-center justify-center rounded-brand bg-surface p-8 text-center">
                  <div>
                    <span className="mb-4 block text-4xl">✅</span>
                    <h3 className="font-heading text-xl font-semibold">
                      Thank You!
                    </h3>
                    <p className="mt-2 text-muted">
                      We&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 rounded-brand bg-surface p-8"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formState.phone}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <select
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="">Select a Service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    placeholder="How can we help?"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <Button type="submit" variant="accent" size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
