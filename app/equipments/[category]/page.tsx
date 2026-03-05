import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { PageHero } from "@/components/page-hero"
import { ProductCard } from "@/components/product-card"
import { equipmentCategories, SITE_CONFIG } from "@/lib/data"

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return equipmentCategories.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const category = equipmentCategories.find((c) => c.slug === slug)
  if (!category) return {}
  return {
    title: `${category.name} for Rent in Abu Dhabi | Hadeed Transport`,
    description: `${category.subtitle}. Rent ${category.name.toLowerCase()} in Abu Dhabi & UAE. Well-maintained fleet, certified operators, fast delivery.`,
    openGraph: {
      title: `${category.name} for Rent | Hadeed Transport`,
      description: category.subtitle,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params
  const category = equipmentCategories.find((c) => c.slug === slug)
  if (!category) notFound()

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageHero 
        title={category.name} 
        subtitle={category.subtitle} 
        imageSlug={category.slug}
        showForm={true}
      />

      <section className="py-24 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#c8a35a] text-sm font-semibold tracking-[0.3em] uppercase">
              LET&apos;S CHOOSE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
              Select Your Preferred Equipment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                categorySlug={category.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {category.ctaTitle}
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            {category.ctaDescription}
          </p>
          <a
            href={SITE_CONFIG.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block gold-gradient text-[#0d0d1a] px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Get Quote!
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
