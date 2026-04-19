'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-40 h-10 sm:w-48 sm:h-12 overflow-hidden rounded-sm">
            <Image
              src="/logos/logo_gold.png"
              alt="Midas Roofing Logo"
              fill
              className="object-contain object-left transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-jakarta text-sm font-medium tracking-wide transition-colors duration-200 py-1 group ${
                  active ? 'text-gold' : 'text-cream/60 hover:text-cream'
                }`}
              >
                {link.label}
                {/* Underline */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ease-out-expo ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}

          {/* Divider */}
          <div className="w-px h-5 bg-gold/20" />

          <Link
            href="/estimate"
            id="navbar-cta"
            className="btn-gold text-sm px-5 py-2.5 tracking-wide"
          >
            Free Estimate
          </Link>
        </nav>

        {/* ── Mobile Hamburger ── */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col justify-center gap-[5px] p-2 w-10 h-10 relative z-50"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 7.5 : 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="block w-5 h-[1.5px] bg-gold origin-center"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
            transition={{ duration: 0.18 }}
            className="block w-5 h-[1.5px] bg-gold"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -7.5 : 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="block w-5 h-[1.5px] bg-gold origin-center"
          />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden"
          >
            <div className="glass-nav border-t border-gold/10">
              <nav className="flex flex-col px-6 py-5 gap-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`block font-jakarta text-base font-medium py-3 border-b border-white/5 transition-colors duration-150 ${
                        pathname === link.href ? 'text-gold' : 'text-cream/65 hover:text-cream'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.045 + 0.05, duration: 0.3 }}
                  className="mt-4"
                >
                  <Link
                    href="/estimate"
                    className="btn-gold w-full text-center text-sm py-3"
                  >
                    Get Free Estimate
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
