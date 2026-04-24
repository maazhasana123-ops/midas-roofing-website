'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const services = [
  {
    id: 'shingle',
    title: 'Shingle Roofing',
    subtitle: 'Residential & Commercial',
    tagline: 'The most versatile roofing choice for Florida homes.',
    description: `Asphalt shingles remain the most popular roofing material in Florida for good reason — they're cost-effective, durable, and come in dozens of styles and colors. At Midas, we install premium architectural shingles from top manufacturers, engineered to withstand Florida's intense UV exposure, heavy rainfall, and hurricane-force winds.

Whether you're building new or replacing an aging roof, our shingle installations come with manufacturer warranties plus our own No-Leak Promise.`,
    specs: ['Architectural & 3-tab options', 'Wind ratings up to 130 mph', 'Class A fire rating', 'Energy-efficient cool roof options'],
  },
  {
    id: 'metal',
    title: 'Metal Roofing',
    subtitle: 'Standing Seam & Corrugated',
    tagline: 'Built to outlast the Florida climate — by decades.',
    description: `Metal roofing is the fastest-growing segment of Florida roofing, and for good reason. A properly installed metal roof lasts 40–70 years, reflects heat to lower energy bills, and holds up against hurricane-force winds better than almost any other material.

Midas specializes in standing seam metal roofing for residential and commercial properties. Our expert installers handle everything from material selection to final inspection.`,
    specs: ['Standing seam & corrugated systems', '140+ mph wind resistance', 'Steel, aluminum, and Galvalume options', 'Energy Star certified products available'],
  },
  {
    id: 'tile',
    title: 'Tile Roofing',
    subtitle: 'Clay & Concrete Tile',
    tagline: 'The pinnacle of Florida architectural style.',
    description: `Tile roofing is synonymous with Florida luxury homes. Whether you prefer the warm terracotta of clay tile or the versatility of concrete tile, a tile roof adds unmistakable curb appeal while delivering outstanding performance.

Tile roofs typically last 50+ years and require minimal maintenance. Our installation teams are trained to the highest standards — proper underlayment, flashing, and fastening are what separate a good tile roof from one that lasts a lifetime.`,
    specs: ['Clay and concrete tile', 'S-tile, flat tile, barrel tile profiles', '150+ mph wind rating available', 'Resistant to fire, rot, and insects'],
  },
  {
    id: 'tpo',
    title: 'TPO Roofing',
    subtitle: 'Advanced Flat-Roof Systems',
    tagline: 'The smart choice for commercial and flat-roof properties.',
    description: `Thermoplastic Polyolefin (TPO) roofing is the premier choice for flat and low-slope commercial roofs in Florida. Its white reflective surface deflects solar heat, reducing cooling costs dramatically — critical in Florida's year-round sun.

TPO membranes are heat-welded at the seams, creating a watertight bond stronger than adhesive-applied systems. Midas has installed TPO systems on warehouses, retail centers, office buildings, and multifamily complexes across Central Florida.`,
    specs: ['Heat-welded seam technology', 'Energy Star rated (white membrane)', 'ASTM and FM-approved systems', 'Thickness options: 45, 60, 80 mil'],
  },
  {
    id: 'coatings',
    title: 'Roof Coatings',
    subtitle: 'Protective Coating Systems',
    tagline: "Extend your roof's life without a full replacement.",
    description: `A quality roof coating can add 10–15 years of life to an aging roof at a fraction of replacement cost. Silicone, acrylic, and elastomeric coatings seal minor cracks, prevent UV degradation, and dramatically improve water resistance.

Roof coatings are especially popular on commercial metal roofs and flat TPO or modified bitumen systems. Midas applies coatings with commercial spray equipment for uniform coverage and long-term performance.`,
    specs: ['Silicone, acrylic & elastomeric formulas', 'Seamless waterproof membrane', 'Reflective options for energy savings', 'Renew warranty with recoat schedule'],
  },
  {
    id: 'residential',
    title: 'Residential Roofing',
    subtitle: 'Full-Service Home Roofing',
    tagline: 'Your home deserves the Midas treatment.',
    description: `Your home is your most valuable asset — protect it with a Midas residential installation. We handle everything from complete tear-off and replacement to repairs and insurance-claim coordination.

Our residential team works around your schedule, maintains a clean job site, and treats your property with the respect it deserves. We've built our reputation one satisfied homeowner at a time across Longwood, Leesburg, Mount Dora, and the greater Orlando area.`,
    specs: ['Full tear-off and replacement', 'Storm damage assessment & repair', 'Insurance claim assistance', 'Weekend appointments available'],
  },
  {
    id: 'commercial',
    title: 'Commercial Roofing',
    subtitle: 'Large-Scale Commercial Projects',
    tagline: 'No project too large. No deadline too tight.',
    description: `Commercial roofing demands a different level of expertise, project management, and liability coverage. Midas has the crew size, equipment, and experience to handle retail centers, warehouses, office complexes, and multifamily developments.

We work closely with property managers, general contractors, and building owners to minimize business disruption, hit project milestones, and deliver a roof that performs for decades.`,
    specs: ['Multi-unit & large-format projects', 'OSHA-compliant safety practices', 'Certified for commercial warranties', 'Project management & reporting'],
  },
]

export default function ServicesGrid() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section className="section-pad bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-3">
          {services.map((s, i) => {
            const isOpen = activeId === s.id
            return (
              <AnimatedSection key={s.id} delay={i * 0.05}>
                <div
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-400 cursor-pointer`}
                  style={{ isolation: 'isolate' }}
                  onClick={() => setActiveId(isOpen ? null : s.id)}
                >
                  {/* Background layer */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-400 ${
                    isOpen
                      ? 'border border-gold/35 bg-dark-card'
                      : 'border border-white/[0.05] bg-dark-card group-hover:border-gold/20'
                  }`} />
                  {/* Hover / open glow */}
                  <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    style={{ background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(201,168,76,0.05) 0%, transparent 100%)' }} />
                  {/* Top shimmer on hover/open */}
                  <div className={`absolute top-0 left-0 h-px transition-all duration-600 ${isOpen ? 'w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent' : 'w-0 group-hover:w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent'}`} />

                  {/* Header row */}
                  <div className="relative z-10 flex items-center justify-between p-6 md:p-8">
                    <div className="flex items-center gap-6">
                      <span className="text-gold/30 font-jakarta font-bold text-sm tracking-wider hidden sm:block group-hover:text-gold/50 transition-colors duration-200">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className={`font-jakarta font-bold text-xl md:text-2xl transition-colors duration-200 ${isOpen ? 'text-gold' : 'text-cream group-hover:text-gold/80'}`}>
                          {s.title}
                        </h3>
                        <p className="text-cream/35 text-sm mt-0.5 font-inter">{s.subtitle}</p>
                      </div>
                    </div>

                    {/* Toggle button */}
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'border-gold bg-gold/10 rotate-45 shadow-[0_0_16px_rgba(201,168,76,0.2)]'
                        : 'border-white/15 group-hover:border-gold/30'
                    }`}>
                      <span className={`text-lg leading-none font-light transition-colors duration-200 ${isOpen ? 'text-gold' : 'text-cream/40 group-hover:text-gold/60'}`}>+</span>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="relative z-10 px-6 md:px-8 pb-8 border-t border-gold/[0.1]">
                          <div className="pt-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <p className="text-gold font-jakarta font-semibold text-base mb-3">{s.tagline}</p>
                              <p className="text-cream/60 text-sm leading-relaxed whitespace-pre-line font-inter">{s.description}</p>
                            </div>
                            <div>
                              <p className="text-cream/70 font-jakarta font-semibold text-xs uppercase tracking-[0.15em] mb-5">Key Features</p>
                              <ul className="space-y-3">
                                {s.specs.map((spec, si) => (
                                  <motion.li
                                    key={spec}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: si * 0.06 }}
                                    className="flex items-start gap-3 text-sm text-cream/60"
                                  >
                                    <span className="text-gold mt-0.5 flex-shrink-0 font-semibold">✓</span>
                                    {spec}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
