import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from '@/components/ContactForm'
import { BreadcrumbSchema } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Contact Midas Roofing | Orlando & Central Florida',
  description:
    'Contact Midas Roofing & Construction for roofing repairs, replacements, and free estimates. Serving Orlando and all of Central Florida. License CCC1334831. Longwood, FL.',
  keywords: [
    'contact roofing contractor Orlando',
    'roofing company Longwood FL phone',
    'free roofing estimate Central Florida',
    'roofing repair Orlando FL',
  ],
  alternates: {
    canonical: 'https://midasroofingfl.com/contact',
    types: { 'text/markdown': 'https://midasroofingfl.com/contact.md' },
  },
  openGraph: {
    url: 'https://midasroofingfl.com/contact',
    title: 'Contact Midas Roofing & Construction',
    description: 'Reach out for roofing repairs, replacements, or a free instant estimate. Longwood, FL. License CCC1334831.',
  },
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://midasroofingfl.com' },
        { name: 'Contact', url: 'https://midasroofingfl.com/contact' },
      ]} />
      <section className="relative pt-32 pb-20 bg-dark-card overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimatedSection>
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-4">Get in Touch</p>
            <h1 className="font-jakarta font-bold text-5xl md:text-7xl text-cream leading-tight">
              Let&apos;s Talk<br /><span className="gold-shimmer">About Your Roof.</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <ContactForm />
    </>
  )
}
