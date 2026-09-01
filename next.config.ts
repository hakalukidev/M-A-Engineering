import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Works around an upstream `next dev` bug where concurrent requests for
    // the same image race in the on-disk optimizer cache and throw
    // "LRUCache: calculateSize returned 0" (still present in 16.3.3/canary).
    // Only the dev cache write fails; production optimization is unaffected.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }],
  },
};

export default nextConfig;
