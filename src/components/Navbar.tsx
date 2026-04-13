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
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <Image src="/logos/midas-logos-discord.png" alt="Midas Roofing" fill className="object-contain" />
          </div>
          <div className="font-jakarta font-bold text-lg leading-tight">
            <span className="text-gold">MIDAS</span>
            <br />
            <span className="text-cream/80 text-xs tracking-widest font-medium">ROOFING & CONSTRUCTION</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-jakarta text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                pathname === link.href ? 'text-gold' : 'text-cream/70 hover:text-cream'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
          <Link href="/estimate" className="btn-gold text-sm px-6 py-3">
            Get Free Estimate
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
            className="block w-6 h-0.5 bg-gold origin-center transition-colors"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="block w-6 h-0.5 bg-gold"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
            className="block w-6 h-0.5 bg-gold origin-center"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-t border-gold/10"
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-jakarta text-base font-medium py-2 border-b border-white/5 transition-colors ${
                    pathname === link.href ? 'text-gold' : 'text-cream/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/estimate" onClick={() => setOpen(false)} className="btn-gold mt-2 text-center">
                Get Free Estimate
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
