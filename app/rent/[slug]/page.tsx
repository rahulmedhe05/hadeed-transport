import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  Truck,
  Shield,
  Clock,
  Star,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { BookingForm } from "@/components/booking-form"
import { SITE_CONFIG, equipmentCategories } from "@/lib/data"
import {
  allRentalPages,
  getRentalPageBySlug,
  getRentalPageContent,
} from "@/lib/rental-pages-data"

// Rental category images from internet
const rentalImages: Record<string, string> = {
  crane: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
  forklift: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  excavator: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop",
  generator: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop",
  warehouse: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  container: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  yard: "https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=2070&auto=format&fit=crop",
  caravan: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop",
  toilet: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=2070&auto=format&fit=crop",
  storage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  default: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
}

function getRentalImage(slug: string): string {
  for (const [key, value] of Object.entries(rentalImages)) {
    if (slug.toLowerCase().includes(key)) return value
  }
  return rentalImages.default
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allRentalPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getRentalPageBySlug(slug)
  if (!page) return {}
  const content = getRentalPageContent(page)
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      images: [page.productImage],
    },
    alternates: {
      canonical: `https://hadeed-transport.com/rent/${slug}`,
    },
  }
}

export default async function RentalPage({ params }: Props) {
  const { slug } = await params
  const page = getRentalPageBySlug(slug)
  if (!page) notFound()

  const content = getRentalPageContent(page)

  // Get related rental pages (same city, different products)
  const relatedRentals = allRentalPages
    .filter(
      (p) =>
        p.city.slug === page.city.slug &&
        p.slug !== page.slug &&
        !p.isGrouped
    )
    .slice(0, 6)

  // Build breadcrumb
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Rent", href: "/equipments" },
  ]
  if (page.categorySlug) {
    breadcrumbs.push({
      label: page.categoryName || "Equipment",
      href: `/equipments/${page.categorySlug}`,
    })
  }
  if (page.isSpace) {
    breadcrumbs.push({ label: "Space Rentals", href: "/space-rentals" })
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${page.productName} Rental ${page.city.preposition}`,
    description: content.metaDescription,
    image: `https://hadeed-transport.com${page.productImage}`,
    brand: { "@type": "Brand", name: "Hadeed Transport" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "AED",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "AED",
        unitText: "DAY",
      },
      seller: {
        "@type": "Organization",
        name: "Hadeed Transport",
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
      },
    },
    areaServed: {
      "@type": "Place",
      name: page.city.name,
      address: {
        "@type": "PostalAddress",
        addressRegion: page.city.name,
        addressCountry: "AE",
      },
    },
  }

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hadeed Transport",
    description: `${page.productName} rental services ${page.city.preposition}`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ICAD III",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
    url: `https://hadeed-transport.com/rent/${slug}`,
    areaServed: page.city.popularAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-[#0d0d1a]">
      <Navigation />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Breadcrumbs */}
      <div className="pt-28 pb-4 bg-[#0d0d1a] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                <Link
                  href={crumb.href}
                  className="hover:text-[#c8a35a] transition-colors"
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#c8a35a]">{page.productName} {page.city.preposition}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section with Background Image */}
      <section className="relative py-20 overflow-hidden min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getRentalImage(slug)}
            alt={`${page.productName} rental ${page.city.preposition}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a] via-[#0d0d1a]/90 to-[#0d0d1a]/70" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-[#c8a35a]/10 border border-[#c8a35a]/20 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-[#c8a35a]" />
                <span className="text-[#c8a35a] text-sm font-semibold">
                  Available {page.city.preposition}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {content.h1}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                {content.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={page.whatsappMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 gold-gradient text-[#0d0d1a] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-5 h-5" />
                  Get Free Quote
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center gap-2 border-2 border-[#c8a35a] text-[#c8a35a] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c8a35a]/10 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 mt-10">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Truck className="w-4 h-4 text-[#c8a35a]" />
                  Fast Delivery
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Shield className="w-4 h-4 text-[#c8a35a]" />
                  Well-Maintained
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Clock className="w-4 h-4 text-[#c8a35a]" />
                  24/7 Support
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Star className="w-4 h-4 text-[#c8a35a]" />
                  15+ Years
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <BookingForm variant="sidebar" />
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              ABOUT THIS RENTAL
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-8">
              {page.productName} Rental Services {page.city.preposition}
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>{content.introParagraph1}</p>
              <p>{content.introParagraph2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              KEY FEATURES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Why Choose Our {page.productName}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-[#1a1a2e] border border-[#c8a35a]/10 rounded-xl p-6"
              >
                <CheckCircle2 className="w-6 h-6 text-[#c8a35a] shrink-0 mt-0.5" />
                <p className="text-gray-300 leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications & Benefits */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
                APPLICATIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-8">
                Common Use Cases {page.city.preposition}
              </h2>
              <ul className="space-y-4">
                {content.applications.map((app, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#c8a35a]" />
                    <span className="text-gray-300 text-lg">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
                BENEFITS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-8">
                Why Rent From Hadeed Transport
              </h2>
              <ul className="space-y-4">
                {content.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#c8a35a] shrink-0 mt-1" />
                    <span className="text-gray-300 text-lg">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-20 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              SERVICE AREAS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              {page.productName} Delivery {page.city.preposition}
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              We deliver {page.productName.toLowerCase()} {page.city.areaText}.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {page.city.popularAreas.map((area, i) => (
              <span
                key={i}
                className="bg-[#1a1a2e] border border-[#c8a35a]/10 text-gray-300 px-5 py-2.5 rounded-full text-sm hover:border-[#c8a35a]/30 transition-colors"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              {page.productName} Rental FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-[#1a1a2e] border border-[#c8a35a]/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-white font-semibold hover:text-[#c8a35a] transition-colors">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-[#c8a35a] group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Rentals */}
      {relatedRentals.length > 0 && (
        <section className="py-20 bg-[#0d0d1a]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
                MORE RENTALS {page.city.preposition.toUpperCase()}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
                Other Equipment Available {page.city.preposition}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedRentals.map((rental) => (
                <Link
                  key={rental.slug}
                  href={`/rent/${rental.slug}`}
                  className="group bg-[#1a1a2e] border border-[#c8a35a]/10 rounded-xl p-6 hover:border-[#c8a35a]/30 transition-all"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#c8a35a] transition-colors mb-2">
                    {rental.productName}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {rental.productDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[#c8a35a] text-sm font-semibold">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-[#c8a35a]/20 via-[#0f0f1a] to-[#c8a35a]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Rent {page.productName} {page.city.preposition}?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Get a free quote in minutes. We deliver {page.city.areaText}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={page.whatsappMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gold-gradient text-[#0d0d1a] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Quote
            </a>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 border-2 border-[#c8a35a] text-[#c8a35a] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c8a35a]/10 transition-colors"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
