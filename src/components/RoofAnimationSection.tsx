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
 * Scroll-scrubbed roof animation video. Sits between the "Cinematic Split"
 * (dark section) and the Reviews section.
 *
 * Design:
 *  - Dark background (#0a0a0a) — blends seamlessly with surrounding dark sections
 *  - Video is full-bleed-ish, contained with object-contain, no box-shadow
 *  - Heavy feathered dark gradients on all 4 edges + corner blobs so it dissolves
 *    into its neighbours with zero visible solid line
 *  - As scroll nears end the sticky viewport gently scales down + fades, so
 *    the reviews section appears to "rise over" it like a new layer
 */
export default function RoofAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)

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
   * ── Parallax recede effect ──
   * As the user scrolls to the very end of this section, the sticky viewport
   * gently shrinks and dims so the reviews section feels like it rises ON TOP
   * of this animation (no z-index juggling needed — natural DOM stacking).
   */
  const stickyScale   = useTransform(scrollYProgress, [0.75, 1.0], [1,    0.90])
  const stickyOpacity = useTransform(scrollYProgress, [0.78, 1.0], [1,    0.4])
  const stickyY       = useTransform(scrollYProgress, [0.75, 1.0], ['0%', '-4%'])

  return (
    <section
      ref={containerRef}
      aria-label="Animated roof explainer"
      style={{
        height: '500vh',
        background: '#0a0a0a',
        position: 'relative',
      }}
    >
      {/* ══════ Sticky viewport — recedes as reviews slides up ══════ */}
      <motion.div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{
          background: '#0a0a0a',
          scale:   stickyScale,
          opacity: stickyOpacity,
          y:       stickyY,
        }}
      >
        {/* ── Video — no shadow, no rounding, just the pure animation ── */}
        <div
          className="relative w-full max-w-5xl mx-auto"
          style={{ aspectRatio: '16/9', padding: '0 3vw' }}
        >
          <video
            ref={videoRef}
            src="/roofanimation2.mp4"
            /* object-contain keeps full frame visible, bg matches dark host */
            className="w-full h-full object-contain"
            style={{ background: '#0a0a0a', display: 'block' }}
            muted
            playsInline
            preload="auto"
            autoPlay={false}
          />
        </div>

        {/* ══════ Fuzzy dark gradient overlays ══════
            These dissolve the hard edges of the section into the dark bg.
            Top/bottom are extra-thick to merge with adjacent dark sections.
        */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

          {/* Top — heavy blend into the dark section above */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '32%',
            background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.75) 45%, transparent 100%)',
          }} />

          {/* Bottom — heavy blend into the reviews below */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '32%',
            background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.75) 45%, transparent 100%)',
          }} />

          {/* Left */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0,
            width: '18%',
            background: 'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.5) 40%, transparent 100%)',
          }} />

          {/* Right */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, right: 0,
            width: '18%',
            background: 'linear-gradient(to left, #0a0a0a 0%, rgba(10,10,10,0.5) 40%, transparent 100%)',
          }} />

          {/* Corner radial blobs — extra fuzziness at corners */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '40%', height: '45%',
            background: 'radial-gradient(ellipse at top left, #0a0a0a 5%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '40%', height: '45%',
            background: 'radial-gradient(ellipse at top right, #0a0a0a 5%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '40%', height: '45%',
            background: 'radial-gradient(ellipse at bottom left, #0a0a0a 5%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: '40%', height: '45%',
            background: 'radial-gradient(ellipse at bottom right, #0a0a0a 5%, transparent 70%)',
          }} />
        </div>
      </motion.div>
    </section>
  )
}
