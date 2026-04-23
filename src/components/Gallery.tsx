'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const galleryImages = [
  { src: '/images/6.png',                                                                         alt: 'Premium tile roof — Orlando, FL',                       size: 'wide'   },
  { src: '/images/midas-team-photo.png',                                                          alt: 'Midas Roofing crew on a residential project',            size: 'normal' },
  { src: '/images/gallery/dji_fly_20251106_170602_277_1762608682700_photo.JPG',                   alt: 'Aerial view — new roof installation',                    size: 'wide'   },
  { src: '/images/gallery/dji_fly_20251108_082342_289_1762608335459_photo.JPG',                   alt: 'Drone shot — residential re-roof in progress',           size: 'normal' },
  { src: '/images/gallery/DJI_20251120_102746_509.JPG',                                           alt: "Bird's-eye view — completed shingle roof",               size: 'normal' },
  { src: '/images/gallery/dji_fly_20251120_151446_330_1763912094747_photo.JPG',                   alt: 'Aerial — neighborhood roofing project',                  size: 'wide'   },
  { src: '/images/gallery/dji_fly_20251211_102432_349_1765739191079_photo.JPG',                   alt: 'Overhead view — roof deck and flashing detail',          size: 'normal' },
  { src: '/images/gallery/dji_fly_20251212_155838_361_1765739148009_photo.JPG',                   alt: 'Aerial — finished residential roof, Central Florida',    size: 'normal' },
  { src: '/images/gallery/dji_fly_20251219_132524_393_1767902709804_photo.JPG',                   alt: 'Drone perspective — full property re-roof',              size: 'wide'   },
  { src: '/images/gallery/RemoteMediaFile_6553673_0_2022_03_28_12_52_32.JPG',                     alt: 'On-site roofing crew — quality installation',            size: 'normal' },
  { src: '/images/gallery/Photo Jan 08 2026, 11 20 23 AM.jpg',                                   alt: 'Close-up — premium shingle layering',                    size: 'normal' },
  { src: '/images/gallery/Photo Jan 08 2026, 11 20 23 AM (1).jpg',                               alt: 'Roof inspection — attention to detail',                  size: 'normal' },
]

// Strong ease-out — Emil principle: never use built-in easings for UI
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      {/* Masonry grid — no filter tabs, all images shown */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: i * 0.05,            // stagger 50ms — Emil: keep it short
              ease: EASE_OUT,
            }}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm border border-white/5"
            style={{ transition: 'border-color 180ms cubic-bezier(0.23,1,0.32,1)' }}
            onClick={() => setLightbox(i)}
            whileTap={{ scale: 0.97 }}    // Emil: button press feedback
          >
            {/* Image container */}
            <div className={`relative w-full ${img.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square'}`}>
              {/* Image — scale on hover via CSS for GPU acceleration */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105"
                style={{
                  transition: 'transform 500ms cubic-bezier(0.23,1,0.32,1)',
                }}
              />
              {/* Overlay — only animate opacity, not ALL properties */}
              <div
                className="absolute inset-0 bg-dark/0 group-hover:bg-dark/45"
                style={{ transition: 'background-color 250ms cubic-bezier(0.23,1,0.32,1)' }}
              />
              {/* Caption — slides up on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0"
                style={{ transition: 'transform 280ms cubic-bezier(0.23,1,0.32,1)' }}
              >
                <p className="text-cream text-sm mt-1 font-inter">{img.alt}</p>
              </div>
              {/* Zoom icon — fades in */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                style={{ transition: 'opacity 200ms cubic-bezier(0.23,1,0.32,1)' }}
              >
                <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center backdrop-blur-sm">
                  <span className="text-gold text-xl leading-none">⊕</span>
                </div>
              </div>
              {/* Gold border glow on hover — applied via box-shadow on the wrapper instead of border (avoids layout shift) */}
              <div
                className="absolute inset-0 rounded-sm ring-0 group-hover:ring-1 ring-gold/40 pointer-events-none"
                style={{ transition: 'box-shadow 200ms cubic-bezier(0.23,1,0.32,1)' }}
              />
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
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold"
              style={{ transition: 'color 160ms ease-out, border-color 160ms ease-out' }}
            >
              ✕
            </button>
            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)) }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold disabled:opacity-30"
              style={{ transition: 'color 160ms ease-out, border-color 160ms ease-out' }}
              disabled={lightbox === 0}
            >
              ←
            </button>
            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="relative max-w-4xl max-h-[80vh] w-full mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={galleryImages[lightbox]?.src || ''}
                  alt={galleryImages[lightbox]?.alt || ''}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-cream/50 text-sm mt-4 font-inter tracking-wide">
                {galleryImages[lightbox]?.alt}
              </p>
            </motion.div>
            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(galleryImages.length - 1, lightbox + 1)) }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold disabled:opacity-30"
              style={{ transition: 'color 160ms ease-out, border-color 160ms ease-out' }}
              disabled={lightbox === galleryImages.length - 1}
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
