import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["postgres"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/favicon.ico", destination: "/icon.svg", permanent: false },
      { source: "/apple-touch-icon.png", destination: "/icon.svg", permanent: false },
      { source: "/apple-touch-icon-precomposed.png", destination: "/icon.svg", permanent: false },
    ];
  },
};

export default nextConfig;
