import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AntD 5.7 Wave (ripple) efekti React 18 StrictMode'un dev çift-mount'unda
  // "removeChild null" hatası veriyor (bilinen AntD/React 18 dev sorunu).
  // StrictMode prod'da zaten no-op; dev'de kapatınca hata gider, kayıp olmaz.
  reactStrictMode: false,
  transpilePackages: ["@servicecoreui/ui"],
  experimental: {
    optimizePackageImports: ["antd", "@carbon/icons-react"],
  },
  // CSS Modules pure mode'u kapat: kütüphane kaynak CSS'lerinde portal bileşenler
  // (Message, Notification, Image preview, Modal confirm) bare :global() kullanıyor
  // çünkü AntD bu elemanları body'ye teleport ediyor (scope dışı). Playground'a özgü
  // workaround — dist'te derlenen kütüphane esbuild ile işlenir, bu kural onu etkilemez.
  webpack: (config) => {
    for (const rule of config.module.rules ?? []) {
      for (const oneOf of rule?.oneOf ?? []) {
        const uses = Array.isArray(oneOf.use) ? oneOf.use : oneOf.use ? [oneOf.use] : [];
        for (const use of uses) {
          if (
            typeof use?.loader === "string" &&
            use.loader.includes("css-loader") &&
            use.options?.modules &&
            use.options.modules.mode === "pure"
          ) {
            use.options.modules.mode = "local";
          }
        }
      }
    }
    return config;
  },
};

export default nextConfig;
