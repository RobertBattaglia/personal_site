/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configure image domains for Contentful and S3
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },

  // Enable webpack configuration for SVG imports
  webpack(config) {
    // SVG imports as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
