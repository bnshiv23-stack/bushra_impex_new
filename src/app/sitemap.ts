import { MetadataRoute } from 'next'
import { CATEGORIES, PRODUCTS } from '@/data/products'

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bushraimpex.com'
  const now = new Date()

  // Core static pages — priority ordered per AEO/GEO master spec
  const staticPages = [
    { route: '',                   priority: 1.0,  freq: 'weekly'  },
    { route: '/products',          priority: 0.95, freq: 'weekly'  },
    { route: '/about',             priority: 0.85, freq: 'monthly' },
    { route: '/dealer',            priority: 0.85, freq: 'monthly' },
    { route: '/contact',           priority: 0.80, freq: 'monthly' },
    { route: '/company-overview',  priority: 0.75, freq: 'monthly' },
    { route: '/compare',           priority: 0.65, freq: 'monthly' },
    { route: '/privacy',           priority: 0.30, freq: 'yearly'  },
    { route: '/terms',             priority: 0.30, freq: 'yearly'  },
  ].map(({ route, priority, freq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: freq as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority,
  }))

  // Category pages — high priority (category = discovery pages)
  const categoryPages = CATEGORIES.map((category) => ({
    url: `${baseUrl}/products/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.90,
  }))

  // Individual product pages — each is a canonical entity page
  const productPages = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.category}/${product.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...categoryPages, ...productPages]
}
