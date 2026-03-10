"use client";

import Script from "next/script";
import { SEO_CONFIG } from "@/lib/seo-config";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      strategy="afterInteractive"
    />
  );
}

export function LocalBusinessSchema({
  serviceName,
  description,
  areaServed,
}: {
  serviceName?: string;
  description?: string;
  areaServed?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: serviceName || SEO_CONFIG.siteName,
    description:
      description ||
      `${SEO_CONFIG.niche} in ${SEO_CONFIG.location}. Professional services by ${SEO_CONFIG.siteName}.`,
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.phone,
    areaServed: {
      "@type": "Place",
      name: areaServed || SEO_CONFIG.location,
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        addressLocality: areaServed || SEO_CONFIG.location,
      },
    },
    sameAs: [SEO_CONFIG.siteUrl],
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

export function ServiceSchema({
  name,
  description,
  area,
}: {
  name: string;
  description: string;
  area?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      telephone: SEO_CONFIG.phone,
    },
    areaServed: {
      "@type": "Place",
      name: area || SEO_CONFIG.location,
    },
    serviceType: SEO_CONFIG.niche,
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
