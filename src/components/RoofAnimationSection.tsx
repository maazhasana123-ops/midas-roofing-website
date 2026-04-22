'use client'

import { useEffect, useRef } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

/**
 * RoofAnimationSection
 *
 * A scroll-scrubbed video section that sits between the "Cinematic Split"
 * and the Reviews section. The video plays frame-by-frame as the user scrolls.
 *
 * Design goals:
 *  - White background (matches surrounding sections)
 *  - Video stays inside a rounded, centered frame — no zoom / cover scaling
 *  - Feathered/fuzzy gradient overlays on all 4 edges + corners so the
 *    section blends softly into its neighbours
 *  - No chapter cards, no text, no progress bar — pure cinematic moment
 *  - Auto-plays from frame 0 on mount so the first frame is visible
 */
export default function RoofAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Scrub video currentTime based on scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const target = latest * video.duration
    if (Math.abs(video.currentTime - target) > 0.04) {
      video.currentTime = target
    }
  })

  // Pre-load + show first frame
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.preload = 'auto'
    video.load()
    // Seek to frame 0 so the poster frame is visible immediately
    const onLoaded = () => {
      video.currentTime = 0
    }
    video.addEventListener('loadedmetadata', onLoaded)
    return () => video.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative"
      /* Scroll height — 500vh gives roughly the same pacing as the main ScrollVideo */
      style={{ height: '500vh', background: '#ffffff' }}
      aria-label="Roof animation explainer"
    >
      {/* ══════════ Sticky viewport ══════════ */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ background: '#ffffff' }}
      >
        {/* ── Centered video frame ── */}
        <div
          className="relative w-full max-w-5xl mx-auto px-6 md:px-12"
          style={{ aspectRatio: '16/9' }}
        >
          {/* Rounded frame container — no overflow zoom, video letterboxed inside */}
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 30px 80px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06)',
            }}
          >
            <video
              ref={videoRef}
              src="/roofanimation.mp4"
              /* contain keeps the full video visible without any cropping */
              className="w-full h-full object-contain bg-white"
              muted
              playsInline
              preload="auto"
              autoPlay={false}
            />
          </div>
        </div>

        {/* ══════════ Fuzzy gradient overlays — blends into white ══════════ */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top fade */}
          <div
            className="absolute top-0 inset-x-0"
            style={{
              height: '22%',
              background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 inset-x-0"
            style={{
              height: '22%',
              background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          {/* Left fade */}
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: '12%',
              background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          {/* Right fade */}
          <div
            className="absolute inset-y-0 right-0"
            style={{
              width: '12%',
              background: 'linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%)',
            }}
          />

          {/* Corner blobs — soft radial gradients for extra fuzziness */}
          <div
            className="absolute"
            style={{
              top: 0,
              left: 0,
              width: '35%',
              height: '35%',
              background: 'radial-gradient(ellipse at top left, #ffffff 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          <div
            className="absolute"
            style={{
              top: 0,
              right: 0,
              width: '35%',
              height: '35%',
              background: 'radial-gradient(ellipse at top right, #ffffff 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: 0,
              left: 0,
              width: '35%',
              height: '35%',
              background: 'radial-gradient(ellipse at bottom left, #ffffff 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: 0,
              right: 0,
              width: '35%',
              height: '35%',
              background: 'radial-gradient(ellipse at bottom right, #ffffff 0%, rgba(255,255,255,0) 70%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
