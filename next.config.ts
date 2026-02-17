import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Allow access from network IP
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
}

export default nextConfig
