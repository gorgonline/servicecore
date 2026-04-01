import { Metadata } from "next";
import { FeaturesGrid } from "@/components/ui/features-grid";

export const metadata: Metadata = {
  title: "Özellikler | ServiceCore",
  description: "ServiceCore ESM platformunun sunduğu tüm özellikler ve modüller. ITIL 4 uyumlu, modern ve esnek servis yönetimi çözümleri.",
};

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen bg-(--color-surface-base) pb-32 pt-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-(--color-brand-primary)/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-(--color-brand-primary) animate-pulse" />
            <span className="text-xs font-semibold text-(--color-text-overline) tracking-[0.2em] uppercase">Kapsamlı Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8">
            İşletmeniz İçin <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-brand-primary) to-(--color-brand-accent)">En İyi</span> Çözümler
          </h1>
          
          <p className="text-lg md:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-2xl mx-auto">
            ServiceCore, karmaşık iş problemlerini çözmek için en iyi yönetim pratiklerini temel alan bir platformdur. Tüm ITSM ve ESM süreçlerinizi tek merkezden yönetmek için ihtiyacınız olan her şey.
          </p>
        </div>

        {/* Features Content Component */}
        <FeaturesGrid />
      </div>
    </main>
  );
}
