'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'

const steps = [
  { step: '01', label: 'Enter Your Address', desc: 'Our system pulls satellite data for your exact property.' },
  { step: '02', label: 'Review Your Roof', desc: 'See measurements, pitch, and material options.' },
  { step: '03', label: 'Get Your Estimate', desc: 'Instant pricing — or connect with our team directly.' },
]

export default function EstimateContent() {
  return (
    <>
      <section className="pt-28 pb-8 bg-dark-card">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center">
            <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-3">Free Estimate</p>
            <h1 className="font-jakarta font-bold text-4xl md:text-6xl text-cream mb-4">
              Know Your Roof Cost <span className="gold-shimmer">Instantly</span>
            </h1>
            <p className="text-cream/60 max-w-xl mx-auto text-lg leading-relaxed">
              Our estimator uses satellite imagery to measure your roof and generate an accurate estimate. No salesperson visit required.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-dark pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-dark-card border border-gold/10 rounded-2xl overflow-hidden" style={{ minHeight: '700px' }}>
            <iframe
              src="https://app.roofr.com/instant-estimator/b662f155-b471-4b9b-ae09-02add440054b/MidasRoofingConstruction"
              width="100%"
              height="700"
              style={{ border: 0, display: 'block' }}
              title="Midas Roofing Instant Estimator"
              loading="lazy"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="group relative rounded-2xl overflow-hidden text-center p-7" style={{ isolation: 'isolate' }}>
                  <div className="absolute inset-0 bg-dark-card border border-white/[0.05] rounded-2xl group-hover:border-gold/20 transition-colors duration-400" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 120%, rgba(201,168,76,0.1) 0%, transparent 100%)' }} />
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-2 w-4 h-px bg-gold/20 z-20" />
                  )}

                  <div className="relative z-10">
                    <div className="relative inline-flex items-center justify-center mb-5">
                      <div className="w-12 h-12 rounded-full border border-gold/20 bg-gold/[0.06] flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold/[0.12] transition-all duration-400">
                        <span className="text-gold font-jakarta font-bold text-sm">{s.step}</span>
                      </div>
                      <div className="absolute -inset-1.5 rounded-full border border-gold/0 group-hover:border-gold/15 transition-all duration-500 group-hover:rotate-45" />
                    </div>

                    <div className="font-jakarta font-bold text-cream text-base mb-2 group-hover:text-gold transition-colors duration-300">{s.label}</div>
                    <div className="text-cream/45 text-sm leading-relaxed group-hover:text-cream/60 transition-colors duration-300">{s.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
