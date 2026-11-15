import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Workspace root'u website klasorune sabitle.
  // Root'taki package.json (linkedin puppeteer scripti icin) Next.js'i yaniltiyordu.
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },

  redirects: async () => [
    {
      source: "/ozellikler",
      destination: "/cozumler/itsm",
      permanent: true,
    },
    // CSM sayfasi yanlislikla "css" slug'i ile yayinlanmisti.
    {
      source: "/planlar-css",
      destination: "/planlar-csm",
      permanent: true,
    },
    // Sayfa ic yazismalarda ve tekliflerde "pm-planlar" olarak aniliyor.
    {
      source: "/pm-planlar",
      destination: "/planlar-pm",
      permanent: true,
    },
  ],

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
    // Musteri logolari sitede gosterilmiyor; dosyalar yalniz teklif sablonlari ve
    // gonderilmis e-postalar icin yerinde duruyor. Arama motorlari listelemesin.
    {
      source: "/logos/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex" }],
    },
    // Teklif sayfalari musteri adayina ozel; referans bolumu de icinde. Arama motorlari listelemesin.
    {
      source: "/teklif/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    },
    {
      source: "/teklif-intertech/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    },
  ],

  poweredByHeader: false,
};

export default nextConfig;
