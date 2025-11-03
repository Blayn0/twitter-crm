/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NETLIFY: process.env.NETLIFY || 'true'
  }
}

module.exports = nextConfig
