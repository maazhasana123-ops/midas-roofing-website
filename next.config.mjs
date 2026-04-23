/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: [],
  },
  // @vapi-ai/web and its Daily.co dependency are browser-only CJS packages.
  // transpilePackages ensures Next.js bundles them through its own pipeline
  // instead of trying to require() them server-side, which crashes on build.
  transpilePackages: ['@vapi-ai/web', '@daily-co/daily-js'],
};
export default nextConfig;
