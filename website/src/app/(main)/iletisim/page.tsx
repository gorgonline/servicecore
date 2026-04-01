import { Metadata } from "next";
import { ContactInfoCards } from "@/components/ui/contact-info-cards";
import { ContactForm } from "@/components/ui/contact-form";
import contactData from "@/data/contact.json";

export const metadata: Metadata = {
  title: "İletişim | ServiceCore",
  description: "Servicecore İletişim Kanalları. Demo, destek, danışman rehberliği ve diğer hizmetler için bize ulaşın.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-(--color-surface-base) pb-32 pt-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-(--color-brand-primary)/10 via-(--color-brand-primary)/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-(--color-brand-accent)/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-(--color-brand-primary)/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 mt-4">
            <span className="w-2 h-2 rounded-full bg-(--color-brand-primary) animate-pulse" />
            <span className="text-xs font-semibold text-(--color-text-overline) tracking-[0.2em] uppercase">Bize Ulaşın</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-brand-primary) to-(--color-brand-accent)">Servicecore</span>{" "}
            Kanalları
          </h1>
          
          <p className="text-lg md:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-2xl mx-auto">
            {contactData.description}
          </p>
        </div>

        {/* Content Section - Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <ContactInfoCards />
            
            {/* Quick Support Links - "Servicecore Destek Sistemine Erişim" */}
            <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 relative overflow-hidden group hover:border-(--color-brand-primary)/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-r from-(--color-brand-primary)/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                  {contactData.supportSystem.title}
                </h3>
                <p className="text-(--color-text-secondary) font-light mb-6 text-sm leading-relaxed">
                  {contactData.supportSystem.description}
                </p>
                <a 
                  href={`https://${contactData.supportSystem.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-(--color-brand-accent) font-medium hover:text-white transition-colors"
                >
                  <span>Müşteri Portalına Git</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ContactForm />
            
            {/* Maps */}
            <div className="grid grid-cols-1 gap-6">
               <div className="rounded-3xl bg-white/[0.02] border border-white/5 h-64 relative overflow-hidden group">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    loading="lazy" 
                    allowFullScreen 
                    src="https://maps.google.com/maps?q=Metropol+Istanbul+A+Blok+Ataşehir+İstanbul&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  ></iframe>
                  {/* Overlay for aesthetic */}
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 bg-(--color-surface-base)/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg pointer-events-none">
                    <span className="text-white text-xs font-semibold tracking-[0.2em]">Merkez Ofisi</span>
                  </div>
               </div>
               
               <div className="rounded-3xl bg-white/[0.02] border border-white/5 h-64 relative overflow-hidden group">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    loading="lazy" 
                    allowFullScreen 
                    src="https://maps.google.com/maps?q=Zaim+Teknopark+Küçükçekmece+İstanbul&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  ></iframe>
                  {/* Overlay for aesthetic */}
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 bg-(--color-surface-base)/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg pointer-events-none">
                    <span className="text-white text-xs font-semibold tracking-[0.2em]">Teknopark Ofisi</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
