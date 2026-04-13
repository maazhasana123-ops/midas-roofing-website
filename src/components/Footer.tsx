import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  ['/','Home'],
  ['/services','Services'],
  ['/about','About'],
  ['/gallery','Gallery'],
  ['/estimate','Free Estimate'],
  ['/contact','Contact'],
]

const services = [
  ['/services','Shingle Roofing'],
  ['/services','Metal Roofing'],
  ['/services','Tile Roofing'],
  ['/services','TPO Roofing'],
  ['/services','Roof Coatings'],
  ['/services','Commercial'],
]

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-gold/10 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-12 bg-gold/3 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* ── Brand ── */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative w-9 h-9">
                <Image
                  src="/logos/midas-logos-discord.png"
                  alt="Midas Roofing"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="font-jakarta font-bold">
                <div className="text-gold text-sm tracking-widest">MIDAS</div>
                <div className="text-cream/50 text-[9px] tracking-[0.18em] font-medium">
                  ROOFING & CONSTRUCTION
                </div>
              </div>
            </Link>

            <p className="text-cream/40 text-sm leading-relaxed max-w-xs font-inter mb-6">
              Central Florida&apos;s trusted roofing contractor. Quality craftsmanship,
              honest pricing, and a 5-Year No-Leak Promise on every project.
            </p>

            {/* License badge */}
            <div className="inline-flex items-center gap-2 bg-gold/8 border border-gold/18 rounded px-3 py-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-gold text-xs font-jakarta font-semibold tracking-widest">
                LIC# CCC1334831
              </span>
            </div>

            {/* Social */}
            <a
              href="https://instagram.com/midas_roofing_fl"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-instagram"
              className="inline-flex items-center gap-2 text-cream/35 hover:text-gold transition-colors duration-200 text-sm font-inter group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 transition-transform duration-200 group-hover:scale-110">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @midas_roofing_fl
            </a>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="font-jakarta font-semibold text-cream/80 text-xs tracking-[0.15em] uppercase mb-5">
              Navigate
            </h3>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map(([href, label]) => (
                <Link
                  key={href + label}
                  href={href}
                  className="text-cream/40 text-sm hover:text-gold transition-colors duration-150 font-inter hover:translate-x-0.5 transition-transform"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Services ── */}
          <div>
            <h3 className="font-jakarta font-semibold text-cream/80 text-xs tracking-[0.15em] uppercase mb-5">
              Services
            </h3>
            <nav className="flex flex-col gap-2.5">
              {services.map(([href, label]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-cream/40 text-sm hover:text-gold transition-colors duration-150 font-inter"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 className="font-jakarta font-semibold text-cream/80 text-xs tracking-[0.15em] uppercase mb-5">
              Contact
            </h3>
            <div className="flex flex-col gap-5 text-sm">
              <div>
                <div className="text-gold font-jakarta font-semibold text-[10px] tracking-[0.15em] uppercase mb-1.5">
                  Address
                </div>
                <p className="text-cream/40 font-inter leading-relaxed">
                  4051 Bannock Ave<br />
                  Tavares, FL 32778
                </p>
              </div>
              <div>
                <div className="text-gold font-jakarta font-semibold text-[10px] tracking-[0.15em] uppercase mb-1.5">
                  Service Area
                </div>
                <p className="text-cream/40 font-inter">All of Central Florida</p>
              </div>
              <div>
                <Link
                  href="/estimate"
                  id="footer-estimate-cta"
                  className="inline-flex items-center gap-2 text-gold text-xs font-jakarta font-semibold tracking-wide hover:gap-3 transition-all duration-200"
                >
                  Get Free Estimate
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-14 pt-7 border-t border-gold/8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-cream/25 text-xs font-inter">
            © {new Date().getFullYear()} Midas Roofing & Construction. All rights reserved.
          </p>
          <p className="text-cream/18 text-xs font-inter">
            Crafted by{' '}
            <span className="text-gold/50 font-jakarta font-medium">Nouxel Agency</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
