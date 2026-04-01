import { Metadata } from "next";
import privacyData from "@/data/privacy-policy.json";
import AboutHero from "@/components/ui/AboutHero";
import PrivacyContact from "@/components/ui/privacy-contact";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | ServiceCore",
  description: "Servicecore Gizlilik Politikası ve KVKK Metni",
};

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base)">
      <AboutHero 
        title={privacyData.title}
        subtitle="HUKUKİ METİNLER"
        description="Verilerinizin güvenliği ve gizliliği bizim için en üst önceliktir."
      />
      
      <div className="container mx-auto px-6 lg:px-12 py-24 max-w-4xl">
        <div className="max-w-none">
          <p className="text-(--color-text-secondary) text-lg lg:text-xl leading-relaxed mb-16 italic font-light">
            {privacyData.intro}
          </p>
          
          <div className="space-y-24">
            {privacyData.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-8 w-1 bg-(--color-accent-blue-base) rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {section.title}
                  </h2>
                </div>
                
                <div className="text-(--color-text-overline) leading-relaxed text-lg space-y-6 font-light">
                  {section.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {section.purposes && (
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.purposes.map((purpose, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-blue-500/30 transition-all">
                        <div className="h-2 w-2 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <span className="text-(--color-text-overline) text-sm md:text-base">{purpose}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {section.rights && (
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.rights.map((right, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <p className="text-(--color-text-overline) font-medium">{right}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contact Section at bottom */}
      <PrivacyContact />
    </main>
  );
}
