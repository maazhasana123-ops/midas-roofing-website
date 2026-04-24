'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import GoldDivider from './GoldDivider'

const contactItems = [
  {
    icon: '📍',
    title: 'Our Office',
    lines: ['346 Freeman St. Suite D', 'Longwood, Florida 32750'],
    link: undefined,
  },
  {
    icon: '🗺️',
    title: 'Service Area',
    lines: ['All of Central Florida', 'Longwood · Orlando · Mount Dora', 'Leesburg · The Villages'],
    link: undefined,
  },
  {
    icon: '📸',
    title: 'Follow Our Work on Instagram',
    lines: ['Follow Our Work on Instagram'],
    link: 'https://instagram.com/midas_roofing_fl',
  },
  {
    icon: '📘',
    title: 'Follow Our Work on Facebook',
    lines: ['Follow Our Work on Facebook'],
    link: 'https://www.facebook.com/MidasRoofingPros/',
  },
  {
    icon: '🏛️',
    title: 'License',
    lines: ['Florida Contractor License', 'CCC1334831'],
    link: undefined,
  },
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="section-pad bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <AnimatedSection>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-10 text-center border border-gold/25"
                style={{ background: 'rgba(16,16,16,0.95)', backdropFilter: 'blur(16px)' }}
              >
                <div className="w-16 h-16 rounded-full border border-gold/30 bg-gold/[0.05] flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold text-2xl font-bold">✓</span>
                </div>
                <h2 className="font-jakarta font-bold text-3xl text-gold mb-4">Message Sent!</h2>
                <p className="text-cream/60 leading-relaxed">
                  Thanks for reaching out. A member of our team will contact you within 24 hours. If it&apos;s urgent, call us directly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }}
                  className="btn-outline-gold mt-8"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-cream/60 text-sm font-jakarta mb-2">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Smith"
                      className="w-full bg-dark-card border border-white/[0.08] rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/50 focus:bg-gold/[0.02] transition-all duration-200 placeholder:text-cream/20"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/60 text-sm font-jakarta mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(407) 555-0100"
                      className="w-full bg-dark-card border border-white/[0.08] rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/50 focus:bg-gold/[0.02] transition-all duration-200 placeholder:text-cream/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-cream/60 text-sm font-jakarta mb-2">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-dark-card border border-white/[0.08] rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/50 focus:bg-gold/[0.02] transition-all duration-200 placeholder:text-cream/20"
                  />
                </div>
                <div>
                  <label className="block text-cream/60 text-sm font-jakarta mb-2">Service Needed</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    style={{ colorScheme: 'dark', backgroundColor: 'rgba(20,20,20,0.95)', color: '#f5f0e8' }}
                    className="w-full border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all duration-200 cursor-pointer"
                  >
                    <option value="" style={{ background: '#141414', color: '#f5f0e8' }}>Select a service...</option>
                    <option style={{ background: '#141414', color: '#f5f0e8' }}>Shingle Roofing</option>
                    <option style={{ background: '#141414', color: '#f5f0e8' }}>Metal Roofing</option>
                    <option style={{ background: '#141414', color: '#f5f0e8' }}>Tile Roofing</option>
                    <option style={{ background: '#141414', color: '#f5f0e8' }}>TPO Roofing</option>
                    <option style={{ background: '#141414', color: '#f5f0e8' }}>Roof Coatings</option>
                    <option style={{ background: '#141414', color: '#f5f0e8' }}>Residential Roofing</option>
                    <option style={{ background: '#141414', color: '#f5f0e8' }}>Commercial Roofing</option>
                    <option style={{ background: '#141414', color: '#f5f0e8' }}>Storm Damage / Insurance Claim</option>
                    <option style={{ background: '#141414', color: '#f5f0e8' }}>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-cream/60 text-sm font-jakarta mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project — address, roof type, any issues you're experiencing..."
                    className="w-full bg-dark-card border border-white/[0.08] rounded-xl px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/50 focus:bg-gold/[0.02] transition-all duration-200 placeholder:text-cream/20 resize-none"
                  />
                </div>
                <button type="submit" className="btn-gold w-full">
                  Send Message
                </button>
                <p className="text-cream/30 text-xs text-center">We respond within 24 hours. Your info is never shared.</p>
              </form>
            )}
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection delay={0.15}>
            <div className="space-y-5">
              <div className="mb-8">
                <p className="text-gold font-jakarta font-semibold text-sm tracking-widest uppercase mb-4">Contact Info</p>
                <h2 className="font-jakarta font-bold text-3xl text-cream mb-2">We&apos;re Here to Help</h2>
                <GoldDivider />
                <p className="text-cream/60 mt-4 leading-relaxed">
                  Whether you need an emergency repair or want to plan a full roof replacement, Midas Roofing is ready to help. Reach out and someone from our team will get back to you fast.
                </p>
              </div>

              {contactItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="group relative flex gap-4 rounded-2xl p-5 border border-white/[0.05] overflow-hidden cursor-default hover:border-gold/20 transition-colors duration-300"
                    style={{ background: 'rgba(16,16,16,0.6)' }}>
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                      style={{ background: 'radial-gradient(ellipse 80% 80% at 0% 50%, rgba(201,168,76,0.06) 0%, transparent 100%)' }} />

                    {/* Icon container */}
                    <div className="relative z-10 w-10 h-10 rounded-xl bg-gold/[0.06] border border-gold/[0.1] flex items-center justify-center flex-shrink-0 group-hover:bg-gold/[0.12] group-hover:border-gold/25 transition-all duration-300">
                      <span className="text-base leading-none">{item.icon}</span>
                    </div>

                    <div className="relative z-10">
                      <div className="font-jakarta font-semibold text-cream/80 text-sm mb-1 group-hover:text-cream transition-colors duration-200">{item.title}</div>
                      {item.lines.map((line) =>
                        item.link ? (
                          <a key={line} href={item.link} target="_blank" rel="noopener noreferrer"
                            className="block text-gold text-sm hover:text-gold-light transition-colors duration-200">
                            {line}
                          </a>
                        ) : (
                          <div key={line} className="text-cream/45 text-sm leading-snug">{line}</div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
