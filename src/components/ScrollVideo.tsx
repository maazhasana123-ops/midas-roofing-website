'use client'

import { useEffect, useRef } from 'react'
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from 'framer-motion'

// ─── Chapters — bold text that fades through as you scroll ──────────────────
const chapters = [
  {
    number: '01',
    label: 'The Process',
    words: [
      { text: 'This is what a ', highlight: false },
      { text: 'real roof job', highlight: true },
      { text: ' looks like.', highlight: false },
    ],
    body: 'No stock footage. No time-lapse magic. Watch our crew work — teardown to final inspection.',
    range: [0.02, 0.08, 0.22, 0.28] as const,
  },
  {
    number: '02',
    label: 'The Craft',
    words: [
      { text: '47 nails per square. ', highlight: false },
      { text: 'Not\u00a0one\u00a0fewer.', highlight: true },
    ],
    body: 'Florida code requires it. Our crew requires it twice. Every shingle hand-laid, every flashing sealed, every ridge cap set plumb.',
    range: [0.26, 0.32, 0.46, 0.52] as const,
  },
  {
    number: '03',
    label: 'The Standard',
    words: [
      { text: 'Done in a day. ', highlight: false },
      { text: 'Cleaned', highlight: true },
      { text: ' before we leave.', highlight: false },
    ],
    body: "Our crews don\u2019t stop at sundown and come back tomorrow. One job, one day — from morning until it\u2019s right.",
    range: [0.50, 0.56, 0.70, 0.76] as const,
  },
  {
    number: '04',
    label: 'The Promise',
    words: [
      { text: '5\u00a0years. ', highlight: false },
      { text: 'Not a single leak.', highlight: true },
    ],
    body: 'Or we come back free. No deductible. No argument. That\u2019s a company promise on every roof Midas touches.',
    range: [0.74, 0.80, 0.92, 0.96] as const,
  },
]

function ChapterText({
  chapter,
  scrollYProgress,
}: {
  chapter: typeof chapters[number]
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const opacity = useTransform(
    scrollYProgress,
    [chapter.range[0], chapter.range[1], chapter.range[2], chapter.range[3]],
    [0, 1, 1, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [chapter.range[0], chapter.range[1], chapter.range[2], chapter.range[3]],
    ['40px', '0px', '0px', '-30px']
  )

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
    >
      {/* Chapter number / label line */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-10" style={{ background: 'rgba(201,168,76,0.4)' }} />
        <span
          className="font-jakarta font-bold text-[11px] tracking-[0.25em] uppercase"
          style={{ color: '#C9A84C' }}
        >
          {chapter.number} — {chapter.label}
        </span>
        <div className="h-px w-10" style={{ background: 'rgba(201,168,76,0.4)' }} />
      </div>

      {/* Big headline with color highlights */}
      <h3
        className="font-jakarta font-bold leading-[1.15] tracking-tight max-w-[680px]"
        style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)' }}
      >
        {chapter.words.map((w, j) => (
          <span
            key={j}
            style={{
              color: w.highlight ? '#C9A84C' : '#111111',
              transition: 'color 0.3s ease',
            }}
          >
            {w.text}
          </span>
        ))}
      </h3>

      {/* Body copy */}
      <p
        className="font-inter leading-relaxed max-w-[480px] mt-4"
        style={{
          fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
          color: 'rgba(0,0,0,0.45)',
        }}
      >
        {chapter.body}
      </p>
    </motion.div>
  )
}

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

  // Progress / intro
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const introOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0])

  // Active chapter indicator
  const ch1Active = useTransform(scrollYProgress, [0.06, 0.10, 0.24, 0.28], [0.3, 1, 1, 0.3])
  const ch2Active = useTransform(scrollYProgress, [0.30, 0.34, 0.48, 0.52], [0.3, 1, 1, 0.3])
  const ch3Active = useTransform(scrollYProgress, [0.54, 0.58, 0.72, 0.76], [0.3, 1, 1, 0.3])
  const ch4Active = useTransform(scrollYProgress, [0.78, 0.82, 0.94, 0.96], [0.3, 1, 1, 0.3])
  const chapterOpacities = [ch1Active, ch2Active, ch3Active, ch4Active]

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '600vh' }}
      aria-label="Watch a roof replacement in action"
    >
      {/* ══ Sticky viewport ══ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: '#fafaf8' }}>

        {/* ── Video — full background, blended into section ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative w-full h-full"
            style={{
              maskImage: 'radial-gradient(ellipse 70% 65% at 50% 50%, black 30%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 50%, black 30%, transparent 100%)',
            }}
          >
            <video
              ref={videoRef}
              src="/animated-roof.mp4"
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              autoPlay={false}
            />
          </div>
        </div>

        {/* ── Warm ambient glow under video ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%', height: '50%',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }} />
        </div>

        {/* ── Slight overlay to help text readability ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 65% at 50% 50%, rgba(250,250,248,0.35) 0%, rgba(250,250,248,0.85) 55%, #fafaf8 80%)',
          }}
        />

        {/* ── Intro scroll prompt ── */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute top-10 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none"
        >
          <p className="font-jakarta font-semibold text-[11px] tracking-[0.22em] uppercase" style={{ color: '#C9A84C' }}>
            See The Process
          </p>
          <p className="text-[12px] font-inter mt-1.5" style={{ color: '#bbb' }}>
            Scroll to watch the transformation
          </p>
          <div className="mt-3 flex justify-center">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="#C9A84C" strokeWidth="1.5" strokeOpacity="0.5">
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Chapter text overlays ── */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {chapters.map((ch, i) => (
            <ChapterText key={i} chapter={ch} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* ── Left side: vertical chapter indicator ── */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3 pointer-events-none">
          {chapters.map((ch, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                style={{ opacity: chapterOpacities[i] }}
                className="flex items-center gap-2"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center font-jakarta font-bold text-[8px]"
                  style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C' }}
                >
                  {ch.number}
                </div>
              </motion.div>
              {i < chapters.length - 1 && (
                <div className="w-px h-5" style={{ background: 'rgba(0,0,0,0.06)' }} />
              )}
            </div>
          ))}
        </div>

        {/* ── Bottom progress bar ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-[340px] px-6">
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
          <div className="flex justify-between mt-2.5">
            <span className="text-[9px] font-jakarta tracking-[0.15em] uppercase" style={{ color: '#ccc' }}>
              Before
            </span>
            <span className="text-[9px] font-jakarta tracking-[0.15em] uppercase" style={{ color: '#ccc' }}>
              After
            </span>
          </div>
        </div>

        {/* ── Section edge fades ── */}
        <div
          className="absolute top-0 inset-x-0 h-14 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, #fafaf8, transparent)' }}
        />
        <div
          className="absolute bottom-0 inset-x-0 h-14 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #fafaf8, transparent)' }}
        />
      </div>
    </section>
  )
}
