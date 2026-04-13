'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  from?: 'bottom' | 'left' | 'right' | 'none'
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  from = 'bottom',
}: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const initialY = from === 'bottom' ? 28 : 0
  const initialX = from === 'left' ? -28 : from === 'right' ? 28 : 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initialY, x: initialX }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
