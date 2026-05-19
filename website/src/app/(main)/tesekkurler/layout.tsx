import type { Metadata } from "next";

/**
 * Tesekkurler sayfasi — form gonderim sonrasi redirect hedefi.
 * Metadata burada inline tanimli cunku `pageMetadata("tesekkurler")` robots ek alanini desteklemiyor;
 * arama motorlarinin bu URL'i indekslememesi icin noindex/nofollow zorunlu.
 */
export const metadata: Metadata = {
  title: "Teşekkürler | ServiceCore",
  description:
    "Talebiniz alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
