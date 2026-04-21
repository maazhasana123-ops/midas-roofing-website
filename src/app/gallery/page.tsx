import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import Gallery from '@/components/Gallery'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Project Gallery | Midas Roofing & Construction',
  description: 'Browse our roofing portfolio. Shingle, metal, tile, and TPO projects across Central Florida.',
}

export default function GalleryPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-dark-card overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimatedSection>
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-4">Our Work</p>
            <h1 className="font-jakarta font-bold text-5xl md:text-7xl text-cream leading-tight">
              Results That<br /><span className="gold-shimmer">Speak Volumes.</span>
            </h1>
            <p className="text-cream/60 text-xl max-w-xl mt-6 leading-relaxed">
              Every photo represents a family protected, a building secured, and a promise kept. Browse our portfolio of completed roofing projects across Central Florida.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-pad bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Gallery />

          <AnimatedSection className="text-center mt-16">
            <p className="text-cream/50 text-sm mb-6">Ready to add your home to this portfolio?</p>
            <Link href="/estimate" className="btn-gold">Get Instant Estimate</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
