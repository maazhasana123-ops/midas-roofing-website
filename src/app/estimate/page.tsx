import type { Metadata } from 'next'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'Instant Roof Estimate | Midas Roofing & Construction',
  description: 'Get an instant, free roof estimate powered by Roofr satellite technology. Serving all of Central Florida.',
}

export default function EstimatePage() {
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
              Our Roofr-powered estimator uses satellite imagery to measure your roof and generate an accurate estimate — no salesperson visit required.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-dark pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-dark-card border border-gold/10 rounded-sm overflow-hidden" style={{ minHeight: '700px' }}>
            <iframe
              src="https://app.roofr.com/instant-estimator/b662f155-b471-4b9b-ae09-02add440054b/MidasRoofingConstruction"
              width="100%"
              height="700"
              style={{ border: 0, display: 'block' }}
              title="Midas Roofing Instant Estimator"
              loading="lazy"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { step: '01', label: 'Enter Your Address', desc: 'Our system pulls satellite data for your exact property.' },
              { step: '02', label: 'Review Your Roof', desc: 'See measurements, pitch, and material options.' },
              { step: '03', label: 'Get Your Estimate', desc: 'Instant pricing — or connect with Jenson directly.' },
            ].map((s) => (
              <div key={s.step} className="bg-dark-card border border-white/5 rounded-sm p-6">
                <div className="text-gold/40 font-jakarta font-bold text-2xl mb-3">{s.step}</div>
                <div className="font-jakarta font-semibold text-cream text-base mb-2">{s.label}</div>
                <div className="text-cream/50 text-sm">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
