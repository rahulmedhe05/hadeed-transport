import { HeroSlider } from "@/components/hero-slider"
import { AboutSection } from "@/components/about-section"
import { EquipmentCategories } from "@/components/equipment-categories"
import { HowItWorks } from "@/components/how-it-works"
import { StatsCounter } from "@/components/stats-counter"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSlider />
      <AboutSection />
      <EquipmentCategories />
      <HowItWorks />
      <StatsCounter />
      <FAQSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
