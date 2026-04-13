import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/logos/midas-logos-discord.png" alt="Midas Roofing" fill className="object-contain" />
              </div>
              <div className="font-jakarta font-bold">
                <div className="text-gold text-lg">MIDAS</div>
                <div className="text-cream/60 text-xs tracking-widest">ROOFING & CONSTRUCTION</div>
              </div>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs">
              Central Florida&apos;s trusted roofing contractor. Quality craftsmanship, honest pricing, and a 5-Year No-Leak Promise on every project.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded px-3 py-2">
              <span className="text-gold text-xs font-jakarta font-semibold tracking-wide">LIC# CCC1334831</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-jakarta font-semibold text-cream mb-6 text-sm tracking-wider uppercase">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              {[
                ['/', 'Home'],
                ['/services', 'Our Services'],
                ['/about', 'About Us'],
                ['/gallery', 'Project Gallery'],
                ['/estimate', 'Free Estimate'],
                ['/contact', 'Contact'],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="text-cream/50 text-sm hover:text-gold transition-colors font-inter">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-jakarta font-semibold text-cream mb-6 text-sm tracking-wider uppercase">Contact Us</h3>
            <div className="flex flex-col gap-4 text-sm text-cream/50">
              <div>
                <div className="text-gold font-semibold text-xs uppercase tracking-wider mb-1">Address</div>
                <p>4051 Bannock Ave<br />Tavares, FL 32778</p>
              </div>
              <div>
                <div className="text-gold font-semibold text-xs uppercase tracking-wider mb-1">Service Area</div>
                <p>All of Central Florida</p>
              </div>
              <div>
                <div className="text-gold font-semibold text-xs uppercase tracking-wider mb-1">Follow Us</div>
                <a href="https://instagram.com/midas_roofing_fl" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  @midas_roofing_fl
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/30 text-sm">
            © {new Date().getFullYear()} Midas Roofing & Construction. All rights reserved.
          </p>
          <p className="text-cream/20 text-xs">
            Built by <span className="text-gold/60">Nouxel Agency</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
