import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import GoldDivider from '@/components/GoldDivider'
import ScrollVideo from '@/components/ScrollVideo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Midas Roofing & Construction | Central Florida\'s #1 Roofing Experts',
  description: 'Licensed roofing contractor serving Central Florida since 2004. Shingle, metal, tile, TPO roofing & more. 5-Year No-Leak Promise. License CCC1334831. Tavares, FL.',
}

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Shingle Roofing',
    desc: 'Residential & commercial asphalt shingle systems built for Florida weather.',
    href: '/services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Metal Roofing',
    desc: 'Standing seam and corrugated metal roofs — last 50+ years in Florida heat.',
    href: '/services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Tile Roofing',
    desc: 'Clay and concrete tile roofing combining elegance with durability.',
    href: '/services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'TPO Roofing',
    desc: 'Advanced thermoplastic systems for flat commercial roofs.',
    href: '/services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Roof Coatings',
    desc: "Extend your roof's life with reflective protective coating systems.",
    href: '/services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Commercial',
    desc: 'Large-scale commercial projects — warehouses, retail, multifamily.',
    href: '/services',
  },
]

const reviews = [
  {
    name: 'Marcus T.',
    location: 'Tavares, FL',
    stars: 5,
    text: 'Midas replaced our entire roof after Hurricane Ian damage. The crew personally walked us through every step. Professional, fast, and the workmanship is immaculate. Three months later — zero leaks.',
    initials: 'MT',
  },
  {
    name: 'Sandra R.',
    location: 'Leesburg, FL',
    stars: 5,
    text: "I got quotes from four contractors. Midas wasn't the cheapest, but our project manager explained exactly what needed to be done and why. Best investment we've made in our home. The roof looks incredible.",
    initials: 'SR',
  },
  {
    name: 'David & Amy K.',
    location: 'Mount Dora, FL',
    stars: 5,
    text: "We went with the metal roof option and couldn't be happier. The team finished ahead of schedule, cleaned up everything, and the 5-Year No-Leak Promise gave us total peace of mind. 10/10 recommend.",
    initials: 'DK',
  },
]

const pillars = [
  {
    number: '01',
    title: '5-Year No-Leak Promise',
    desc: 'Every roof we install comes backed by our industry-leading guarantee. If it leaks — we fix it, no questions asked.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Licensed & Insured',
    desc: "Florida Contractor License CCC1334831. Full liability and workers' comp — you're protected from day one.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: '20+ Years Experience',
    desc: "Two decades of roofing across Central Florida. Every roof type, every weather condition — we've seen it all.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const trustBadges = [
  '20+ Years Experience',
  '5-Year No-Leak Promise',
  'Licensed & Insured',
  'Central Florida Native',
  '500+ Roofs Installed',
]

const statsData = [
  { value: '500+', label: 'Roofs Installed' },
  { value: '20+', label: 'Years Experience' },
  { value: '5yr', label: 'No-Leak Promise' },
  { value: '100%', label: 'Licensed & Insured' },
]

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────────────── HERO ───────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/midas-team-photo.png"
            alt="Midas Roofing & Construction team with branded vehicles"
            fill
            className="object-cover object-[center_65%]"
            priority
            quality={95}
          />
        </div>

        {/* Multi-layer overlay for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/45 to-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/50 via-transparent to-dark/20" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Gold glow at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.1)_0%,_transparent_70%)] blur-3xl" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          {/* Badge */}
          <AnimatedSection delay={0.05}>
            <div className="inline-flex items-center gap-2.5 bg-gold/10 border border-gold/25 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-jakarta font-semibold tracking-[0.12em] uppercase">
                Serving Central Florida for 20+ Years
              </span>
            </div>
          </AnimatedSection>

          {/* Headline */}
          <AnimatedSection delay={0.12}>
            <h1 className="font-jakarta font-bold text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.05] text-cream mb-5 tracking-tight text-balance">
              Central Florida&apos;s Most
              <br />
              Trusted{' '}
              <span className="gold-shimmer">Roofing Experts</span>
            </h1>
          </AnimatedSection>

          {/* Subheading */}
          <AnimatedSection delay={0.2}>
            <p className="text-cream/65 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-inter leading-relaxed">
              From shingles to metal, tile to TPO — Midas Roofing delivers premium
              craftsmanship backed by our exclusive 5-Year No-Leak Promise.
            </p>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection delay={0.28}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/estimate" id="hero-primary-cta" className="btn-gold text-sm px-8 py-4 tracking-wide">
                Get Your Free Estimate
              </Link>
              <Link href="/gallery" id="hero-secondary-cta" className="btn-outline-gold text-sm px-8 py-4 tracking-wide">
                View Our Work
              </Link>
            </div>
          </AnimatedSection>

          {/* Trust badges */}
          <AnimatedSection delay={0.4} className="mt-14">
            <div className="flex flex-wrap justify-center gap-5 md:gap-8">
              {trustBadges.map((badge, i) => (
                <div key={badge} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold/70" />
                  <span className="text-cream/45 text-xs font-jakarta font-medium tracking-wide">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-cream/30 text-[9px] tracking-[0.25em] uppercase font-jakarta">Scroll</span>
          <div className="relative w-px h-10 bg-gold/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gold to-gold/0 animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* ─────────────────── SCROLL VIDEO ──────────────────────────────────────── */}
      <ScrollVideo />

      {/* ─────────────────────────── STATS STRIP ──────────────────────────────── */}
      <section className="relative py-0 bg-dark overflow-hidden">
        <div className="absolute inset-0 border-y border-gold/10" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {statsData.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.07}>
                <div className={`py-8 px-6 text-center ${i < statsData.length - 1 ? 'border-r border-gold/10' : ''}`}>
                  <div className="font-jakarta font-bold text-3xl md:text-4xl text-gold mb-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-cream/40 text-xs font-inter tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── SERVICES ─────────────────────────────────── */}
      <section className="section-pad bg-dark relative overflow-hidden">
        {/* Subtle background orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.06)_0%,_transparent_70%)] -translate-y-1/4 translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              What We Do
            </p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-5 tracking-tight">
              Complete Roofing Solutions
            </h2>
            <GoldDivider />
            <p className="text-cream/50 max-w-lg mx-auto font-inter text-base leading-relaxed mt-5">
              Whether you&apos;re replacing a worn shingle roof or upgrading to a
              lifetime metal system, we bring expert craftsmanship to every job.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.07}>
                <Link
                  href={s.href}
                  id={`service-card-${s.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative flex flex-col bg-dark-card border border-white/5 rounded-sm p-7 hover:border-gold/30 transition-all duration-300 cursor-pointer overflow-hidden h-full"
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 transition-all duration-500 group-hover:w-full" />

                  {/* Number */}
                  <span className="absolute top-5 right-5 font-jakarta font-bold text-xs text-gold/15 tracking-widest">
                    0{i + 1}
                  </span>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-sm bg-gold/[0.08] border border-gold/[0.15] flex items-center justify-center text-gold mb-5 transition-all duration-300 group-hover:bg-gold/[0.15] group-hover:border-gold/30 group-hover:shadow-gold flex-shrink-0">
                    {s.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-jakarta font-bold text-lg text-cream mb-2 transition-colors duration-200 group-hover:text-gold">
                    {s.title}
                  </h3>
                  <p className="text-cream/45 text-sm leading-relaxed font-inter flex-1">
                    {s.desc}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 mt-5 text-gold text-xs font-jakarta font-semibold tracking-wide opacity-0 -translate-x-2 transition-all duration-250 ease-out-expo group-hover:opacity-100 group-hover:translate-x-0">
                    <span>Learn more</span>
                    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold/60 to-gold/20 transition-all duration-400 ease-out-expo group-hover:w-full" />
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link href="/services" className="btn-outline-gold text-sm">
              View All Services
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ──────────────────── MARQUEE TRUST STRIP ─────────────────────────────── */}
      <div className="py-4 bg-dark-card border-y border-gold/10 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-0 flex-shrink-0">
              {[
                'Licensed & Insured',
                'CCC1334831',
                '5-Year No-Leak Promise',
                'Central Florida Native',
                'Shingle • Metal • Tile • TPO',
                '20+ Years Experience',
                'Free Estimates',
                'Hurricane Ready',
              ].map((item) => (
                <div key={item} className="flex items-center gap-6 px-6">
                  <span className="text-gold/30 text-[10px]">◆</span>
                  <span className="text-cream/35 text-xs font-jakarta font-medium tracking-[0.12em] uppercase">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────────────── WHY MIDAS ─────────────────────────────────── */}
      <section className="section-pad bg-dark-card relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[radial-gradient(ellipse_at_left,_rgba(201,168,76,0.06)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              Why Choose Us
            </p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream tracking-tight">
              The Midas Standard
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <AnimatedSection key={p.number} delay={i * 0.1}>
                <div className="relative bg-dark-card border border-white/5 rounded-sm p-8 h-full group hover:border-gold/20 transition-all duration-300">
                  {/* Big number */}
                  <div className="absolute top-6 right-6 font-jakarta font-bold text-6xl text-gold/6 select-none leading-none">
                    {p.number}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-sm bg-gold/[0.08] border border-gold/[0.15] flex items-center justify-center text-gold mb-6">
                    {p.icon}
                  </div>

                  <div className="w-8 h-px bg-gold mb-5" />
                  <h3 className="font-jakarta font-bold text-lg text-cream mb-3 group-hover:text-gold transition-colors duration-200">
                    {p.title}
                  </h3>
                  <p className="text-cream/45 text-sm leading-relaxed font-inter">
                    {p.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── HOUSE PHOTO CINEMATIC SPLIT ────────────────────────── */}
      <section className="relative overflow-hidden h-[540px] md:h-[600px]">
        <Image
          src="/images/6.png"
          alt="Premium tile roof installed by Midas Roofing & Construction"
          fill
          className="object-cover object-center"
          quality={90}
        />
        {/* Strong left gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/75 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <AnimatedSection className="max-w-lg" from="left">
              <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">
                Tile Roofing
              </p>
              <h2 className="font-jakarta font-bold text-4xl md:text-6xl text-cream mb-5 leading-tight tracking-tight">
                Built to Last.<br />
                <span className="gold-shimmer">Priced to Win.</span>
              </h2>
              <p className="text-cream/60 text-base leading-relaxed mb-8 max-w-sm">
                Every Midas roof is engineered for Florida&apos;s climate — hurricanes,
                heat, and everything in between.
              </p>
              <Link href="/estimate" className="btn-gold text-sm">
                Get Free Estimate
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── REVIEWS ──────────────────────────────────── */}
      <section className="section-pad bg-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              Testimonials
            </p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-5 tracking-tight">
              What Florida Homeowners Say
            </h2>
            <GoldDivider />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.name} delay={i * 0.1}>
                <div className="bg-dark-card border border-white/5 rounded-sm p-7 h-full flex flex-col relative group hover:border-gold/20 transition-all duration-300">
                  {/* Quote mark */}
                  <div className="absolute top-5 right-6 text-gold/8 font-jakarta font-bold text-5xl leading-none select-none">
                    &ldquo;
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <svg key={j} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gold">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-cream/65 text-sm leading-relaxed font-inter flex-1 mb-6 italic">
                    &ldquo;{r.text}&rdquo;
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 border-t border-white/5 pt-5">
                    <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0">
                      <span className="font-jakarta font-bold text-gold text-xs">{r.initials}</span>
                    </div>
                    <div>
                      <div className="font-jakarta font-semibold text-cream text-sm">{r.name}</div>
                      <div className="text-cream/35 text-xs mt-0.5 font-inter">{r.location}</div>
                    </div>
                    {/* Google G */}
                    <div className="ml-auto opacity-30">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-cream">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

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
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              Our Guarantee
            </p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-5 leading-tight tracking-tight">
              The 5-Year{' '}
              <span className="gold-shimmer">No-Leak Promise</span>
            </h2>
            <p className="text-cream/55 text-base max-w-xl mx-auto leading-relaxed mb-8">
              Every roof we install is backed by our exclusive 5-Year No-Leak Promise. If it
              leaks within 5 years — we fix it free, no questions asked.
            </p>
            <Link href="/about" className="btn-outline-gold text-sm">
              Learn About Our Promise
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─────────────────────────── FINAL CTA ───────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.12)_0%,_transparent_65%)]" />
        <div className="absolute inset-0 dot-pattern opacity-40" />

        {/* Top/bottom border lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-5">
              Ready to Start?
            </p>
            <h2 className="font-jakarta font-bold text-5xl md:text-7xl text-cream mb-5 leading-tight tracking-tight">
              Your Roof.{' '}
              <span className="gold-shimmer">Our Promise.</span>
            </h2>
            <p className="text-cream/50 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Get a free, no-obligation instant estimate in minutes — powered by
              Roofr&apos;s satellite measurement technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/estimate" id="final-cta-primary" className="btn-gold text-sm px-10 py-4 tracking-wide">
                Get Instant Estimate
              </Link>
              <Link href="/contact" id="final-cta-secondary" className="btn-outline-gold text-sm px-10 py-4 tracking-wide">
                Contact Us
              </Link>
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
