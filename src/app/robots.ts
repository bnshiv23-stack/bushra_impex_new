import { MetadataRoute } from 'next'

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all common crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/api/pdf/'],
      },
      // Explicitly allow Google
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/api/pdf/'],
      },
      // Explicitly allow Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/api/pdf/'],
      },
      // Allow OpenAI search crawler (AEO)
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/api/', '/api/pdf/'],
      },
      // Allow Perplexity (AEO/GEO)
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/api/pdf/'],
      },
      // Allow Claude / Anthropic
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/', '/api/pdf/'],
      },
    ],
    sitemap: 'https://bushraimpex.com/sitemap.xml',
    host: 'https://bushraimpex.com',
  }
}
