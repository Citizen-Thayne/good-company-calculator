/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wiki.goodcompanygame.com',
      },
    ],
  },
}

export default nextConfig
