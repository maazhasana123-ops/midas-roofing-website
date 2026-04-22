'use client'

import { useEffect, useRef } from 'react'
import {
  useScroll,
  useMotionValueEvent,
  useTransform,
  motion,
} from 'framer-motion'

/**
 * RoofAnimationSection
 *
 * Scroll-scrubbed roof animation video.
 *
 * Design:
 *  - White background (video was recorded on white — matches naturally)
 *  - White fuzzy gradients on ALL edges + corners so the section dissolves
 *    into its neighbours — NO hard line, NO solid block
 *  - Subtle warm radial vignette in the mid-zone for depth
 *  - The video has NO shadow, NO border — it blends raw into the white field
 *  - As scroll nears end, the inner content gently scales back + dims so
 *    the reviews section (which overlaps via negative margin-top in page.tsx)
 *    feels like it rises and consumes the animation
 */
export default function RoofAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* ── Scrub video currentTime with scroll ── */
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const target = latest * video.duration
    if (Math.abs(video.currentTime - target) > 0.04) {
      video.currentTime = target
    }
  })

  /* ── Pre-load + park on first frame ── */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.preload = 'auto'
    video.load()
    const setFirstFrame = () => { video.currentTime = 0 }
    video.addEventListener('loadedmetadata', setFirstFrame)
    return () => video.removeEventListener('loadedmetadata', setFirstFrame)
  }, [])

  /*
   * ── Inner recede animation ──
   * Applied to a wrapper INSIDE the sticky div (not the sticky itself).
   * As scroll approaches 1.0, content gently shrinks + fades so the dark
   * reviews section sliding up from below (via -25vh margin-top in page.tsx)
   * feels like it's consuming the animation from below.
   */
  const innerScale   = useTransform(scrollYProgress, [0.78, 1.0], [1,   0.92])
  const innerOpacity = useTransform(scrollYProgress, [0.80, 1.0], [1,   0.55])

  return (
    <section
      ref={containerRef}
      aria-label="Animated roof explainer"
      style={{
        height: '500vh',
        /* White — matches the video's own background colour */
        background: '#ffffff',
        position: 'relative',
        /* Low z-index so the reviews layer (z-index:10 in page.tsx) slides over */
        zIndex: 1,
      }}
    >
      {/* ══════ Sticky viewport ══════ */}
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ background: '#ffffff' }}
      >

        {/* ── Inner content — has the recede animation ── */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{ scale: innerScale, opacity: innerOpacity }}
        >
          {/* Video — raw, no shadow, no border, no rounding ── */}
          <div
            className="relative w-full max-w-5xl mx-auto"
            style={{ aspectRatio: '16/9', padding: '0 4vw' }}
          >
            <video
              ref={videoRef}
              src="/roofanimation2.mp4"
              /* object-contain keeps full frame — bg white to match video bg */
              className="w-full h-full object-contain"
              style={{ background: '#ffffff', display: 'block' }}
              muted
              playsInline
              preload="auto"
              autoPlay={false}
            />
          </div>
        </motion.div>

        {/* ══════ Fuzzy white gradient overlay system ══════
            Each layer fades from #fff to transparent so the section
            bleeds into adjacent dark sections without a hard edge.
            Corner blobs add extra softness at all four corners.
        */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

          {/* ── Edge fades ── */}
          {/* Top → fades FROM dark (matches cinematic split above) into the white section */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '55%',
            background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.75) 18%, rgba(10,10,10,0.35) 40%, rgba(10,10,10,0.08) 60%, transparent 100%)',
          }} />
          {/* Bottom → blends with reviews section below */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '30%',
            background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0.3) 70%, transparent 100%)',
          }} />
          {/* Left */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0,
            width: '18%',
            background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.75) 40%, transparent 100%)',
          }} />
          {/* Right */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, right: 0,
            width: '18%',
            background: 'linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0.75) 40%, transparent 100%)',
          }} />

          {/* ── Corner radial blobs (extra feathering) ── */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '42%', height: '48%',
            background: 'radial-gradient(ellipse at top left, #ffffff 10%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '42%', height: '48%',
            background: 'radial-gradient(ellipse at top right, #ffffff 10%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '42%', height: '48%',
            background: 'radial-gradient(ellipse at bottom left, #ffffff 10%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: '42%', height: '48%',
            background: 'radial-gradient(ellipse at bottom right, #ffffff 10%, transparent 70%)',
          }} />

          {/* ── Decorative warm radial vignette (adds visual depth, not a box) ── */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 45%, rgba(210, 180, 120, 0.06) 75%, rgba(230, 200, 150, 0.08) 100%)',
          }} />

        </div>
      </div>
    </section>
  )
}
