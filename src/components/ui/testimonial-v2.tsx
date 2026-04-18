'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Testimonial {
  text: string
  image: string
  name: string
  role: string
  stars: number
}

const testimonials: Testimonial[] = [
  {
    text: "Midas replaced our entire roof after Hurricane Ian damage. The crew walked us through every step. Professional, fast, and the workmanship is immaculate. Three months later — zero leaks.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Marcus T.",
    role: "Tavares, FL",
    stars: 5,
  },
  {
    text: "I got quotes from four contractors. Midas wasn't the cheapest, but they explained exactly what needed to be done and why. Best investment we've made in this home. The roof looks incredible.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sandra R.",
    role: "Leesburg, FL",
    stars: 5,
  },
  {
    text: "We went with the metal roof option and couldn't be happier. Finished ahead of schedule, cleaned everything up, and the 5-Year No-Leak Promise gave us total peace of mind. 10/10.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "David K.",
    role: "Mount Dora, FL",
    stars: 5,
  },
  {
    text: "From the first call to the final inspection, everything was seamless. They kept me updated daily and the crew was respectful of my property. Truly a class act compared to other contractors.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Robert M.",
    role: "The Villages, FL",
    stars: 5,
  },
  {
    text: "Our tile roof was a mess after last season's storms. Midas came out fast, gave us an honest assessment, and completed the repair without trying to upsell us. Refreshing honesty.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Patricia W.",
    role: "Orlando, FL",
    stars: 5,
  },
  {
    text: "As a property manager I've worked with a dozen roofing companies. Midas is the only one I call now. On-time, on-budget, and they actually stand behind their guarantee.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Jennifer L.",
    role: "Clermont, FL",
    stars: 5,
  },
  {
    text: "Insurance claim was a nightmare but Midas worked directly with my adjuster. They handled everything — photos, documentation, follow-ups. I barely had to do a thing. Incredible service.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "James A.",
    role: "Eustis, FL",
    stars: 5,
  },
  {
    text: "The TPO flat roof on our commercial building had been leaking for years. Previous contractors patched it and it came right back. Midas replaced the whole thing — dry ever since.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Angela P.",
    role: "Sanford, FL",
    stars: 5,
  },
  {
    text: "Called Midas after seeing their truck in the neighborhood. Got a quote the same day, started within the week. The shingle work is flawless and they were done by 4pm. Highly recommend.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Carlos V.",
    role: "Kissimmee, FL",
    stars: 5,
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gold">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialsColumn({
  testimonials,
  duration = 15,
  className,
}: {
  testimonials: Testimonial[]
  duration?: number
  className?: string
}) {
  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <motion.ul
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-4 pb-4 list-none m-0 p-0"
      >
        {[...Array(2)].map((_, dupIndex) => (
          <React.Fragment key={dupIndex}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <motion.li
                key={`${dupIndex}-${i}`}
                aria-hidden={dupIndex === 1 ? 'true' : 'false'}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: { type: 'spring', stiffness: 400, damping: 20 },
                }}
                className="p-6 rounded-2xl max-w-[300px] w-full cursor-default select-none"
                style={{
                  background: 'rgba(16,16,16,0.95)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
              >
                <StarRating />
                <blockquote className="m-0 p-0">
                  <p className="text-cream/65 text-sm leading-relaxed font-inter italic m-0">
                    &ldquo;{text}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3 mt-5">
                    <img
                      width={36}
                      height={36}
                      src={image}
                      alt={`Photo of ${name}`}
                      className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                      style={{ border: '1px solid rgba(201,168,76,0.25)' }}
                    />
                    <div>
                      <cite className="font-jakarta font-semibold text-cream text-sm not-italic block leading-tight">
                        {name}
                      </cite>
                      <span className="text-cream/35 text-xs font-inter mt-0.5 block">
                        {role}
                      </span>
                    </div>
                    {/* Google G */}
                    <div className="ml-auto opacity-25">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-cream">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  )
}

export default function TestimonialV2() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-pad bg-dark relative overflow-hidden"
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,_rgba(201,168,76,0.05)_0%,_transparent_100%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 max-w-xl mx-auto">
          <div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-[10px] font-jakarta font-semibold tracking-[0.18em] uppercase"
            style={{
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.22)',
              color: '#C9A84C',
            }}
          >
            <span className="w-1 h-1 rounded-full bg-gold" />
            Verified Reviews
          </div>

          <h2
            id="testimonials-heading"
            className="font-jakarta font-bold text-4xl md:text-5xl text-cream tracking-tight mb-5 leading-tight"
          >
            What Florida Homeowners Say
          </h2>

          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gold">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-cream/50 text-sm font-inter ml-1">5.0 · 11 Google Reviews</span>
          </div>

          <p className="text-cream/45 text-base font-inter leading-relaxed">
            Real homeowners. Real roofs. Real results across Central Florida.
          </p>
        </div>

        {/* Scrolling columns */}
        <div
          className="flex justify-center gap-4 overflow-hidden"
          role="region"
          aria-label="Scrolling testimonials"
          style={{
            maxHeight: '680px',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={22} />
          <TestimonialsColumn testimonials={secondColumn} duration={28} className="hidden md:block" />
          <TestimonialsColumn testimonials={thirdColumn} duration={25} className="hidden lg:block" />
        </div>
      </motion.div>
    </section>
  )
}
