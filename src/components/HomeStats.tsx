'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const statsData = [
  { value: 500, suffix: '+', label: 'Roofs Installed' },
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Licensed & Insured' },
  { value: 0, suffix: ' Leaks', label: 'No-Leak Promise' },
]

function useCountUp(target: number, duration = 1400, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatCard({ stat, index }: { stat: typeof statsData[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(stat.value, 1400, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative py-9 px-6 text-center group ${index < statsData.length - 1 ? 'border-r border-gold/[0.08]' : ''}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 100%)' }} />
      <div className="relative z-10">
        <div className="font-jakarta font-extrabold text-4xl md:text-5xl text-gold mb-1.5 tracking-tight tabular-nums">
          {count}{stat.suffix}
        </div>
        <div className="text-cream/35 text-xs font-jakarta font-medium tracking-[0.12em] uppercase group-hover:text-cream/55 transition-colors duration-300">
          {stat.label}
        </div>
      </div>
    </motion.div>
  )
}

export default function HomeStats() {
  return (
    <section className="relative bg-dark overflow-hidden">
      <div className="absolute inset-0 border-y border-gold/[0.08]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {statsData.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
