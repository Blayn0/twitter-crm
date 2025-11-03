/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NETLIFY: process.env.NETLIFY || 'true'
  }
}

module.exports = nextConfig
