import type { Metadata } from 'next'
import AboutContent from '@/components/AboutContent'
import { BreadcrumbSchema } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'About Midas Roofing & Construction | Central Florida',
  description:
    'Meet CEO Jenson Perazada and the Midas Roofing team. 20+ years serving Central Florida with the No-Leak Promise. Owens Corning Preferred. License CCC1334831.',
  keywords: [
    'Midas Roofing about',
    'Jenson Perazada roofer',
    'roofing contractor Longwood FL',
    'No-Leak Promise roofing',
    'licensed roofer Central Florida',
  ],
  alternates: {
    canonical: 'https://midasroofingfl.com/about',
    types: { 'text/markdown': 'https://midasroofingfl.com/about.md' },
  },
  openGraph: {
    url: 'https://midasroofingfl.com/about',
    title: 'About Midas Roofing & Construction',
    description: '20+ years serving Central Florida. Led by CEO Jenson Perazada. No-Leak Promise. Owens Corning Preferred Contractor.',
  },
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://midasroofingfl.com' },
        { name: 'About', url: 'https://midasroofingfl.com/about' },
      ]} />
      <AboutContent />
    </>
  )
}
