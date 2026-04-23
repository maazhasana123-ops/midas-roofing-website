import type { Metadata } from 'next'
import EstimateContent from '@/components/EstimateContent'
import { BreadcrumbSchema } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Free Instant Roofing Estimate | Central Florida | Midas Roofing',
  description:
    'Get a free, instant roofing estimate in minutes using satellite measurement technology. No salesperson visit required. Serving Orlando and all of Central Florida. License CCC1334831.',
  keywords: [
    'free roofing estimate Orlando',
    'instant roof estimate Florida',
    'online roofing quote Central Florida',
    'satellite roof measurement Florida',
    'roof replacement cost estimate Orlando',
  ],
  alternates: {
    canonical: 'https://midasroofingfl.com/estimate',
  },
  openGraph: {
    url: 'https://midasroofingfl.com/estimate',
    title: 'Free Instant Roofing Estimate | Midas Roofing & Construction',
    description: 'Get a free roofing estimate online using satellite technology. No visit required. Central Florida.',
  },
}

export default function EstimatePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://midasroofingfl.com' },
        { name: 'Free Estimate', url: 'https://midasroofingfl.com/estimate' },
      ]} />
      <EstimateContent />
    </>
  )
}
