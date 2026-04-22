'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  useScroll,
  useMotionValueEvent,
  useTransform,
  motion,
  useInView,
} from 'framer-motion'

const stats = [
  { value: '500+', label: 'Roofs Installed' },
  { value: '20+',  label: 'Years Experience' },
  { value: '100%', label: 'No-Leak Promise' },
]

export default function RoofAnimationSection() {
  const containerRef   = useRef<HTMLDivElement>(null)
  const videoRef       = useRef<HTMLVideoElement>(null)
  const sectionRef     = useRef<HTMLDivElement>(null)
  const isInView       = useInView(sectionRef, { once: true, margin: '-10%' })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* scrub video */
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const t = latest * v.duration
    if (Math.abs(v.currentTime - t) > 0.04) v.currentTime = t
  })

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.preload = 'auto'
    v.load()
    const park = () => { v.currentTime = 0 }
    v.addEventListener('loadedmetadata', park)
    return () => v.removeEventListener('loadedmetadata', park)
  }, [])

  /* recede so reviews can slide over */
  const innerScale   = useTransform(scrollYProgress, [0.72, 1.0], [1,   0.9])
  const innerOpacity = useTransform(scrollYProgress, [0.75, 1.0], [1,   0.0])

  return (
    <section
      ref={containerRef}
      aria-label="Animated roof explainer"
      style={{ height: '300vh', position: 'relative', zIndex: 1 }}
      className="bg-dark"
    >
      {/* ── Sticky panel ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-dark">

        {/* subtle top/bottom seam lines — just 1px gold dividers matching the rest of the site */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <motion.div
          ref={sectionRef}
          style={{ scale: innerScale, opacity: innerOpacity }}
          className="w-full max-w-7xl mx-auto px-6 md:px-10"
        >
          {/* ── Two-column grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── LEFT: video card ── */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Card wrapper — rounded, light bg so white-bg video sits clean */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: '#f8f6f0',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.12)',
                }}
              >
                {/* Gold top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent z-10" />

                <div style={{ aspectRatio: '16/9' }}>
                  <video
                    ref={videoRef}
                    src="/roofanimation2.mp4"
                    className="w-full h-full object-contain"
                    style={{ display: 'block', background: '#f8f6f0' }}
                    muted
                    playsInline
                    preload="auto"
                    autoPlay={false}
                  />
                </div>

                {/* Scroll hint badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-dark/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gold/20">
                  <svg className="w-3 h-3 text-gold animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-cream/60 font-jakarta text-[10px] tracking-[0.15em] uppercase">Scroll to watch</span>
                </div>
              </div>

              {/* Decorative gold glow behind card — not on top of video */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-3xl opacity-30"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.2) 0%, transparent 70%)',
                  filter: 'blur(32px)',
                }}
              />
            </motion.div>

            {/* ── RIGHT: content ── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              {/* Label */}
              <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase">
                How We Build
              </p>

              {/* Headline */}
              <h2 className="font-jakarta font-bold text-cream leading-[1.08] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}>
                Crafted for<br />
                <span className="gold-shimmer">Florida&apos;s Toughest</span><br />
                Conditions
              </h2>

              {/* Body */}
              <p className="font-inter text-cream/50 leading-relaxed text-base max-w-md">
                Every Midas roof starts with precision planning and ends with
                our exclusive No-Leak Promise. Watch each step of our process —
                from teardown to final inspection.
              </p>

              {/* Gold divider */}
              <div className="w-16 h-px bg-gradient-to-r from-gold/60 to-transparent" />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.08 }}
                    className="flex flex-col gap-1"
                  >
                    <span
                      className="font-jakarta font-bold text-gold leading-none"
                      style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}
                    >
                      {s.value}
                    </span>
                    <span className="font-jakarta text-[10px] font-medium tracking-[0.12em] uppercase text-cream/35">
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Steps list */}
              <ul className="flex flex-col gap-3 mt-1">
                {[
                  { n: '01', t: 'Inspect & Plan',      d: 'Full aerial + ground-level measurement.' },
                  { n: '02', t: 'Teardown & Prep',     d: 'Board-by-board decking inspection, premium underlayment.' },
                  { n: '03', t: 'Install & Seal',      d: 'Hand-laid, Florida-grade craftsmanship.' },
                  { n: '04', t: 'Final Walkthrough',   d: 'Inspection + cleanup + No-Leak Promise.' },
                ].map((step, i) => (
                  <motion.li
                    key={step.n}
                    initial={{ opacity: 0, x: 12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-jakarta font-bold text-[9px] mt-0.5"
                      style={{
                        background: 'rgba(201,168,76,0.1)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: '#C9A84C',
                      }}
                    >
                      {step.n}
                    </span>
                    <div>
                      <span className="font-jakarta font-semibold text-cream/90 text-sm">{step.t}</span>
                      <span className="text-cream/35 font-inter text-xs ml-2">{step.d}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-2"
              >
                <Link href="/estimate" className="btn-gold text-sm px-8 py-3.5 inline-flex">
                  Get Instant Estimate
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
