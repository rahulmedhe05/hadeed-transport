import { SITE_CONFIG } from "./data"

// FAQ Generator for unique FAQs across all page types
// Each page gets 10 unique, conversational FAQs optimized for Google, ChatGPT, Gemini

export interface FAQ {
  question: string
  answer: string
}

// Generate equipment-specific FAQs
export function generateEquipmentFAQs(
  equipmentName: string,
  category: string,
  cityName: string = "Abu Dhabi"
): FAQ[] {
  const faqs: FAQ[] = [
    {
      question: `How much does it cost to rent a ${equipmentName} in ${cityName}?`,
      answer: `${equipmentName} rental rates in ${cityName} vary based on duration - daily, weekly, or monthly rentals are available. We offer competitive rates starting from AED 500/day depending on the model and specifications. Contact us at ${SITE_CONFIG.phone} for an instant quote tailored to your project requirements.`
    },
    {
      question: `Do you provide ${equipmentName} with operators?`,
      answer: `Yes, we provide certified and experienced operators with all ${equipmentName} rentals. Our operators are trained, licensed, and familiar with UAE safety regulations. You can choose equipment-only rental or operator-included packages based on your needs.`
    },
    {
      question: `What is the minimum rental period for a ${equipmentName}?`,
      answer: `Our minimum rental period for ${equipmentName} is typically 1 day. However, we offer flexible rental terms including daily, weekly, and monthly rates. Longer rental periods come with significant discounts - ask about our monthly packages for best value.`
    },
    {
      question: `Is delivery included for ${equipmentName} rental?`,
      answer: `Yes, we provide delivery and pickup services across ${cityName} and the UAE. Delivery charges depend on the location and equipment size. For most areas in ${cityName}, we offer same-day or next-day delivery for urgent requirements.`
    },
    {
      question: `What ${equipmentName} models do you have available?`,
      answer: `We maintain a diverse fleet of ${equipmentName} models from leading manufacturers like Caterpillar, Komatsu, JCB, and Volvo. Our inventory includes various capacities and specifications to match different project requirements. All equipment is regularly serviced and well-maintained.`
    },
    {
      question: `Are your ${equipmentName} units well-maintained?`,
      answer: `Absolutely. All our ${equipmentName} units undergo rigorous maintenance schedules and safety inspections before each rental. We follow manufacturer guidelines and UAE safety standards. Each unit comes with proper documentation and certifications.`
    },
    {
      question: `Can I rent a ${equipmentName} for long-term projects?`,
      answer: `Yes, long-term ${equipmentName} rentals are our specialty. We offer attractive monthly and yearly rental packages with significant cost savings. Long-term clients enjoy priority maintenance, dedicated support, and flexible contract terms.`
    },
    {
      question: `What happens if the ${equipmentName} breaks down during rental?`,
      answer: `We provide 24/7 breakdown support for all rented equipment. In case of mechanical issues, our technicians respond within 2-4 hours in ${cityName}. If repairs take longer, we'll arrange a replacement unit to minimize your project downtime.`
    },
    {
      question: `Do you provide ${equipmentName} training for our team?`,
      answer: `Yes, we offer operational training for your team along with equipment rental. Our experts can conduct on-site training sessions covering safe operation, basic maintenance checks, and best practices. This service is available at nominal additional cost.`
    },
    {
      question: `What documentation do I need to rent a ${equipmentName}?`,
      answer: `For ${equipmentName} rental, you'll need: a valid trade license (for companies), Emirates ID or passport copy, site address/project details, and a signed rental agreement. We make the paperwork process quick and hassle-free.`
    }
  ]
  return faqs
}

// Generate space rental FAQs
export function generateSpaceFAQs(
  spaceType: string,
  cityName: string = "Abu Dhabi"
): FAQ[] {
  const faqs: FAQ[] = [
    {
      question: `What sizes of ${spaceType} are available for rent in ${cityName}?`,
      answer: `We offer ${spaceType} in various sizes to suit different needs - from small units starting at 100 sqm to large facilities over 5,000 sqm. Our team can help you find the perfect size based on your storage or operational requirements.`
    },
    {
      question: `What is the minimum lease term for ${spaceType}?`,
      answer: `Our minimum lease terms are flexible - starting from monthly rentals for most ${spaceType} options. We also offer quarterly, yearly, and multi-year contracts with progressive discounts for longer commitments.`
    },
    {
      question: `Is ${spaceType} in ${cityName} secure?`,
      answer: `Yes, security is our priority. All ${spaceType} facilities feature 24/7 CCTV surveillance, controlled access, security personnel, and fire safety systems. We also offer insurance options for added peace of mind.`
    },
    {
      question: `Can I access my ${spaceType} anytime?`,
      answer: `Most of our ${spaceType} facilities offer 24/7 access with proper authorization. Some locations have standard business hours access with extended hours available upon request. We'll customize access schedules to fit your operational needs.`
    },
    {
      question: `What utilities are included in ${spaceType} rental?`,
      answer: `Basic utilities including electricity, water, and maintenance are typically included in the rental rate. Air conditioning, internet, and specialized utilities can be arranged based on the ${spaceType} type and your requirements.`
    },
    {
      question: `How quickly can I move into the ${spaceType}?`,
      answer: `We offer rapid move-in times - often within 24-48 hours after agreement signing. For immediate needs, we maintain ready-to-occupy ${spaceType} units that can be accessed the same day upon documentation completion.`
    },
    {
      question: `Can I modify or customize the ${spaceType}?`,
      answer: `Yes, modifications and customizations are possible subject to approval. We work with tenants to accommodate shelving, partitions, office setups, and other modifications. Any changes are discussed upfront and outlined in the lease agreement.`
    },
    {
      question: `What industries do you serve with ${spaceType}?`,
      answer: `Our ${spaceType} solutions serve diverse industries including logistics, retail, manufacturing, e-commerce, oil & gas, construction, and more. We understand industry-specific requirements and can recommend suitable facilities.`
    },
    {
      question: `Are there any hidden costs for ${spaceType} rental?`,
      answer: `No hidden costs - we believe in transparent pricing. All charges including rent, maintenance fees, and any additional services are clearly outlined in your agreement. What you see in the quote is what you pay.`
    },
    {
      question: `Do you offer ${spaceType} in multiple locations across UAE?`,
      answer: `Yes, we have ${spaceType} facilities across Abu Dhabi, Dubai, and other UAE locations including Mussafah, ICAD, Jebel Ali, and Al Quoz. Our network allows us to find convenient locations close to your operations.`
    }
  ]
  return faqs
}

// Generate city/area specific FAQs
export function generateAreaFAQs(
  areaName: string,
  cityName: string
): FAQ[] {
  const faqs: FAQ[] = [
    {
      question: `What equipment can I rent in ${areaName}, ${cityName}?`,
      answer: `In ${areaName}, we offer a complete range of construction equipment including cranes, forklifts, excavators, boom lifts, generators, and more. We provide fast delivery across ${areaName} and surrounding areas with same-day availability for most equipment.`
    },
    {
      question: `Do you deliver rental equipment to ${areaName}?`,
      answer: `Yes, we provide direct delivery to all locations in ${areaName}, ${cityName}. Our logistics team ensures timely delivery - typically within 24 hours. For urgent projects, we offer same-day delivery options.`
    },
    {
      question: `What are your rental rates for equipment in ${areaName}?`,
      answer: `Our rental rates in ${areaName} are competitive and market-aligned. Rates vary by equipment type and rental duration. Daily rates start from AED 200 for smaller equipment to AED 2,000+ for heavy machinery. Contact us for exact pricing.`
    },
    {
      question: `Is there a rental office near ${areaName}?`,
      answer: `Our main facility is in ICAD III, Abu Dhabi, with coverage across all of ${cityName} including ${areaName}. While we may not have a physical office in ${areaName}, we provide full service including site visits, delivery, and on-site support.`
    },
    {
      question: `What construction projects do you support in ${areaName}?`,
      answer: `We support all types of projects in ${areaName} - from residential construction and commercial developments to infrastructure projects and industrial facilities. Our equipment fleet and rental solutions adapt to any project scale.`
    },
    {
      question: `Can I get emergency equipment rental in ${areaName}?`,
      answer: `Yes, we offer 24/7 emergency equipment rental services for ${areaName}. Call our emergency line at ${SITE_CONFIG.phone} anytime, and we'll arrange equipment delivery as quickly as possible to minimize your project delays.`
    },
    {
      question: `Do you have space rentals available near ${areaName}?`,
      answer: `Yes, we have warehouse, storage, and yard spaces available in and around ${areaName}. Options include short-term storage, long-term warehousing, and open yards for equipment or material storage.`
    },
    {
      question: `What makes Hadeed Transport the best choice in ${areaName}?`,
      answer: `We've been serving ${areaName} and ${cityName} for over 15 years. Our advantages include well-maintained equipment, competitive pricing, certified operators, 24/7 support, and reliable delivery. Our reputation is built on trust and service quality.`
    },
    {
      question: `How do I get a quote for equipment rental in ${areaName}?`,
      answer: `Getting a quote is easy - call us at ${SITE_CONFIG.phone}, WhatsApp us, or fill out our online form. Share your requirements (equipment type, duration, site location in ${areaName}), and we'll provide a detailed quote within hours.`
    },
    {
      question: `Do you provide operators for equipment rentals in ${areaName}?`,
      answer: `Yes, we provide experienced, certified operators for all equipment rentals in ${areaName}. Our operators are familiar with local sites and safety requirements. Operator services can be added to any equipment rental package.`
    }
  ]
  return faqs
}

// Generate service/keyword page FAQs
export function generateServiceFAQs(
  serviceName: string,
  category: string
): FAQ[] {
  const faqs: FAQ[] = [
    {
      question: `What ${serviceName} services do you offer?`,
      answer: `We provide comprehensive ${serviceName} solutions including equipment rental, space solutions, delivery, and full support services. Our offerings cover short-term and long-term needs across Abu Dhabi, Dubai, and the UAE.`
    },
    {
      question: `How can I book ${serviceName} services?`,
      answer: `Booking is simple - contact us via phone at ${SITE_CONFIG.phone}, WhatsApp, or our online form. Tell us your requirements, and we'll confirm availability and provide a quote within hours. Most services can be arranged within 24-48 hours.`
    },
    {
      question: `What areas do you cover for ${serviceName}?`,
      answer: `We provide ${serviceName} across the entire UAE, with primary focus on Abu Dhabi, Dubai, and Sharjah. Our logistics network ensures reliable service delivery to all major industrial areas, business districts, and construction sites.`
    },
    {
      question: `What are the costs for ${serviceName}?`,
      answer: `Pricing for ${serviceName} depends on specific requirements including equipment type, duration, location, and additional services. We offer competitive rates with transparent pricing - no hidden fees. Request a free quote for exact costs.`
    },
    {
      question: `Why should I choose Hadeed Transport for ${serviceName}?`,
      answer: `With 15+ years of experience, we're a trusted name for ${serviceName} in the UAE. Our advantages: well-maintained equipment, professional operators, 24/7 support, competitive pricing, and a commitment to reliability and safety.`
    },
    {
      question: `Is ${serviceName} available on weekends?`,
      answer: `Yes, ${serviceName} is available 7 days a week. We understand that construction and business operations don't stop for weekends. Contact us anytime - our team is ready to support your requirements.`
    },
    {
      question: `Do you offer contracts for ${serviceName}?`,
      answer: `Yes, we offer flexible contract options for ${serviceName} - from daily rentals to multi-year agreements. Long-term contracts include preferential rates, dedicated support, and priority service guarantees.`
    },
    {
      question: `What documentation is required for ${serviceName}?`,
      answer: `Typically, you'll need a valid trade license (for companies), Emirates ID or passport, and project details. Our team guides you through the simple documentation process and can often complete it within the same day.`
    },
    {
      question: `Can ${serviceName} be customized to my needs?`,
      answer: `Absolutely. We understand every project has unique requirements. Whether it's specific equipment specifications, custom scheduling, operator training, or specialized support - we tailor ${serviceName} to match your exact needs.`
    },
    {
      question: `How quickly can you arrange ${serviceName}?`,
      answer: `For most ${serviceName} requests, we can arrange delivery within 24-48 hours. Emergency or urgent requirements can often be fulfilled same-day. Our ready fleet and experienced logistics team ensure rapid response times.`
    }
  ]
  return faqs
}

// Schema generators
export function generateFAQSchema(faqs: FAQ[]) {
  return {
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
}

export function generateLocalBusinessSchema(overrides: Record<string, any> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://hadeed-transport.com/#organization",
    name: SITE_CONFIG.name,
    image: "https://hadeed-transport.com/logo.png",
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ICAD III",
      addressLocality: "Abu Dhabi",
      addressRegion: "Abu Dhabi",
      postalCode: "",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.35,
      longitude: 54.48,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      "https://www.facebook.com/hadeedtransport",
      "https://www.instagram.com/hadeedtransport",
      "https://www.linkedin.com/company/hadeedtransport",
    ],
    priceRange: "$$",
    ...overrides,
  }
}

export function generateServiceSchema(
  serviceName: string,
  description: string,
  areaServed: string[] = ["Abu Dhabi", "Dubai", "Sharjah"]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
      url: SITE_CONFIG.url,
    },
    areaServed: areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${serviceName} Options`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Daily ${serviceName}`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Weekly ${serviceName}`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Monthly ${serviceName}`,
          },
        },
      ],
    },
  }
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateProductSchema(
  productName: string,
  description: string,
  image: string,
  category: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: description,
    image: image,
    category: category,
    brand: {
      "@type": "Brand",
      name: "Hadeed Transport",
    },
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "AED",
      lowPrice: "500",
      highPrice: "5000",
      offerCount: "3",
      seller: {
        "@type": "Organization",
        name: "Hadeed Transport",
      },
    },
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hadeed-transport.com/#organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: "https://hadeed-transport.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "customer service",
      availableLanguage: ["English", "Arabic", "Hindi", "Urdu"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "ICAD III",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
    sameAs: [
      "https://www.facebook.com/hadeedtransport",
      "https://www.instagram.com/hadeedtransport",
      "https://www.linkedin.com/company/hadeedtransport",
    ],
  }
}
