/**
 * JSON-LD Structured Data for Midas Roofing & Construction
 * Renders hidden schema markup for Google, Bing, and AI answer engines.
 * Components: LocalBusiness, RoofingContractor, FAQPage, BreadcrumbList, WebSite
 */

// ── LocalBusiness + RoofingContractor schema (root layout, all pages) ─────────
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'RoofingContractor'],
        '@id': 'https://midasroofingfl.com/#organization',
        name: 'Midas Roofing & Construction',
        url: 'https://midasroofingfl.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://midasroofingfl.com/logos/logo_gold.png',
          width: 400,
          height: 200,
        },
        image: 'https://midasroofingfl.com/images/hero2.2.png',
        description:
          'Licensed roofing contractor serving Central Florida since 2004. Shingle, metal, tile, TPO roofing. No-Leak Promise. Owens Corning Preferred Contractor. License CCC1334831.',
        telephone: '',
        email: '',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '346 Freeman St. Suite D',
          addressLocality: 'Longwood',
          addressRegion: 'FL',
          postalCode: '32750',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 28.7031,
          longitude: -81.3387,
        },
        areaServed: [
          { '@type': 'City', name: 'Orlando', containedInPlace: { '@type': 'State', name: 'Florida' } },
          { '@type': 'City', name: 'Altamonte Springs', containedInPlace: { '@type': 'State', name: 'Florida' } },
          { '@type': 'City', name: 'Windermere', containedInPlace: { '@type': 'State', name: 'Florida' } },
          { '@type': 'City', name: 'Winter Park', containedInPlace: { '@type': 'State', name: 'Florida' } },
          { '@type': 'City', name: 'Lake Mary', containedInPlace: { '@type': 'State', name: 'Florida' } },
          { '@type': 'City', name: 'Winter Garden', containedInPlace: { '@type': 'State', name: 'Florida' } },
          { '@type': 'City', name: 'Lake Nona', containedInPlace: { '@type': 'State', name: 'Florida' } },
          { '@type': 'City', name: 'Longwood', containedInPlace: { '@type': 'State', name: 'Florida' } },
          {
            '@type': 'AdministrativeArea',
            name: 'Central Florida',
            containedInPlace: { '@type': 'State', name: 'Florida' },
          },
        ],
        hasMap: 'https://maps.google.com/?q=346+Freeman+St+Suite+D+Longwood+FL+32750',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '07:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '08:00',
            closes: '14:00',
          },
        ],
        priceRange: '$$',
        currenciesAccepted: 'USD',
        paymentAccepted: 'Cash, Check, Credit Card, Financing',
        founder: {
          '@type': 'Person',
          name: 'Jenson Perazada',
          jobTitle: 'CEO & Founder',
        },
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          minValue: 10,
          maxValue: 50,
        },
        slogan: 'Your Roof. Our Promise.',
        knowsAbout: [
          'Shingle Roofing',
          'Metal Roofing',
          'Tile Roofing',
          'TPO Roofing',
          'Roof Coatings',
          'Commercial Roofing',
          'Roof Repair',
          'Storm Damage Repair',
          'Florida Roofing',
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Florida Roofing Contractor License',
            credentialCategory: 'license',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Florida Department of Business and Professional Regulation',
            },
            identifier: 'CCC1334831',
          },
        ],
        memberOf: {
          '@type': 'Organization',
          name: 'Owens Corning Preferred Contractor Network',
          url: 'https://www.owenscorning.com',
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://midasroofingfl.com/#website',
        url: 'https://midasroofingfl.com',
        name: 'Midas Roofing & Construction',
        description:
          'Central Florida licensed roofing contractor — shingle, metal, tile, TPO, and commercial roofing with the No-Leak Promise.',
        publisher: {
          '@id': 'https://midasroofingfl.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://midasroofingfl.com/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── FAQ schema for homepage AEO ───────────────────────────────────────────────
export function HomeFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a new roof cost in Central Florida?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Roofing costs in Central Florida vary by material and roof size. Asphalt shingle roofs typically range from $8,000–$18,000, metal roofs $15,000–$35,000, and tile roofs $20,000–$45,000 for an average-sized home. Midas Roofing offers free instant estimates using satellite measurement technology at midasroofingfl.com/estimate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is the best roofing contractor in Orlando, Florida?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Midas Roofing & Construction is a top-rated licensed roofing contractor in Orlando and Central Florida. They hold Florida License CCC1334831, are Owens Corning Preferred Contractors, and back every installation with their exclusive No-Leak Promise — if the roof leaks, they fix it at no cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'What roofing materials are best for Florida homes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "For Florida's climate — heat, hurricanes, UV, and heavy rain — metal roofing offers the best long-term value with a 40–70 year lifespan. Tile roofing provides excellent wind resistance and aesthetics. Architectural asphalt shingles are a reliable, cost-effective option for most budgets. Midas Roofing can recommend the right system for your home.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Midas Roofing offer a warranty?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Midas Roofing & Construction backs every installation with their exclusive No-Leak Promise — if the roof leaks after installation, they return and fix it at no charge, no questions asked. They also pass through Owens Corning manufacturer warranties on qualifying shingle installations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Midas Roofing licensed and insured in Florida?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Midas Roofing & Construction holds Florida Roofing Contractor License CCC1334831 and carries full liability and workers compensation insurance.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a roof replacement take in Florida?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A typical residential roof replacement by Midas Roofing takes 1–3 days depending on size and material. Metal and tile roofs may take slightly longer. Commercial roofing projects vary based on scope and system type.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Midas Roofing serve Orlando and Central Florida?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Midas Roofing & Construction is headquartered in Longwood, FL and serves the entire Central Florida region including Orlando, Windermere, Dr. Phillips, Winter Park, Longwood, Lake Mary, Lake Nona, Winter Garden, Baldwin Park, and College Park.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── BreadcrumbList for inner pages ─────────────────────────────────────────────
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Service schema (used on /services page) ────────────────────────────────────
export function ServicesSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Roofing Services — Midas Roofing & Construction',
    description: 'Complete roofing services in Central Florida by Midas Roofing & Construction',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: 'Shingle Roofing',
          description:
            'Architectural and 3-tab asphalt shingle installation and replacement using Owens Corning materials. Best for residential homes in Central Florida.',
          provider: { '@id': 'https://midasroofingfl.com/#organization' },
          areaServed: 'Central Florida',
          url: 'https://midasroofingfl.com/services#shingle',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: 'Metal Roofing',
          description:
            'Standing seam and metal panel roofing systems with 40–70 year lifespan. Ideal for Florida heat, UV, and hurricane conditions.',
          provider: { '@id': 'https://midasroofingfl.com/#organization' },
          areaServed: 'Central Florida',
          url: 'https://midasroofingfl.com/services#metal',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: 'Tile Roofing',
          description:
            'Concrete and clay tile roofing installation for Florida homes. 150+ mph wind resistance, 50+ year lifespan, Mediterranean aesthetic.',
          provider: { '@id': 'https://midasroofingfl.com/#organization' },
          areaServed: 'Central Florida',
          url: 'https://midasroofingfl.com/services#tile',
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Service',
          name: 'TPO Roofing',
          description:
            'Thermoplastic polyolefin flat roofing membrane for commercial buildings and residential low-slope applications in Central Florida.',
          provider: { '@id': 'https://midasroofingfl.com/#organization' },
          areaServed: 'Central Florida',
          url: 'https://midasroofingfl.com/services#tpo',
        },
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: {
          '@type': 'Service',
          name: 'Roof Coatings',
          description:
            'Elastomeric and silicone roof coatings to extend existing roof life by 10–15 years and improve energy efficiency.',
          provider: { '@id': 'https://midasroofingfl.com/#organization' },
          areaServed: 'Central Florida',
          url: 'https://midasroofingfl.com/services#coatings',
        },
      },
      {
        '@type': 'ListItem',
        position: 6,
        item: {
          '@type': 'Service',
          name: 'Commercial Roofing',
          description:
            'Large-scale commercial roofing systems including TPO, modified bitumen, and metal for offices, retail, and warehouses in Central Florida.',
          provider: { '@id': 'https://midasroofingfl.com/#organization' },
          areaServed: 'Central Florida',
          url: 'https://midasroofingfl.com/services#commercial',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
