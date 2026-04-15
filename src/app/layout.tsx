import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Metro 2039 — Фан-сообщество",
  description: "Сайт фанатского сообщества Metro 2039. Находимся в разработке.",
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
        <GoogleAnalytics />
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
