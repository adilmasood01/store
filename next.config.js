/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "picsum.photos", "assets.awwwards.com"],
  },
  // Add output configuration for static exports if needed
  output: 'standalone',
  // Enable React strict mode
  reactStrictMode: true,
  // Add webpack configuration
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig; 