'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import {
  useScroll,
  useMotionValueEvent,
  useTransform,
  motion,
} from 'framer-motion'

const stats = [
  { value: '500+', label: 'Roofs Installed' },
  { value: '20+',  label: 'Years Experience' },
  { value: '100%', label: 'No-Leak Promise' },
]

const steps = [
  { n: '01', t: 'Inspect & Plan',    d: 'Full aerial + ground-level measurement before a single shingle is touched.' },
  { n: '02', t: 'Teardown & Prep',   d: 'Board-by-board decking inspection, CertainTeed premium underlayment.' },
  { n: '03', t: 'Install & Seal',    d: 'Hand-laid, Florida-grade craftsmanship engineered for hurricanes & heat.' },
  { n: '04', t: 'Final Walkthrough', d: 'Full inspection, cleanup, and No-Leak Promise delivered on the spot.' },
]

export default function RoofAnimationSection() {
  // Single scroll container for both mobile + desktop
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  // Two video refs — one per layout. Both scrubbed from the same scroll progress.
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const desktopVideoRef = useRef<HTMLVideoElement>(null)
  const [entered, setEntered] = useState(false)
  const rafRef = useRef<number | null>(null)
  const latestProgressRef = useRef(0)

  // ── Scroll progress across the full container ──
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  })

  // ── Scrub both videos with scroll — rAF-throttled ──
  const scrubVideos = useCallback(() => {
    rafRef.current = null
    const latest = latestProgressRef.current
    for (const v of [mobileVideoRef.current, desktopVideoRef.current]) {
      if (!v || !v.duration) continue
      const t = latest * v.duration
      if (Math.abs(v.currentTime - t) > 0.03) v.currentTime = t
    }
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    latestProgressRef.current = latest
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(scrubVideos)
  })

  // ── Preload both videos + park on first frame ──
  useEffect(() => {
    for (const v of [mobileVideoRef.current, desktopVideoRef.current]) {
      if (!v) continue
      v.preload = 'auto'
      const park = () => { v.currentTime = 0 }
      v.addEventListener('loadedmetadata', park, { once: true })
      v.load()
    }
  }, [])

  // ── Fire entrance animation on mount ──
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 300)
    return () => clearTimeout(t)
  }, [])

  // ── Recede: content shrinks + fades as reviews slide up (last 25% of scroll) ──
  const innerScale   = useTransform(scrollYProgress, [0.72, 1.0], [1, 0.9])
  const innerOpacity = useTransform(scrollYProgress, [0.75, 1.0], [1, 0.0])

  return (
    /*
      One scroll container used on all breakpoints.
      300vh on desktop, 250vh on mobile — both sticky so scroll scrubs the video.
      The reviews section uses lg:-mt-[100vh] to slide over on desktop,
      and -mt-[80vh] to slide over on mobile.
    */
    <div
      ref={scrollContainerRef}
      className="bg-dark"
      style={{ height: '300vh', position: 'relative', zIndex: 1 }}
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 w-full bg-dark overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Gold seam lines */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none" />

        {/* Recede wrapper */}
        <motion.div
          style={{ scale: innerScale, opacity: innerOpacity }}
          className="w-full h-full"
        >

          {/* ══════════════════════════════════
              MOBILE layout (< lg)
              Video top, content below, scrollable within sticky panel
          ══════════════════════════════════ */}
          <div className="lg:hidden h-full flex flex-col overflow-y-auto px-5 pt-10 pb-8 gap-6 max-w-xl mx-auto">

            {/* Heading */}
            <div>
              <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-2">
                How We Build
              </p>
              <h2 className="font-jakarta font-bold text-cream leading-[1.1] tracking-tight text-[1.75rem]">
                Crafted for<br />
                <span className="gold-shimmer">Florida&apos;s Toughest</span><br />
                Conditions
              </h2>
            </div>

            {/* Video card */}
            <div
              className="relative w-full rounded-2xl overflow-hidden flex-shrink-0"
              style={{
                background: '#ffffff',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.15)',
              }}
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent z-10" />
              <div style={{ aspectRatio: '16/9', background: '#ffffff' }}>
                <video
                  ref={mobileVideoRef}
                  src="/roofanimation2.mp4"
                  className="w-full h-full object-contain"
                  style={{ display: 'block', background: '#ffffff' }}
                  muted
                  playsInline
                  preload="auto"
                />
              </div>
              {/* Scroll hint */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-dark/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gold/20 whitespace-nowrap">
                <svg className="w-3 h-3 text-gold animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <span className="text-cream/55 font-jakarta text-[9px] tracking-[0.18em] uppercase">Scroll to watch</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-jakarta font-bold text-gold text-[1.5rem] leading-none">{s.value}</span>
                  <span className="font-jakarta text-[9px] font-medium tracking-[0.1em] uppercase text-cream/35">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="w-14 h-px bg-gradient-to-r from-gold/50 to-transparent" />

            {/* Steps */}
            <ul className="flex flex-col gap-3">
              {steps.map((step) => (
                <li key={step.n} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-jakarta font-bold text-[8px] mt-0.5"
                    style={{
                      background: 'rgba(201,168,76,0.1)',
                      border: '1px solid rgba(201,168,76,0.3)',
                      color: '#C9A84C',
                    }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <span className="font-jakarta font-semibold text-cream/90 text-sm block">{step.t}</span>
                    <span className="text-cream/40 font-inter text-xs leading-relaxed">{step.d}</span>
                  </div>
                </li>
              ))}
            </ul>

            <Link href="/estimate" className="btn-gold text-sm px-8 py-3.5 inline-flex self-start">
              Get Instant Estimate
            </Link>
          </div>

          {/* ══════════════════════════════════
              DESKTOP layout (≥ lg)
              Two-column: video left, content right
          ══════════════════════════════════ */}
          <div className="hidden lg:flex w-full h-full items-center justify-center">
            <div className="w-full max-w-[1400px] mx-auto px-10 xl:px-16">
              <div className="grid grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-16 items-center">

                {/* ── LEFT: video card ── */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -28 }}
                  animate={entered ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -inset-8 -z-10 rounded-[2rem]"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 65%)',
                      filter: 'blur(48px)',
                    }}
                  />
                  <div
                    className="relative rounded-[1.75rem] overflow-hidden"
                    style={{
                      background: '#ffffff',
                      boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.15)',
                    }}
                  >
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/55 to-transparent z-10" />
                    <div style={{ aspectRatio: '16/9', background: '#ffffff', width: '100%' }}>
                      <video
                        ref={desktopVideoRef}
                        src="/roofanimation2.mp4"
                        className="w-full h-full object-contain"
                        style={{ display: 'block', background: '#ffffff' }}
                        muted
                        playsInline
                        preload="auto"
                        autoPlay={false}
                      />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-dark/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gold/20 whitespace-nowrap">
                      <svg className="w-3 h-3 text-gold animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="text-cream/55 font-jakarta text-[9px] tracking-[0.18em] uppercase">Scroll to watch</span>
                    </div>
                  </div>
                </motion.div>

                {/* ── RIGHT: content ── */}
                <motion.div
                  className="flex flex-col gap-5"
                  initial={{ opacity: 0, x: 28 }}
                  animate={entered ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                >
                  <p className="text-gold font-jakarta font-semibold text-[10px] tracking-[0.22em] uppercase">
                    How We Build
                  </p>

                  <h2
                    className="font-jakarta font-bold text-cream leading-[1.08] tracking-tight"
                    style={{ fontSize: 'clamp(2rem, 2.8vw, 2.8rem)' }}
                  >
                    Crafted for<br />
                    <span className="gold-shimmer">Florida&apos;s Toughest</span><br />
                    Conditions
                  </h2>

                  <p className="font-inter text-cream/50 leading-relaxed text-[0.9rem]">
                    Every Midas roof starts with precision planning and ends with our exclusive
                    No-Leak Promise — engineered for hurricanes, heat, and everything between.
                  </p>

                  <div className="w-14 h-px bg-gradient-to-r from-gold/55 to-transparent" />

                  <div className="grid grid-cols-3 gap-3">
                    {stats.map((s, i) => (
                      <motion.div
                        key={s.label}
                        className="flex flex-col gap-1"
                        initial={{ opacity: 0, y: 12 }}
                        animate={entered ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.28 + i * 0.08 }}
                      >
                        <span
                          className="font-jakarta font-bold text-gold leading-none"
                          style={{ fontSize: 'clamp(1.5rem, 1.9vw, 2rem)' }}
                        >
                          {s.value}
                        </span>
                        <span className="font-jakarta text-[9px] font-medium tracking-[0.12em] uppercase text-cream/32">
                          {s.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <ul className="flex flex-col gap-3">
                    {steps.map((step, i) => (
                      <motion.li
                        key={step.n}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 10 }}
                        animate={entered ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.38 + i * 0.07 }}
                      >
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-jakarta font-bold text-[8px] mt-0.5"
                          style={{
                            background: 'rgba(201,168,76,0.1)',
                            border: '1px solid rgba(201,168,76,0.3)',
                            color: '#C9A84C',
                          }}
                        >
                          {step.n}
                        </span>
                        <div>
                          <span className="font-jakarta font-semibold text-cream/88 text-[0.82rem]">{step.t} </span>
                          <span className="text-cream/32 font-inter text-[0.75rem]">{step.d}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    className="pt-1"
                    initial={{ opacity: 0 }}
                    animate={entered ? { opacity: 1 } : {}}
                    transition={{ duration: 0.45, delay: 0.75 }}
                  >
                    <Link href="/estimate" className="btn-gold text-sm px-8 py-3.5 inline-flex">
                      Get Instant Estimate
                    </Link>
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
