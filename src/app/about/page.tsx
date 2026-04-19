import type { Metadata } from 'next'
import AboutContent from '@/components/AboutContent'

export const metadata: Metadata = {
  title: 'About Us | Midas Roofing & Construction',
  description: 'Meet Jenson Perazada and the Midas Roofing team. 20+ years serving Central Florida with our exclusive No-Leak Promise. License CCC1334831.',
}

export default function AboutPage() {
  return <AboutContent />
}
