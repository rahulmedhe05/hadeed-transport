import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ChevronRight,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  Truck,
  Warehouse,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { BookingForm } from "@/components/booking-form"
import { allCities } from "@/lib/areas"
import { equipmentCategories, spaceRentals, SITE_CONFIG } from "@/lib/data"

// City hero images
const cityImages: Record<string, string> = {
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
  "abu-dhabi": "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=2070&auto=format&fit=crop",
  sharjah: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?q=80&w=2070&auto=format&fit=crop",
}

interface Props {
  params: Promise<{ city: string; area: string }>
}

function findArea(citySlug: string, areaSlug: string) {
  const city = allCities.find((c) => c.slug === citySlug)
  if (!city) return null
  const area = city.areas.find((a) => a.slug === areaSlug)
  if (!area) return null
  return { city, area }
}

export async function generateStaticParams() {
  const params: { city: string; area: string }[] = []
  for (const city of allCities) {
    for (const area of city.areas) {
      params.push({ city: city.slug, area: area.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, area: areaSlug } = await params
  const result = findArea(citySlug, areaSlug)
  if (!result) return {}
  const { city, area } = result
  return {
    title: `Equipment Rental in ${area.name}, ${city.name} | Hadeed Transport`,
    description: `Rent heavy equipment, cranes, forklifts & construction machinery in ${area.name}, ${city.name}. Warehouse & storage solutions available. Fast delivery, competitive rates.`,
    openGraph: {
      title: `Equipment Rental in ${area.name} | Hadeed Transport`,
      description: `Heavy equipment & space rental in ${area.name}, ${city.name}. Cranes, forklifts, excavators, generators & more.`,
    },
    alternates: {
      canonical: `https://hadeed-transport.com/${city.slug}/${area.slug}`,
    },
  }
}

export default async function AreaPage({ params }: Props) {
  const { city: citySlug, area: areaSlug } = await params
  const result = findArea(citySlug, areaSlug)
  if (!result) notFound()

  const { city, area } = result

  // Get all products for the popular equipment section
  const popularEquipment = [
    ...equipmentCategories[0].products.slice(0, 4),
    ...equipmentCategories[1].products.slice(0, 2),
  ]

  // Nearby areas (exclude current, pick up to 6)
  const nearbyAreas = city.areas.filter((a) => a.slug !== area.slug).slice(0, 6)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Hadeed Transport - ${area.name}`,
    description: area.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: area.name,
      addressRegion: city.name,
      addressCountry: "AE",
    },
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    url: `https://hadeed-transport.com/${city.slug}/${area.slug}`,
  }

  return (
    <main className="min-h-screen bg-[#0d0d1a]">
      <Navigation />

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
            <Link href={`/${city.slug}`} className="hover:text-[#c8a35a] transition-colors">
              {city.name}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#c8a35a]">{area.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-20 bg-[#0d0d1a] overflow-hidden min-h-[60vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={cityImages[city.slug] || cityImages["abu-dhabi"]}
            alt={area.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a]/95 via-[#0d0d1a]/85 to-[#0d0d1a]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c8a35a]/10 border border-[#c8a35a]/20 rounded-full px-5 py-2 mb-6">
                <MapPin className="w-4 h-4 text-[#c8a35a]" />
                <span className="text-[#c8a35a] text-sm font-semibold">
                  {area.name}, {city.name}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6">
                Equipment Rental &amp; Space Solutions in {area.name}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {area.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-3 mb-8">
                {area.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-[#1a1a2e]/80 backdrop-blur-sm border border-[#c8a35a]/15 rounded-full px-4 py-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#c8a35a]" />
                    <span className="text-gray-300 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Booking form */}
            <div className="lg:pl-8">
              <BookingForm variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Services in this area */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              OUR SERVICES IN {area.name.toUpperCase()}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              What We Offer in {area.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#1a1a2e] border border-[#c8a35a]/10 rounded-xl p-8">
              <Truck className="w-10 h-10 text-[#c8a35a] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Heavy Equipment Rental</h3>
              <p className="text-gray-400 mb-4">
                Excavators, cranes, forklifts, loaders, and more — delivered to your project site in {area.name}.
              </p>
              <Link href="/equipments/transportation-construction-machineries" className="text-[#c8a35a] font-semibold text-sm inline-flex items-center gap-1 hover:underline">
                View Equipment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-[#1a1a2e] border border-[#c8a35a]/10 rounded-xl p-8">
              <Truck className="w-10 h-10 text-[#c8a35a] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Construction Tools</h3>
              <p className="text-gray-400 mb-4">
                Generators, compactors, concrete tools, cutting machines, and survey equipment for {area.name} projects.
              </p>
              <Link href="/equipments/construction-small-tools" className="text-[#c8a35a] font-semibold text-sm inline-flex items-center gap-1 hover:underline">
                View Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-[#1a1a2e] border border-[#c8a35a]/10 rounded-xl p-8">
              <Warehouse className="w-10 h-10 text-[#c8a35a] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Space Rentals</h3>
              <p className="text-gray-400 mb-4">
                Warehouses, office spaces, open yards, caravans, and storage containers available near {area.name}.
              </p>
              <Link href="/space-rentals" className="text-[#c8a35a] font-semibold text-sm inline-flex items-center gap-1 hover:underline">
                View Spaces <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Equipment */}
      <section className="py-20 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              POPULAR IN {area.name.toUpperCase()}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Most Rented Equipment
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularEquipment.map((product) => {
              const cat = equipmentCategories.find((c) =>
                c.products.some((p) => p.slug === product.slug)
              )
              return (
                <Link
                  key={product.slug}
                  href={`/equipments/${cat?.slug}/${product.slug}`}
                  className="group bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-xl overflow-hidden hover:border-[#c8a35a]/40 transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={`${product.name} for rent in ${area.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-bold group-hover:text-[#c8a35a] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{product.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/equipments"
              className="inline-flex items-center gap-2 gold-gradient text-[#0d0d1a] px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Browse All Equipment <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Hadeed in this area */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
                WHY HADEED TRANSPORT
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-8">
                Your Trusted Partner in {area.name}
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Fast Delivery", desc: `Same-day or next-day equipment delivery to ${area.name} and surrounding areas.` },
                  { title: "Well-Maintained Fleet", desc: "Every piece of equipment is regularly serviced and safety-inspected." },
                  { title: "Certified Operators", desc: "Professional, licensed operators available with all heavy machinery." },
                  { title: "Flexible Rental Terms", desc: "Daily, weekly, and monthly rental options to suit your project timeline." },
                  { title: "Competitive Pricing", desc: "Transparent pricing with no hidden charges. Volume discounts available." },
                  { title: "24/7 Support", desc: "Round-the-clock technical support for critical operations." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#c8a35a] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1a1a2e] border border-[#c8a35a]/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Request a Quote for {area.name}
              </h3>
              <p className="text-gray-400 mb-6">
                Tell us what you need and our team will prepare a competitive quote for delivery to {area.name}.
              </p>
              <div className="space-y-4">
                <a
                  href={`https://wa.me/971506266515?text=${encodeURIComponent(`Hi, I need equipment rental in ${area.name}, ${city.name}. Please send me a quote.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full gold-gradient text-[#0d0d1a] px-6 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Quote
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center justify-center gap-2 w-full border-2 border-[#c8a35a] text-[#c8a35a] px-6 py-4 rounded-full font-semibold text-lg hover:bg-[#c8a35a]/10 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +971 50 626 6515
                </a>
                <Link
                  href="/contact-us"
                  className="flex items-center justify-center gap-2 w-full border border-white/20 text-white px-6 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-colors"
                >
                  Contact Form <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      {nearbyAreas.length > 0 && (
        <section className="py-20 bg-[#0d0d1a]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
                NEARBY AREAS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
                Also Serving Nearby {city.name} Areas
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyAreas.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/${city.slug}/${nearby.slug}`}
                  className="group flex items-center gap-3 bg-[#1a1a2e] border border-[#c8a35a]/10 rounded-xl p-5 hover:border-[#c8a35a]/40 transition-all"
                >
                  <MapPin className="w-5 h-5 text-[#c8a35a] shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-[#c8a35a] transition-colors">
                      Equipment Rental in {nearby.name}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#c8a35a] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${city.slug}`}
                className="text-[#c8a35a] font-semibold hover:underline inline-flex items-center gap-2"
              >
                View All {city.name} Areas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
