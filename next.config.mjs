/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  images: {
    unoptimized: true,
  },

  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  turbopack: {},
};

export default nextConfig;
