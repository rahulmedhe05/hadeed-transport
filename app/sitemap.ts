import type { MetadataRoute } from "next"
import { equipmentCategories, spaceRentals } from "@/lib/data"
import { allCities } from "@/lib/areas"
import { keywordPages } from "@/lib/keyword-pages-data"
import { allRentalPages } from "@/lib/rental-pages-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hadeed-transport.com"
  const currentDate = new Date()

  // Static pages with highest priority
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/equipments`, lastModified: currentDate, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/space-rentals`, lastModified: currentDate, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/about-us`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact-us`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
  ]

  // Equipment category pages
  const equipmentCategoryPages: MetadataRoute.Sitemap = equipmentCategories.map((cat) => ({
    url: `${baseUrl}/equipments/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }))

  // Equipment product pages
  const equipmentProductPages: MetadataRoute.Sitemap = equipmentCategories.flatMap((cat) =>
    cat.products.map((product) => ({
      url: `${baseUrl}/equipments/${cat.slug}/${product.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }))
  )

  // Space rental pages
  const spacePages: MetadataRoute.Sitemap = spaceRentals.map((space) => ({
    url: `${baseUrl}/space-rentals/${space.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }))

  // City pages (Abu Dhabi, Dubai, Sharjah)
  const cityPages: MetadataRoute.Sitemap = allCities.map((city) => ({
    url: `${baseUrl}/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  // Area pages (all areas in all cities)
  const areaPages: MetadataRoute.Sitemap = allCities.flatMap((city) =>
    city.areas.map((area) => ({
      url: `${baseUrl}/${city.slug}/${area.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.75,
    }))
  )

  // Service/keyword pages
  const servicePages: MetadataRoute.Sitemap = keywordPages.map((page) => ({
    url: `${baseUrl}/services/${page.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  // Rental pages (equipment + space rentals by city)
  const rentalPages: MetadataRoute.Sitemap = allRentalPages.map((page) => ({
    url: `${baseUrl}/rent/${page.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.75,
  }))

  return [
    ...staticPages,
    ...equipmentCategoryPages,
    ...equipmentProductPages,
    ...spacePages,
    ...cityPages,
    ...areaPages,
    ...servicePages,
    ...rentalPages,
  ]
}
