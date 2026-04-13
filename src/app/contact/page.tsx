import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Midas Roofing & Construction',
  description: 'Get in touch with Midas Roofing & Construction. Located in Tavares, FL. Serving all of Central Florida. License CCC1334831.',
}

export default function ContactPage() {
  return (
    <>
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
