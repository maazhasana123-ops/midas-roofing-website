import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'
import Gallery from '@/components/Gallery'
import ReviewImages from '@/components/ReviewImages'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Roofing Project Gallery | Central Florida | Midas Roofing',
  description:
    'Browse 500+ roofing projects by Midas Roofing & Construction across Central Florida — shingle, metal, tile, and TPO installations with aerial drone photography.',
  keywords: [
    'roofing portfolio Central Florida',
    'roofing project photos Orlando',
    'metal roof installation Florida photos',
    'tile roof replacement photos',
    'shingle roof before after Florida',
  ],
  alternates: {
    canonical: 'https://midasroofingfl.com/gallery',
    types: { 'text/markdown': 'https://midasroofingfl.com/gallery.md' },
  },
  openGraph: {
    url: 'https://midasroofingfl.com/gallery',
    title: 'Roofing Project Gallery | Midas Roofing & Construction',
    description: '500+ roofing projects in Central Florida. Shingle, metal, tile, TPO with aerial drone photos.',
    images: [{ url: '/images/gallery/dji_fly_20250908_135625_261_1725816058208_photo.JPG', width: 1200, height: 630, alt: 'Aerial view of completed roof by Midas Roofing' }],
  },
}

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://midasroofingfl.com' },
        { name: 'Gallery', url: 'https://midasroofingfl.com/gallery' },
      ]} />
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
      <section className="section-pad bg-dark-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(201,168,76,0.07)_0%,_transparent_60%)]" />
          <AnimatedSection className="mb-10 relative">
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-4">⭐ Happy Clients</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream leading-tight">
              What Our Clients <span className="gold-shimmer">Say.</span>
            </h2>
            <p className="text-cream/60 text-lg max-w-xl mt-4 leading-relaxed">
              Real reviews, real results. See what homeowners across Central Florida have to say about their experience with Midas Roofing.
            </p>
          </AnimatedSection>
          <ReviewImages />
        </div>
      </section>
    </>
  )
}
