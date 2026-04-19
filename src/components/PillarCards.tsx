'use client'

import { motion } from 'framer-motion'

const pillars = [
  {
    number: '01',
    title: 'No-Leak Promise',
    desc: 'Every roof we install comes backed by our industry-leading guarantee. If it leaks — we fix it, no questions asked.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Licensed & Insured',
    desc: "Florida Contractor License CCC1334831. Full liability and workers' comp — you're protected from day one.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: '20+ Years Experience',
    desc: "Two decades of roofing across Central Florida. Every roof type, every weather condition — we've seen it all.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function PillarCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pillars.map((p, i) => (
        <motion.div
          key={p.number}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="group relative rounded-2xl overflow-hidden h-full" style={{ isolation: 'isolate' }}>
            <div className="absolute inset-0 bg-dark-card" />
            <div className="absolute inset-0 border border-white/[0.05] rounded-2xl group-hover:border-gold/20 transition-colors duration-500" />
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold/[0.04] blur-2xl group-hover:bg-gold/[0.12] transition-all duration-700" />

            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="absolute top-4 right-5 font-jakarta font-bold text-[80px] leading-none select-none pointer-events-none text-transparent"
                style={{ WebkitTextStroke: '1px rgba(201,168,76,0.06)' }}>
                {p.number}
              </div>

              <div className="relative w-14 h-14 mb-7">
                <div className="absolute inset-0 rounded-2xl bg-gold/[0.06] border border-gold/[0.12] group-hover:bg-gold/[0.12] group-hover:border-gold/30 transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center text-gold">
                  {p.icon}
                </div>
              </div>

              <div className="mb-5 h-px bg-gold/20 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-8 bg-gold group-hover:w-full transition-all duration-500" />
              </div>

              <h3 className="font-jakarta font-bold text-xl text-cream mb-3 group-hover:text-gold transition-colors duration-300 leading-tight">
                {p.title}
              </h3>
              <p className="text-cream/45 text-sm leading-relaxed font-inter flex-1 group-hover:text-cream/60 transition-colors duration-300">
                {p.desc}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
