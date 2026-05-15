import { Metadata } from "next";
import { ExternalLink, LifeBuoy, PhoneCall, Mail } from "lucide-react";
import { ContactInfoCards } from "@/components/ui/contact-info-cards";
import { ContactForm } from "@/components/ui/contact-form";
import { OfficeShowcase } from "@/components/ui/office-showcase";
import contactData from "@/data/contact.json";

export const metadata: Metadata = {
  title: "İletişim | ServiceCore",
  description: "Servicecore İletişim Kanalları. Demo, destek, danışman rehberliği ve diğer hizmetler için bize ulaşın.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-(--color-surface-base) pb-32 pt-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-125 bg-linear-to-b from-(--color-brand-primary)/10 via-(--color-brand-primary)/5 to-transparent pointer-events-none" />
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
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-brand-accent)">Servicecore</span>{" "}
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
          </div>

          {/* Right Column: Contact Form + Support Portal */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ContactForm />

            {/* Support Portal Card */}
            <div className="rounded-3xl bg-white/2 border border-white/5 p-8 relative overflow-hidden group hover:border-(--color-brand-primary)/30 transition-colors">
              <div className="absolute inset-0 bg-linear-to-br from-(--color-brand-primary)/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-(--color-brand-primary)/10 border border-(--color-brand-primary)/20 flex items-center justify-center text-(--color-brand-accent)">
                    <LifeBuoy className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    {contactData.supportSystem.title}
                  </h3>
                </div>

                <p className="text-(--color-text-secondary) font-light mb-6 text-sm leading-relaxed">
                  {contactData.supportSystem.description}
                </p>

                <a
                  href={`https://${contactData.supportSystem.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-(--color-brand-primary)/10 border border-(--color-brand-primary)/20 text-(--color-brand-accent) hover:bg-(--color-brand-primary)/20 hover:text-white transition-colors font-medium text-sm cursor-pointer"
                >
                  <span>{contactData.supportSystem.url}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Reach Card - Çağrı Merkezi + Destek E-postası */}
            <div className="rounded-3xl bg-white/2 border border-white/5 p-8 relative overflow-hidden group hover:border-(--color-accent-emerald-light)/30 transition-colors">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-(--color-text-overline) tracking-[0.2em] uppercase block mb-5">
                  Hızlı Erişim
                </span>

                <div className="flex flex-col gap-4">
                  <a
                    href="tel:4442673"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 hover:border-(--color-brand-primary)/30 transition-all group/item"
                  >
                    <div className="h-11 w-11 rounded-xl bg-(--color-brand-primary)/10 border border-(--color-brand-primary)/20 flex items-center justify-center text-(--color-brand-accent) shrink-0">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-medium text-(--color-text-muted) mb-0.5">Çağrı Merkezi</span>
                      <span className="text-white font-semibold tracking-tight">
                        {contactData.company.callCenter}
                      </span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${contactData.support.email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 hover:border-(--color-accent-emerald-light)/30 transition-all group/item"
                  >
                    <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light) shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-medium text-(--color-text-muted) mb-0.5">Destek E-postası</span>
                      <span className="text-white font-semibold tracking-tight truncate">
                        {contactData.support.email}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 lg:mt-32">
        <OfficeShowcase
          image="/ofisler/zaim-teknoparkA.jpg"
          alt="ArGe Merkezi — Zaim Teknopark"
          label="ArGe Merkezi"
          address="Zaim Teknopark / Halkalı Cad No:281/23 Ofis No:118 Küçükçekmece/İstanbul"
          phone="444 CORE"
          mapQuery="Zaim Teknopark Küçükçekmece İstanbul"
        />
        <OfficeShowcase
          image="/ofisler/metropol-istanbul.jpg"
          alt="İstanbul Ofisi — Metropol Istanbul"
          label="İstanbul Ofisi"
          address="Metropol Istanbul A Blok 2E Kat: 21 Daire: 331 Ataşehir/İstanbul"
          phone="0216 599 07 72"
          mapQuery="Metropol Istanbul A Blok Ataşehir İstanbul"
          reverse
        />
        <OfficeShowcase
          image="/ofisler/canakkale-ofis.avif"
          alt="Çanakkale Ofisi"
          label="Çanakkale Ofisi"
          address="Hamidiye Mah. Cihangir Sk. No:7/1 Terrace Ay Premium B Blok No:1 Kepez/Çanakkale"
          phone="0286 247 07 41"
          mapQuery="Hamidiye Mah Cihangir Sk Terrace Ay Premium Kepez Çanakkale"
        />
        <OfficeShowcase
          image="/ofisler/ankara-ofis.jpg"
          alt="Ankara Ofisi — Next Level Çankaya"
          label="Ankara Ofisi"
          address="Kızılırmak Mah. Dumlupınar Bulvarı Next Level Kat: 4 Çankaya/Ankara"
          phone=""
          mapQuery="Next Level Kızılırmak Dumlupınar Bulvarı Çankaya Ankara"
          reverse
        />
      </div>
    </main>
  );
}
