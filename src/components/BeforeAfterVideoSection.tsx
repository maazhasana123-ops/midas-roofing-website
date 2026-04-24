'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

const fadeRight = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
}

const fadeScale = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  show: { opacity: 1, scale: 1, y: 0 },
}

export default function BeforeAfterVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.preload = 'auto'
    const onLoaded = () => setVideoLoaded(true)
    video.addEventListener('loadeddata', onLoaded)
    video.load()
    return () => video.removeEventListener('loadeddata', onLoaded)
  }, [])

  return (
    <section
      className="relative bg-dark overflow-hidden"
      aria-label="Before and after roof transformation"
    >
      {/* ── Top seam ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      {/* ── Ambient glow ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      {/* ── Corner dot accents ── */}
      <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-gold/30 hidden lg:block" />
      <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-gold/30 hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">

        {/* ─── HEADER ─── */}
        <motion.div
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2.5 bg-gold/[0.08] border border-gold/20 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm">
            <span className="w-1 h-1 rounded-full bg-gold/70" />
            <span className="text-gold text-[10px] font-jakarta font-semibold tracking-[0.18em] uppercase">
              Real Results, Real Homes
            </span>
            <span className="w-1 h-1 rounded-full bg-gold/70" />
          </div>

          <h2 className="font-jakarta font-bold text-cream tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.08 }}>
            From Worn Down to{' '}
            <span className="gold-shimmer">Flawless</span>
          </h2>
          <p className="text-cream/45 font-inter text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Watch how Midas Roofing transforms aging, damaged roofs into pristine,
            Florida-grade masterpieces — one home at a time.
          </p>
        </motion.div>

        {/* ─── VIDEO + SIDE LABELS LAYOUT ─── */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">

          {/* ── LEFT label (desktop) ── */}
          <motion.div
            className="hidden lg:flex flex-col items-center gap-3 flex-shrink-0"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div
              className="px-4 py-2 rounded-full border font-jakarta font-semibold text-xs tracking-[0.15em] uppercase"
              style={{
                background: 'rgba(255,80,80,0.08)',
                borderColor: 'rgba(255,80,80,0.25)',
                color: 'rgba(255,120,120,0.85)',
              }}
            >
              Before
            </div>
            <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, rgba(255,80,80,0.2), transparent)' }} />
          </motion.div>

          {/* ── VIDEO CARD ── */}
          <motion.div
            className="relative w-full flex-1"
            variants={fadeScale}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            {/* Glow ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2.5rem]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Card wrapper */}
            <div
              className="relative w-full rounded-2xl lg:rounded-[1.75rem] overflow-hidden"
              style={{
                background: '#080808',
                boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.18)',
              }}
            >
              {/* Gold top accent line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent z-10" />

              {/* Video */}
              <div
                className="relative w-full"
                style={{ aspectRatio: '16/9', background: '#080808' }}
              >
                {/* Skeleton shimmer until loaded */}
                {!videoLoaded && (
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background: 'linear-gradient(90deg, #101010 25%, #181818 50%, #101010 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.8s infinite',
                    }}
                  />
                )}

                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  style={{ display: 'block' }}
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                >
                  <source src="/midas-loop.mp4" type="video/mp4" />
                </video>

                {/* Subtle vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(8,8,8,0.45) 100%)',
                  }}
                />
              </div>

              {/* ── BOTTOM BAR ── */}
              <div
                className="relative flex items-center justify-between px-5 py-3 lg:px-6"
                style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
              >
                {/* Before pill (mobile only) */}
                <div className="flex items-center gap-2 lg:hidden" style={{ color: 'rgba(255,120,120,0.8)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,100,100,0.7)' }} />
                  <span className="font-jakarta font-semibold text-[9px] tracking-[0.18em] uppercase">Before</span>
                </div>

                {/* Center: looping indicator */}
                <div className="flex items-center gap-2 mx-auto lg:mx-0">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C9A84C' }} />
                  <span className="font-jakarta font-medium text-[9px] tracking-[0.18em] uppercase text-cream/30">
                    Live Loop
                  </span>
                </div>

                {/* After pill (mobile only) */}
                <div className="flex items-center gap-2 lg:hidden" style={{ color: 'rgba(120,210,120,0.8)' }}>
                  <span className="font-jakarta font-semibold text-[9px] tracking-[0.18em] uppercase">After</span>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(100,210,100,0.7)' }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT label (desktop) ── */}
          <motion.div
            className="hidden lg:flex flex-col items-center gap-3 flex-shrink-0"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, transparent, rgba(100,210,100,0.2))' }} />
            <div
              className="px-4 py-2 rounded-full border font-jakarta font-semibold text-xs tracking-[0.15em] uppercase"
              style={{
                background: 'rgba(80,200,80,0.08)',
                borderColor: 'rgba(80,200,80,0.25)',
                color: 'rgba(100,210,100,0.85)',
              }}
            >
              After
            </div>
          </motion.div>
        </div>

        {/* ─── STATS + CTA ROW ─── */}
        <motion.div
          className="mt-14 flex flex-col md:flex-row items-center justify-between gap-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Stats */}
          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
            {[
              { value: '1 Day', label: 'Average Install' },
              { value: '500+', label: 'Roofs Replaced' },
              { value: '0', label: 'Leak Callbacks' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center md:items-start gap-0.5">
                <span
                  className="font-jakarta font-bold text-gold leading-none"
                  style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}
                >
                  {stat.value}
                </span>
                <span className="font-jakarta font-medium text-[9px] tracking-[0.15em] uppercase text-cream/30">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Gold divider (desktop) */}
          <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-gold/25 to-transparent" />

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link href="/estimate" className="btn-gold text-sm px-7 py-3.5">
              Get Your Free Estimate
            </Link>
            <Link href="/gallery" className="btn-outline-gold text-sm px-7 py-3.5">
              See More Work
            </Link>
          </div>
        </motion.div>

        {/* ─── TRUST FOOTNOTE ─── */}
        <motion.div
          className="mt-10 text-center"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-cream/20 text-xs font-inter tracking-wide">
            Every transformation backed by our{' '}
            <span className="text-gold/50 font-medium">No-Leak Promise</span>
            {' '}· Licensed &amp; Insured · CCC1334831
          </p>
        </motion.div>
      </div>

      {/* ── Bottom seam ── */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  )
}
