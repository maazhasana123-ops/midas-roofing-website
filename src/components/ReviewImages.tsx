'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const reviewImages = [
  { src: '/images/gallery/post-1.png', alt: 'Customer review — roofing project, Central Florida', size: 'wide' },
  { src: '/images/gallery/post-2.png', alt: 'Customer review — shingle replacement, Tavares FL', size: 'normal' },
  { src: '/images/gallery/post-3.png', alt: 'Customer review — roofing installation', size: 'normal' },
  { src: '/images/gallery/post-4.png', alt: 'Customer review — Mount Dora FL', size: 'normal' },
  { src: '/images/gallery/post-5.png', alt: 'Customer review — roof repair project', size: 'normal' },
]

export default function ReviewImages() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {reviewImages.map((img, i) => (
          <motion.div
            key={img.src}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm border border-white/5 hover:border-gold/30 transition-all duration-300"
            onClick={() => setLightbox(i)}
          >
            <div className={`relative w-full ${img.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square'}`}>
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-gold text-dark text-xs font-jakarta font-bold px-3 py-1 rounded-sm">⭐ Review</span>
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
                  src={reviewImages[lightbox]?.src || ''}
                  alt={reviewImages[lightbox]?.alt || ''}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-cream/60 text-sm mt-4 font-inter">{reviewImages[lightbox]?.alt}</p>
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(reviewImages.length - 1, lightbox + 1)) }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold transition-colors disabled:opacity-30"
              disabled={lightbox === reviewImages.length - 1}
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
