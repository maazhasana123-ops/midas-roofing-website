import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import GoldDivider from '@/components/GoldDivider'
import ServicesGrid from '@/components/ServicesGrid'

export const metadata: Metadata = {
  title: 'Roofing Services | Midas Roofing & Construction',
  description: 'Shingle, metal, tile, TPO roofing, roof coatings, residential and commercial roofing in Central Florida. Licensed contractor CCC1334831.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 bg-dark-card overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimatedSection>
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-4">What We Do</p>
            <h1 className="font-jakarta font-bold text-5xl md:text-7xl text-cream mb-6 leading-tight">
              Every Roof Type.<br /><span className="gold-shimmer">One Team.</span>
            </h1>
            <GoldDivider />
            <p className="text-cream/60 text-xl max-w-2xl mt-6 leading-relaxed">
              From simple shingle repairs to full commercial TPO systems, Midas Roofing handles it all with the same meticulous attention to detail.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services grid */}
      <ServicesGrid />

      {/* CTA */}
      <section className="section-pad bg-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-jakarta font-bold text-4xl text-cream mb-4">Not Sure Which Roof Is Right for You?</h2>
            <p className="text-cream/60 mb-8 leading-relaxed">Our team will assess your property, budget, and preferences to recommend the perfect roofing system.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estimate" className="btn-gold">Get Free Estimate</Link>
              <Link href="/contact" className="btn-outline-gold">Ask a Question</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
