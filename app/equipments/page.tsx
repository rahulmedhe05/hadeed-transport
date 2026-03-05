import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Truck, Wrench } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { PageHero } from "@/components/page-hero"
import { HowItWorks } from "@/components/how-it-works"
import { equipmentCategories } from "@/lib/data"

export const metadata: Metadata = {
  title: "Equipment Rentals | Heavy Machinery & Tools",
  description:
    "Comprehensive rental solutions for heavy machinery and equipment in Abu Dhabi. Transportation, construction machineries, small tools, cranes & more.",
}

const icons = [Truck, Wrench]

export default function EquipmentsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageHero
        title="Equipment Rentals"
        subtitle="Comprehensive rental solutions for heavy machinery and construction equipment. From earthmoving machines to precision tools, we have everything your project needs."
        imageSlug="equipment"
        showForm={true}
      />

      {/* Equipment Categories Grid */}
      <section className="py-24 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Heavy equipment solutions according to your needs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipmentCategories.map((cat, idx) => {
              const Icon = icons[idx] || Truck
              return (
                <div
                  key={cat.slug}
                  className="group bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-2xl overflow-hidden hover:border-[#c8a35a]/40 transition-all"
                >
                  <div className="aspect-video bg-[#141425] flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#c8a35a]/10 flex items-center justify-center group-hover:bg-[#c8a35a]/20 transition-colors">
                        <Icon className="w-10 h-10 text-[#c8a35a]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {cat.description}
                    </p>
                    <Link
                      href={`/equipments/${cat.slug}`}
                      className="inline-flex items-center gap-2 gold-gradient text-[#0d0d1a] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                    >
                      Browse Equipment <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <HowItWorks />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
