"use client"

import { CheckCircle } from "lucide-react"
import { BookingForm } from "./booking-form"

// Stock images for different page categories
const heroImages: Record<string, string> = {
  // Equipment categories
  equipment: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
  "transportation-construction-machineries": "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop",
  "construction-small-tools": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
  
  // Space rentals
  "space-rentals": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  warehouses: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop",
  "office-spaces": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  "self-storage": "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop",
  "open-yards": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  caravans: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
  "mobile-toilets": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2070&auto=format&fit=crop",
  "storage-containers-for-rent": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop",
  
  // Cities
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
  "abu-dhabi": "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=2070&auto=format&fit=crop",
  sharjah: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?q=80&w=2070&auto=format&fit=crop",
  
  // Equipment types
  crane: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
  excavator: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop",
  forklift: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
  generator: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop",
  manlift: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop",
  roller: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  compactor: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  tanker: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2072&auto=format&fit=crop",
  bus: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop",
  pickup: "https://images.unsplash.com/photo-1558618047-f4b511f7e758?q=80&w=2070&auto=format&fit=crop",
  trailer: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
  scaffolding: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
  concrete: "https://images.unsplash.com/photo-1518563077661-532347cf5b22?q=80&w=2070&auto=format&fit=crop",
  
  // Default
  default: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
}

function getHeroImage(slug: string): string {
  // Try exact match first
  if (heroImages[slug]) return heroImages[slug]
  
  // Try partial match
  const slugLower = slug.toLowerCase()
  for (const [key, value] of Object.entries(heroImages)) {
    if (slugLower.includes(key) || key.includes(slugLower)) {
      return value
    }
  }
  
  return heroImages.default
}

interface PageHeroProps {
  title: string
  subtitle: string
  badges?: string[]
  showForm?: boolean
  imageSlug?: string
  customImage?: string
  variant?: "default" | "compact" | "full"
}

export function PageHero({
  title,
  subtitle,
  badges,
  showForm = true,
  imageSlug,
  customImage,
  variant = "default",
}: PageHeroProps) {
  const defaultBadges = [
    "Well-maintained equipment",
    "Short & long-term rental",
    "Fast delivery & support",
    "Certified operators available",
  ]

  const displayBadges = badges || defaultBadges
  const backgroundImage = customImage || getHeroImage(imageSlug || "default")

  if (variant === "compact") {
    return (
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a]/95 via-[#0d0d1a]/85 to-[#0d0d1a]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              {displayBadges.slice(0, 3).map((badge) => (
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
        </div>
      </section>
    )
  }

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a]/95 via-[#0d0d1a]/80 to-[#0d0d1a]/60" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#c8a35a]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#c8a35a]/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className={`grid ${showForm ? "lg:grid-cols-2 gap-12" : "grid-cols-1 text-center"} items-center`}>
          {/* Text content */}
          <div className={showForm ? "" : "max-w-4xl mx-auto"}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {subtitle}
            </p>
            <div className={`flex flex-wrap ${showForm ? "" : "justify-center"} gap-4 mb-8`}>
              {displayBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 bg-[#1a1a2e]/80 backdrop-blur-sm border border-[#c8a35a]/20 rounded-full px-5 py-2.5 text-sm text-gray-300"
                >
                  <CheckCircle className="w-4 h-4 text-[#c8a35a]" />
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Booking form */}
          {showForm && (
            <div className="lg:pl-8">
              <BookingForm variant="hero" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
