import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProd ? "/vehicle-finder" : "",
  assetPrefix: isProd ? "/vehicle-finder/" : "",
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
