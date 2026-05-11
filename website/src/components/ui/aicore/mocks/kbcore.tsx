import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileCheck,
  GitCompare,
  ListChecks,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  type AccentClasses,
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  SectionLabel,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

interface DiffSection {
  label: string;
  status: "kept" | "expanded" | "added";
  detail?: string;
}

const BEFORE: DiffSection[] = [
  { label: "Başlık", status: "kept", detail: "VPN kurulum rehberi" },
  { label: "Belirti", status: "kept", detail: "1 paragraf · kısa" },
  { label: "Çözüm Adımları", status: "kept", detail: "5 madde · sıralı" },
];

const AFTER: DiffSection[] = [
  { label: "Başlık", status: "kept", detail: "VPN kurulum rehberi · Birikim 2026" },
  { label: "Belirti", status: "kept", detail: "1 paragraf · kısa" },
  { label: "Çözüm Adımları", status: "expanded", detail: "5 → 8 madde · ekran görüntüleri" },
  { label: "Sorun Giderme", status: "added", detail: "6 sık karşılaşılan hata" },
  { label: "İlgili Varlıklar", status: "added", detail: "FW-EDGE-03 · AD-CTRL-01" },
  { label: "Atıflar", status: "added", detail: "3 önceki ticket · 1 PMR" },
  { label: "Son Güncelleme", status: "expanded", detail: "2024-01 → bugün" },
];

interface PendingArticle {
  id: string;
  title: string;
  missing: number;
  conformity: number;
  selected?: boolean;
}

const PENDING: PendingArticle[] = [
  { id: "KB-1042", title: "VPN kurulum rehberi", missing: 4, conformity: 38, selected: true },
  { id: "KB-0871", title: "MFA cihaz kaydı sıfırlama", missing: 3, conformity: 52 },
  { id: "KB-0734", title: "E-posta kuyruk drenajı (manuel)", missing: 2, conformity: 64 },
  { id: "KB-0658", title: "Office 365 lisans atama akışı", missing: 5, conformity: 31 },
  { id: "KB-0521", title: "Şube yazıcı ortak kuyruk kurulumu", missing: 2, conformity: 71 },
];

export function KBCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<GitCompare className="w-3.5 h-3.5" />}
          title="KB-1042 · Şablon Uyumlama"
          meta="Birikim · 1.284 makale tarandı"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <AiBadge label="şablona uyumlandı" accent={accent} pulse={false} />
          <Chip tone="warn">4 eksik bölüm</Chip>
          <Chip>Standard Operating Procedure</Chip>
          <span className="ml-auto text-[10px] font-mono text-(--color-text-muted)">
            v2.0 hazır
          </span>
        </div>

        <div className="grid grid-cols-2 divide-x divide-white/8">
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <SectionLabel>Önce</SectionLabel>
              <span className="text-[10px] font-mono text-(--color-text-muted)">
                v1.3 · 2024-01
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-mono text-red-300">
                <AlertCircle className="w-3 h-3" />
                %38 uyum
              </span>
            </div>
            <div className="space-y-1.5">
              {BEFORE.map((s) => (
                <DiffRow key={s.label} section={s} side="before" />
              ))}
              {[
                "Sorun Giderme",
                "İlgili Varlıklar",
                "Atıflar",
                "Son Güncelleme",
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg border border-red-500/22 bg-red-500/8"
                >
                  <span className="shrink-0 inline-flex items-center justify-center w-4 h-4 rounded text-red-300">
                    <AlertCircle className="w-3 h-3" />
                  </span>
                  <span className="text-[11px] text-red-200 line-through">{label}</span>
                  <span className="ml-auto text-[10px] font-mono text-red-300">eksik</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <SectionLabel accent={accent}>Sonra · AI</SectionLabel>
              <span className="text-[10px] font-mono text-(--color-text-muted)">
                v2.0 · taslak
              </span>
              <span className={`ml-auto inline-flex items-center gap-1 text-[10px] font-mono ${accent.text}`}>
                <CheckCircle2 className="w-3 h-3" />
                %96 uyum
              </span>
            </div>
            <div className="space-y-1.5">
              {AFTER.map((s) => (
                <DiffRow key={s.label} section={s} side="after" accent={accent} />
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-white/8 bg-white/2 flex items-center gap-2">
          <button className="text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
            Sadece eksikleri ekle
          </button>
          <button className="text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
            Editörde aç
          </button>
          <button
            className={`ml-auto inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer`}
          >
            <FileCheck className="w-3 h-3" />
            v2.0 yayınla
          </button>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<ListChecks className="w-3.5 h-3.5" />}
            title="Şablon Uyumu · KB Envanteri"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3.5">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-[10px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                  {trUpper("Genel Uyum")}
                </span>
                <span className="text-2xl font-semibold text-white tabular-nums">
                  62<span className="text-sm text-(--color-text-muted)">%</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8 overflow-hidden flex">
                <div className="bg-emerald-400/70" style={{ width: "62%" }} />
                <div className="bg-amber-400/70" style={{ width: "21%" }} />
                <div className="bg-red-400/70" style={{ width: "17%" }} />
              </div>
              <div className="mt-1 flex justify-between text-[9px] font-mono text-(--color-text-muted)">
                <span>uyumlu</span>
                <span>kısmen</span>
                <span>şablon dışı</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <KpiTile label="Uyumlu" value="797" trend="+38 ay" trendTone="up" />
              <KpiTile label="Kısmen" value="271" trend="düzeltilebilir" trendTone="flat" />
              <KpiTile label="Eksik" value="216" trend="öncelikli" trendTone="down" />
            </div>

            <div>
              <SectionLabel>En Sık Eksik Bölümler</SectionLabel>
              <div className="mt-2 space-y-1.5">
                <MissingBar accent={accent} label="İlgili Varlıklar" pct={68} />
                <MissingBar accent={accent} label="Atıflar / Kaynaklar" pct={54} />
                <MissingBar accent={accent} label="Sorun Giderme" pct={47} />
                <MissingBar accent={accent} label="Son Güncelleme" pct={31} />
              </div>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<BookOpen className="w-3.5 h-3.5" />}
            title="Düzenleme Kuyruğu"
            meta="5 / 87"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            {PENDING.map((p) => (
              <div
                key={p.id}
                className={`px-4 py-2.5 flex items-center gap-3 ${p.selected ? "bg-white/5" : ""}`}
              >
                <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0 w-14">
                  {p.id}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-white/85 truncate">{p.title}</div>
                  <div className="text-[10px] font-mono text-(--color-text-muted)">
                    {p.missing} eksik bölüm
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-1.5">
                  <div className="w-12 h-1 rounded-full bg-white/8 overflow-hidden">
                    <div
                      className={`h-full ${
                        p.conformity >= 70 ? "bg-emerald-400" : p.conformity >= 50 ? "bg-amber-400" : "bg-red-400"
                      }`}
                      style={{ width: `${p.conformity}%` }}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-mono tabular-nums w-7 text-right ${
                      p.conformity >= 70 ? "text-emerald-300" : p.conformity >= 50 ? "text-amber-300" : "text-red-300"
                    }`}
                  >
                    %{p.conformity}
                  </span>
                </div>
                <ChevronRight className="w-3 h-3 text-(--color-text-muted) shrink-0" />
              </div>
            ))}
          </div>
          <div className="px-4 py-2.5 border-t border-white/8 bg-white/2 flex items-center gap-2">
            <button
              className={`flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
            >
              <Sparkles className="w-3 h-3" />
              Tüm kuyruğa uygula (87)
            </button>
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface DiffRowProps {
  section: DiffSection;
  side: "before" | "after";
  accent?: AccentClasses;
}

function DiffRow({ section, side, accent }: DiffRowProps) {
  if (side === "before") {
    return (
      <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg border border-white/8 bg-white/3">
        <CheckCircle2 className="w-3 h-3 text-(--color-text-muted) shrink-0" />
        <span className="text-[11px] font-medium text-white/85">{section.label}</span>
        {section.detail && (
          <span className="ml-auto text-[10px] font-mono text-(--color-text-muted) truncate">
            {section.detail}
          </span>
        )}
      </div>
    );
  }

  const tone = section.status;
  const styles = {
    kept: { border: "border-white/8", bg: "bg-white/3", icon: "text-(--color-text-muted)", chip: "" },
    expanded: { border: "border-amber-400/30", bg: "bg-amber-500/8", icon: "text-amber-300", chip: "genişletildi" },
    added: { border: `${accent?.border ?? "border-white/8"}`, bg: `${accent?.bg ?? "bg-white/3"}`, icon: `${accent?.text ?? "text-white"}`, chip: "yeni" },
  }[tone];

  return (
    <div className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border ${styles.border} ${styles.bg}`}>
      {tone === "added" ? (
        <Plus className={`w-3 h-3 shrink-0 ${styles.icon}`} />
      ) : (
        <CheckCircle2 className={`w-3 h-3 shrink-0 ${styles.icon}`} />
      )}
      <span className="text-[11px] font-medium text-white/85">{section.label}</span>
      {styles.chip && (
        <span className={`text-[9px] font-mono tracking-wider ${styles.icon}`}>
          {trUpper(styles.chip)}
        </span>
      )}
      {section.detail && (
        <span className="ml-auto text-[10px] font-mono text-(--color-text-muted) truncate">
          {section.detail}
        </span>
      )}
    </div>
  );
}

function MissingBar({ accent, label, pct }: { accent: AccentClasses; label: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-[11px]">
        <span className="text-white/85">{label}</span>
        <span className="font-mono tabular-nums text-(--color-text-muted)">%{pct}</span>
      </div>
      <div className="h-1 rounded-full bg-white/8 overflow-hidden">
        <div className={`h-full rounded-full ${accent.dot}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
