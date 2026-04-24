'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import GoldDivider from '@/components/GoldDivider'

function useCountUp(target: number, duration = 1400, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

const stats = [
  { value: 20, suffix: '+', label: 'Years in Florida' },
  { value: 500, suffix: '+', label: 'Roofs Installed' },
  { value: 100, suffix: '%', label: 'No-Leak Promise' },
  { value: 1, suffix: '#1', label: 'Rated in Orlando', raw: true },
]

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(stat.value, 1400, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="text-center group"
    >
      <div className="font-jakarta font-extrabold text-4xl md:text-5xl text-gold mb-2 tracking-tight tabular-nums">
        {stat.raw ? stat.suffix : `${count}${stat.suffix}`}
      </div>
      <div className="text-cream/45 text-xs font-jakarta font-medium tracking-[0.12em] uppercase group-hover:text-cream/65 transition-colors duration-300">
        {stat.label}
      </div>
    </motion.div>
  )
}

const promiseItems = [
  { title: 'Covers All Our Work', desc: 'Any leak caused by our installation or materials is covered — period.' },
  { title: 'No Fine Print', desc: 'One simple promise: we fix it for free. No deductibles, no arguments.' },
]

const credItems = [
  { label: 'Contractor License', value: 'CCC1334831', sub: 'State of Florida' },
  { label: 'Serving Since', value: '2004+', sub: 'Central Florida' },
  { label: 'Headquarters', value: 'Longwood, FL', sub: '346 Freeman St. Suite D 32750' },
]

export default function AboutContent() {
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
      <section className="py-12 bg-dark border-y border-gold/[0.08] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,_rgba(201,168,76,0.04)_0%,_transparent_100%)]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <StatItem key={s.label} stat={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CEO Split Layout */}
      <section className="section-pad bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-gold/5 rounded-2xl" />
                <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-gold/20">
                  <Image
                    src="/images/jenson-perazada-ceo.jpg"
                    alt="Jenson Perazada, CEO of Midas Roofing & Construction"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-xl px-6 py-4 border border-gold/30"
                  style={{ background: 'rgba(16,16,16,0.95)', backdropFilter: 'blur(16px)' }}>
                  <div className="font-jakarta font-bold text-cream text-lg">Jenson Perazada</div>
                  <div className="text-gold text-sm font-medium">CEO &amp; Founder</div>
                </div>
              </div>
            </AnimatedSection>

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
                  With over 20 years of hands-on experience in Florida&apos;s demanding roofing market, Jenson has personally overseen hundreds of installs across Central Florida. He knows every roof type, every building code across Central Florida, and exactly what it takes to make a roof that survives Florida&apos;s brutal summers and hurricane seasons.
                </p>
                <p>
                  &quot;Most contractors are in a hurry to get to the next job. We&apos;re in a hurry to get your job right,&quot; Jenson says. That philosophy is baked into every project Midas takes on, from the initial estimate to the final walkthrough.
                </p>
                <p>
                  From Longwood to Orlando and surrounding counties, every project carries Jenson&apos;s personal commitment to quality and his name on the license.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/estimate" className="btn-gold">Get Instant Estimate</Link>
                <Link href="/contact" className="btn-outline-gold">Contact Us</Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* No-Leak Promise */}
      <section className="section-pad bg-dark-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <AnimatedSection className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 border border-gold/30 rounded-full mb-8 bg-gold/[0.05]">
              <span className="text-3xl">🛡️</span>
            </div>
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-4">Our Promise to You</p>
            <h2 className="font-jakarta font-bold text-4xl md:text-6xl text-cream mb-6 leading-tight">
              <span className="gold-shimmer">No-Leak Promise</span>
            </h2>
            <GoldDivider />
            <p className="text-cream/65 text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
              Every roof Midas installs is backed by our exclusive No-Leak Promise. If your roof develops any leak due to our workmanship, we&apos;ll come back and fix it — completely free of charge, no questions asked.
            </p>
            <p className="text-cream/50 text-base max-w-xl mx-auto mt-4 leading-relaxed">
              This isn&apos;t a manufacturer warranty. It&apos;s a company promise backed by Midas Roofing&apos;s reputation. We only make this promise because we know our work is good enough to keep it.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {promiseItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="group relative rounded-2xl overflow-hidden h-full" style={{ isolation: 'isolate' }}>
                  <div className="absolute inset-0 bg-dark border border-gold/[0.12] rounded-2xl group-hover:border-gold/30 transition-colors duration-400" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(201,168,76,0.1) 0%, transparent 100%)' }} />
                  <div className="relative z-10 p-7 text-center h-full flex flex-col items-center">
                    <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mb-5 group-hover:w-20 transition-all duration-500" />
                    <h3 className="font-jakarta font-bold text-cream text-lg mb-3 group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                    <p className="text-cream/50 text-sm leading-relaxed group-hover:text-cream/65 transition-colors duration-300">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* License & Credibility */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {credItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="group flex items-center gap-5 rounded-2xl p-6 border border-gold/[0.1] overflow-hidden relative"
                  style={{ background: 'rgba(16,16,16,0.8)' }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 100% 100% at 0% 50%, rgba(201,168,76,0.06) 0%, transparent 100%)' }} />
                  <div className="relative w-1 self-stretch rounded-full bg-gold/20 flex-shrink-0 overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-gold transition-all duration-600 ease-out" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-cream/35 text-[10px] font-jakarta uppercase tracking-[0.15em] mb-1">{item.label}</div>
                    <div className="font-jakarta font-bold text-cream text-xl group-hover:text-gold transition-colors duration-300">{item.value}</div>
                    <div className="text-cream/45 text-sm mt-0.5">{item.sub}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
