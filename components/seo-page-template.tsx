import { BreadcrumbSchema, LocalBusinessSchema, ServiceSchema } from "@/components/seo-schemas";
import { BreadcrumbNav, RelatedServices } from "@/components/internal-links";
import { SEO_CONFIG } from "@/lib/seo-config";

interface SEOPageProps {
  serviceName: string;
  serviceSlug: string;
  description: string;
  keywords?: string[];
  relatedLinks?: { href: string; label: string }[];
  children: React.ReactNode;
}

export function SEOPageTemplate({
  serviceName,
  serviceSlug,
  description,
  relatedLinks = [],
  children,
}: SEOPageProps) {
  const breadcrumbItems = [
    { name: "Home", url: SEO_CONFIG.siteUrl },
    {
      name: serviceName,
      url: `${SEO_CONFIG.siteUrl}/${serviceSlug}`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <LocalBusinessSchema
        serviceName={`${serviceName} - ${SEO_CONFIG.siteName}`}
        description={description}
      />
      <ServiceSchema
        name={serviceName}
        description={description}
      />

      <BreadcrumbNav
        items={[{ label: serviceName }]}
      />

      <main>{children}</main>

      {relatedLinks.length > 0 && (
        <RelatedServices links={relatedLinks} />
      )}
    </>
  );
}
