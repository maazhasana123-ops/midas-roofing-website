import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import GoldDivider from '@/components/GoldDivider'

const services = [
  { icon: '🏠', title: 'Shingle Roofing', desc: 'Residential & commercial asphalt shingle systems built for Florida weather.' },
  { icon: '🔩', title: 'Metal Roofing', desc: 'Standing seam and corrugated metal roofs — last 50+ years in the Florida heat.' },
  { icon: '🏛️', title: 'Tile Roofing', desc: 'Clay and concrete tile roofing that combines elegance with durability.' },
  { icon: '📐', title: 'TPO Roofing', desc: 'Advanced thermoplastic systems for flat commercial roofs.' },
  { icon: '🛡️', title: 'Roof Coatings', desc: "Extend your roof's life with reflective protective coating systems." },
  { icon: '🏘️', title: 'Residential', desc: 'Full installs, repairs, and replacements for Florida homeowners.' },
]

const reviews = [
  {
    name: 'Marcus T.',
    location: 'Tavares, FL',
    stars: 5,
    text: 'Midas replaced our entire roof after Hurricane Ian damage. Jenson personally walked us through every step. The crew was professional, fast, and the workmanship is immaculate. Three months later — zero leaks.',
  },
  {
    name: 'Sandra R.',
    location: 'Leesburg, FL',
    stars: 5,
    text: "I got quotes from four contractors. Midas wasn't the cheapest, but Jenson explained exactly what needed to be done and why. Best investment we've made in our home. The roof looks incredible.",
  },
  {
    name: 'David & Amy K.',
    location: 'Mount Dora, FL',
    stars: 5,
    text: "We went with the metal roof option and couldn't be happier. The team finished ahead of schedule, cleaned up everything, and the 5-Year No-Leak Promise gave us total peace of mind. 10/10 recommend.",
  },
]

const pillars = [
  {
    number: '01',
    title: '5-Year No-Leak Promise',
    desc: "Every roof we install comes backed by our industry-leading 5-Year No-Leak Promise. If it leaks — we fix it, no questions asked.",
  },
  {
    number: '02',
    title: 'Licensed & Insured',
    desc: "Florida Contractor License CCC1334831. We carry full liability and workers' comp insurance so you're protected from day one.",
  },
  {
    number: '03',
    title: '20+ Years Experience',
    desc: "Two decades of roofing across Central Florida. We've seen every roof type, every weather condition, every challenge.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/midas-team-photo.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Fallback image */}
        <div className="absolute inset-0">
          <Image
            src="/images/midas-team-photo.png"
            alt="Midas Roofing team"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/60 to-dark/90" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-sm font-jakarta font-medium tracking-wide">Serving Central Florida for 20+ Years</span>
            </div>
            <h1 className="font-jakarta font-bold text-5xl md:text-7xl leading-tight text-cream mb-6">
              Central Florida&apos;s Most
              <br />
              Trusted <span className="gold-shimmer">Roofing Experts</span>
            </h1>
            <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-inter leading-relaxed">
              From shingles to metal, tile to TPO — Midas Roofing delivers premium craftsmanship backed by our exclusive 5-Year No-Leak Promise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estimate" className="btn-gold text-base">
                Get Your Free Estimate
              </Link>
              <Link href="/gallery" className="btn-outline-gold text-base">
                View Our Work
              </Link>
            </div>
          </AnimatedSection>

          {/* Trust badges */}
          <AnimatedSection delay={0.3} className="mt-16 flex flex-wrap justify-center gap-6 md:gap-10">
            {['20+ Years Experience', '5-Year No-Leak Promise', 'Licensed & Insured', 'Central Florida Native'].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-cream/60 text-sm font-jakarta font-medium">{badge}</span>
              </div>
            ))}
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-cream/40 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-pad bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-4">
              Complete Roofing Solutions
            </h2>
            <GoldDivider />
            <p className="text-cream/60 max-w-xl mx-auto font-inter text-lg leading-relaxed">
              Whether you&apos;re replacing a worn shingle roof or upgrading to a lifetime metal system, we bring the same level of craftsmanship to every job.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.08}>
                <div className="group relative bg-dark-card border border-white/5 rounded-sm p-8 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h3 className="font-jakarta font-bold text-xl text-cream mb-3 group-hover:text-gold transition-colors">{s.title}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed font-inter">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-gold text-sm font-jakarta font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn more</span>
                    <span>→</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link href="/services" className="btn-outline-gold">
              View All Services
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Midas */}
      <section className="section-pad bg-dark-card">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-3">Why Choose Us</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream">
              The Midas Standard
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <AnimatedSection key={p.number} delay={i * 0.1}>
                <div className="relative p-8">
                  <div className="text-7xl font-jakarta font-bold text-gold/10 absolute top-4 right-6 select-none">{p.number}</div>
                  <div className="w-12 h-0.5 bg-gold mb-6" />
                  <h3 className="font-jakarta font-bold text-xl text-cream mb-4">{p.title}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed font-inter">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* House photo with CTA */}
      <section className="relative py-0 overflow-hidden h-[500px]">
        <Image
          src="/images/6.png"
          alt="Beautiful tile roof installed by Midas Roofing"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <AnimatedSection className="max-w-lg">
              <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-3">Tile Roofing</p>
              <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-6 leading-tight">
                Built to Last.<br />Priced to Win.
              </h2>
              <p className="text-cream/70 text-base leading-relaxed mb-8">
                Every Midas roof is installed with Florida&apos;s climate in mind — engineered for hurricanes, heat, and everything in between.
              </p>
              <Link href="/estimate" className="btn-gold">
                Get Free Estimate
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-pad bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-4">
              What Florida Homeowners Say
            </h2>
            <GoldDivider />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.name} delay={i * 0.1}>
                <div className="bg-dark-card border border-white/5 rounded-sm p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <span key={j} className="text-gold text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-cream/70 text-sm leading-relaxed font-inter flex-1 italic mb-6">&ldquo;{r.text}&rdquo;</p>
                  <div className="border-t border-white/5 pt-4">
                    <div className="font-jakarta font-semibold text-cream text-sm">{r.name}</div>
                    <div className="text-cream/40 text-xs mt-0.5">{r.location}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-dark-card to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.15)_0%,_transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-4">Ready to Start?</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-6xl text-cream mb-6 leading-tight">
              Your Roof. Our
              <span className="gold-shimmer"> Promise.</span>
            </h2>
            <p className="text-cream/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Get a free, no-obligation instant estimate in minutes — powered by Roofr&apos;s satellite measurement technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estimate" className="btn-gold text-base">
                Get Instant Estimate
              </Link>
              <Link href="/contact" className="btn-outline-gold text-base">
                Talk to Jenson
              </Link>
            </div>
            <p className="text-cream/30 text-xs mt-8 font-inter">
              License CCC1334831 · Tavares, FL · Serving All of Central Florida
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
