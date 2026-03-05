"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { BookingForm } from "./booking-form"
import { SITE_CONFIG } from "@/lib/data"

// High-quality stock images for construction/equipment rental
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
    title: "Heavy Equipment Rental",
    subtitle: "Cranes, Excavators & Construction Machinery",
    description: "Professional-grade equipment for projects of any scale across the UAE",
  },
  {
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop",
    title: "Construction Tools & Generators",
    subtitle: "Power Your Project Forward",
    description: "Reliable generators, compactors, and construction tools available for rent",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
    title: "Warehouse & Storage Solutions",
    subtitle: "Secure Space for Your Business",
    description: "Warehouses, open yards, and self-storage units in Abu Dhabi",
  },
  {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    title: "Transport & Logistics Fleet",
    subtitle: "Move It All With Hadeed",
    description: "Pickup trucks, buses, tankers, and trailers for all your transport needs",
  },
  {
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop",
    title: "Aerial Work Platforms",
    subtitle: "Safe Access at Any Height",
    description: "Manlifts, scissor lifts, and scaffolding for maintenance and construction",
  },
]

interface HeroSliderProps {
  showForm?: boolean
  customSlides?: typeof heroSlides
}

export function HeroSlider({ showForm = true, customSlides }: HeroSliderProps) {
  const slides = customSlides || heroSlides
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, slides.length])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, slides.length])

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a]/95 via-[#0d0d1a]/80 to-[#0d0d1a]/60" />
        </div>
      ))}

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#c8a35a]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#c8a35a]/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className={`grid ${showForm ? "lg:grid-cols-2 gap-12" : "grid-cols-1"} items-center`}>
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6">
              <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase border border-[#c8a35a]/30 px-6 py-2 rounded-full">
                {SITE_CONFIG.tagline}
              </span>
            </div>

            {/* Animated slide content */}
            <div className="relative min-h-[280px] md:min-h-[240px]">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 absolute inset-0"
                  }`}
                >
                  <span className="text-[#c8a35a] text-lg font-medium mb-2 block">
                    {slide.subtitle}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mt-8">
              <Link
                href="/equipments"
                className="gold-gradient text-[#0d0d1a] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Browse Equipment <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/space-rentals"
                className="border-2 border-[#c8a35a] text-[#c8a35a] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c8a35a]/10 transition-colors flex items-center gap-2"
              >
                Explore Spaces <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-4 mt-10 lg:justify-start justify-center">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-[#c8a35a]/30 flex items-center justify-center text-[#c8a35a] hover:bg-[#c8a35a]/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-[#c8a35a]"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-[#c8a35a]/30 flex items-center justify-center text-[#c8a35a] hover:bg-[#c8a35a]/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right: Booking form */}
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
