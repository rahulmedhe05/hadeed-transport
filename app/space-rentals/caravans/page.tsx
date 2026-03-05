import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { PageHero } from "@/components/page-hero"
import { SpaceDetailSection } from "@/components/space-detail-section"
import { spaceRentals } from "@/lib/data"

const space = spaceRentals.find((s) => s.slug === "caravans")!

export const metadata: Metadata = {
  title: `${space.name} for Rent | Space Rentals`,
  description: `${space.subtitle} - ${space.heroDescription}`,
}

export default function CaravansPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageHero title={space.name} subtitle={space.subtitle} imageSlug="caravans" showForm={true} />
      <SpaceDetailSection space={space} />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
