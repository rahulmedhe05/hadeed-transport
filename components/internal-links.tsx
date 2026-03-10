import Link from "next/link";
import { SEO_CONFIG } from "@/lib/seo-config";

interface InternalLink {
  href: string;
  label: string;
}

export function RelatedServices({ links }: { links: InternalLink[] }) {
  if (!links || links.length === 0) return null;

  return (
    <section className="py-8 border-t border-gray-200 mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Related {SEO_CONFIG.niche} Services in {SEO_CONFIG.location}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-blue-600 hover:text-blue-800 hover:underline text-sm p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FooterSEOLinks({ links }: { links: InternalLink[] }) {
  if (!links || links.length === 0) return null;

  return (
    <div className="py-6 border-t border-gray-700">
      <h3 className="text-sm font-semibold text-gray-300 mb-3">
        Popular Services
      </h3>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function BreadcrumbNav({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
