import type { NextConfig } from "next";
import path from "node:path";

const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic && {
    output: "export",
    basePath: "/Robot-Advisor",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
