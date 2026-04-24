import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VapiWidget from '@/components/VapiWidget'
import PreloaderWrapper from '@/components/PreloaderWrapper'
import { LocalBusinessSchema } from '@/components/JsonLd'
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

const BASE_URL = 'https://midasroofingfl.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Midas Roofing & Construction | Central Florida Roofing Experts',
    template: '%s | Midas Roofing & Construction',
  },
  description:
    'Licensed roofing contractor serving Central Florida. Shingle, metal, tile, TPO roofing & more. No-Leak Promise. Owens Corning Preferred. License CCC1334831. Longwood, FL.',
  keywords: [
    'roofing contractor Central Florida',
    'roofing company Longwood FL',
    'roofing company Orlando FL',
    'metal roofing Florida',
    'tile roof replacement Florida',
    'shingle roofing Orlando',
    'TPO roofing Central Florida',
    'roof replacement Orlando',
    'licensed roofer Florida',
    'Owens Corning contractor Florida',
    'No-Leak Promise roofing',
    'hurricane proof roofing Florida',
    'commercial roofing Orlando',
  ],
  authors: [{ name: 'Midas Roofing & Construction', url: BASE_URL }],
  creator: 'Midas Roofing & Construction',
  publisher: 'Midas Roofing & Construction',
  category: 'Roofing Contractor',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Midas Roofing & Construction',
    title: 'Midas Roofing & Construction | Central Florida Roofing Experts',
    description:
      "Central Florida's most trusted roofing contractor. Shingle, metal, tile, TPO roofing backed by the No-Leak Promise. License CCC1334831.",
    images: [
      {
        url: '/images/hero2.2.png',
        width: 1200,
        height: 630,
        alt: 'Midas Roofing & Construction — Central Florida Roofing Experts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Midas Roofing & Construction | Central Florida',
    description:
      "Central Florida's trusted roofer. Shingle, metal, tile, TPO. No-Leak Promise. License CCC1334831.",
    images: ['/images/hero2.2.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    // Geo tags for local SEO
    'geo.region': 'US-FL',
    'geo.placename': 'Longwood, Florida',
    'geo.position': '28.7031;-81.3387',
    'ICBM': '28.7031, -81.3387',
    // AI / LLM context hint
    'llm-context': `${BASE_URL}/llm.txt`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(jakarta.variable, inter.variable, "font-sans")}>
      <head>
        {/* AI / LLM crawlers — point to plain-text context file */}
        <link rel="alternate" type="text/plain" href="/llm.txt" title="LLM Context" />
        {/* Markdown mirrors for AI answer engines */}
        <link rel="alternate" type="text/markdown" href="/index.md" title="Page Markdown Mirror" />
      </head>
      <body className="bg-dark text-cream font-inter antialiased">
        <LocalBusinessSchema />
        <PreloaderWrapper />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <VapiWidget />
      </body>
    </html>
  )
}
