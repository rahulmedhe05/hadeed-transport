import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { PageHero } from "@/components/page-hero"
import { SpaceDetailSection } from "@/components/space-detail-section"
import { spaceRentals } from "@/lib/data"

const space = spaceRentals.find((s) => s.slug === "open-yards")!

export const metadata: Metadata = {
  title: `${space.name} for Rent | Space Rentals`,
  description: `${space.subtitle} - ${space.heroDescription}`,
}

export default function OpenYardsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageHero title={space.name} subtitle={space.subtitle} imageSlug="open-yards" showForm={true} />
      <SpaceDetailSection space={space} />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
