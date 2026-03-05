import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { PageHero } from "@/components/page-hero"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Eye, Target, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Hadeed Equipment & Space Rentals",
  description:
    "Hadeed specializes in both heavy equipment rentals and versatile space solutions across Abu Dhabi. Learn about our vision, mission, and commitment to excellence.",
}

export default function AboutUsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageHero
        title="About Us"
        subtitle="Connecting You with Trusted Equipment & Space Solutions in Abu Dhabi. 15+ years of experience, 500+ happy clients, and a commitment to excellence."
        imageSlug="equipment"
        showForm={true}
        badges={[
          "15+ years experience",
          "500+ happy clients",
          "Based in ICAD III",
          "UAE-wide service",
        ]}
      />

      {/* About Content */}
      <section className="py-24 bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              About Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
              Hadeed Equipment & Space Rentals
            </h2>
            <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              Hadeed specializes in both heavy equipment rentals and versatile space
              solutions across Abu Dhabi. Whether you&apos;re managing a major build or
              need secure self-storage, we&apos;ve got you covered with high-quality
              assets and professional service.
            </p>
          </div>

          {/* Vision, Mission, Motto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-2xl p-8 hover:border-[#c8a35a]/40 transition-all group">
              <div className="w-16 h-16 mb-6 rounded-xl bg-[#c8a35a]/10 flex items-center justify-center group-hover:bg-[#c8a35a]/20 transition-colors">
                <Eye className="w-8 h-8 text-[#c8a35a]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To be Abu Dhabi&apos;s leading partner in equipment and space
                rentals—recognized for reliability, safety, and unmatched service
                quality in every sector we serve.
              </p>
            </div>

            <div className="bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-2xl p-8 hover:border-[#c8a35a]/40 transition-all group">
              <div className="w-16 h-16 mb-6 rounded-xl bg-[#c8a35a]/10 flex items-center justify-center group-hover:bg-[#c8a35a]/20 transition-colors">
                <Target className="w-8 h-8 text-[#c8a35a]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To empower construction and industrial projects with
                high-performance equipment and flexible space solutions—delivered
                with speed, safety, and service excellence.
              </p>
            </div>

            <div className="bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-2xl p-8 hover:border-[#c8a35a]/40 transition-all group">
              <div className="w-16 h-16 mb-6 rounded-xl bg-[#c8a35a]/10 flex items-center justify-center group-hover:bg-[#c8a35a]/20 transition-colors">
                <Award className="w-8 h-8 text-[#c8a35a]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Motto</h3>
              <p className="text-gray-400 leading-relaxed">
                Power Delivered. Progress Guaranteed. Every machine we rent. Every
                space we offer. Every promise we make—we stand behind it with
                integrity and commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
