import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/ghost';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://metro2039.ru';
const locales = ['ru', 'en'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // 1. Static Routes (Home, Legal, and News)
  for (const locale of locales) {
    // Home Page
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });

    // Legal Page
    routes.push({
      url: `${baseUrl}/${locale}/legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    });

    // News Page (using lang query param as it seems to be the way it's used in src/app/news/page.tsx)
    routes.push({
      url: `${baseUrl}/news${locale === 'en' ? '?lang=en' : ''}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    });
  }

  // 2. Dynamic Post Routes
  for (const locale of locales) {
    const posts = await getPosts(locale);
    
    for (const post of posts) {
      routes.push({
        url: `${baseUrl}/${locale}/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return routes;
}
