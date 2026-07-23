import {
  CheckCircle2,
  FileCheck,
  Filter,
  ScanEye,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  Sparkline,
  TitleBar,
  resolveAccent,
  trUpper,
} from "@/components/ui/aicore/primitives";

// AICORE kurulum hizmet sayfalarının (Launch Ready / Cloud Ready) ortak
// görsel panelleri. Sahnelerde sentetik veri kullanılır.

/* ── Kurulum zaman çizelgesi ─────────────────────────────────────────── */

export interface TimelineItem {
  donem: string;
  baslik: string;
  detay: string;
  current?: boolean;
}

export function KurulumTimeline({
  accent: accentName,
  title,
  meta,
  items,
}: {
  accent: string;
  title: string;
  meta: string;
  items: TimelineItem[];
}) {
  const accent = resolveAccent(accentName);
  return (
    <MockFrame className={accent.glow}>
      <TitleBar icon={<Waypoints className="w-3.5 h-3.5" />} title={title} meta={meta} accent={accent} />
      <div className="relative px-5 py-4">
        <div className="absolute top-4 bottom-4 left-[4.5rem] w-px bg-white/12" />
        <div className="space-y-3.5">
          {items.map((s) => (
            <div key={s.donem + s.baslik} className="relative flex items-start gap-3">
              <div className="w-14 text-[10px] font-mono text-(--color-text-muted) shrink-0 pt-1.5 text-right">
                {trUpper(s.donem)}
              </div>
              <div className="relative shrink-0 pt-1">
                <span
                  className={`relative z-10 block w-3 h-3 rounded-full border-2 ${
                    s.current ? `${accent.dot} border-transparent` : "bg-(--color-surface-base) border-white/30"
                  }`}
                />
                {s.current && (
                  <span className={`absolute top-1 left-0 w-3 h-3 rounded-full ${accent.dot} opacity-40 animate-ping`} />
                )}
              </div>
              <div
                className={`flex-1 rounded-lg border ${
                  s.current ? `${accent.border} ${accent.bg}` : "border-white/8 bg-white/2"
                } px-3 py-2`}
              >
                <div className="text-xs text-white/90 font-medium">{s.baslik}</div>
                <div className="text-[11px] text-(--color-text-muted)">{s.detay}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockFrame>
  );
}

/* ── Kalibrasyon paneli ──────────────────────────────────────────────── */

export function KalibrasyonMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  return (
    <MockFrame className={accent.glow}>
      <TitleBar
        icon={<Filter className="w-3.5 h-3.5" />}
        title="Kalibrasyon · Kuruma Özel Ayar"
        meta="kurumun kendi kayıtlarıyla"
        accent={accent}
      />
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <AiBadge label="karar ayarları ölçülüyor" accent={accent} />
          <Chip tone="info">100 örnek kayıt</Chip>
        </div>
        <div className="rounded-xl border border-white/8 bg-white/2 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-semibold tracking-[0.18em] text-(--color-text-muted)">
              {trUpper("Benzerlik skoru dağılımı")}
            </span>
            <span className="text-[10px] font-mono text-(--color-text-muted)">eşik adayı: 0.55 · 0.70</span>
          </div>
          <Sparkline
            values={[8, 22, 34, 26, 12, 5, 3, 4, 9, 21, 33, 28, 14]}
            accent={accent}
            width={520}
            height={56}
            showThreshold={18}
          />
          <div className="mt-3 flex h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-white/25" style={{ width: "40%" }} />
            <div className="h-full bg-amber-400/70" style={{ width: "22%" }} />
            <div className={`h-full ${accent.dot}`} style={{ width: "38%" }} />
          </div>
          <div className="mt-1.5 flex items-center gap-4 text-[9px] font-mono text-(--color-text-muted)">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" /> dürüstçe sus
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> uzmana devret
            </span>
            <span className="inline-flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} /> kaynaklı öneri ver
            </span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-start gap-2 rounded-lg border border-white/8 bg-white/2 px-3 py-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
            <span className="text-[11px] text-white/85 leading-snug">
              Karar eşikleri kurumun skor dağılımından ölçüldü — hazır değer devralınmadı.
            </span>
          </div>
          <div className="flex items-start gap-2 rounded-lg border border-white/8 bg-white/2 px-3 py-2">
            <FileCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
            <span className="text-[11px] text-white/85 leading-snug">
              Doğrulama seti donduruldu — her güncellemede davranış bu setle otomatik denetlenir.
            </span>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

/* ── Maskeleme paneli (Cloud Ready) ──────────────────────────────────── */

function MaskeToken({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex px-1 rounded bg-amber-500/15 border border-amber-400/30 text-amber-200">
      {children}
    </span>
  );
}

function GizliToken({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex px-1 rounded bg-emerald-500/12 border border-emerald-400/30 text-emerald-200 font-mono text-[10px]">
      {children}
    </span>
  );
}

export function MaskelemeMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  return (
    <MockFrame className={accent.glow}>
      <TitleBar
        icon={<ScanEye className="w-3.5 h-3.5" />}
        title="Maskeleme Katmanı · Canlı Önizleme"
        meta="buluta gitmeden önce"
        accent={accent}
      />
      <div className="px-5 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/8 bg-white/2 p-4">
            <div className="text-[10px] font-mono font-semibold tracking-[0.18em] text-(--color-text-muted) mb-2">
              {trUpper("Kayıttaki hali (kurumda kalır)")}
            </div>
            <p className="text-[12px] text-white/85 leading-relaxed">
              <MaskeToken>Ayşe Demir</MaskeToken> VPN&apos;e bağlanamıyor;{" "}
              <MaskeToken>ayse.demir@kurum.com</MaskeToken> adresine sıfırlama gitti,
              ulaşmadı. Tel: <MaskeToken>0532 000 00 00</MaskeToken>. Hata: AUTH-417.
            </p>
          </div>
          <div className={`rounded-xl border ${accent.border} ${accent.bg} p-4`}>
            <div className={`text-[10px] font-mono font-semibold tracking-[0.18em] ${accent.text} mb-2`}>
              {trUpper("Buluta giden hali")}
            </div>
            <p className="text-[12px] text-white/85 leading-relaxed">
              <GizliToken>[AD-1]</GizliToken> VPN&apos;e bağlanamıyor;{" "}
              <GizliToken>[EPOSTA-1]</GizliToken> adresine sıfırlama gitti, ulaşmadı.
              Tel: <GizliToken>[TELEFON-1]</GizliToken>. Hata: AUTH-417.
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Chip tone="success">3 alan maskelendi</Chip>
          <Chip tone="info">eşleme kurumda kalır</Chip>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
            <ShieldCheck className="w-3 h-3" />
            maskeleme kaydı #4812 — denetimde &quot;ne dışarı çıktı?&quot; cevabı bu kayıtta
          </span>
        </div>
      </div>
    </MockFrame>
  );
}

/* ── Teslimat / canlıya alış panosu ──────────────────────────────────── */

export interface PanoSatir {
  text: string;
  durum: "tamam" | "aktif";
}

export function TeslimatPanosu({
  accent: accentName,
  title,
  meta,
  items,
  kpis,
}: {
  accent: string;
  title: string;
  meta: string;
  items: PanoSatir[];
  kpis: { label: string; value: string; trend?: string }[];
}) {
  const accent = resolveAccent(accentName);
  return (
    <MockFrame className={accent.glow}>
      <TitleBar icon={<FileCheck className="w-3.5 h-3.5" />} title={title} meta={meta} accent={accent} />
      <div className="px-5 py-4">
        <div className="space-y-2">
          {items.map((s) => (
            <div
              key={s.text}
              className={`flex items-start gap-2.5 rounded-lg border px-3 py-2 ${
                s.durum === "aktif" ? `${accent.border} ${accent.bg}` : "border-white/8 bg-white/2"
              }`}
            >
              {s.durum === "tamam" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
              ) : (
                <span className="relative shrink-0 mt-1">
                  <span className={`block w-3 h-3 rounded-full ${accent.dot}`} />
                  <span className={`absolute inset-0 rounded-full ${accent.dot} opacity-40 animate-ping`} />
                </span>
              )}
              <span className="text-[12px] text-white/90 leading-snug">{s.text}</span>
              {s.durum === "aktif" && (
                <span className={`ml-auto text-[10px] font-mono font-semibold ${accent.text} shrink-0`}>
                  {trUpper("devam ediyor")}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {kpis.map((k) => (
            <KpiTile key={k.label} label={k.label} value={k.value} trend={k.trend} trendTone="up" />
          ))}
        </div>
      </div>
    </MockFrame>
  );
}
