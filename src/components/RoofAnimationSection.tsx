'use client'

import { useEffect, useRef } from 'react'
import {
  useScroll,
  useMotionValueEvent,
  useTransform,
  motion,
} from 'framer-motion'

export default function RoofAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.preload = 'auto'
    video.load()
    const setFirstFrame = () => { video.currentTime = 0 }
    video.addEventListener('loadedmetadata', setFirstFrame)
    return () => video.removeEventListener('loadedmetadata', setFirstFrame)
  }, [])

  const innerScale   = useTransform(scrollYProgress, [0.72, 1.0], [1,   0.88])
  const innerOpacity = useTransform(scrollYProgress, [0.75, 1.0], [1,   0.0])

  return (
    <section
      ref={containerRef}
      aria-label="Animated roof explainer"
      style={{ height: '300vh', background: '#ffffff', position: 'relative', zIndex: 1 }}
    >
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ background: '#ffffff' }}
      >
        {/* Video — lives below the edge mask layer */}
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
          Single unified edge mask — NO multiple overlapping divs.
          One div with a single radial-gradient background:
            • Center: rgba(10,10,10,0) = fully transparent = video shows through clean
            • Outer ring: rgba(10,10,10,1) = solid dark = blends with surrounding sections
          The ellipse shape (wider than tall) matches the widescreen viewport.
          No stacking, no banding, no corner artifacts — just one smooth vignette.
          The 55% 50% inner clear zone keeps well away from the video bounds.
        */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(
              ellipse 55% 50% at 50% 50%,
              transparent 0%,
              transparent 55%,
              rgba(10,10,10,0.15) 68%,
              rgba(10,10,10,0.55) 80%,
              rgba(10,10,10,0.85) 90%,
              #0a0a0a 100%
            )`,
          }}
        />
      </div>
    </section>
  )
}
