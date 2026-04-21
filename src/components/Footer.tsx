'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const navLinks = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/about', 'About'],
  ['/gallery', 'Gallery'],
  ['/estimate', 'Get Instant Estimate'],
  ['/contact', 'Contact'],
]

const services = [
  ['/services', 'Shingle Roofing'],
  ['/services', 'Metal Roofing'],
  ['/services', 'Tile Roofing'],
  ['/services', 'TPO Roofing'],
  ['/services', 'Roof Coatings'],
  ['/services', 'Commercial'],
]

const contactDetails = [
  {
    label: 'Address',
    lines: ['4051 Bannock Ave', 'Tavares, FL 32778'],
  },
  {
    label: 'Service Area',
    lines: ['All of Central Florida'],
  },
]

/* ─── Animated nav link ─── */
function FooterLink({ href, label, delay = 0 }: { href: string; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={href}
        className="group flex items-center gap-2 text-cream/40 text-sm hover:text-gold transition-colors duration-200 font-inter w-fit"
      >
        <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3 flex-shrink-0" />
        {label}
      </Link>
    </motion.div>
  )
}

/* ─── Flickering dot grid background ─── */
function FlickerGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Top-center radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.07)_0%,_transparent_70%)] blur-2xl" />
      {/* Bottom-left corner accent */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,168,76,0.04)_0%,_transparent_70%)]" />
    </div>
  )
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer ref={ref} className="relative bg-dark-card border-t border-gold/[0.08] overflow-hidden">
      <FlickerGrid />

      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* ── Brand column ── */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" className="flex items-center gap-3 mb-5 w-fit group">
              <div className="relative w-40 h-10 sm:w-48 sm:h-12 overflow-hidden">
                <Image
                  src="/logos/logo_gold.png"
                  alt="Midas Roofing Logo"
                  fill
                  className="object-contain object-left transition-opacity duration-300 group-hover:opacity-80"
                />
              </div>
            </Link>

            <p className="text-cream/35 text-sm leading-relaxed max-w-xs font-inter mb-6">
              Central Florida&apos;s trusted roofing contractor since 2004. Quality craftsmanship,
              honest pricing, and a No-Leak Promise on every project.
            </p>

            {/* License badge */}
            <div className="inline-flex items-center gap-2.5 bg-gold/[0.07] border border-gold/[0.18] rounded-full px-4 py-2 mb-7 group hover:bg-gold/[0.12] hover:border-gold/30 transition-all duration-300 cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
              <span className="text-gold text-[11px] font-jakarta font-semibold tracking-[0.14em]">
                LIC# CCC1334831
              </span>
            </div>

            {/* Social links */}
            <div className="flex flex-row gap-3">
              <a
                href="https://instagram.com/midas_roofing_fl"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-instagram"
                aria-label="Midas Roofing on Instagram"
                className="group inline-flex items-center text-cream/35 hover:text-gold transition-colors duration-200 w-fit"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-gold/[0.1] group-hover:border-gold/20 transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </a>

              <a
                href="https://www.facebook.com/MidasRoofingPros/"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-facebook"
                aria-label="Midas Roofing on Facebook"
                className="group inline-flex items-center text-cream/35 hover:text-gold transition-colors duration-200 w-fit"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-gold/[0.1] group-hover:border-gold/20 transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </div>
              </a>
            </div>
          </motion.div>

          {/* ── Navigate ── */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-jakarta font-semibold text-cream/50 text-[10px] tracking-[0.2em] uppercase mb-6">
              Navigate
            </h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map(([href, label], i) => (
                <FooterLink key={href + label} href={href} label={label} delay={0.1 + i * 0.04} />
              ))}
            </nav>
          </motion.div>

          {/* ── Services ── */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-jakarta font-semibold text-cream/50 text-[10px] tracking-[0.2em] uppercase mb-6">
              Services
            </h3>
            <nav className="flex flex-col gap-3">
              {services.map(([href, label], i) => (
                <FooterLink key={label} href={href} label={label} delay={0.15 + i * 0.04} />
              ))}
            </nav>
          </motion.div>

          {/* ── Contact ── */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-jakarta font-semibold text-cream/50 text-[10px] tracking-[0.2em] uppercase mb-6">
              Contact
            </h3>
            <div className="flex flex-col gap-5">
              {contactDetails.map((item) => (
                <div key={item.label}>
                  <div className="text-gold/60 font-jakarta font-semibold text-[10px] tracking-[0.18em] uppercase mb-1.5">
                    {item.label}
                  </div>
                  {item.lines.map((line) => (
                    <p key={line} className="text-cream/35 text-sm font-inter leading-relaxed">{line}</p>
                  ))}
                </div>
              ))}

              {/* CTA */}
              <Link
                href="/estimate"
                id="footer-estimate-cta"
                className="group inline-flex items-center gap-2 mt-1 w-fit"
              >
                <span className="relative text-gold text-xs font-jakarta font-bold tracking-wide">
                  Get Instant Estimate
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </span>
                <div className="w-5 h-5 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300 group-hover:translate-x-1">
                  <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5 text-gold" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          className="mt-14 h-px bg-gradient-to-r from-transparent via-gold/[0.15] to-transparent"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ── Bottom bar ── */}
        <motion.div
          className="mt-7 flex flex-col sm:flex-row justify-between items-center gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-cream/20 text-xs font-inter">
            © {new Date().getFullYear()} Midas Roofing &amp; Construction. All rights reserved.
          </p>
          <p className="text-cream/15 text-xs font-inter">
            License CCC1334831 &middot; Tavares, FL
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
