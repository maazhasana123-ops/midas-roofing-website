'use client'

import { useEffect, useRef } from 'react'
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion'

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Scrub video currentTime based on scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const targetTime = latest * video.duration
    if (Math.abs(video.currentTime - targetTime) > 0.04) {
      video.currentTime = targetTime
    }
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.preload = 'auto'
    video.load()
  }, [])

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const completionOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1])
  const completionScale = useTransform(scrollYProgress, [0.88, 1], [0.9, 1])

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '400vh' }}
      aria-label="Watch a roof replacement in action"
    >
      {/* ── Sticky panel ── */}
      <div
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >

        {/* ── Fuzzy ambient glow behind video ──
            Blurred colour orbs that mimic the warm whites of the video footage */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Centre warm-white bloom */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '72%',
              height: '70%',
              background:
                'radial-gradient(ellipse at center, rgba(255,252,245,1) 0%, rgba(245,238,220,0.9) 30%, rgba(255,255,255,0) 75%)',
              filter: 'blur(32px)',
            }}
          />
          {/* Top-left warm amber orb */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '12%',
              width: '340px',
              height: '260px',
              background:
                'radial-gradient(ellipse at center, rgba(230,210,170,0.55) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(48px)',
            }}
          />
          {/* Bottom-right cream orb */}
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '10%',
              width: '380px',
              height: '280px',
              background:
                'radial-gradient(ellipse at center, rgba(220,205,180,0.45) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(56px)',
            }}
          />
          {/* Top-right cool white */}
          <div
            style={{
              position: 'absolute',
              top: '8%',
              right: '8%',
              width: '280px',
              height: '220px',
              background:
                'radial-gradient(ellipse at center, rgba(245,242,235,0.6) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(40px)',
            }}
          />
          {/* Bottom-left subtle */}
          <div
            style={{
              position: 'absolute',
              bottom: '8%',
              left: '8%',
              width: '300px',
              height: '240px',
              background:
                'radial-gradient(ellipse at center, rgba(235,225,200,0.4) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(52px)',
            }}
          />
        </div>

        {/* ── Section label (fades out as user scrolls in) ── */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.06], [1, 0]) }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
        >
          <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-1">
            See The Process
          </p>
          <p className="text-neutral-400 text-xs font-inter tracking-wide">
            Scroll to watch the transformation
          </p>
          <div className="mt-3 flex justify-center">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-gold/60"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Centred video container ── */}
        <div className="relative z-10 w-[min(820px,82vw)] flex flex-col items-center gap-6">

          {/* Video frame with soft shadow */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              borderRadius: '16px',
              aspectRatio: '16 / 9',
              boxShadow:
                '0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.10), 0 24px 64px rgba(0,0,0,0.12)',
            }}
          >
            {/* Left & right edge fades so video blends into glow */}
            <div
              className="absolute inset-y-0 left-0 w-12 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(255,255,255,0.18), rgba(255,255,255,0))',
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-12 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to left, rgba(255,255,255,0.18), rgba(255,255,255,0))',
              }}
            />

            <video
              ref={videoRef}
              src="/animated-roof.mp4"
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              autoPlay={false}
            />

            {/* Completion overlay — fades in at end */}
            <motion.div
              style={{ opacity: completionOpacity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none backdrop-blur-sm"
            >
              <motion.div
                style={{
                  scale: completionScale,
                  background: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }}
                className="flex flex-col items-center gap-3 text-center px-8 py-6 rounded-xl"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.35)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-jakarta font-bold text-lg" style={{ color: '#1a1a1a' }}>
                  Transformation Complete
                </p>
                <p className="font-inter text-sm" style={{ color: '#888' }}>
                  This is the Midas difference.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Progress bar ── */}
          <div className="w-full max-w-[520px] px-2">
            {/* Track */}
            <div
              className="relative h-[3px] rounded-full overflow-hidden"
              style={{ background: 'rgba(0,0,0,0.08)' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: progressWidth,
                  background: 'linear-gradient(90deg, #C9A84C, #E8C46A)',
                }}
              />
            </div>

            {/* Labels */}
            <div className="flex justify-between items-center mt-2.5">
              <span className="text-[10px] font-jakarta tracking-widest uppercase" style={{ color: '#bbb' }}>
                Before
              </span>
              <span className="text-[10px] font-jakarta font-semibold tracking-widest uppercase" style={{ color: '#C9A84C' }}>
                Roof Replacement
              </span>
              <span className="text-[10px] font-jakarta tracking-widest uppercase" style={{ color: '#bbb' }}>
                After
              </span>
            </div>
          </div>
        </div>

        {/* Edge-to-edge white vignette to blend section cleanly */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.85) 100%)',
          }}
        />

        {/* Top & bottom seamless fade into white */}
        <div
          className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, #ffffff, rgba(255,255,255,0))' }}
        />
        <div
          className="absolute bottom-0 inset-x-0 h-20 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #ffffff, rgba(255,255,255,0))' }}
        />
      </div>
    </section>
  )
}
