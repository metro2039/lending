import { GhostPost, GhostResponse } from '@/types/ghost';

const GHOST_API_URL = process.env.GHOST_API_URL;
const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY;

/**
 * Получает посты из Ghost CMS для конкретной локали (через теги ru/en).
 * Доступно только на сервере.
 */
export async function getPosts(locale: string): Promise<GhostPost[]> {
  if (!GHOST_API_URL || !GHOST_CONTENT_API_KEY) {
    console.error('Ghost API credentials are missing in environment variables.');
    return [];
  }

  try {
    const response = await fetch(
      `${GHOST_API_URL}/ghost/api/content/posts/?key=${GHOST_CONTENT_API_KEY}&include=tags,authors&filter=tag:${locale}`,
      {
        next: { revalidate: 60 }, // ISR: обновляем кэш раз в минуту
      }
    );

    if (!response.ok) {
      throw new Error(`Ghost API error: ${response.statusText}`);
    }

    const data: GhostResponse<GhostPost> = await response.json();
    
    // Очищаем слаги от префиксов локали (например, ru-post -> post)
    const cleanedPosts = data.posts.map(post => ({
      ...post,
      slug: post.slug.replace(new RegExp(`^${locale}-`), '')
    }));

    return cleanedPosts;
  } catch (error) {
    console.error('Failed to fetch posts from Ghost:', error);
    return [];
  }
}

/**
 * Получает один пост по его slug.
 */
export async function getPostBySlug(slug: string, locale: string = 'ru'): Promise<GhostPost | null> {
  if (!GHOST_API_URL || !GHOST_CONTENT_API_KEY) return null;

  // Добавляем префикс локали для запроса к Ghost (например, post -> ru-post)
  const prefixedSlug = `${locale}-${slug}`;

  try {
    const response = await fetch(
      `${GHOST_API_URL}/ghost/api/content/posts/slug/${prefixedSlug}/?key=${GHOST_CONTENT_API_KEY}&include=tags,authors`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) return null;

    const data: GhostResponse<GhostPost> = await response.json();
    const post = data.posts[0];

    if (post) {
      // Возвращаем пост с очищенным слагом для консистентности на фронтенде
      return {
        ...post,
        slug: post.slug.replace(new RegExp(`^${locale}-`), '')
      };
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch post with slug ${prefixedSlug}:`, error);
    return null;
  }
}
