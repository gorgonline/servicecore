import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@servicecore/ui"],
  experimental: {
    optimizePackageImports: ["antd", "@carbon/icons-react"],
  },
};

export default nextConfig;
