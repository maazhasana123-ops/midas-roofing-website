'use client'

import { useEffect, useRef } from 'react'
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion'

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Tall container so scroll has a long runway (4× viewport)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Scrub video currentTime based on scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const targetTime = latest * video.duration
    // Only seek if delta is significant (avoids micro-seeks)
    if (Math.abs(video.currentTime - targetTime) > 0.05) {
      video.currentTime = targetTime
    }
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // Preload the whole video so scrubbing is instant
    video.preload = 'auto'
    video.load()
  }, [])

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={containerRef}
      // 400vh = 4× viewport height = generous scroll runway
      className="relative"
      style={{ height: '400vh' }}
      aria-label="Watch a roof replacement in action"
    >
      {/* Sticky video wrapper — stays fixed while user scrolls through the 400vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-dark flex flex-col items-center justify-center">

        {/* Section label */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
        >
          <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-1">
            See The Process
          </p>
          <p className="text-cream/40 text-xs font-inter tracking-wide">
            Scroll to watch
          </p>
          {/* Scroll hint arrow */}
          <div className="mt-3 flex justify-center">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-gold/50"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Top gradient fade from dark */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-dark to-transparent z-10 pointer-events-none" />

        {/* Video element */}
        <video
          ref={videoRef}
          src="/animated-roof.mp4"
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          // Prevent browser from playing on its own
          autoPlay={false}
        />

        {/* Cinematic vignette overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(8,8,8,0.7) 100%)',
          }}
        />

        {/* Bottom gradient fade to dark */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-dark to-transparent z-10 pointer-events-none" />

        {/* ── Progress bar ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[min(480px,80vw)]">
          {/* Track */}
          <div className="relative h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold rounded-full"
              style={{ width: progressWidth }}
            />
          </div>

          {/* Labels */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-cream/30 text-[10px] font-jakarta tracking-widest uppercase">
              Start
            </span>
            <span className="text-gold/60 text-[10px] font-jakarta tracking-widest uppercase">
              Roof Replacement
            </span>
            <span className="text-cream/30 text-[10px] font-jakarta tracking-widest uppercase">
              Complete
            </span>
          </div>
        </div>

        {/* ── Completion badge ── */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.88, 1], [0, 1]) }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <div className="text-center px-6">
            <motion.div
              style={{ scale: useTransform(scrollYProgress, [0.88, 1], [0.85, 1]) }}
              className="inline-flex flex-col items-center gap-3 bg-dark/80 border border-gold/30 backdrop-blur-md rounded-sm px-10 py-8"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-gold" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-jakarta font-bold text-xl text-cream">Transformation Complete</p>
              <p className="text-cream/50 text-sm font-inter">
                This is the Midas difference — start to finish.
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
