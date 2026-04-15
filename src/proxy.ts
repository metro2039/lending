import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ru', 'en'];
const defaultLocale = 'ru';

/**
 * Определяет наиболее подходящую локаль на основе заголовков браузера.
 */
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Пример заголовка: "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
  // Извлекаем основные коды языков в порядке приоритета
  const preferredLocales = acceptLanguage
    .split(',')
    .map((lang) => lang.trim().split(';')[0].split('-')[0].toLowerCase());

  for (const lang of preferredLocales) {
    if (locales.includes(lang)) {
      return lang;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Проверяем, есть ли уже локаль в пути (например, /ru/something или /en)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Если локали нет, определяем её и делаем редирект
  const locale = getLocale(request);
  
  // Пример: /my-post -> /ru/my-post
  // Пример: / -> /ru
  const newUrl = new URL(
    `/${locale}${pathname === '/' ? '' : pathname}`,
    request.url
  );

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Исключаем системные пути Next.js и статические файлы (картинки, фавиконки и т.д.)
    '/((?!_next|api|favicon.ico|telegram.svg|.*\\..*).*)',
  ],
};
