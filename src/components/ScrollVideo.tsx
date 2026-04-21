'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from 'framer-motion'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Chapter data — each chapter scrolls over the video with image + text
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const chapters = [
  {
    number: '01',
    label: 'Inspect & Plan',
    headline: 'Every Great Roof Starts With a Plan',
    body: 'Our licensed crew arrives on-site, performs a complete aerial and ground-level inspection, and maps every measurement before a single shingle is touched.',
    stat: '100%',
    statLabel: 'Licensed & Insured',
    image: '/images/house roof1.jpg',
    imageAlt: 'Aerial view of a completed shingle roof by Midas Roofing',
    range: [0.0, 0.05, 0.20, 0.25] as const,
  },
  {
    number: '02',
    label: 'Teardown & Prep',
    headline: 'Strip It Down. Build It Right.',
    body: 'Old shingles are removed, decking is inspected board-by-board, and new underlayment is installed with CertainTeed premium materials for maximum protection.',
    stat: '47',
    statLabel: 'Nails Per Square',
    image: '/images/house roof-working crew.jpg',
    imageAlt: 'Midas Roofing crew working on a residential roof replacement',
    range: [0.25, 0.30, 0.45, 0.50] as const,
  },
  {
    number: '03',
    label: 'Install & Seal',
    headline: 'Florida-Grade Craftsmanship',
    body: 'Hand-laid shingles, sealed flashings, and ridge caps set plumb — every detail engineered for Florida hurricanes, heat, and everything in between.',
    stat: '20+',
    statLabel: 'Years Experience',
    image: '/images/house roof-working crew2.jpg',
    imageAlt: 'Workers installing new CertainTeed shingles on a Florida home',
    range: [0.50, 0.55, 0.70, 0.75] as const,
  },
  {
    number: '04',
    label: 'Final Walkthrough',
    headline: 'Done in a Day. Guaranteed for Five.',
    body: 'Final inspection, full cleanup, and our exclusive No-Leak Promise delivered on the spot. If it leaks — we come back, no charge, no questions.',
    stat: '✓',
    statLabel: 'No-Leak Promise',
    image: '/images/house roof5-after.jpg',
    imageAlt: 'Completed dark shingle roof installed by Midas Roofing',
    range: [0.75, 0.82, 1.0, 1.0] as const,
  },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ChapterCard — scrolls in over the video with image + info
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ChapterCard({
  chapter,
  scrollYProgress,
  side,
}: {
  chapter: (typeof chapters)[number]
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  side: 'left' | 'right'
}) {
  const noFadeOut = chapter.range[2] === chapter.range[3]
  const opacity = useTransform(
    scrollYProgress,
    [chapter.range[0], chapter.range[1], chapter.range[2], chapter.range[3]],
    noFadeOut ? [0, 1, 1, 1] : [0, 1, 1, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [chapter.range[0], chapter.range[1], chapter.range[2], chapter.range[3]],
    noFadeOut ? ['50px', '0px', '0px', '0px'] : ['50px', '0px', '0px', '-30px']
  )
  const scale = useTransform(
    scrollYProgress,
    [chapter.range[0], chapter.range[1], chapter.range[2], chapter.range[3]],
    noFadeOut ? [0.95, 1, 1, 1] : [0.95, 1, 1, 0.97]
  )

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center pointer-events-none"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">
        <div
          className={`flex justify-center ${side === 'right' ? 'lg:justify-end' : 'lg:justify-start'}`}
        >
          {/* ── Glass card ── */}
          <div
            className="w-full max-w-[480px] rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 10, 10, 0.82)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(201, 168, 76, 0.15)',
              boxShadow:
                '0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset',
            }}
          >
            {/* Card image */}
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <Image
                src={chapter.image}
                alt={chapter.imageAlt}
                fill
                className="object-cover"
                quality={85}
                sizes="480px"
              />
              {/* Image bottom gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.9) 100%)',
                }}
              />
              {/* Step badge on image */}
              <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-jakarta font-bold text-[9px]"
                  style={{
                    background: 'rgba(201,168,76,0.15)',
                    border: '1px solid rgba(201,168,76,0.4)',
                    color: '#C9A84C',
                  }}
                >
                  {chapter.number}
                </div>
                <span
                  className="font-jakarta font-semibold text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: 'rgba(201,168,76,0.8)' }}
                >
                  {chapter.label}
                </span>
              </div>
            </div>

            {/* Card content */}
            <div className="p-6 pt-5">
              <h3
                className="font-jakarta font-bold leading-[1.15] tracking-tight mb-3"
                style={{
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)',
                  color: '#f5f0e8',
                }}
              >
                {chapter.headline}
              </h3>

              <p
                className="font-inter leading-relaxed mb-5"
                style={{
                  fontSize: 'clamp(0.8rem, 1.1vw, 0.92rem)',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                {chapter.body}
              </p>

              {/* Divider + stat */}
              <div
                className="h-px w-full mb-4"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)',
                }}
              />
              <div className="flex items-baseline gap-3">
                <span
                  className="font-jakarta font-bold tracking-tight"
                  style={{
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    color: '#C9A84C',
                  }}
                >
                  {chapter.stat}
                </span>
                <span
                  className="font-jakarta font-medium text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  {chapter.statLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ScrollVideo — video background + scrolling chapter cards
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Chapter nav indicators
  const ch1Active = useTransform(scrollYProgress, [0.03, 0.08, 0.22, 0.26], [0.2, 1, 1, 0.2])
  const ch2Active = useTransform(scrollYProgress, [0.27, 0.32, 0.46, 0.50], [0.2, 1, 1, 0.2])
  const ch3Active = useTransform(scrollYProgress, [0.51, 0.56, 0.70, 0.74], [0.2, 1, 1, 0.2])
  const ch4Active = useTransform(scrollYProgress, [0.75, 0.82, 1.0, 1.0], [0.2, 1, 1, 1])
  const chapterOpacities = [ch1Active, ch2Active, ch3Active, ch4Active]

  // Alternating card positions
  const cardSides: ('left' | 'right')[] = ['left', 'right', 'left', 'right']

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '1200vh' }}
      aria-label="Watch a roof replacement in action"
    >
      {/* ══════ Sticky viewport ══════ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: '#0a0a0a' }}>

        {/* ── Video — contained with white space, blended edges ── */}
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-14">
          <div
            className="relative w-full h-full max-w-[1400px] rounded-xl overflow-hidden"
            style={{
              maskImage:
                'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
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
            {/* Darken video so cards are readable */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)',
              }}
            />
          </div>
        </div>

        {/* ── Fuzzy gradient borders blending video into dark background ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top fade */}
          <div
            className="absolute top-0 inset-x-0 h-32"
            style={{ background: 'linear-gradient(to bottom, #0a0a0a, transparent)' }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 inset-x-0 h-32"
            style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }}
          />
          {/* Left fade */}
          <div
            className="absolute inset-y-0 left-0 w-24"
            style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }}
          />
          {/* Right fade */}
          <div
            className="absolute inset-y-0 right-0 w-24"
            style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }}
          />
        </div>

        {/* ── Subtle ambient gold glow ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '55%',
              height: '45%',
              background:
                'radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        {/* ── Intro text removed entirely ── */}

        {/* ── Chapter cards overlaying the video ── */}
        <div className="absolute inset-0 z-20">
          {chapters.map((ch, i) => (
            <ChapterCard
              key={i}
              chapter={ch}
              scrollYProgress={scrollYProgress}
              side={cardSides[i]}
            />
          ))}
        </div>

        {/* ── Right side: vertical chapter nav ── */}
        <div className="absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-3.5 pointer-events-none">
          {chapters.map((ch, i) => (
            <div key={i} className="flex flex-col items-end gap-1.5">
              <motion.div
                style={{ opacity: chapterOpacities[i] }}
                className="flex items-center gap-2"
              >
                <span
                  className="font-jakarta font-semibold text-[8px] tracking-[0.15em] uppercase"
                  style={{ color: 'rgba(201,168,76,0.7)' }}
                >
                  {ch.label}
                </span>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: '#C9A84C',
                    boxShadow: '0 0 6px rgba(201,168,76,0.3)',
                  }}
                />
              </motion.div>
              {i < chapters.length - 1 && (
                <div
                  className="w-px h-5 mr-[3px]"
                  style={{ background: 'rgba(201,168,76,0.1)' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Bottom progress bar ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-[320px] px-6">
          <div
            className="relative rounded-full overflow-hidden"
            style={{ height: '2px', background: 'rgba(255,255,255,0.06)' }}
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
            <span
              className="text-[8px] font-jakarta tracking-[0.15em] uppercase"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            >
              Before
            </span>
            <span
              className="text-[8px] font-jakarta tracking-[0.15em] uppercase"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            >
              After
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
