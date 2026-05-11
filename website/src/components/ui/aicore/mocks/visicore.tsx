import {
  AlertCircle,
  BookOpen,
  Camera,
  Eye,
  Mail,
  MousePointerClick,
  ScanSearch,
  Sparkles,
  X,
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

interface DetectedRegion {
  id: string;
  label: string;
  type: "error-window" | "error-code" | "button" | "app";
  x: number;
  y: number;
  w: number;
  h: number;
  confidence: number;
  primary?: boolean;
}

const REGIONS: DetectedRegion[] = [
  {
    id: "r1",
    label: "Outlook penceresi",
    type: "app",
    x: 8,
    y: 12,
    w: 84,
    h: 76,
    confidence: 98,
  },
  {
    id: "r2",
    label: "Hata diyaloğu",
    type: "error-window",
    x: 22,
    y: 28,
    w: 56,
    h: 38,
    confidence: 96,
    primary: true,
  },
  {
    id: "r3",
    label: "Hata kodu",
    type: "error-code",
    x: 28,
    y: 44,
    w: 44,
    h: 8,
    confidence: 94,
  },
  {
    id: "r4",
    label: "Tekrar dene · İptal",
    type: "button",
    x: 38,
    y: 58,
    w: 28,
    h: 6,
    confidence: 92,
  },
];

interface OcrLine {
  text: string;
  highlight?: boolean;
}

const OCR_LINES: OcrLine[] = [
  { text: "Microsoft Outlook" },
  { text: "Bağlantı kurulamadı." },
  { text: "Sunucuyla iletişim sırasında bir hata oluştu." },
  { text: "Hata kodu: 0x800CCC0E", highlight: true },
  { text: "Görevi tekrar denemek için 'Tekrar Dene' butonuna basın." },
];

const REGION_TYPE_COLOR: Record<DetectedRegion["type"], string> = {
  "error-window": "border-red-400/70 bg-red-500/12",
  "error-code": "border-amber-400/70 bg-amber-500/12",
  button: "border-cyan-400/60 bg-cyan-500/10",
  app: "border-white/30 bg-white/4",
};

const REGION_TYPE_LABEL: Record<DetectedRegion["type"], string> = {
  "error-window": "hata diyaloğu",
  "error-code": "hata kodu",
  button: "buton",
  app: "uygulama",
};

const REGION_TYPE_ICON: Record<DetectedRegion["type"], ReactNode> = {
  "error-window": <AlertCircle className="w-3 h-3" />,
  "error-code": <ScanSearch className="w-3 h-3" />,
  button: <MousePointerClick className="w-3 h-3" />,
  app: <Mail className="w-3 h-3" />,
};

export function VisicoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Eye className="w-3.5 h-3.5" />}
          title="VisicoreAI · Görsel Analiz"
          meta="LYR · screenshot.png"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <AiBadge label="4 bölge tespit edildi" accent={accent} />
          <Chip tone="info">Outlook · masaüstü</Chip>
          <Chip>OCR · Türkçe</Chip>
          <span className="ml-auto text-[10px] font-mono text-(--color-text-muted)">
            Naz Aksoy · 14:08
          </span>
        </div>

        <div className="px-5 py-4">
          <div className="relative rounded-xl border border-white/10 bg-slate-900/60 overflow-hidden aspect-video">
            <DesktopMock />

            {REGIONS.map((r) => (
              <BoundingBox key={r.id} region={r} accent={accent} />
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-mono">
            <span className="text-(--color-text-muted)">{trUpper("renk anahtarı")}</span>
            <LegendChip label="hata diyaloğu" color="bg-red-400" />
            <LegendChip label="hata kodu" color="bg-amber-400" />
            <LegendChip label="buton" color="bg-cyan-400" />
            <LegendChip label="uygulama" color="bg-white/50" />
          </div>
        </div>

        <div className="border-t border-white/8 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
              {trUpper("OCR Çıktısı · Yapılandırılmış Metin")}
            </span>
            <Chip>5 satır</Chip>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/2 p-3 space-y-1">
            {OCR_LINES.map((l, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="shrink-0 text-[9px] font-mono text-(--color-text-muted) tabular-nums w-4 mt-0.5">
                  {i + 1}
                </span>
                <span
                  className={`text-[12px] leading-relaxed ${
                    l.highlight
                      ? `font-mono ${accent.bg} ${accent.text} px-1.5 py-0.5 rounded border ${accent.border}`
                      : "text-white/85"
                  }`}
                >
                  {l.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Tespit Edilen Sorun"
            meta="güven %96"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3">
            <div>
              <SectionLabel accent={accent}>Kategori</SectionLabel>
              <div className="mt-1.5 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${accent.border} ${accent.bg} ${accent.text} text-[11px] font-mono`}>
                  <Mail className="w-3 h-3" />
                  İstemci / E-posta
                </span>
                <Chip tone="warn">SMTP bağlantısı</Chip>
              </div>
            </div>

            <div>
              <SectionLabel>Hata Kodu</SectionLabel>
              <div className="mt-1.5 font-mono text-sm text-white">
                <span className={`${accent.bg} ${accent.text} px-1.5 py-0.5 rounded border ${accent.border}`}>
                  0x800CCC0E
                </span>
              </div>
              <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">
                Microsoft Outlook · sunucu bağlantı reddi
              </div>
            </div>

            <div>
              <SectionLabel>Çıkarılan İçerik</SectionLabel>
              <div className="mt-2 space-y-1.5">
                <ExtractRow label="Uygulama" value="Microsoft Outlook" />
                <ExtractRow label="Türü" value="Modal hata diyaloğu" />
                <ExtractRow label="Eylem seçenekleri" value="Tekrar Dene · İptal" />
                <ExtractRow label="Dil" value="Türkçe (tr-TR)" />
              </div>
            </div>
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<BookOpen className="w-3.5 h-3.5" />}
            title="Eşleşen KB · Önerilen Aksiyon"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className={`rounded-xl border ${accent.border} ${accent.bg} p-3`}>
              <div className="flex items-center gap-2 mb-1.5">
                <BookOpen className={`w-3 h-3 ${accent.text}`} />
                <span className="text-[10px] font-mono text-(--color-text-muted)">KB-1042</span>
                <span className={`ml-auto text-[10px] font-mono tabular-nums ${accent.text}`}>%93 eşleşme</span>
              </div>
              <div className="text-xs font-semibold text-white">
                Outlook 0x800CCC0E sunucu bağlantı reddi — adım adım çözüm
              </div>
              <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">
                3 adımlı self-service · ortalama çözüm 2.4 dakika
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
                Adım adım gönder
              </button>
              <button
                className={`flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
              >
                <Sparkles className="w-3 h-3" />
                Ticket aç & ilet
              </button>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<Camera className="w-3.5 h-3.5" />}
            title="Bu Çeyrek · Visicore"
            accent={accent}
          />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Görsel" value="6.142" trend="analiz" trendTone="up" />
            <KpiTile label="Hata kodu" value="92%" trend="OCR doğruluk" trendTone="flat" />
            <KpiTile label="Self-Servis" value="+31%" trend="çözüm" trendTone="up" />
            <KpiTile label="Yanlış kategori" value="−68%" trend="öncesine göre" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

function DesktopMock() {
  return (
    <div className="absolute inset-0 bg-linear-to-br from-slate-800/60 via-slate-900/70 to-slate-950/80">
      <div className="absolute top-3 left-3 right-3 h-2 rounded-sm bg-white/10" />
      <div className="absolute bottom-2 left-3 right-3 flex items-center gap-1.5">
        <div className="w-6 h-6 rounded bg-blue-500/40" />
        <div className="w-6 h-6 rounded bg-white/10" />
        <div className="w-6 h-6 rounded bg-white/10" />
        <div className="w-6 h-6 rounded bg-orange-500/30" />
        <div className="flex-1" />
        <div className="text-[8px] font-mono text-white/40">14:08 · 12 Mart</div>
      </div>

      <div className="absolute left-[8%] right-[8%] top-[12%] bottom-[12%] rounded-sm border border-white/15 bg-slate-800/80">
        <div className="absolute top-0 left-0 right-0 h-4 bg-blue-900/60 border-b border-white/10 flex items-center px-2 gap-2">
          <Mail className="w-2.5 h-2.5 text-white/70" />
          <span className="text-[8px] font-mono text-white/70">Outlook · Gelen Kutusu</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="absolute top-4 left-0 bottom-0 w-1/4 border-r border-white/8 p-1.5 space-y-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-1.5 rounded-sm bg-white/10" style={{ width: `${50 + i * 8}%` }} />
          ))}
        </div>
        <div className="absolute top-4 left-1/4 right-0 bottom-0 p-2 space-y-1 opacity-50">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-2 rounded-sm bg-white/8" />
          ))}
        </div>
      </div>

      <div className="absolute left-[22%] right-[22%] top-[28%] bottom-[34%] rounded-md bg-slate-200/95 shadow-2xl flex flex-col">
        <div className="h-4 bg-red-500/85 rounded-t-md flex items-center px-2 gap-1">
          <AlertCircle className="w-2.5 h-2.5 text-white" />
          <span className="text-[8px] font-mono text-white font-semibold">Microsoft Outlook</span>
          <div className="ml-auto">
            <X className="w-2.5 h-2.5 text-white/85" />
          </div>
        </div>
        <div className="flex-1 p-2.5 flex flex-col items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <div className="text-[8px] font-mono text-slate-800 text-center leading-snug px-2">
            Sunucuyla iletişim sırasında bir hata oluştu.
            <br />
            <span className="font-semibold">Hata kodu: 0x800CCC0E</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="px-2 py-0.5 rounded-sm bg-blue-500/85 text-white text-[7px] font-mono font-semibold">
              Tekrar Dene
            </div>
            <div className="px-2 py-0.5 rounded-sm bg-slate-300 text-slate-800 text-[7px] font-mono">
              İptal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BoundingBoxProps {
  region: DetectedRegion;
  accent: AccentClasses;
}

function BoundingBox({ region, accent }: BoundingBoxProps) {
  const color = REGION_TYPE_COLOR[region.type];
  return (
    <div
      className={`absolute border-2 ${color} ${region.primary ? accent.glow : ""}`}
      style={{
        left: `${region.x}%`,
        top: `${region.y}%`,
        width: `${region.w}%`,
        height: `${region.h}%`,
      }}
    >
      <span
        className={`absolute -top-5 left-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm border ${color} text-[8px] font-mono font-semibold whitespace-nowrap`}
      >
        {REGION_TYPE_ICON[region.type]}
        {REGION_TYPE_LABEL[region.type]}
        <span className="text-(--color-text-muted)">·</span>
        <span>%{region.confidence}</span>
      </span>
    </div>
  );
}

interface LegendChipProps {
  label: string;
  color: string;
}

function LegendChip({ label, color }: LegendChipProps) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`w-2 h-2 rounded-sm ${color}`} />
      <span className="text-(--color-text-muted)">{label}</span>
    </span>
  );
}

interface ExtractRowProps {
  label: string;
  value: ReactNode;
}

function ExtractRow({ label, value }: ExtractRowProps) {
  return (
    <div className="flex items-baseline gap-2 text-[11px]">
      <span className="text-(--color-text-muted) w-32 shrink-0">{label}</span>
      <span className="text-white/85">{value}</span>
    </div>
  );
}

