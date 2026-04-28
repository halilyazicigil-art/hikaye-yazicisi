import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fal.media' },
      { protocol: 'https', hostname: '*.supabase.co' }
    ]
  }
};

export default nextConfig;
