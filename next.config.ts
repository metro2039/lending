import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
      },
      {
        protocol: 'https',
        hostname: new URL(process.env.GHOST_API_URL || 'https://ghost.metro2039.ru').hostname,
      },
    ],
  },
};

export default nextConfig;
