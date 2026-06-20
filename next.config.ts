import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qwnico3o3r.ufs.sh',
        port: '',
        pathname: '/f/**',
      },
    ],
  },
};

export default nextConfig;
