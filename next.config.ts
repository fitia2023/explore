import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Docker standalone
  output: "standalone",

  // Configuration Prisma
  serverExternalPackages: ["prisma"],

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
