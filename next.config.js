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
      { hostname: 's3-alpha-sig.figma.com' },
    ],
  },
  transpilePackages: ['three'],
}

module.exports = nextConfig
