import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "94368076bdefa7a40a2484a1473f1006.r2.cloudflarestorage.com",
      },
    ],
  },
};

export default nextConfig;
