"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { SITE_CONFIG } from "@/lib/data"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Build WhatsApp message from form data
    const msg = `Hi, I'm ${formData.name}.\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
    const url = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank")
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="relative pt-32 pb-20 min-h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Contact Hadeed Transport"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a] via-[#0d0d1a]/95 to-[#0d0d1a]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get in touch with our team for equipment and space rental inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#0d0d1a] border border-[#c8a35a]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#c8a35a] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#0d0d1a] border border-[#c8a35a]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#c8a35a] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-[#0d0d1a] border border-[#c8a35a]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#c8a35a] focus:outline-none transition-colors"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-[#0d0d1a] border border-[#c8a35a]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#c8a35a] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full gold-gradient text-[#0d0d1a] py-3.5 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact Info + Map */}
            <div className="space-y-8">
              <div className="bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#c8a35a]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#c8a35a]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-white hover:text-[#c8a35a] transition-colors"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#c8a35a]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#c8a35a]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Phone / WhatsApp</p>
                      <a
                        href={`tel:+${SITE_CONFIG.whatsapp}`}
                        className="text-white hover:text-[#c8a35a] transition-colors"
                      >
                        +971 50 626 6515
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#c8a35a]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#c8a35a]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Location</p>
                      <p className="text-white">{SITE_CONFIG.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29062.06087610218!2d54.48!3d24.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e41c8c4b0dc5b%3A0x6f2c2b9e1a23e0c0!2sICAD%20III%2C%20Abu%20Dhabi!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hadeed Transport Location - ICAD III, Abu Dhabi"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
