import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import "./globals.css";
import UmamiAnalytics from "@/components/UmamiAnalytics";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://metro2039.ru"),
  title: "Metro 2039 — Новости, утечки и фан-сообщество новой части Metro",
  description: "Главный ресурс по Metro 2039. Присоединяйся к нашему комьюнити!",
  alternates: {
    canonical: "/ru",
  },
  openGraph: {
    title: "Metro 2039 — Фан-сообщество",
    description: "Свежие новости, инсайды и разборы грядущей части Metro. Будь в курсе событий первым!",
    url: "/ru",
    siteName: "Metro 2039 Community",
    images: [
      {
        url: "/avatar.jpg",
        width: 1200,
        height: 630
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metro 2039 — Все новости и утечки",
    description: "Узнай первым подробности новой игры во вселенной Метро.",
    images: ["/avatar.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-unbounded bg-black">
        <UmamiAnalytics />
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
