'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

const IMAGES = [
  { src: '/images/house roof3.jpg',           label: 'Tile Roofing' },
  { src: '/images/house roof-working crew.jpg', label: 'Expert Crew' },
  { src: '/images/house roof1.jpg',            label: 'Shingle Roofing' },
  { src: '/images/house roof4.JPG',            label: 'Shingle Roofing' },
]

interface LayoutPreloaderProps {
  onComplete?: () => void
}

export function LayoutPreloader({ onComplete }: LayoutPreloaderProps) {
  const overlayRef   = useRef<HTMLDivElement>(null)
  const gridRef      = useRef<HTMLDivElement>(null)
  const grainRef     = useRef<HTMLDivElement>(null)
  const counterRef   = useRef<HTMLSpanElement>(null)
  const logoRef      = useRef<HTMLDivElement>(null)
  const taglineRef   = useRef<HTMLDivElement>(null)
  const cellRefs     = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs      = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs    = useRef<(HTMLDivElement | null)[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true)
          onComplete?.()
        },
      })

      // ── 0. Initial state ──────────────────────────────────────────
      gsap.set(overlayRef.current, { opacity: 1 })
      gsap.set(cellRefs.current,   { scaleY: 0, transformOrigin: 'bottom center' })
      gsap.set(imgRefs.current,    { scale: 1.25, opacity: 0 })
      gsap.set(labelRefs.current,  { opacity: 0, y: 10 })
      gsap.set(logoRef.current,    { opacity: 0, y: 20 })
      gsap.set(taglineRef.current, { opacity: 0, y: 12 })
      gsap.set(counterRef.current, { opacity: 0 })

      // ── 1. Grid cells slide up ────────────────────────────────────
      tl.to(cellRefs.current, {
        scaleY: 1,
        duration: 0.55,
        stagger: { amount: 0.5, from: 'random' },
        ease: 'expo.out',
      })

      // ── 2. Images reveal with zoom-in ─────────────────────────────
      tl.to(imgRefs.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: { amount: 0.4 },
        ease: 'expo.out',
      }, '-=0.2')

      // ── 3. Image labels appear ────────────────────────────────────
      tl.to(labelRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.4')

      // ── 4. Counter ticks up 0 → 100 ──────────────────────────────
      tl.to({}, { duration: 0.01 }, '-=0.5') // sync point
      tl.to(counterRef.current, { opacity: 1, duration: 0.2 }, '<')

      const counterObj = { val: 0 }
      tl.to(counterObj, {
        val: 100,
        duration: 0.9,
        ease: 'power2.inOut',
        onUpdate() {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(counterObj.val)).padStart(3, '0')
          }
        },
      }, '<')

      // ── 5. Logo + tagline appear ──────────────────────────────────
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'expo.out',
      }, '-=0.6')

      tl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'expo.out',
      }, '-=0.35')

      // ── 6. Hold briefly ──────────────────────────────────────────
      tl.to({}, { duration: 0.35 })

      // ── 7. Images zoom out / labels fade ─────────────────────────
      tl.to(imgRefs.current, {
        scale: 1.08,
        opacity: 0,
        duration: 0.5,
        stagger: { amount: 0.25, from: 'end' },
        ease: 'power3.in',
      })

      tl.to(labelRefs.current, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
      }, '<')

      // ── 8. Logo fades out ────────────────────────────────────────
      tl.to([logoRef.current, taglineRef.current, counterRef.current], {
        opacity: 0,
        y: -14,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.in',
      }, '-=0.1')

      // ── 9. Grid cells collapse downward ──────────────────────────
      tl.to(cellRefs.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.6,
        stagger: { amount: 0.4, from: 'random' },
        ease: 'expo.in',
      }, '-=0.15')

      // ── 10. Full overlay fades out ───────────────────────────────
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
      }, '-=0.1')
    })

    return () => ctx.revert()
  }, [onComplete])

  if (done) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#060606]"
      aria-label="Loading Midas Roofing"
      role="status"
    >
      {/* ── Animated film grain ─────────────────────────────────── */}
      <div
        ref={grainRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: 0.028,
          mixBlendMode: 'overlay',
          animation: 'noise-animation 0.3s steps(1) infinite',
        }}
      />

      {/* ── 2×2 image grid ──────────────────────────────────────── */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid grid-cols-2 grid-rows-2"
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            ref={el => { cellRefs.current[i] = el }}
            className="relative overflow-hidden"
            style={{ borderRight: i % 2 === 0 ? '1px solid rgba(201,168,76,0.08)' : undefined, borderBottom: i < 2 ? '1px solid rgba(201,168,76,0.08)' : undefined }}
          >
            {/* image */}
            <div
              ref={el => { imgRefs.current[i] = el }}
              className="absolute inset-0"
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover"
                priority
                quality={80}
              />
              {/* dark vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>

            {/* label chip */}
            <div
              ref={el => { labelRefs.current[i] = el }}
              className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-[rgba(201,168,76,0.25)] bg-black/60 px-3 py-1.5 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              <span className="font-jakarta text-[9px] font-semibold uppercase tracking-[0.15em] text-[#C9A84C]">
                {img.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Dark center overlay so text is readable ─────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(6,6,6,0.72)_0%,transparent_100%)] pointer-events-none" />

      {/* ── Center branding ─────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">

        {/* Logo */}
        <div ref={logoRef} className="flex flex-col items-center gap-2">
          {/* Crown-like roof SVG mark */}
          <svg width="48" height="32" viewBox="0 0 48 32" fill="none" className="drop-shadow-[0_0_12px_rgba(201,168,76,0.6)]">
            <path d="M24 2L4 18H8V30H40V18H44L24 2Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            <path d="M24 2L4 18H44L24 2Z" fill="rgba(201,168,76,0.08)" strokeLinejoin="round"/>
            <path d="M18 30V20H30V30" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
          </svg>

          <span
            className="font-jakarta text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]"
            style={{
              background: 'linear-gradient(90deg,#C9A84C 0%,#F0D070 35%,#E8C46A 50%,#F0D070 65%,#C9A84C 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            MIDAS ROOFING
          </span>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[rgba(201,168,76,0.5)]" />
          <span className="font-inter text-[10px] font-medium uppercase tracking-[0.28em] text-[rgba(245,240,232,0.45)]">
            Central Florida&apos;s Roofing Experts
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[rgba(201,168,76,0.5)]" />
        </div>

        {/* Counter */}
        <span
          ref={counterRef}
          className="mt-6 font-jakarta text-[11px] font-bold tabular-nums tracking-[0.2em] text-[rgba(201,168,76,0.5)]"
        >
          000
        </span>
      </div>

      {/* ── Bottom license strip ─────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="font-inter text-[9px] uppercase tracking-[0.22em] text-[rgba(245,240,232,0.18)]">
          Lic. CCC1334831 · Longwood, FL
        </span>
      </div>
    </div>
  )
}
