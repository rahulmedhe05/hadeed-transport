"use client"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { SITE_CONFIG } from "@/lib/data"

interface BookingFormProps {
  variant?: "hero" | "sidebar" | "inline"
  className?: string
}

export function BookingForm({ variant = "hero", className = "" }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    equipment: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Build WhatsApp message
    const text = `*New Booking Request*
    
Name: ${formData.name}
Phone: ${formData.phone}
Equipment/Service: ${formData.equipment}
Message: ${formData.message}

Sent from Hadeed Transport Website`

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, "_blank")

    setIsSubmitting(false)
  }

  const baseClasses = {
    hero: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8",
    sidebar: "bg-[#1a1a2e] border border-[#c8a35a]/20 rounded-2xl p-6",
    inline: "bg-[#1a1a2e]/80 backdrop-blur-sm border border-[#c8a35a]/20 rounded-xl p-5",
  }

  const inputClasses = {
    hero: "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-[#c8a35a] transition-colors",
    sidebar: "w-full bg-[#0d0d1a] border border-[#c8a35a]/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c8a35a] transition-colors",
    inline: "w-full bg-[#0d0d1a]/80 border border-[#c8a35a]/20 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c8a35a] transition-colors text-sm",
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${baseClasses[variant]} ${className}`}
    >
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          Get Free Quote
        </h3>
        <p className="text-gray-300 text-sm">
          Fill in your details and we&apos;ll contact you shortly
        </p>
      </div>

      <div className={variant === "inline" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
        <div>
          <input
            type="text"
            placeholder="Your Name *"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses[variant]}
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number *"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClasses[variant]}
          />
        </div>
        <div className={variant === "inline" ? "md:col-span-2" : ""}>
          <select
            value={formData.equipment}
            onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
            className={inputClasses[variant]}
          >
            <option value="">Select Equipment/Service</option>
            <optgroup label="Heavy Equipment">
              <option value="Crane (25-50 Ton)">Crane (25-50 Ton)</option>
              <option value="Excavator / Backhoe">Excavator / Backhoe</option>
              <option value="Forklift">Forklift</option>
              <option value="Shovel">Shovel</option>
              <option value="Bobcat Mini Loader">Bobcat Mini Loader</option>
            </optgroup>
            <optgroup label="Construction Tools">
              <option value="Generator">Generator</option>
              <option value="Compactor / Roller">Compactor / Roller</option>
              <option value="Concrete Equipment">Concrete Equipment</option>
              <option value="Air Compressor">Air Compressor</option>
              <option value="Manlift">Manlift</option>
            </optgroup>
            <optgroup label="Transport">
              <option value="Pickup Truck">Pickup Truck</option>
              <option value="Bus">Bus</option>
              <option value="Water Tanker">Water Tanker</option>
              <option value="Trailer">Trailer</option>
            </optgroup>
            <optgroup label="Space Rentals">
              <option value="Warehouse">Warehouse</option>
              <option value="Office Space">Office Space</option>
              <option value="Open Yard">Open Yard</option>
              <option value="Storage Container">Storage Container</option>
              <option value="Caravan / Porta Cabin">Caravan / Porta Cabin</option>
            </optgroup>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={variant === "inline" ? "md:col-span-2" : ""}>
          <textarea
            placeholder="Your Message (Optional)"
            rows={variant === "inline" ? 2 : 3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={inputClasses[variant]}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 gold-gradient text-[#0d0d1a] px-6 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Request Quote via WhatsApp
          </>
        )}
      </button>

      <p className="text-center text-gray-400 text-xs mt-4">
        By submitting, you agree to be contacted via WhatsApp
      </p>
    </form>
  )
}
