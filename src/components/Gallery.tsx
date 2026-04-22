'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const galleryImages = [
  { src: '/images/6.png', alt: 'Premium tile roof — Orlando, FL', category: 'Tile', size: 'wide' },
  { src: '/images/midas-team-photo.png', alt: 'Midas Roofing crew on a residential project', category: 'Team', size: 'normal' },
  { src: '/images/gallery/post-1.png', alt: 'Completed roofing project — Central Florida', category: 'Residential', size: 'normal' },
  { src: '/images/gallery/post-2.png', alt: 'Shingle roof replacement — Tavares, FL', category: 'Residential', size: 'normal' },
  { src: '/images/gallery/post-3.png', alt: 'Commercial roofing installation', category: 'Commercial', size: 'normal' },
  { src: '/images/gallery/post-4.png', alt: 'Metal roofing system — Mount Dora, FL', category: 'Metal', size: 'normal' },
  { src: '/images/gallery/post-5.png', alt: 'Roof repair and coating project', category: 'Residential', size: 'normal' },
  // New batch
  { src: '/images/gallery/dji_fly_20251106_170602_277_1762608682700_photo.JPG', alt: 'Aerial view — new roof installation', category: 'Aerial', size: 'wide' },
  { src: '/images/gallery/dji_fly_20251108_082342_289_1762608335459_photo.JPG', alt: 'Drone shot — residential re-roof in progress', category: 'Aerial', size: 'normal' },
  { src: '/images/gallery/DJI_20251120_102746_509.JPG', alt: 'Bird\'s-eye view — completed shingle roof', category: 'Aerial', size: 'normal' },
  { src: '/images/gallery/dji_fly_20251120_151446_330_1763912094747_photo.JPG', alt: 'Aerial — neighborhood roofing project', category: 'Aerial', size: 'wide' },
  { src: '/images/gallery/dji_fly_20251211_102432_349_1765739191079_photo.JPG', alt: 'Overhead view — roof deck and flashing detail', category: 'Aerial', size: 'normal' },
  { src: '/images/gallery/dji_fly_20251212_155838_361_1765739148009_photo.JPG', alt: 'Aerial — finished residential roof, Central Florida', category: 'Aerial', size: 'normal' },
  { src: '/images/gallery/dji_fly_20251219_132524_393_1767902709804_photo.JPG', alt: 'Drone perspective — full property re-roof', category: 'Aerial', size: 'wide' },
  { src: '/images/gallery/RemoteMediaFile_6553673_0_2022_03_28_12_52_32.JPG', alt: 'On-site roofing crew — quality installation', category: 'Residential', size: 'normal' },
  { src: '/images/gallery/Photo Jan 08 2026, 11 20 23 AM.jpg', alt: 'Close-up — premium shingle layering', category: 'Residential', size: 'normal' },
  { src: '/images/gallery/Photo Jan 08 2026, 11 20 23 AM (1).jpg', alt: 'Roof inspection — attention to detail', category: 'Residential', size: 'normal' },
]

const categories = ['All', 'Aerial', 'Residential', 'Commercial', 'Tile', 'Metal', 'Team']

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = active === 'All' ? galleryImages : galleryImages.filter(g => g.category === active)

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-sm text-sm font-jakarta font-medium border transition-all duration-200 ${
              active === cat
                ? 'bg-gold text-dark border-gold'
                : 'text-cream/60 border-white/10 hover:border-gold/40 hover:text-cream'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((img, i) => (
          <motion.div
            key={`${img.src}-${i}-${active}`}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm border border-white/5 hover:border-gold/30 transition-all duration-300"
            onClick={() => setLightbox(i)}
          >
            <div className={`relative w-full ${img.size === 'tall' ? 'aspect-[3/4]' : img.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square'}`}>
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-gold text-dark text-xs font-jakarta font-bold px-3 py-1 rounded-sm">{img.category}</span>
                <p className="text-cream text-sm mt-1 font-inter">{img.alt}</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center">
                  <span className="text-gold text-xl">⊕</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold transition-colors"
            >
              ✕
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)) }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold transition-colors disabled:opacity-30"
              disabled={lightbox === 0}
            >
              ←
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-4xl max-h-[80vh] w-full mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={filtered[lightbox]?.src || ''}
                  alt={filtered[lightbox]?.alt || ''}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-cream/60 text-sm mt-4 font-inter">{filtered[lightbox]?.alt}</p>
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(filtered.length - 1, lightbox + 1)) }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold transition-colors disabled:opacity-30"
              disabled={lightbox === filtered.length - 1}
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
