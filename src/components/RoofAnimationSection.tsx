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
 * Scroll-scrubbed roof animation video on a white background.
 *
 * Design intent:
 *  - Section bg is WHITE to match the video's white background — they blend
 *    as one seamless field, no box-around-a-video look.
 *  - The only dark gradients live on the very edges (top/bottom/sides) purely
 *    to mask the hard line where this white section meets the dark sections
 *    above and below. They fade from dark (#0a0a0a) → transparent, and
 *    transparent ends well before the video frame — nothing touches the video.
 *  - No overlay of any kind on the center/video area.
 *  - Very subtle warm radial ring at corners only for depth — does NOT cover
 *    the video playback area.
 *  - As scroll approaches 100%, inner content recedes (scale + opacity) so
 *    the reviews section sliding over feels natural.
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

  /* ── Recede at end of scroll so reviews slides over cleanly ── */
  const innerScale   = useTransform(scrollYProgress, [0.72, 1.0], [1,    0.88])
  const innerOpacity = useTransform(scrollYProgress, [0.75, 1.0], [1,    0.0])

  return (
    <section
      ref={containerRef}
      aria-label="Animated roof explainer"
      style={{
        height: '300vh',
        /* White — matches the video's own background exactly */
        background: '#ffffff',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* ══════ Sticky viewport ══════ */}
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ background: '#ffffff' }}
      >

        {/* ── Inner content — recede animation on scroll end ── */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{ scale: innerScale, opacity: innerOpacity }}
        >
          <div
            className="relative w-full max-w-4xl mx-auto"
            style={{ aspectRatio: '16/9', padding: '0 5vw' }}
          >
            <video
              ref={videoRef}
              src="/roofanimation2.mp4"
              className="w-full h-full object-contain"
              style={{ background: 'transparent', display: 'block' }}
              muted
              playsInline
              preload="auto"
              autoPlay={false}
            />
          </div>
        </motion.div>

        {/*
          ══════ EDGE MASKS ONLY ══════
          These gradients live ONLY on the outer border strips.
          They go: dark (#0a0a0a) → transparent.
          The transparent end stops well before the video starts,
          so zero dark color ever touches the video itself.
          Their only job: dissolve the hard white-on-dark seam
          where this section meets the cinematic split above and
          the reviews section below.
        */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

          {/* TOP edge — fades dark→transparent, covers ~22% of viewport height.
              Transparent end is ~22vh from top, video starts ~15vh lower = safe gap. */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '22%',
            background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.6) 45%, transparent 100%)',
          }} />

          {/* BOTTOM edge — fades dark→transparent, matches #0a0a0a of reviews bg */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '22%',
            background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.6) 45%, transparent 100%)',
          }} />

          {/* LEFT edge — very thin, just kills the hard vertical seam */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0,
            width: '8%',
            background: 'linear-gradient(to right, rgba(10,10,10,0.25) 0%, transparent 100%)',
          }} />

          {/* RIGHT edge — same */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0, right: 0,
            width: '8%',
            background: 'linear-gradient(to left, rgba(10,10,10,0.25) 0%, transparent 100%)',
          }} />

          {/* CORNER blobs — tiny radial puffs at the four corners only,
              feather the intersection where top/side/bottom edges meet.
              These are very small and stop far from the video center. */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '28%', height: '35%',
            background: 'radial-gradient(ellipse at top left, rgba(10,10,10,0.35) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '28%', height: '35%',
            background: 'radial-gradient(ellipse at top right, rgba(10,10,10,0.35) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '28%', height: '35%',
            background: 'radial-gradient(ellipse at bottom left, rgba(10,10,10,0.35) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: '28%', height: '35%',
            background: 'radial-gradient(ellipse at bottom right, rgba(10,10,10,0.35) 0%, transparent 70%)',
          }} />

        </div>
      </div>
    </section>
  )
}
