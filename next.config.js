/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "cdn.sanity.io",
      // ...other domains if needed...
    ],
  },
};

module.exports = nextConfig;