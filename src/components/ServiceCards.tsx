'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Shingle Roofing',
    desc: 'Residential & commercial asphalt shingle systems built for Florida weather.',
    href: '/services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Metal Roofing',
    desc: 'Standing seam and corrugated metal roofs — last 50+ years in Florida heat.',
    href: '/services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Tile Roofing',
    desc: 'Clay and concrete tile roofing combining elegance with durability.',
    href: '/services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'TPO Roofing',
    desc: 'Advanced thermoplastic systems for flat commercial roofs.',
    href: '/services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Roof Coatings',
    desc: "Extend your roof's life with reflective protective coating systems.",
    href: '/services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Commercial',
    desc: 'Large-scale commercial projects — warehouses, retail, multifamily.',
    href: '/services',
  },
]

export default function ServiceCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={s.href}
            id={`service-card-${s.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="group relative flex flex-col rounded-xl overflow-hidden h-full cursor-pointer"
            style={{ isolation: 'isolate' }}
          >
            <div className="absolute inset-0 bg-dark-card border border-white/[0.06] rounded-xl transition-all duration-500 group-hover:border-gold/25" />
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(201,168,76,0.12) 0%, transparent 100%)' }}
            />
            <div className="absolute top-0 left-0 right-0 h-px">
              <div className="h-full w-0 group-hover:w-full transition-all duration-700 ease-out bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col p-7 h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gold/[0.07] border border-gold/[0.18] flex items-center justify-center text-gold transition-all duration-300 group-hover:bg-gold/[0.18] group-hover:border-gold/40 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                    {s.icon}
                  </div>
                  <div className="absolute -inset-1.5 rounded-xl border border-gold/0 group-hover:border-gold/20 transition-all duration-500 group-hover:rotate-12" />
                </div>
                <span className="font-jakarta font-bold text-[11px] text-gold/20 tracking-[0.2em] group-hover:text-gold/40 transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="font-jakarta font-bold text-lg text-cream mb-2.5 transition-colors duration-300 group-hover:text-gold leading-snug">
                {s.title}
              </h3>
              <p className="text-cream/40 text-sm leading-relaxed font-inter flex-1 group-hover:text-cream/55 transition-colors duration-300">
                {s.desc}
              </p>

              <div className="mt-6 mb-4 h-px bg-gradient-to-r from-white/5 via-white/8 to-white/5 group-hover:from-gold/10 group-hover:via-gold/20 group-hover:to-gold/10 transition-all duration-300" />

              <div className="flex items-center justify-between">
                <span className="text-gold text-xs font-jakarta font-semibold tracking-wide translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  Learn more
                </span>
                <div className="w-7 h-7 rounded-full border border-gold/20 flex items-center justify-center text-gold/50 group-hover:border-gold/50 group-hover:text-gold group-hover:bg-gold/10 group-hover:translate-x-1 transition-all duration-300">
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
