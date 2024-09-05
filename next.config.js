/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'thinkdream.in','lh3.googleusercontent.com','images.pexels.com','firebasestorage.googleapis.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
