'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'

const faqs = [
  {
    q: 'How much does a new roof cost in Central Florida?',
    a: 'Roofing costs in Central Florida vary by material and roof size. Asphalt shingle roofs typically range from $8,000–$18,000, metal roofs $15,000–$35,000, and tile roofs $20,000–$45,000 for an average home. Midas Roofing offers free instant estimates using satellite measurement technology — no salesperson visit required.',
  },
  {
    q: 'What roofing materials are best for Florida homes?',
    a: "For Florida's climate — heat, hurricanes, UV exposure, and heavy rain — metal roofing offers the best long-term value with a 40–70 year lifespan. Tile roofing provides excellent wind resistance (150+ mph) and premium aesthetics. Architectural asphalt shingles are the most cost-effective choice for most budgets. Our team can recommend the right system for your home and location.",
  },
  {
    q: 'Does Midas Roofing offer a warranty?',
    a: 'Yes. Every roof we install comes with our exclusive No-Leak Promise — if it leaks after we install it, we return and fix it at no charge, no questions asked. We also pass through Owens Corning manufacturer warranties on qualifying shingle installations.',
  },
  {
    q: 'Is Midas Roofing licensed and insured in Florida?',
    a: 'Yes. Midas Roofing & Construction holds Florida Roofing Contractor License CCC1334831 and carries full general liability and workers\' compensation insurance. We are also an Owens Corning Preferred Contractor.',
  },
  {
    q: 'How long does a roof replacement take?',
    a: 'A typical residential roof replacement takes 1–3 days depending on the roof size and material. Metal and tile roofs may take slightly longer due to the complexity of installation. We work efficiently to minimize disruption to your home.',
  },
  {
    q: 'What areas does Midas Roofing serve?',
    a: 'Midas Roofing & Construction serves the greater Orlando metro and all of Central Florida, including Orlando, Windermere, Dr. Phillips, Winter Park, Longwood, Lake Mary, Lake Nona, Winter Garden, Baldwin Park, College Park, and Tavares, FL (our headquarters).',
  },
]

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section-pad bg-dark relative overflow-hidden" aria-label="Frequently Asked Questions">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold font-jakarta font-semibold text-xs tracking-[0.2em] uppercase mb-4">Common Questions</p>
          <h2 className="font-jakarta font-bold text-4xl md:text-5xl text-cream tracking-tight">
            Roofing Questions, <span className="gold-shimmer">Answered.</span>
          </h2>
        </AnimatedSection>

        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="border border-white/[0.06] rounded-lg bg-dark-card overflow-hidden transition-colors duration-200 hover:border-gold/20"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                  aria-expanded={open === i}
                >
                  <span
                    itemProp="name"
                    className="font-jakarta font-semibold text-cream/85 text-base group-hover:text-cream transition-colors duration-200"
                  >
                    {faq.q}
                  </span>
                  <span className={`flex-shrink-0 w-5 h-5 text-gold transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                  </span>
                </button>

                {open === i && (
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="px-6 pb-5"
                  >
                    <p itemProp="text" className="text-cream/55 font-inter text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
