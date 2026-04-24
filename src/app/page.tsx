import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Script from 'next/script'
import AnimatedSection from '@/components/AnimatedSection'
import GoldDivider from '@/components/GoldDivider'
import ScrollVideo from '@/components/ScrollVideo'
import BeforeAfterVideoSection from '@/components/BeforeAfterVideoSection'
import TestimonialV2 from '@/components/ui/testimonial-v2'
import { LocationMap } from '@/components/ui/expand-map'
import HomeStats from '@/components/HomeStats'
import ServiceCards from '@/components/ServiceCards'
import PillarCards from '@/components/PillarCards'
import RoofAnimationSection from '@/components/RoofAnimationSection'
import { OwensCorningCard } from '@/components/ui/owens-corning-card'
import { HomeFAQSchema } from '@/components/JsonLd'
import HomeFAQ from '@/components/HomeFAQ'

export const metadata: Metadata = {
  title: "Midas Roofing & Construction | Central Florida's #1 Roofing Experts",
  description:
    'Licensed roofing contractor serving Central Florida since 2004. Shingle, metal, tile, TPO roofing & more. No-Leak Promise. Owens Corning Preferred. License CCC1334831. Serving Orlando, Tavares FL.',
  alternates: {
    canonical: 'https://midasroofingfl.com',
    types: {
      'text/plain': 'https://midasroofingfl.com/llm.txt',
      'text/markdown': 'https://midasroofingfl.com/index.md',
    },
  },
  openGraph: {
    url: 'https://midasroofingfl.com',
    title: "Midas Roofing & Construction | Central Florida's #1 Roofing Experts",
    description:
      "Central Florida's most trusted licensed roofer. Shingle, metal, tile, TPO. No-Leak Promise. Owens Corning Preferred. CCC1334831.",
    images: [{ url: '/images/hero2.2.png', width: 1200, height: 630, alt: 'Midas Roofing & Construction team in Central Florida' }],
  },
}

const trustBadges = [
  '20+ Years Experience',
  'No-Leak Promise',
  'Licensed & Insured',
  'Central Florida Native',
  '500+ Roofs Installed',
]

export default function HomePage() {
  return (
    <>
      <HomeFAQSchema />
      <Script src="https://fast.wistia.net/assets/external/E-v1.js" strategy="afterInteractive" />

      {/* ───────────────────────────────── HERO ───────────────────────────────── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100svh' }}>
        <div className="absolute inset-0">
          <Image
            src="/images/hero2.2.png"
            alt="Midas Roofing & Construction team with branded vehicles"
            fill
            className="object-cover object-[center_65%]"
            priority
            quality={95}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/20 to-dark/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.1)_0%,_transparent_70%)] blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center py-24 sm:py-0">
          <AnimatedSection delay={0.05}>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 rounded-full px-3 py-1.5 mb-5 sm:mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-[10px] sm:text-xs font-jakarta font-semibold tracking-[0.12em] uppercase">
                Serving Central Florida for 20+ Years
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <h1 className="font-jakarta font-bold text-[clamp(2.2rem,8vw,5.5rem)] leading-[1.05] text-cream mb-4 sm:mb-5 tracking-tight text-balance">
              Central Florida&apos;s Most<br />
              Trusted <span className="gold-shimmer">Roofing Experts</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-cream/65 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-7 sm:mb-10 font-inter leading-relaxed">
              From shingles to metal, tile to TPO — Midas Roofing delivers premium
              craftsmanship backed by our exclusive No-Leak Promise.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.28}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/estimate" id="hero-primary-cta" className="btn-gold text-sm px-8 py-3.5 sm:py-4 tracking-wide">
                Get Instant Estimate
              </Link>
              <Link href="/gallery" id="hero-secondary-cta" className="btn-outline-gold text-sm px-8 py-3.5 sm:py-4 tracking-wide">
                View Our Work
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="mt-8 sm:mt-14">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-8">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-gold/70" />
                  <span className="text-cream/45 text-[10px] sm:text-xs font-jakarta font-medium tracking-wide">{badge}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-cream/30 text-[9px] tracking-[0.25em] uppercase font-jakarta">Scroll</span>
          <div className="relative w-px h-10 bg-gold/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gold to-gold/0 animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* ──────────────── BEFORE & AFTER VIDEO ─────────────────────────────────── */}
      <BeforeAfterVideoSection />

      {/* ─────────────────── SCROLL VIDEO ──────────────────────────────────────── */}
      <ScrollVideo />

      {/* ─────────────────────────── STATS STRIP ──────────────────────────────── */}
      <HomeStats />

      {/* ─────────────────────────── SERVICES ─────────────────────────────────── */}
      <section className="section-pad bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.06)_0%,_transparent_70%)] -translate-y-1/4 translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">What We Do</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-5 tracking-tight">
              Complete Roofing Solutions
            </h2>
            <GoldDivider />
            <p className="text-cream/50 max-w-lg mx-auto font-inter text-base leading-relaxed mt-5">
              Whether you&apos;re replacing a worn shingle roof or upgrading to a
              lifetime metal system, we bring expert craftsmanship to every job.
            </p>
          </AnimatedSection>

          <ServiceCards />

          <AnimatedSection className="text-center mt-10">
            <Link href="/services" className="btn-outline-gold text-sm">View All Services</Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ──────────────────── MARQUEE TRUST STRIP ─────────────────────────────── */}
      <div className="py-4 bg-dark-card border-y border-gold/10 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-0 flex-shrink-0">
              {['Licensed & Insured','CCC1334831','No-Leak Promise','Central Florida Native','Shingle • Metal • Tile • TPO','20+ Years Experience','Free Estimates','Hurricane Ready'].map((item) => (
                <div key={item} className="flex items-center gap-6 px-6">
                  <span className="text-gold/30 text-[10px]">◆</span>
                  <span className="text-cream/35 text-xs font-jakarta font-medium tracking-[0.12em] uppercase">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────────────── VIDEO SECTION ─────────────────────────────── */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-jakarta font-bold text-3xl md:text-4xl text-gold">Why Florida Homeowners Trust Midas Roofing?</h2>
          </AnimatedSection>
          <AnimatedSection className="max-w-[900px] mx-auto w-full aspect-video rounded-sm overflow-hidden shadow-2xl relative bg-black/20">
            {/* @ts-expect-error - Custom Wistia web component */}
            <wistia-player media-id="0pr2x9lbx9" className="w-full h-full object-cover"></wistia-player>
          </AnimatedSection>
        </div>
      </section>

      {/* ────────────────────────── WHY MIDAS ─────────────────────────────────── */}
      <section className="section-pad bg-dark-card relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[radial-gradient(ellipse_at_left,_rgba(201,168,76,0.06)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">Why Choose Us</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream tracking-tight">The Midas Standard</h2>
          </AnimatedSection>
          <PillarCards />
        </div>
      </section>

      {/* ───────────────── CINEMATIC SPLIT ────────────────────────── */}
      <section className="relative overflow-hidden h-[540px] md:h-[600px]">
        <Image
          src="/images/6.png"
          alt="Premium tile roof installed by Midas Roofing & Construction"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <AnimatedSection className="max-w-lg" from="left">
              <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">Tile Roofing</p>
              <h2 className="font-jakarta font-bold text-4xl md:text-6xl text-cream mb-5 leading-tight tracking-tight">
                Built to Last.<br /><span className="gold-shimmer">Priced to Win.</span>
              </h2>
              <p className="text-cream/60 text-base leading-relaxed mb-8 max-w-sm">
                Every Midas roof is engineered for Florida&apos;s climate — hurricanes, heat, and everything in between.
              </p>
              <Link href="/estimate" className="btn-gold text-sm">Get Instant Estimate</Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─────────────── ROOF ANIMATION SCROLL VIDEO ────────────────────── */}

      <RoofAnimationSection />

      {/* ─────────────────────────── REVIEWS ──────────────────────────────── */}
      {/*
        The -100vh negative margin is desktop-only: on mobile the RoofAnimationSection
        renders as a normal-height scrollable section (~800-1000px), so pulling reviews
        up by 100vh would cover it entirely. On lg+ the section is 300vh sticky so
        the -100vh overlap works correctly for the scroll-scrub recede effect.
      */}
      <div className="relative z-10 -mt-[80vh] lg:-mt-[100vh]">
        <TestimonialV2 />
      </div>

      {/* ─────────────────────── PROMISE BANNER ───────────────────────────────── */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-dark-card">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,_rgba(201,168,76,0.1)_0%,_transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-16 h-16 border border-gold/30 rounded-full mb-7 bg-gold/[0.05]">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-gold" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">Our Guarantee</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-5 leading-tight tracking-tight">
              The <span className="gold-shimmer">No-Leak Promise</span>
            </h2>
            <p className="text-cream/55 text-base max-w-xl mx-auto leading-relaxed mb-8">
              Every roof we install is backed by our exclusive No-Leak Promise. If it leaks — we fix it free, no questions asked.
            </p>
            <Link href="/about" className="btn-outline-gold text-sm">Learn About Our Promise</Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─────────────────────── SERVICE AREA ───────────────────────────────── */}
      <section className="section-pad bg-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <AnimatedSection className="flex-1 text-center lg:text-left" from="left">
              <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">Service Area</p>
              <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-5 tracking-tight">
                Proudly Serving <span className="gold-shimmer">Orlando</span>
              </h2>
              <p className="text-cream/50 text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Midas Roofing &amp; Construction serves the greater Orlando metro and all of Central Florida.
                From residential neighborhoods to commercial districts — we&apos;re your local roofing experts.
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {['Orlando','Windermere','Dr. Phillips','Winter Park','Longwood','Lake Mary','Lake Nona','Winter Garden','Baldwin Park','College Park'].map((city) => (
                  <span key={city} className="px-3 py-1.5 text-xs font-jakarta font-medium text-cream/50 bg-white/[0.03] border border-white/5 rounded-full hover:border-gold/30 hover:text-gold transition-all duration-200">
                    {city}
                  </span>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection className="flex-shrink-0 flex flex-col items-center gap-8">
              <p className="text-cream/30 text-xs font-jakarta font-medium tracking-[0.2em] uppercase">Current Location</p>
              <LocationMap location="Orlando, FL" coordinates="28.5383° N, 81.3792° W" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ──────────────────── OWENS CORNING PREFERRED CONTRACTOR ─────────── */}
      <section className="section-pad bg-dark-card relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">Our Certifications</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-5 tracking-tight">
              Backed by the <span className="gold-shimmer">Best in the Industry</span>
            </h2>
            <p className="text-cream/50 max-w-lg mx-auto font-inter text-base leading-relaxed">
              We partner only with industry-leading manufacturers so every roof we install
              carries the manufacturer&apos;s backing alongside our own No-Leak Promise.
            </p>
          </AnimatedSection>
          <AnimatedSection className="flex justify-center">
            <OwensCorningCard />
          </AnimatedSection>
        </div>
      </section>

      {/* ─────────────────────────── FAQ ─────────────────────────────────────── */}
      <HomeFAQ />

      {/* ─────────────────────────── FINAL CTA ───────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.12)_0%,_transparent_65%)]" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-5">Ready to Start?</p>
            <h2 className="font-jakarta font-bold text-5xl md:text-7xl text-cream mb-5 leading-tight tracking-tight">
              Your Roof. <span className="gold-shimmer">Our Promise.</span>
            </h2>
            <p className="text-cream/50 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Get a free, no-obligation instant estimate in minutes using satellite measurement technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/estimate" id="final-cta-primary" className="btn-gold text-sm px-10 py-4 tracking-wide">Get Instant Estimate</Link>
              <Link href="/contact" id="final-cta-secondary" className="btn-outline-gold text-sm px-10 py-4 tracking-wide">Contact Us</Link>
            </div>
            <p className="text-cream/25 text-xs mt-10 font-inter tracking-wide">
              License CCC1334831 · Tavares, FL · Serving All of Central Florida
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
