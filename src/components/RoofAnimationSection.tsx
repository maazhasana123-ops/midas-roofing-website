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
 * Design intent:
 *  - Reduced height (300vh) so spacing is tighter — video plays fast and crisply
 *  - Premium dark-edge treatment: gold-tinted radial glows bloom from the center
 *    while deep black soft vignettes frame all four edges
 *  - The white video field is respected in the center, but "bleeds out" into
 *    warm-dark blur at the periphery → feels luxury, not clinical
 *  - As scroll approaches end (80–100%), the inner content recedes cleanly so
 *    the reviews section (dark, z-10) can slide over it without any snap/jump
 *  - The bottom half of the section fades to #0a0a0a (matches reviews bg)
 *    so the reviews section appears to emerge from darkness, not crash into white
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
   * Applied to the wrapper INSIDE the sticky div.
   * At 75% scroll the content starts to shrink+fade, at 100% it's fully gone.
   * This gives the reviews section (sliding in from below via -30vh in page.tsx)
   * a clean surface to slide over.
   */
  const innerScale   = useTransform(scrollYProgress, [0.72, 1.0], [1,    0.88])
  const innerOpacity = useTransform(scrollYProgress, [0.75, 1.0], [1,    0.0])

  /* ── Gold ambient glow pulsing with scroll mid-range ── */
  const glowOpacity  = useTransform(scrollYProgress, [0.0, 0.4, 0.75, 1.0], [0.3, 0.7, 0.4, 0.0])

  return (
    <section
      ref={containerRef}
      aria-label="Animated roof explainer"
      style={{
        /* 300vh → crisp, fast, no excess whitespace */
        height: '300vh',
        /* Start from same dark as surrounding sections, transition through white center */
        background: '#0a0a0a',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* ══════ Sticky viewport ══════ */}
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >

        {/* ── AMBIENT BACKGROUND: dark → warm-white center → dark again ── */}
        {/* This creates the "premium spotlight" feel — the video lives in a lit zone */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 75% 60% at 50% 50%,
                rgba(255, 252, 240, 0.97) 0%,
                rgba(255, 248, 230, 0.92) 30%,
                rgba(245, 235, 210, 0.6)  52%,
                rgba(201, 168, 76, 0.08)  68%,
                transparent               80%
              )
            `,
          }}
        />

        {/* ── GOLD GLOW LAYER — animated, breathes with scroll ── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: glowOpacity,
            background: `
              radial-gradient(ellipse 60% 45% at 50% 50%,
                rgba(201, 168, 76, 0.12)  0%,
                rgba(230, 195, 100, 0.06) 40%,
                transparent               70%
              )
            `,
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* ── EDGE VIGNETTES — deep black blur on all four sides ── */}
        {/* These make the white center "float" rather than look like a box */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>

          {/* Top: dark fade from edge into the lit center */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '35%',
            background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.85) 35%, rgba(10,10,10,0.4) 65%, transparent 100%)',
          }} />

          {/* Bottom: dark fade — matches reviews bg color so transition is seamless */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '40%',
            background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.9) 40%, rgba(10,10,10,0.5) 70%, transparent 100%)',
          }} />

          {/* Left */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0,
            width: '22%',
            background: 'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.75) 40%, rgba(10,10,10,0.2) 75%, transparent 100%)',
          }} />

          {/* Right */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, right: 0,
            width: '22%',
            background: 'linear-gradient(to left, #0a0a0a 0%, rgba(10,10,10,0.75) 40%, rgba(10,10,10,0.2) 75%, transparent 100%)',
          }} />

          {/* Corner radial blobs — extra feathering at all four corners */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '45%', height: '50%',
            background: 'radial-gradient(ellipse at top left, #0a0a0a 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '45%', height: '50%',
            background: 'radial-gradient(ellipse at top right, #0a0a0a 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '45%', height: '50%',
            background: 'radial-gradient(ellipse at bottom left, #0a0a0a 0%, transparent 65%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: '45%', height: '50%',
            background: 'radial-gradient(ellipse at bottom right, #0a0a0a 0%, transparent 65%)',
          }} />
        </div>

        {/* ── Inner content — scales back + fades as reviews approach ── */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{ scale: innerScale, opacity: innerOpacity }}
        >
          {/* Video container — no shadow/border; it blends into the white radial behind it */}
          <div
            className="relative w-full max-w-4xl mx-auto"
            style={{
              aspectRatio: '16/9',
              padding: '0 5vw',
              /* Mobile: reduce padding */
            }}
          >
            <video
              ref={videoRef}
              src="/roofanimation2.mp4"
              className="w-full h-full object-contain"
              style={{
                background: 'transparent',
                display: 'block',
              }}
              muted
              playsInline
              preload="auto"
              autoPlay={false}
            />
          </div>
        </motion.div>

        {/* ── SUBTLE GOLD BORDER GLOW around the lit zone ── */}
        {/* A very faint elliptical ring of gold that adds depth/premium feel */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '68%',
            height: '62%',
            borderRadius: '50%',
            boxShadow: '0 0 80px 20px rgba(201, 168, 76, 0.05), inset 0 0 60px 10px rgba(201, 168, 76, 0.03)',
            pointerEvents: 'none',
          }}
        />

      </div>
    </section>
  )
}
