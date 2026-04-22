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

const steps = [
  { n: '01', t: 'Inspect & Plan',    d: 'Full aerial + ground-level measurement before a single shingle is touched.' },
  { n: '02', t: 'Teardown & Prep',   d: 'Board-by-board decking inspection, CertainTeed premium underlayment.' },
  { n: '03', t: 'Install & Seal',    d: 'Hand-laid, Florida-grade craftsmanship engineered for hurricanes & heat.' },
  { n: '04', t: 'Final Walkthrough', d: 'Full inspection, cleanup, and No-Leak Promise delivered on the spot.' },
]

export default function RoofAnimationSection() {
  const desktopContainerRef = useRef<HTMLDivElement>(null)
  const videoRef            = useRef<HTMLVideoElement>(null)
  // contentRef is on the desktop sticky panel — always in DOM on lg+
  const desktopContentRef   = useRef<HTMLDivElement>(null)
  const mobileContentRef    = useRef<HTMLDivElement>(null)

  const isInViewDesktop = useInView(desktopContentRef, { once: true, margin: '-5%' })
  const isInViewMobile  = useInView(mobileContentRef,  { once: true, margin: '-5%' })

  // useScroll targets the desktop 300vh container div directly
  const { scrollYProgress } = useScroll({
    target: desktopContainerRef,
    offset: ['start start', 'end end'],
  })

  // Scrub video with scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const t = latest * v.duration
    if (Math.abs(v.currentTime - t) > 0.04) v.currentTime = t
  })

  // Preload + park on first frame
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.preload = 'auto'
    v.load()
    const park = () => { v.currentTime = 0 }
    v.addEventListener('loadedmetadata', park)
    return () => v.removeEventListener('loadedmetadata', park)
  }, [])

  // Recede animation as reviews slide over
  const innerScale   = useTransform(scrollYProgress, [0.72, 1.0], [1,   0.9])
  const innerOpacity = useTransform(scrollYProgress, [0.75, 1.0], [1,   0.0])

  // Shared video card JSX (used in both mobile + desktop)
  const VideoCard = ({ isMobile }: { isMobile: boolean }) => (
    <div
      className={isMobile ? 'relative w-full rounded-2xl overflow-hidden' : 'relative rounded-[1.75rem] overflow-hidden'}
      style={{
        background: '#ffffff',
        boxShadow: isMobile
          ? '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.15)'
          : '0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.14)',
      }}
    >
      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/55 to-transparent z-10" />

      <div style={{ aspectRatio: '16/9', background: '#ffffff', width: '100%' }}>
        {isMobile ? (
          // Mobile: static video (no scrubbing ref needed)
          <video
            src="/roofanimation2.mp4"
            className="w-full h-full object-contain"
            style={{ display: 'block', background: '#ffffff' }}
            muted
            playsInline
            preload="auto"
            autoPlay={false}
          />
        ) : (
          // Desktop: scrubbed video with ref
          <video
            ref={videoRef}
            src="/roofanimation2.mp4"
            className="w-full h-full object-contain"
            style={{ display: 'block', background: '#ffffff' }}
            muted
            playsInline
            preload="auto"
            autoPlay={false}
          />
        )}
      </div>

      {/* Scroll hint (desktop only) */}
      {!isMobile && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-dark/75 backdrop-blur-sm rounded-full px-4 py-2 border border-gold/20">
          <svg className="w-3 h-3 text-gold animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <span className="text-cream/55 font-jakarta text-[9px] tracking-[0.18em] uppercase">Scroll to watch</span>
        </div>
      )}
    </div>
  )

  // Shared content JSX
  const Content = ({ isDesktop, inView }: { isDesktop: boolean; inView: boolean }) => (
    <div className={`flex flex-col ${isDesktop ? 'gap-5' : 'gap-6'}`}>
      <p className="text-gold font-jakarta font-semibold text-[10px] tracking-[0.22em] uppercase">
        How We Build
      </p>

      <h2
        className="font-jakarta font-bold text-cream leading-[1.08] tracking-tight"
        style={{ fontSize: isDesktop ? 'clamp(2rem, 2.8vw, 2.8rem)' : '2rem' }}
      >
        Crafted for<br />
        <span className="gold-shimmer">Florida&apos;s Toughest</span><br />
        Conditions
      </h2>

      <p className="font-inter text-cream/50 leading-relaxed text-sm">
        Every Midas roof starts with precision planning and ends with our exclusive
        No-Leak Promise — engineered for Florida&apos;s hurricanes, heat, and everything between.
      </p>

      <div className="w-14 h-px bg-gradient-to-r from-gold/55 to-transparent" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.08 }}
            className="flex flex-col gap-1"
          >
            <span className="font-jakarta font-bold text-gold leading-none"
              style={{ fontSize: isDesktop ? 'clamp(1.6rem, 2vw, 2rem)' : '1.75rem' }}>
              {s.value}
            </span>
            <span className="font-jakarta text-[9px] font-medium tracking-[0.12em] uppercase text-cream/32">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Steps */}
      <ul className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <motion.li
            key={step.n}
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.07 }}
            className="flex items-start gap-3"
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

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.72 }}
        className="pt-1"
      >
        <Link href="/estimate" className="btn-gold text-sm px-8 py-3.5 inline-flex">
          Get Instant Estimate
        </Link>
      </motion.div>
    </div>
  )

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          MOBILE  (<lg)  — normal scrolling section, no sticky
      ═══════════════════════════════════════════════════════════════ */}
      <section className="lg:hidden bg-dark py-16 px-5">
        <div ref={mobileContentRef} className="flex flex-col gap-8 max-w-lg mx-auto">
          {/* heading first */}
          <div>
            <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-3">
              How We Build
            </p>
            <h2 className="font-jakarta font-bold text-cream leading-[1.1] tracking-tight text-[2rem]">
              Crafted for<br />
              <span className="gold-shimmer">Florida&apos;s Toughest</span><br />
              Conditions
            </h2>
          </div>

          {/* video card */}
          <VideoCard isMobile />

          {/* body */}
          <p className="font-inter text-cream/50 leading-relaxed text-base">
            Every Midas roof starts with precision planning and ends with our exclusive
            No-Leak Promise — engineered for Florida&apos;s toughest conditions.
          </p>

          {/* stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-jakarta font-bold text-gold text-[1.75rem] leading-none">{s.value}</span>
                <span className="font-jakarta text-[10px] font-medium tracking-[0.1em] uppercase text-cream/35">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-gold/50 to-transparent" />

          {/* steps */}
          <ul className="flex flex-col gap-4">
            {steps.map((step) => (
              <li key={step.n} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-jakarta font-bold text-[9px] mt-0.5"
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

          <Link href="/estimate" className="btn-gold text-sm px-8 py-4 inline-flex self-start">
            Get Instant Estimate
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP (≥lg) — 300vh sticky scroll-scrubbed container
          containerRef is on THIS div so useScroll gets correct height
      ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={desktopContainerRef}
        className="hidden lg:block bg-dark"
        style={{ height: '300vh', position: 'relative', zIndex: 1 }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-dark overflow-hidden">

          {/* 1px gold seam lines top/bottom */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <motion.div
            ref={desktopContentRef}
            style={{ scale: innerScale, opacity: innerOpacity }}
            className="w-full max-w-[1400px] mx-auto px-10 xl:px-16"
          >
            <div className="grid grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-16 items-center">

              {/* LEFT — video card */}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                animate={isInViewDesktop ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Gold ambient glow BEHIND card only */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 -z-10 rounded-[2rem]"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.14) 0%, transparent 68%)',
                    filter: 'blur(40px)',
                  }}
                />
                <VideoCard isMobile={false} />
              </motion.div>

              {/* RIGHT — content */}
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                animate={isInViewDesktop ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                <Content isDesktop inView={isInViewDesktop} />
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
