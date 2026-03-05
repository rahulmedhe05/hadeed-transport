"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { faqs as defaultFaqs } from "@/lib/data"

export interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs?: FAQ[]
  title?: string
  subtitle?: string
  className?: string
  showSchema?: boolean
}

export function FAQSection({
  faqs = defaultFaqs,
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our services",
  className,
  showSchema = true,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section className={cn("py-20 bg-[#0f0f1a]", className)}>
      {/* FAQ Schema for Google & AI */}
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#c8a35a]/10 border border-[#c8a35a]/20 rounded-full px-5 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-[#c8a35a]" />
            <span className="text-[#c8a35a] text-sm font-semibold tracking-wider uppercase">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* FAQ Items - Show all 10 */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1a1a2e] border border-[#c8a35a]/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#c8a35a]/30"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#c8a35a]/5 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-white font-medium text-lg pr-4" itemProp="name">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#c8a35a] shrink-0 transition-transform duration-300",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-[400px]" : "max-h-0"
                )}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div 
                  className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-[#c8a35a]/10 pt-4"
                  itemProp="text"
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Compact FAQ section for sidebars or smaller areas
export function CompactFAQSection({
  faqs,
  title = "Quick Answers",
  className,
}: {
  faqs: FAQ[]
  title?: string
  className?: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn("bg-[#1a1a2e] border border-[#c8a35a]/15 rounded-2xl p-6", className)}>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="space-y-2">
        {faqs.slice(0, 5).map((faq, index) => (
          <div key={index} className="border-b border-white/5 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full py-3 flex items-center justify-between text-left"
            >
              <span className="text-gray-300 text-sm pr-2">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[#c8a35a] shrink-0 transition-transform",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>
            {openIndex === index && (
              <div className="pb-3 text-gray-400 text-sm">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
