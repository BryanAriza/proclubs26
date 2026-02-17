/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@proclubs/shared'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
