// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wgififswqofdevtqufad.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.warimas.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
