import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, CheckCircle2, ArrowRight, Phone, MessageCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ProductCard } from "@/components/product-card"
import { BookingForm } from "@/components/booking-form"
import { equipmentCategories, SITE_CONFIG } from "@/lib/data"
import { getProductDetails, getRelatedProducts } from "@/lib/product-details"

// Equipment type images
const equipmentImages: Record<string, string> = {
  crane: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
  excavator: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop",
  forklift: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  generator: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop",
  roller: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  default: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
}

function getEquipmentImage(slug: string): string {
  for (const [key, value] of Object.entries(equipmentImages)) {
    if (slug.toLowerCase().includes(key)) return value
  }
  return equipmentImages.default
}

interface Props {
  params: Promise<{ category: string; slug: string }>
}

function findProduct(categorySlug: string, productSlug: string) {
  const category = equipmentCategories.find((c) => c.slug === categorySlug)
  if (!category) return null
  const product = category.products.find((p) => p.slug === productSlug)
  if (!product) return null
  return { category, product }
}

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = []
  for (const cat of equipmentCategories) {
    for (const product of cat.products) {
      params.push({ category: cat.slug, slug: product.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const result = findProduct(category, slug)
  if (!result) return {}
  const { product, category: cat } = result
  return {
    title: `${product.name} for Rent in Abu Dhabi & UAE | Hadeed Transport`,
    description: `Rent ${product.name} in Abu Dhabi, Dubai & UAE. ${product.description}. Well-maintained, fast delivery, certified operators. Get a free quote today!`,
    openGraph: {
      title: `${product.name} for Rent | Hadeed Transport`,
      description: `${product.description}. Available for daily, weekly & monthly rental in Abu Dhabi.`,
      images: [product.image],
    },
    alternates: {
      canonical: `https://hadeed-transport.com/equipments/${cat.slug}/${product.slug}`,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { category: catSlug, slug } = await params
  const result = findProduct(catSlug, slug)
  if (!result) notFound()

  const { category, product } = result
  const details = getProductDetails(product)
  const related = getRelatedProducts(product, category.products, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: details.longDescription,
    image: `https://hadeed-transport.com${product.image}`,
    brand: { "@type": "Brand", name: "Hadeed Transport" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "AED",
      seller: { "@type": "Organization", name: "Hadeed Transport" },
    },
  }

  return (
    <main className="min-h-screen bg-[#0d0d1a]">
      <Navigation />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="pt-28 pb-4 bg-[#0d0d1a] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#c8a35a] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/equipments" className="hover:text-[#c8a35a] transition-colors">Equipments</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/equipments/${category.slug}`} className="hover:text-[#c8a35a] transition-colors">
              {category.name}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#c8a35a]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero with Background Image */}
      <section className="relative py-20 min-h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getEquipmentImage(slug)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a] via-[#0d0d1a]/90 to-[#0d0d1a]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Product Details */}
            <div className="lg:col-span-2">
              <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.2em] uppercase">
                {category.name}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
                {product.name}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                {details.longDescription}
              </p>

              {/* Specifications Table */}
              <div className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-xl border border-[#c8a35a]/10 overflow-hidden mb-8 max-w-xl">
                <div className="px-6 py-3 bg-[#c8a35a]/10 border-b border-[#c8a35a]/10">
                  <h3 className="text-white font-semibold">Specifications</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {details.specifications.map((spec) => (
                    <div key={spec.label} className="flex px-6 py-3">
                      <span className="text-gray-400 w-40 shrink-0">{spec.label}</span>
                      <span className="text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={product.whatsappMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 gold-gradient text-[#0d0d1a] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-5 h-5" />
                  Get Quote on WhatsApp
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center gap-2 border-2 border-[#c8a35a] text-[#c8a35a] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c8a35a]/10 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
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

      {/* Features Section */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              KEY FEATURES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Why Choose Our {product.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.features.map((feature, i) => (
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

      {/* Applications */}
      <section className="py-20 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
                APPLICATIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-8">
                Common Use Cases
              </h2>
              <ul className="space-y-4">
                {details.applications.map((app, i) => (
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
                Why Rent From Hadeed
              </h2>
              <ul className="space-y-4">
                {details.benefits.map((b, i) => (
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

      {/* FAQ Section */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              {product.name} Rental FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {details.faqs.map((faq, i) => (
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

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-20 bg-[#0d0d1a]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
                YOU MAY ALSO NEED
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
                Related Equipment
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} categorySlug={category.slug} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-[#c8a35a]/20 via-[#0f0f1a] to-[#c8a35a]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Rent {product.name}?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Get a free quote in minutes. Available for delivery across Abu Dhabi, Dubai & all UAE.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={product.whatsappMessage}
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
