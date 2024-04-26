/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      { hostname: 'artspacev2.cyclic.app' },
      { hostname: 'res.cloudinary.com' },
    ],
  },
  transpilePackages: ['three'],
}

module.exports = nextConfig
