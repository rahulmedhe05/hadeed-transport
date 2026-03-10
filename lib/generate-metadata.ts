import { Metadata } from "next";
import { SEO_CONFIG } from "@/lib/seo-config";

interface PageSEO {
  title: string;
  description: string;
  slug: string;
  keywords?: string[];
  imageUrl?: string;
}

export function generatePageMetadata({
  title,
  description,
  slug,
  keywords = [],
  imageUrl,
}: PageSEO): Metadata {
  const url = `${SEO_CONFIG.siteUrl}/${slug}`;
  const fullTitle = `${title} | ${SEO_CONFIG.siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      ...keywords,
      SEO_CONFIG.niche,
      SEO_CONFIG.location,
      SEO_CONFIG.siteName,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SEO_CONFIG.siteName,
      locale: "en_IN",
      type: "website",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(imageUrl && { images: [imageUrl] }),
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
  };
}

export function generateServicePageMetadata(
  serviceName: string,
  serviceSlug: string,
  customDescription?: string
): Metadata {
  const description =
    customDescription ||
    `Professional ${serviceName} in ${SEO_CONFIG.location} by ${SEO_CONFIG.siteName}. Trusted experts, affordable pricing, fast service. Call ${SEO_CONFIG.phone} for booking.`;

  return generatePageMetadata({
    title: `${serviceName} in ${SEO_CONFIG.location}`,
    description,
    slug: serviceSlug,
    keywords: [
      serviceName,
      `${serviceName} ${SEO_CONFIG.location}`,
      `best ${serviceName} ${SEO_CONFIG.location}`,
      `${serviceName} near me`,
    ],
  });
}
