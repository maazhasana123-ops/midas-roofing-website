import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VapiWidget from '@/components/VapiWidget'
import PreloaderWrapper from '@/components/PreloaderWrapper'
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Midas Roofing & Construction | Central Florida Roofing Experts',
  description:
    'Licensed roofing contractor serving Central Florida. Shingle, metal, tile, TPO roofing & more. No-Leak Promise. License CCC1334831.',
  keywords:
    'roofing contractor Central Florida, roofing company Tavares FL, metal roofing Florida, tile roof replacement Florida',
  openGraph: {
    title: 'Midas Roofing & Construction',
    description: "Central Florida's trusted roofing contractor since day one.",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(jakarta.variable, inter.variable, "font-sans")}>
      <body className="bg-dark text-cream font-inter antialiased">
        <PreloaderWrapper />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <VapiWidget />
      </body>
    </html>
  )
}
