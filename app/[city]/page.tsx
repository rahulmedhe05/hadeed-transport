import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, MapPin, Truck, Warehouse, Phone, MessageCircle, CheckCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { HowItWorks } from "@/components/how-it-works"
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
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  return allCities.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params
  const city = allCities.find((c) => c.slug === slug)
  if (!city) return {}
  return {
    title: `Equipment Rental & Space Solutions in ${city.name} | Hadeed Transport`,
    description: city.metaDescription,
    openGraph: {
      title: `${city.title} | Hadeed Transport`,
      description: city.metaDescription,
    },
    alternates: {
      canonical: `https://hadeed-transport.com/${city.slug}`,
    },
  }
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params
  const city = allCities.find((c) => c.slug === slug)
  if (!city) notFound()

  return (
    <main className="min-h-screen bg-[#0d0d1a]">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={cityImages[city.slug] || cityImages["abu-dhabi"]}
            alt={city.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a]/95 via-[#0d0d1a]/80 to-[#0d0d1a]/60" />
        </div>

        <div className="absolute top-20 right-10 w-96 h-96 bg-[#c8a35a]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c8a35a]/10 border border-[#c8a35a]/20 rounded-full px-5 py-2 mb-6">
                <MapPin className="w-4 h-4 text-[#c8a35a]" />
                <span className="text-[#c8a35a] text-sm font-semibold">{city.name}, UAE</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {city.title}
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
                {city.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Fast delivery", "Certified operators", "Competitive rates", "24/7 support"].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 bg-[#1a1a2e]/80 backdrop-blur-sm border border-[#c8a35a]/20 rounded-full px-4 py-2 text-sm text-gray-300"
                  >
                    <CheckCircle className="w-4 h-4 text-[#c8a35a]" />
                    {badge}
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

      {/* Equipment Categories */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              EQUIPMENT FOR RENT
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Heavy Equipment Rental in {city.name}
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              From earthmoving machines to small construction tools — rent what you need, when you need it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipmentCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/equipments/${cat.slug}`}
                className="group bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-2xl p-8 hover:border-[#c8a35a]/40 transition-all"
              >
                <Truck className="w-12 h-12 text-[#c8a35a] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#c8a35a] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-400 mb-4">{cat.description}</p>
                <span className="text-[#c8a35a] font-semibold text-sm">
                  {cat.products.length} Products Available →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Space Rentals */}
      <section className="py-20 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              SPACE SOLUTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Warehouses & Storage in {city.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {spaceRentals.map((space) => (
              <Link
                key={space.slug}
                href={`/space-rentals/${space.slug}`}
                className="group bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-xl p-6 hover:border-[#c8a35a]/40 transition-all"
              >
                <Warehouse className="w-8 h-8 text-[#c8a35a] mb-3" />
                <h3 className="text-lg font-bold text-white group-hover:text-[#c8a35a] transition-colors">
                  {space.name}
                </h3>
                <p className="text-gray-400 text-sm mt-2">{space.heroDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              SERVICE AREAS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              We Serve All Areas in {city.name}
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Click on any area to learn more about our equipment rental and space solutions in that location.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {city.areas.map((area) => (
              <Link
                key={area.slug}
                href={`/${city.slug}/${area.slug}`}
                className="group bg-[#1a1a2e] border border-[#c8a35a]/10 rounded-xl p-5 hover:border-[#c8a35a]/40 hover:bg-[#1a1a2e]/80 transition-all"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#c8a35a] shrink-0" />
                  <h3 className="text-white font-semibold group-hover:text-[#c8a35a] transition-colors">
                    {area.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-[#c8a35a]/20 via-[#0f0f1a] to-[#c8a35a]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Equipment in {city.name}?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Contact us today for the best equipment rental rates in {city.name}. Fast delivery guaranteed.
          </p>
          <a
            href={SITE_CONFIG.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gold-gradient text-[#0d0d1a] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us Now
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
