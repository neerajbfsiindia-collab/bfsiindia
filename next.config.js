const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/query\d\.finance\.yahoo\.com\/.*/i,
      handler: "StaleWhileRevalidate",
      options: { cacheName: "market-data", expiration: { maxAgeSeconds: 60 } },
    },
    {
      urlPattern: /\/api\/news.*/i,
      handler: "NetworkFirst",
      options: { cacheName: "news-feed", expiration: { maxAgeSeconds: 300 } },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
