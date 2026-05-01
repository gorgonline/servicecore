import { Metadata } from "next";
import { Calendar, GraduationCap, Target, Users, ArrowUpRight, Sparkles } from "lucide-react";
import workshoplarData from "@/data/workshoplar.json";
import AboutHero from "@/components/ui/AboutHero";
import PrivacyContact from "@/components/ui/privacy-contact";

export const metadata: Metadata = {
  title: "Workshoplar | ServiceCore",
  description:
    "ServiceCore atölyeleri ile teknisyenler, süreç sahipleri, adminler ve danışmanlar için uygulamalı servis yönetimi eğitimleri.",
};

type ListSection = {
  title: string;
  items?: string[];
  subgroups?: { label: string; items: string[] }[];
};

const accentPalette = [
  {
    badge: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
    icon: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
    glow: "from-blue-500/20",
  },
  {
    badge: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
    icon: "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20",
    glow: "from-purple-500/20",
  },
  {
    badge: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
    icon: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
    glow: "from-emerald-500/20",
  },
];

export default function WorkshoplarPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) selection:bg-blue-500/30 selection:text-white">
      <AboutHero
        title={workshoplarData.intro.title}
        subtitle={workshoplarData.intro.subtitle}
        description={workshoplarData.intro.description}
      />

      <div className="container mx-auto px-6 lg:px-12 pt-12 pb-24">
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <p className="text-(--color-text-secondary) text-lg md:text-xl leading-relaxed font-light">
            {workshoplarData.intro.lead}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {workshoplarData.workshops.map((workshop, idx) => {
            const accent = accentPalette[idx % accentPalette.length];
            return (
              <article
                key={workshop.id}
                className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/2 p-8 md:p-12 transition-colors hover:border-white/15"
              >
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-linear-to-br ${accent.glow} via-transparent to-transparent blur-3xl`}
                />

                <div className="relative z-10 flex flex-col gap-8">
                  {/* Header */}
                  <header className="flex flex-col gap-6 border-b border-white/5 pb-8 md:flex-row md:items-start md:justify-between md:gap-12">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${accent.badge}`}
                        >
                          <Sparkles className="h-3 w-3" />
                          {workshop.category}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-(--color-text-overline)">
                          {workshop.status}
                        </span>
                      </div>

                      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                        {workshop.title}
                      </h2>

                      <p className="max-w-3xl text-base leading-relaxed font-light text-(--color-text-secondary)">
                        {workshop.description}
                      </p>
                    </div>

                    <a
                      href={workshop.ctaUrl}
                      target={workshop.ctaUrl.startsWith("http") ? "_blank" : undefined}
                      rel={workshop.ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-6 h-12 font-medium text-sm text-white transition-all duration-300 hover:border-white/25 hover:bg-white/10 cursor-pointer"
                    >
                      {workshop.ctaText}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </header>

                  {/* Meta Grid */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <MetaItem
                      icon={<Users className="h-4 w-4" />}
                      label="Hedef Kitle"
                      value={workshop.audience}
                      accent={accent.icon}
                    />
                    <MetaItem
                      icon={<Calendar className="h-4 w-4" />}
                      label="Tarih"
                      value={workshop.dateTime}
                      accent={accent.icon}
                    />
                    <MetaItem
                      icon={<GraduationCap className="h-4 w-4" />}
                      label="Eğitim Metodu"
                      value={workshop.method}
                      accent={accent.icon}
                    />
                    <MetaItem
                      icon={<Target className="h-4 w-4" />}
                      label="Önem"
                      value={workshop.importance}
                      accent={accent.icon}
                    />
                  </div>

                  {/* Goal */}
                  <div className="rounded-2xl border border-white/5 bg-white/2 p-6">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Atölye Hedefi
                    </span>
                    <p className="text-base leading-relaxed font-light text-(--color-text-secondary)">
                      {workshop.goal}
                    </p>
                  </div>

                  {/* Sections */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {(workshop.sections as ListSection[]).map((section) => (
                      <div
                        key={section.title}
                        className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/2 p-6 transition-colors hover:border-white/10"
                      >
                        <h3 className="text-lg font-semibold tracking-tight text-white">
                          {section.title}
                        </h3>

                        {section.items && (
                          <ul className="flex flex-col gap-2.5">
                            {section.items.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-sm leading-relaxed font-light text-(--color-text-secondary)"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--color-text-muted)" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.subgroups && (
                          <div className="flex flex-col gap-5">
                            {section.subgroups.map((group) => (
                              <div key={group.label} className="flex flex-col gap-2.5">
                                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-overline)">
                                  {group.label}
                                </span>
                                <ul className="flex flex-col gap-2.5">
                                  {group.items.map((item) => (
                                    <li
                                      key={item}
                                      className="flex gap-3 text-sm leading-relaxed font-light text-(--color-text-secondary)"
                                    >
                                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--color-text-muted)" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <PrivacyContact />
    </main>
  );
}

function MetaItem({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/2 p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg border ${accent}`}
        >
          {icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
          {label}
        </span>
      </div>
      <p className="text-sm leading-relaxed font-light text-(--color-text-secondary)">
        {value}
      </p>
    </div>
  );
}
