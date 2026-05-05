import { Metadata } from "next";
import partnerData from "@/data/partner-kayit.json";
import { PartnerKayitForm } from "@/components/ui/partner-kayit-form";

export const metadata: Metadata = {
  title: "Müşteri Adayı Kayıt Formu | ServiceCore",
  description: partnerData.page.description,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function PartnerKayitPage() {
  const { page, intro, sections } = partnerData;

  return (
    <main className="relative min-h-screen bg-(--color-surface-base) pb-32 pt-24 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-125 bg-linear-to-b from-(--color-brand-primary)/10 via-(--color-brand-primary)/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-(--color-brand-accent)/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-(--color-brand-primary)/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 mt-4">
            <span className="w-2 h-2 rounded-full bg-(--color-brand-primary) animate-pulse" />
            <span className="text-xs font-semibold text-(--color-text-overline) tracking-[0.2em] uppercase">
              {page.badge}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-brand-accent)">
              {page.title}
            </span>{" "}
            {page.titleSuffix}
          </h1>

          <p className="text-lg md:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-2xl mx-auto">
            {page.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-6">
            <div className="rounded-3xl bg-white/2 border border-white/5 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-bl from-(--color-brand-primary)/8 to-transparent rounded-bl-full pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-xl font-semibold text-white tracking-tight mb-6">
                  {intro.title}
                </h2>
                <ul className="space-y-5">
                  {intro.items.map((item) => (
                    <li key={item.title}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-1 h-1 rounded-full bg-(--color-brand-accent)" />
                        <span className="text-sm font-semibold text-white">{item.title}</span>
                      </div>
                      <p className="text-xs text-(--color-text-secondary) font-light leading-relaxed pl-3">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl bg-white/2 border border-white/5 p-8">
              <h2 className="text-sm font-semibold text-(--color-text-overline) tracking-[0.2em] uppercase mb-5">
                Form İçeriği
              </h2>
              <ol className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-(--color-text-secondary) hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-(--color-brand-primary)/10 border border-(--color-brand-primary)/30 text-(--color-brand-accent) text-[11px] font-mono font-semibold">
                        {section.icon}
                      </span>
                      <span className="font-medium tracking-tight">{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <PartnerKayitForm />
          </div>
        </div>
      </div>
    </main>
  );
}
