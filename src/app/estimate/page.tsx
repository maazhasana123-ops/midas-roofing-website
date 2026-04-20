import type { Metadata } from 'next'
import EstimateContent from '@/components/EstimateContent'

export const metadata: Metadata = {
  title: 'Free Roofing Estimate | Midas Roofing & Construction',
  description: 'Get an instant roofing estimate using satellite technology. No salesperson visit required. Serving Central Florida.',
}

export default function EstimatePage() {
  return <EstimateContent />
}
