import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AntD 5.7 Wave (ripple) efekti React 18 StrictMode'un dev çift-mount'unda
  // "removeChild null" hatası veriyor (bilinen AntD/React 18 dev sorunu).
  // StrictMode prod'da zaten no-op; dev'de kapatınca hata gider, kayıp olmaz.
  reactStrictMode: false,
  transpilePackages: ["@servicecore/ui"],
  experimental: {
    optimizePackageImports: ["antd", "@carbon/icons-react"],
  },
};

export default nextConfig;
