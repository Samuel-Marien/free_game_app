/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.freetogame.com'
      },
      {
        protocol: 'https',
        hostname: 'api.igdb.com'
      }
    ]
  }
}

module.exports = nextConfig
