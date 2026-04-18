'use client'

import { useEffect, useRef } from 'react'
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from 'framer-motion'

// ─── Chapters that scroll OVER the video ────────────────────────────────────
const chapters = [
  {
    number: '01',
    label: 'The Process',
    headline: 'This is what a real roof job looks like.',
    body: 'No stock footage. No time-lapse magic. Scroll to watch our crew work — teardown to final inspection.',
    align: 'left' as const,
    range: [0.02, 0.08, 0.22, 0.28] as const,
  },
  {
    number: '02',
    label: 'The Craft',
    headline: '47 nails per square.\u00a0Not\u00a0one\u00a0fewer.',
    body: 'Florida code requires it. Our crew requires it twice. Every shingle hand-laid, every flashing sealed, every ridge cap set plumb.',
    align: 'right' as const,
    range: [0.26, 0.32, 0.46, 0.52] as const,
  },
  {
    number: '03',
    label: 'The Standard',
    headline: 'Done in a day.\u00a0Cleaned before we leave.',
    body: "Our crews don\u2019t stop at sundown and come back tomorrow. One job, one day \u2014 from morning until it\u2019s right.",
    align: 'left' as const,
    range: [0.50, 0.56, 0.70, 0.76] as const,
  },
  {
    number: '04',
    label: 'The Promise',
    headline: '5\u00a0years. Not a\u00a0single\u00a0leak.',
    body: 'Or we come back free. No deductible. No argument. That\u2019s not a marketing line \u2014 that\u2019s a company promise on every roof Midas touches.',
    align: 'right' as const,
    range: [0.74, 0.80, 0.92, 0.96] as const,
  },
]

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Scrub video currentTime based on scroll
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

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Intro text fade
  const introOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '600vh' }}
      aria-label="Watch a roof replacement in action"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: '#fafaf8' }}>

        {/* ── Video layer — centered, blended into background ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Fuzzy edge blending — all four sides */}
          <div className="relative w-[min(900px,92vw)]" style={{ aspectRatio: '16 / 9' }}>
            <video
              ref={videoRef}
              src="/animated-roof.mp4"
              className="w-full h-full object-cover"
              style={{ borderRadius: '6px' }}
              muted
              playsInline
              preload="auto"
              autoPlay={false}
            />

            {/* Left edge blur */}
            <div
              className="absolute inset-y-0 left-0 w-24 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #fafaf8, rgba(250,250,248,0.6) 40%, transparent)' }}
            />
            {/* Right edge blur */}
            <div
              className="absolute inset-y-0 right-0 w-24 pointer-events-none"
              style={{ background: 'linear-gradient(to left, #fafaf8, rgba(250,250,248,0.6) 40%, transparent)' }}
            />
            {/* Top edge blur */}
            <div
              className="absolute top-0 inset-x-0 h-20 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, #fafaf8, rgba(250,250,248,0.4) 50%, transparent)' }}
            />
            {/* Bottom edge blur */}
            <div
              className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
              style={{ background: 'linear-gradient(to top, #fafaf8, rgba(250,250,248,0.4) 50%, transparent)' }}
            />

            {/* Corner blurs — extra soft corners */}
            <div className="absolute top-0 left-0 w-32 h-24 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top left, #fafaf8 20%, transparent 70%)' }} />
            <div className="absolute top-0 right-0 w-32 h-24 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top right, #fafaf8 20%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-32 h-24 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at bottom left, #fafaf8 20%, transparent 70%)' }} />
            <div className="absolute bottom-0 right-0 w-32 h-24 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at bottom right, #fafaf8 20%, transparent 70%)' }} />
          </div>
        </div>

        {/* ── Ambient warm glow behind video area ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '55%', height: '45%',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }} />
        </div>

        {/* ── Intro prompt — fades out immediately ── */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none"
        >
          <p className="font-jakarta font-semibold text-[11px] tracking-[0.2em] uppercase" style={{ color: '#C9A84C' }}>
            See The Process
          </p>
          <p className="text-[12px] font-inter mt-1" style={{ color: '#bbb' }}>
            Scroll to watch the transformation
          </p>
          <div className="mt-2.5 flex justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="#C9A84C" strokeWidth="1.5" strokeOpacity="0.6">
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Text chapters — overlay ON the video ── */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-[1000px] px-8 relative">
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
                [ch.range[0], ch.range[1], ch.range[2], ch.range[3]],
                ['30px', '0px', '0px', '-20px']
              )
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const cardScale = useTransform(
                scrollYProgress,
                [ch.range[0], ch.range[1]],
                [0.96, 1]
              )

              const alignClass = ch.align === 'left'
                ? 'items-start text-left self-start'
                : 'items-end text-right self-end'

              return (
                <motion.div
                  key={i}
                  style={{ opacity, y, scale: cardScale }}
                  className={`absolute inset-0 flex flex-col justify-center ${alignClass}`}
                >
                  <div
                    className="max-w-[380px] px-7 py-6 rounded-2xl backdrop-blur-xl"
                    style={{
                      background: 'rgba(255,255,255,0.82)',
                      border: '1px solid rgba(201,168,76,0.15)',
                      boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Chapter number + label */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center font-jakarta font-bold text-[10px]"
                        style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}
                      >
                        {ch.number}
                      </div>
                      <div
                        className="h-px flex-1"
                        style={{ background: 'rgba(201,168,76,0.25)' }}
                      />
                      <span
                        className="font-jakarta font-semibold text-[9px] tracking-[0.18em] uppercase"
                        style={{ color: '#C9A84C' }}
                      >
                        {ch.label}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3
                      className="font-jakarta font-bold leading-snug tracking-tight mb-2"
                      style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', color: '#111' }}
                    >
                      {ch.headline}
                    </h3>

                    {/* Body */}
                    <p
                      className="font-inter leading-relaxed"
                      style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.88rem)', color: '#666' }}
                    >
                      {ch.body}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Progress bar — bottom ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-[400px] px-6">
          <div
            className="relative rounded-full overflow-hidden"
            style={{ height: '2px', background: 'rgba(0,0,0,0.06)' }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: progressWidth,
                background: 'linear-gradient(90deg, #C9A84C, #E8C46A)',
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[9px] font-jakarta tracking-widest uppercase" style={{ color: '#ccc' }}>Before</span>
            <span className="text-[9px] font-jakarta font-semibold tracking-widest uppercase" style={{ color: '#C9A84C' }}>Roof Replacement</span>
            <span className="text-[9px] font-jakarta tracking-widest uppercase" style={{ color: '#ccc' }}>After</span>
          </div>
        </div>

        {/* ── Section top/bottom white fades for seamless transition ── */}
        <div
          className="absolute top-0 inset-x-0 h-12 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, #fafaf8, transparent)' }}
        />
        <div
          className="absolute bottom-0 inset-x-0 h-12 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #fafaf8, transparent)' }}
        />
      </div>
    </section>
  )
}
