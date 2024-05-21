/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://dailymodelapp.com/:path*",
        // destination: "http://198.162.110.42:8080",
      },
    ]
  },
}

module.exports = nextConfig
