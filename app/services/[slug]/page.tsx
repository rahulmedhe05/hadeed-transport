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
  HelpCircle,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { BookingForm } from "@/components/booking-form"
import { SITE_CONFIG } from "@/lib/data"
import {
  keywordPages,
  getKeywordPageBySlug,
  getRelatedKeywordPages,
} from "@/lib/keyword-pages-data"

// Service category images from internet
const categoryImages: Record<string, string> = {
  equipment: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
  space: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  service: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop",
  location: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  industry: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return keywordPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getKeywordPageBySlug(slug)
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
    },
    alternates: {
      canonical: `https://hadeed-transport.com/services/${slug}`,
    },
  }
}

export default async function KeywordPage({ params }: Props) {
  const { slug } = await params
  const page = getKeywordPageBySlug(slug)
  if (!page) notFound()

  const related = getRelatedKeywordPages(page, 6)

  const categoryColors: Record<string, string> = {
    equipment: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    space: "bg-green-500/10 text-green-400 border-green-500/20",
    service: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    location: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    industry: "bg-red-500/10 text-red-400 border-red-500/20",
  }

  const categoryLabels: Record<string, string> = {
    equipment: "Equipment Rental",
    space: "Space Rental",
    service: "Service",
    location: "Location",
    industry: "Industry",
  }

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.keyword,
        description: page.metaDescription,
        provider: {
          "@type": "LocalBusiness",
          name: SITE_CONFIG.name,
          telephone: SITE_CONFIG.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Abu Dhabi",
            addressCountry: "AE",
            streetAddress: "ICAD III",
          },
          url: SITE_CONFIG.url,
        },
        areaServed: [
          { "@type": "City", name: "Abu Dhabi" },
          { "@type": "City", name: "Dubai" },
          { "@type": "City", name: "Sharjah" },
          { "@type": "Country", name: "United Arab Emirates" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_CONFIG.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_CONFIG.url}/equipments`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.keyword,
            item: `${SITE_CONFIG.url}/services/${slug}`,
          },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a]">
      <Navigation />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section with Background Image */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={categoryImages[page.category] || categoryImages.equipment}
            alt={page.keyword}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a] via-[#0d0d1a]/90 to-[#0d0d1a]/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/" className="hover:text-[#c8a35a] transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/equipments" className="hover:text-[#c8a35a] transition-colors">Services</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#c8a35a]">{page.keyword}</span>
              </nav>

              {/* Category Badge */}
              <div className="mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[page.category]}`}>
                  {categoryLabels[page.category]}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {page.h1}
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
                {page.heroSubtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${page.keyword}. Please share details.`)}`}
                  className="inline-flex items-center px-8 py-4 bg-[#c8a35a] text-black font-bold rounded-lg hover:bg-[#d4b06a] transition-all shadow-lg shadow-[#c8a35a]/20"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Free Quote on WhatsApp
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center px-8 py-4 border-2 border-[#c8a35a]/30 text-white font-bold rounded-lg hover:border-[#c8a35a] transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <BookingForm variant="sidebar" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {page.introParagraph}
                </p>
                <p className="text-gray-400 leading-relaxed mt-4">
                  {page.secondParagraph}
                </p>
              </div>

              {/* Features */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mt-8">
                <h2 className="text-2xl font-bold text-white mb-6">What We Offer</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {page.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#c8a35a] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Hadeed Transport */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Why Choose Hadeed Transport?</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: Shield, title: "15+ Years Experience", desc: "Established track record serving the UAE's construction and industrial sectors." },
                    { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery available from our ICAD III base in Abu Dhabi." },
                    { icon: Clock, title: "Flexible Terms", desc: "Daily, weekly, and monthly rental options to fit your project timeline." },
                    { icon: Star, title: "Quality Equipment", desc: "All equipment is well-maintained, inspected, and ready for deployment." },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <item.icon className="w-8 h-8 text-[#c8a35a] mb-3" />
                      <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Areas */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">
                  <MapPin className="inline w-6 h-6 text-[#c8a35a] mr-2" />
                  We Serve All UAE
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { city: "Abu Dhabi", areas: "Mussafah, ICAD, KIZAD, Khalifa City, Al Reem Island, Yas Island, Saadiyat, Al Ain" },
                    { city: "Dubai", areas: "JBR, Downtown, Jebel Ali, Business Bay, Dubai South, Al Quoz, JAFZA, Dubai Marina" },
                    { city: "Sharjah", areas: "Industrial Area, Muwaileh, Al Nahda, SAIF Zone, Hamriyah, Al Majaz, University City" },
                  ].map((loc, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <h3 className="text-[#c8a35a] font-semibold mb-2">{loc.city}</h3>
                      <p className="text-gray-400 text-sm">{loc.areas}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-[#c8a35a]/20 to-transparent border border-[#c8a35a]/20 rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">Get a Free Quote</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Contact us today for competitive rates on {page.keyword.toLowerCase()}.
                </p>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Hi, I need ${page.keyword}. Please share pricing.`)}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-white/20 text-white font-semibold rounded-lg hover:border-[#c8a35a] transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    {SITE_CONFIG.phone}
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 text-[#c8a35a]" />
                    ICAD III, Abu Dhabi, UAE
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4 text-[#c8a35a]" />
                    Available 24/7
                  </div>
                </div>
              </div>

              {/* Tags */}
              {page.tags.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Related Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {page.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {page.faqs.length > 0 && (
        <section className="py-16 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <HelpCircle className="w-10 h-10 text-[#c8a35a] mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="text-gray-400 mt-2">Common questions about {page.keyword.toLowerCase()}</p>
            </div>

            <div className="space-y-4">
              {page.faqs.map((faq, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {related.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">Related Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <Link
                  key={i}
                  href={`/services/${r.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#c8a35a]/30 transition-all"
                >
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border mb-3 ${categoryColors[r.category]}`}>
                    {categoryLabels[r.category]}
                  </span>
                  <h3 className="text-white font-semibold group-hover:text-[#c8a35a] transition-colors mb-2">
                    {r.keyword}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{r.heroSubtitle}</p>
                  <div className="flex items-center text-[#c8a35a] text-sm mt-3">
                    Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#c8a35a]/10 via-transparent to-[#c8a35a]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact Hadeed Transport today for the best {page.keyword.toLowerCase()} rates in the UAE.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${page.keyword}. Please provide a quote.`)}`}
              className="inline-flex items-center px-8 py-4 bg-[#c8a35a] text-black font-bold rounded-lg hover:bg-[#d4b06a] transition-all shadow-lg shadow-[#c8a35a]/20"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp for Free Quote
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="inline-flex items-center px-8 py-4 border-2 border-[#c8a35a] text-[#c8a35a] font-bold rounded-lg hover:bg-[#c8a35a] hover:text-black transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +971 50 626 6515
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
