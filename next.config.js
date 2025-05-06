/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    serverExternalPackages: ['@react-email/render']
}

module.exports = nextConfig
