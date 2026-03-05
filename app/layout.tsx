import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Hadeed Transport | Equipment & Space Rentals in Abu Dhabi",
    template: "%s | Hadeed Transport",
  },
  description:
    "Hadeed specializes in heavy equipment rentals and versatile space solutions across Abu Dhabi. Construction machinery, cranes, storage, warehouses & more. Call +971 50 626 6515",
  keywords:
    "equipment rental Abu Dhabi, heavy machinery rental, crane rental UAE, construction equipment, space rental Abu Dhabi, warehouse rental, self storage Abu Dhabi, open yards, forklift rental, generator rental, water tanker rental",
  authors: [{ name: "Hadeed Transport" }],
  creator: "Hadeed Transport",
  publisher: "Hadeed Transport",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://hadeed-transport.com"),
  alternates: {
    canonical: "https://hadeed-transport.com",
  },
  openGraph: {
    title: "Hadeed Transport | Equipment & Space Rentals in Abu Dhabi",
    description:
      "From heavy machinery to secure storage, we provide practical solutions tailored to your business needs. Serving Abu Dhabi & UAE.",
    url: "https://hadeed-transport.com",
    siteName: "Hadeed Transport",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "https://hadeed-transport.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hadeed Transport - Equipment & Space Rentals Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hadeed Transport | Equipment & Space Rentals Abu Dhabi",
    description:
      "Heavy equipment rentals & space solutions across Abu Dhabi. Construction machinery, cranes, storage & more.",
    images: ["https://hadeed-transport.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "c1b155cb6acd07f9",
  },
}

// Organization Schema for all pages
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://hadeed-transport.com/#organization",
  name: "Hadeed Transport",
  url: "https://hadeed-transport.com",
  logo: "https://hadeed-transport.com/logo.png",
  description: "Leading equipment rental and space solutions provider in Abu Dhabi, UAE. Offering cranes, forklifts, generators, warehouses, and storage facilities.",
  foundingDate: "2009",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+971506266515",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic", "Hindi", "Urdu"],
      areaServed: "AE",
    },
    {
      "@type": "ContactPoint",
      telephone: "+971506266515",
      contactType: "sales",
      availableLanguage: ["English", "Arabic"],
      areaServed: "AE",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "ICAD III",
    addressLocality: "Abu Dhabi",
    addressRegion: "Abu Dhabi",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "24.35",
    longitude: "54.48",
  },
  sameAs: [
    "https://www.facebook.com/hadeedtransport",
    "https://www.instagram.com/hadeedtransport",
    "https://www.linkedin.com/company/hadeedtransport",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://hadeed-transport.com/#website",
  url: "https://hadeed-transport.com",
  name: "Hadeed Transport",
  description: "Equipment & Space Rentals in Abu Dhabi",
  publisher: {
    "@id": "https://hadeed-transport.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://hadeed-transport.com/equipments?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Global Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
