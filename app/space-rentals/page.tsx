import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { PageHero } from "@/components/page-hero"
import { HowItWorks } from "@/components/how-it-works"
import { spaceRentals } from "@/lib/data"

export const metadata: Metadata = {
  title: "Space Rentals | Warehouses, Offices, Storage & More",
  description:
    "Affordable, adaptable space rentals for short or long-term use in Abu Dhabi. Warehouses, office spaces, self-storage, open yards, caravans & more.",
}

export default function SpaceRentalsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageHero
        title="Space Rentals"
        subtitle="Affordable, adaptable space rentals for short or long-term use. Warehouses, offices, storage containers, open yards, and more across Abu Dhabi."
        imageSlug="space-rentals"
        showForm={true}
        badges={[
          "Secure facilities",
          "Short & long-term leases",
          "24/7 access available",
          "Strategic ICAD III location",
        ]}
      />

      {/* Space Rental Categories Grid */}
      <section className="py-24 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Heavy equipment solutions according to your needs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {spaceRentals.map((space) => (
              <div
                key={space.slug}
                className="group bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-2xl overflow-hidden hover:border-[#c8a35a]/40 transition-all"
              >
                <div className="aspect-video bg-[#141425] flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-[#c8a35a]/10 flex items-center justify-center group-hover:bg-[#c8a35a]/20 transition-colors">
                      <span className="text-[#c8a35a] text-2xl font-bold">
                        {space.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {space.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                    {space.heroDescription}
                  </p>
                  <Link
                    href={`/space-rentals/${space.slug}`}
                    className="inline-flex items-center gap-2 gold-gradient text-[#0d0d1a] px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Explore Space Rentals <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
