/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'thinkdream.in'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
