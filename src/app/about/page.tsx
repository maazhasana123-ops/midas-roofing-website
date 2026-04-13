import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import GoldDivider from '@/components/GoldDivider'

export const metadata: Metadata = {
  title: 'About Midas Roofing | Jenson Perazada | Central Florida',
  description: 'Meet Jenson Perazada and the Midas Roofing team. 20+ years serving Central Florida. Licensed contractor CCC1334831. 5-Year No-Leak Promise.',
}

const stats = [
  { value: '20+', label: 'Years in Florida' },
  { value: '500+', label: 'Roofs Installed' },
  { value: '5-Year', label: 'No-Leak Promise' },
  { value: '#1', label: 'Rated in Lake County' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-card overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <AnimatedSection>
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-4">Our Story</p>
            <h1 className="font-jakarta font-bold text-5xl md:text-7xl text-cream leading-tight">
              Built on Trust.<br /><span className="gold-shimmer">Proven by Results.</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-dark border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
                <div className="font-jakarta font-bold text-4xl text-gold mb-2">{s.value}</div>
                <div className="text-cream/50 text-sm font-inter tracking-wide">{s.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Split Layout */}
      <section className="section-pad bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* CEO Photo */}
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-gold/5 rounded-sm" />
                <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-sm overflow-hidden border border-gold/20">
                  <Image
                    src="/images/jenson-perazada-ceo.jpg"
                    alt="Jenson Perazada, CEO of Midas Roofing & Construction"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Name card */}
                <div className="absolute -bottom-6 -right-6 bg-dark-card border border-gold/30 rounded-sm px-6 py-4">
                  <div className="font-jakarta font-bold text-cream text-lg">Jenson Perazada</div>
                  <div className="text-gold text-sm font-medium">CEO & Founder</div>
                </div>
              </div>
            </AnimatedSection>

            {/* Bio */}
            <AnimatedSection delay={0.15}>
              <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-4">Meet the Founder</p>
              <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream mb-6 leading-tight">
                A Roofer Who Takes It Personally
              </h2>
              <GoldDivider />
              <div className="mt-6 space-y-4 text-cream/65 font-inter leading-relaxed">
                <p>
                  Jenson Perazada didn&apos;t start Midas Roofing to build a company — he started it to build better roofs than the ones that were letting Florida homeowners down.
                </p>
                <p>
                  With over 20 years of hands-on experience in Florida&apos;s demanding roofing market, Jenson has personally overseen hundreds of installs across Central Florida. He knows every roof type, every building code in Lake County, and exactly what it takes to make a roof that survives Florida&apos;s brutal summers and hurricane seasons.
                </p>
                <p>
                  &quot;Most contractors are in a hurry to get to the next job. We&apos;re in a hurry to get your job right,&quot; Jenson says. That philosophy is baked into every project Midas takes on — from the initial estimate to the final walkthrough.
                </p>
                <p>
                  Today, Midas Roofing & Construction serves homeowners and businesses across all of Central Florida, from Tavares and Mount Dora to the greater Orlando area. Every project carries Jenson&apos;s personal commitment to quality — and his name on the license.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/estimate" className="btn-gold">Get a Free Estimate</Link>
                <Link href="/contact" className="btn-outline-gold">Contact Us</Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 5-Year No-Leak Promise */}
      <section className="section-pad bg-dark-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <AnimatedSection className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-gold/40 rounded-full mb-8">
              <span className="text-3xl">🛡️</span>
            </div>
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-4">Our Promise to You</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-6xl text-cream mb-6 leading-tight">
              <span className="gold-shimmer">No-Leak Promise</span>
            </h2>
            <GoldDivider />
            <p className="text-cream/65 text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
              Every roof Midas installs is backed by our exclusive 5-Year No-Leak Promise. If your roof develops any leak within five years of installation due to our workmanship, we&apos;ll come back and fix it — completely free of charge, no questions asked.
            </p>
            <p className="text-cream/50 text-base max-w-xl mx-auto mt-4 leading-relaxed">
              This isn&apos;t a manufacturer warranty. It&apos;s a company promise backed by Midas Roofing&apos;s reputation. We only make this promise because we know our work is good enough to keep it.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Covers All Our Work', desc: 'Any leak caused by our installation or materials is covered — period.' },
              { title: 'No Fine Print', desc: 'One simple promise: we fix it for free. No deductibles, no arguments.' },
              { title: 'Transferable', desc: 'Selling your home? The promise transfers to the new owner.' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-dark border border-gold/15 rounded-sm p-6 text-center">
                  <div className="w-8 h-0.5 bg-gold mx-auto mb-4" />
                  <h3 className="font-jakarta font-bold text-cream text-lg mb-3">{item.title}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* License & Credibility */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Contractor License', value: 'CCC1334831', sub: 'State of Florida' },
              { label: 'Serving Since', value: '2004+', sub: 'Central Florida' },
              { label: 'Headquarters', value: 'Tavares, FL', sub: '4051 Bannock Ave 32778' },
            ].map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 0.1}>
                <div className="flex items-center gap-4 bg-dark-card border border-gold/10 rounded-sm p-6">
                  <div className="w-1 h-12 bg-gold flex-shrink-0" />
                  <div>
                    <div className="text-cream/40 text-xs font-jakarta uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="font-jakarta font-bold text-cream text-xl">{item.value}</div>
                    <div className="text-cream/50 text-sm mt-0.5">{item.sub}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
