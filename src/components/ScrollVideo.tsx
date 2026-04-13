'use client'

import { useEffect, useRef } from 'react'
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from 'framer-motion'

// ─── Copy — four chapters that unfold as the video plays ───────────────────
const chapters = [
  {
    label: 'The Process',
    headline: 'This is what a real roof job looks like.',
    body: 'No stock footage. No time-lapse magic. Scroll to watch our crew work start to finish — teardown to final inspection.',
    range: [0, 0.06, 0.24, 0.30] as const,
  },
  {
    label: 'The Craft',
    headline: '47 nails per square.\u00a0Not\u00a0one\u00a0fewer.',
    body: 'Florida code requires it. Jenson requires it twice. Every shingle hand-laid, every flashing sealed, every ridge cap set plumb.',
    range: [0.28, 0.34, 0.50, 0.56] as const,
  },
  {
    label: 'The Standard',
    headline: 'Done in a day.\u00a0Cleaned before we leave.',
    body: "Our crews don\u2019t stop at sundown and come back tomorrow. One job, one day — from morning until it\u2019s right.",
    range: [0.54, 0.60, 0.74, 0.80] as const,
  },
  {
    label: 'The Promise',
    headline: '5\u00a0years. Not a\u00a0single\u00a0leak.',
    body: 'Or we come back free. No deductible. No argument. That\u2019s not a marketing line — that\u2019s Jenson\u2019s word on every roof Midas touches.',
    range: [0.78, 0.84, 0.94, 0.98] as const,
  },
]

// ── Chapter number pills ───────────────────────────────────────────────────
const chapterNumbers = ['01', '02', '03', '04']

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Scrub video
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const target = latest * video.duration
    if (Math.abs(video.currentTime - target) > 0.04) {
      video.currentTime = target
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
  const completionScale = useTransform(scrollYProgress, [0.88, 1], [0.92, 1])

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '500vh' }}
      aria-label="Watch a roof replacement in action"
    >
      <div
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >

        {/* ── Ambient fuzzy glow — warm whites matching footage ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%', height: '65%',
            background: 'radial-gradient(ellipse at center, rgba(255,252,245,1) 0%, rgba(245,238,220,0.85) 35%, rgba(255,255,255,0) 75%)',
            filter: 'blur(36px)',
          }} />
          <div style={{
            position: 'absolute', top: '10%', left: '8%',
            width: '340px', height: '260px',
            background: 'radial-gradient(ellipse at center, rgba(235,215,175,0.45) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(52px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '8%', right: '8%',
            width: '380px', height: '300px',
            background: 'radial-gradient(ellipse at center, rgba(225,208,178,0.40) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute', top: '6%', right: '6%',
            width: '260px', height: '220px',
            background: 'radial-gradient(ellipse at center, rgba(248,244,236,0.55) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(40px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', left: '6%',
            width: '300px', height: '240px',
            background: 'radial-gradient(ellipse at center, rgba(232,220,195,0.38) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(52px)',
          }} />
        </div>

        {/* ── Main layout: text + video stacked ── */}
        <div className="relative z-10 w-full flex flex-col items-center gap-5 px-6">

          {/* ── Text area — four chapters overlap here, each fades in/out ── */}
          <div className="relative h-[116px] w-full max-w-[820px] flex items-end justify-center">
            {chapters.map((ch, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(
                scrollYProgress,
                [ch.range[0], ch.range[1], ch.range[2], ch.range[3]],
                [0, 1, 1, 0]
              )
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(
                scrollYProgress,
                [ch.range[0], ch.range[1]],
                ['10px', '0px']
              )

              return (
                <motion.div
                  key={i}
                  style={{ opacity, y }}
                  className="absolute inset-0 flex flex-col items-center justify-end text-center gap-2 pb-1"
                >
                  {/* Chapter pill */}
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="h-px w-8"
                      style={{ background: 'rgba(201,168,76,0.5)' }}
                    />
                    <span
                      className="font-jakarta font-semibold text-[10px] tracking-[0.22em] uppercase"
                      style={{ color: '#C9A84C' }}
                    >
                      {chapterNumbers[i]} — {ch.label}
                    </span>
                    <div
                      className="h-px w-8"
                      style={{ background: 'rgba(201,168,76,0.5)' }}
                    />
                  </div>

                  {/* Headline */}
                  <h3
                    className="font-jakarta font-bold leading-tight tracking-tight"
                    style={{
                      fontSize: 'clamp(1.35rem, 2.8vw, 2rem)',
                      color: '#111111',
                    }}
                  >
                    {ch.headline}
                  </h3>

                  {/* Body */}
                  <p
                    className="font-inter leading-snug max-w-[560px]"
                    style={{ fontSize: 'clamp(0.78rem, 1.4vw, 0.9rem)', color: '#888' }}
                  >
                    {ch.body}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* ── Video frame ── */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              maxWidth: '820px',
              borderRadius: '14px',
              aspectRatio: '16 / 9',
              boxShadow:
                '0 2px 8px rgba(0,0,0,0.06), 0 10px 40px rgba(0,0,0,0.11), 0 32px 72px rgba(0,0,0,0.10)',
            }}
          >
            {/* Side edge fades */}
            <div className="absolute inset-y-0 left-0 w-10 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.14), transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-10 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, rgba(255,255,255,0.14), transparent)' }} />

            <video
              ref={videoRef}
              src="/animated-roof.mp4"
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              autoPlay={false}
            />

            {/* Completion overlay */}
            <motion.div
              style={{ opacity: completionOpacity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none backdrop-blur-[6px]"
            >
              <motion.div
                style={{
                  scale: completionScale,
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(201,168,76,0.35)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
                }}
                className="flex flex-col items-center gap-2.5 text-center px-10 py-7 rounded-xl"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                  style={{ background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.35)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#C9A84C" strokeWidth="1.8">
                    <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-jakarta font-bold text-[1.1rem]" style={{ color: '#111' }}>
                  Transformation complete.
                </p>
                <p className="font-inter text-[0.82rem]" style={{ color: '#999' }}>
                  This is the Midas difference — start to finish.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Progress bar ── */}
          <div className="w-full max-w-[520px]">
            <div
              className="relative rounded-full overflow-hidden"
              style={{ height: '2px', background: 'rgba(0,0,0,0.07)' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: progressWidth,
                  background: 'linear-gradient(90deg, #C9A84C, #E8C46A)',
                }}
              />
            </div>

            {/* Chapter dots */}
            <div className="flex justify-between items-center mt-3">
              {chapters.map((ch, i) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const dotProgress = useTransform(
                  scrollYProgress,
                  [ch.range[0], ch.range[1]],
                  [0, 1]
                )
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <motion.div
                      style={{
                        scale: dotProgress,
                        opacity: dotProgress,
                        background: '#C9A84C',
                      }}
                      className="w-1 h-1 rounded-full"
                    />
                    <span
                      className="text-[9px] font-jakarta tracking-widest uppercase hidden sm:block"
                      style={{ color: '#ccc' }}
                    >
                      {ch.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* White edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 95% at 50% 50%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.9) 100%)',
          }}
        />
        <div
          className="absolute top-0 inset-x-0 h-16 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, #ffffff, rgba(255,255,255,0))' }}
        />
        <div
          className="absolute bottom-0 inset-x-0 h-16 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #ffffff, rgba(255,255,255,0))' }}
        />
      </div>
    </section>
  )
}
