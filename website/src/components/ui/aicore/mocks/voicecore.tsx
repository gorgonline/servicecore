import {
  AudioLines,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Mic,
  Package,
  Smartphone,
  Sparkles,
  Tag,
  Target,
  TriangleAlert,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
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

const WAVEFORM = [
  3, 5, 7, 12, 14, 9, 6, 8, 11, 18, 22, 15, 9, 12, 17, 24, 28, 19, 14, 11, 16, 23, 27, 21, 14, 9,
  12, 18, 22, 17, 11, 8, 13, 19, 23, 17, 12, 8, 6, 4,
];

interface FieldSlot {
  icon: ReactNode;
  label: string;
  value: string;
  detail?: string;
  status: "filled" | "missing";
}

const FIELDS: FieldSlot[] = [
  {
    icon: <Tag className="w-3 h-3" />,
    label: "Kategori",
    value: "Saha · El Terminali",
    detail: "AICore: ClassifyCore eşleşti %96",
    status: "filled",
  },
  {
    icon: <Package className="w-3 h-3" />,
    label: "Varlık",
    value: "3 × HHT-VNT-04 / 05 / 09",
    detail: "Vento · Depo 4 envanteri",
    status: "filled",
  },
  {
    icon: <MapPin className="w-3 h-3" />,
    label: "Lokasyon",
    value: "Soğuk hava deposu · raf 12-A",
    status: "filled",
  },
  {
    icon: <Target className="w-3 h-3" />,
    label: "Öncelik",
    value: "P2 · Acil",
    detail: "Sürücü etiket okuma akışı durdu",
    status: "filled",
  },
  {
    icon: <TriangleAlert className="w-3 h-3" />,
    label: "Etki",
    value: "Sevkiyat kuyruğu · 14 araç",
    detail: "Operasyon riski yüksek",
    status: "filled",
  },
  {
    icon: <User className="w-3 h-3" />,
    label: "Açan",
    value: "Burak Aslan",
    detail: "Saha Mühendisi · Vento",
    status: "filled",
  },
];

export function VoiceCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Smartphone className="w-3.5 h-3.5" />}
          title="Mobil · Sesli Komut"
          meta="Vento · sahada"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-red-400/55 bg-red-500/22 text-[10px] font-mono font-semibold text-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {trUpper("kaydediliyor")}
          </span>
          <span className="text-[11px] font-mono text-white tabular-nums">4.8s</span>
          <AiBadge label="canlı transcript" accent={accent} />
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
            <Mic className="w-3 h-3" />
            EarPiece-VNT-08
          </span>
        </div>

        <div className="px-5 py-5 space-y-5">
          <div className="rounded-2xl border border-white/8 bg-white/2 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
                {trUpper("Ses Dalgası · Canlı")}
              </span>
              <Chip>{trUpper("16 kHz")}</Chip>
            </div>
            <div className="h-16 flex items-center justify-between gap-px">
              {WAVEFORM.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${
                    i === WAVEFORM.length - 1 ? "bg-red-400 animate-pulse" : accent.dot
                  }`}
                  style={{ height: `${Math.max(h * 1.6, 4)}%`, opacity: 0.35 + h / 50 }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[9px] font-mono text-(--color-text-muted)">
              <span>0.0s</span>
              <span>2.0s</span>
              <span className={accent.text}>4.8s · şimdi</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
                {trUpper("Canlı Transcript · Türkçe")}
              </span>
              <span className="text-[9px] font-mono text-(--color-text-muted)">
                anlam %94
              </span>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/2 px-4 py-3.5">
              <p className="text-sm text-white/90 leading-relaxed">
                &ldquo;Vento depodaki{" "}
                <Highlight accent={accent}>el terminallerinden 3 tanesi</Highlight>{" "}
                açılmıyor, <Highlight accent={accent}>soğuk hava deposu rafı 12-A</Highlight>.{" "}
                <Highlight accent={accent}>Acil</Highlight> — sürücüler etiket okuyamıyor,
                sevkiyat kuyruğu birikiyor. <Highlight accent={accent}>Burak Aslan</Highlight>,
                depo 4.&rdquo;
                <span className={`inline-block w-1 h-4 ${accent.dot} ml-1 align-middle animate-pulse`} />
              </p>
            </div>
          </div>

          <div>
            <span className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
              {trUpper("Algılanan Niyet")}
            </span>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${accent.border} ${accent.bg} ${accent.text} text-xs font-mono font-semibold`}
              >
                <Sparkles className="w-3 h-3" />
                Yeni Olay Aç
              </span>
              <span className="text-[10px] font-mono text-(--color-text-muted)">
                güven %98 · 6 alan çıkarıldı
              </span>
            </div>
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Yapılandırılmış Kayıt"
            meta="taslak · INC-7138"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            {FIELDS.map((f) => (
              <FieldRow key={f.label} field={f} accent={accent} />
            ))}
          </div>

          <div className="border-t border-white/8 px-5 py-3.5 bg-white/2">
            <div className="flex items-start gap-2 mb-3">
              <HelpCircle className={`w-3.5 h-3.5 ${accent.text} shrink-0 mt-0.5`} />
              <div className="flex-1 text-[11px] text-white/85 leading-snug">
                <span className="font-medium">Doğrulama: </span>
                Cihazlar duvardaki şarj istasyonunda mıydı, kabloya bağlı mıydı? — kullanıcıya
                tek soru.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
                Düzelt
              </button>
              <button
                className={`flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
              >
                <CheckCircle2 className="w-3 h-3" />
                Onayla &amp; Aç
              </button>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<AudioLines className="w-3.5 h-3.5" />}
            title="Komut Türü Dağılımı"
            meta="bu ay"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            <CommandTypeBar accent={accent} label="Yeni Olay Aç" pct={48} count={1247} />
            <CommandTypeBar accent={accent} label="Durum Sorgula" pct={28} count={728} />
            <CommandTypeBar accent={accent} label="Atamayı Değiştir" pct={14} count={364} />
            <CommandTypeBar accent={accent} label="Yorum / Güncelle" pct={10} count={261} />
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<AudioLines className="w-3.5 h-3.5" />} title="Bu Çeyrek · Voice" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Komut" value="2.600" trend="+%34" trendTone="up" />
            <KpiTile label="Anlam" value="94%" trend="ortalama" trendTone="flat" />
            <KpiTile label="Saha Süre" value="−68%" trend="form yerine" trendTone="down" />
            <KpiTile label="Doğrulama" value="0.6" trend="ortalama soru" trendTone="flat" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface HighlightProps {
  accent: AccentClasses;
  children: ReactNode;
}

function Highlight({ accent, children }: HighlightProps) {
  return (
    <span className={`${accent.bg} ${accent.text} rounded px-1 border-b ${accent.border}`}>
      {children}
    </span>
  );
}

interface FieldRowProps {
  field: FieldSlot;
  accent: AccentClasses;
}

function FieldRow({ field, accent }: FieldRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md ${accent.bg} ${accent.text} mt-0.5`}>
        {field.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <SectionLabel>{field.label}</SectionLabel>
          {field.status === "filled" ? (
            <CheckCircle2 className={`w-3 h-3 ${accent.text}`} />
          ) : (
            <span className="text-[9px] font-mono text-amber-300">eksik</span>
          )}
        </div>
        <div className="text-xs text-white/90 mt-0.5">{field.value}</div>
        {field.detail && (
          <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5">
            {field.detail}
          </div>
        )}
      </div>
    </div>
  );
}

interface CommandTypeBarProps {
  accent: AccentClasses;
  label: string;
  pct: number;
  count: number;
}

function CommandTypeBar({ accent, label, pct, count }: CommandTypeBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-[11px]">
        <span className="text-white/85">{label}</span>
        <div className="flex items-baseline gap-2 text-[10px] font-mono">
          <span className="tabular-nums text-(--color-text-muted)">{count}</span>
          <span className={`tabular-nums ${accent.text}`}>%{pct}</span>
        </div>
      </div>
      <div className="h-1 rounded-full bg-white/8 overflow-hidden">
        <div className={`h-full rounded-full ${accent.dot}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
