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

Our residential team works around your schedule, maintains a clean job site, and treats your property with the respect it deserves. We've built our reputation one satisfied homeowner at a time across Tavares, Leesburg, Mount Dora, and all of Lake County.`,
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
                  className={`border rounded-sm overflow-hidden transition-all duration-300 cursor-pointer ${
                    isOpen ? 'border-gold/40 bg-dark-card' : 'border-white/5 bg-dark-card hover:border-gold/20'
                  }`}
                  onClick={() => setActiveId(isOpen ? null : s.id)}
                >
                  <div className="flex items-center justify-between p-6 md:p-8">
                    <div className="flex items-center gap-6">
                      <span className="text-gold/40 font-jakarta font-bold text-sm tracking-wider hidden sm:block">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className={`font-jakarta font-bold text-xl md:text-2xl transition-colors ${isOpen ? 'text-gold' : 'text-cream'}`}>
                          {s.title}
                        </h3>
                        <p className="text-cream/40 text-sm mt-0.5">{s.subtitle}</p>
                      </div>
                    </div>
                    <div className={`w-8 h-8 border rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'border-gold bg-gold/10 rotate-45' : 'border-white/20'}`}>
                      <span className={`text-lg leading-none transition-colors ${isOpen ? 'text-gold' : 'text-cream/50'}`}>+</span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 md:px-8 pb-8 border-t border-white/5">
                          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <p className="text-gold font-jakarta font-semibold text-base mb-3">{s.tagline}</p>
                              <p className="text-cream/60 text-sm leading-relaxed whitespace-pre-line">{s.description}</p>
                            </div>
                            <div>
                              <p className="text-cream/80 font-jakarta font-semibold text-sm uppercase tracking-wider mb-4">Key Features</p>
                              <ul className="space-y-3">
                                {s.specs.map((spec) => (
                                  <li key={spec} className="flex items-start gap-3 text-sm text-cream/60">
                                    <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                                    {spec}
                                  </li>
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
