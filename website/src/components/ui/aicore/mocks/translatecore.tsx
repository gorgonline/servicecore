import {
  ArrowRightLeft,
  Bot,
  Check,
  Globe,
  Headphones,
  Languages,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  AiBadge,
  KpiTile,
  MockFrame,
  PriorityChip,
  SectionLabel,
  TitleBar,
  resolveAccent,
} from "../primitives";

interface DialogTurn {
  speaker: "kullanıcı" | "teknisyen";
  name: string;
  initials: string;
  time: string;
  source: { lang: "DE" | "TR"; text: string };
  target: { lang: "DE" | "TR"; text: string };
}

const TURNS: DialogTurn[] = [
  {
    speaker: "kullanıcı",
    name: "Hans Müller",
    initials: "HM",
    time: "09:14",
    source: {
      lang: "DE",
      text:
        "Der GPS-Tracker am Kühltransporter zeigt seit zwei Stunden kein Signal mehr. Der Kunde ruft schon mehrmals an.",
    },
    target: {
      lang: "TR",
      text:
        "Soğuk zincir aracındaki GPS izleyici iki saatten fazladır sinyal vermiyor. Müşteri birkaç kez aradı.",
    },
  },
  {
    speaker: "teknisyen",
    name: "Burak Aslan",
    initials: "BA",
    time: "09:18",
    source: {
      lang: "TR",
      text:
        "Cihaz log'larına baktım, hücresel sinyal kaybı görünüyor. Adapazarı çıkışında baz istasyonu sorunu olabilir. Sürücüye 5 dakika içinde ulaşacağız.",
    },
    target: {
      lang: "DE",
      text:
        "Ich habe die Geräteprotokolle überprüft, es liegt ein Mobilfunkverlust vor. Möglicherweise ein Basisstationsproblem am Ausgang von Adapazarı. Wir erreichen den Fahrer innerhalb von 5 Minuten.",
    },
  },
  {
    speaker: "kullanıcı",
    name: "Hans Müller",
    initials: "HM",
    time: "09:21",
    source: {
      lang: "DE",
      text:
        "Können Sie mir sagen, wann der Tracker zurückgesetzt wird? Wir verlieren das Vertrauen unserer Großkunden.",
    },
    target: {
      lang: "TR",
      text:
        "İzleyicinin ne zaman sıfırlanacağını söyleyebilir misiniz? Büyük müşterilerimizin güvenini kaybediyoruz.",
    },
  },
];

interface ProtectedTerm {
  term: string;
  kind: string;
}

const GLOSSARY: ProtectedTerm[] = [
  { term: "INC-7115", kind: "ticket kodu" },
  { term: "Vento Lojistik", kind: "kuruluş" },
  { term: "GPS Tracker", kind: "ürün adı" },
  { term: "POD", kind: "kısaltma" },
  { term: "TMS", kind: "kısaltma" },
];

const SUPPORTED = ["TR", "DE", "EN", "FR", "ES", "IT", "AR", "ZH", "RU", "JA", "PT", "PL"];

function flagLabel(lang: "DE" | "TR" | string): string {
  if (lang === "DE") return "Almanca";
  if (lang === "TR") return "Türkçe";
  if (lang === "EN") return "İngilizce";
  return lang;
}

export function TranslateCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Headphones className="w-3.5 h-3.5" />}
          title="Service Desk · Çok Dilli Konuşma"
          meta="VNT · INC-7115"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <PriorityChip priority="P2" />
          <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums">
            INC-7115
          </span>
          <span className="text-xs text-white/85 truncate flex-1">
            Soğuk zincir aracı GPS sinyali kayboldu
          </span>
          <AiBadge label="çift yönlü çeviri" accent={accent} />
        </div>

        <div className="px-5 py-2.5 border-b border-white/8 bg-white/2 flex items-center gap-3">
          <Globe className="w-3.5 h-3.5 text-(--color-text-muted)" />
          <div className="flex items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-white/10 bg-white/4 font-mono">
              <span className="text-white/85">Hans Müller</span>
              <span className="text-(--color-text-muted)">·</span>
              <span className={accent.text}>DE</span>
            </span>
            <ArrowRightLeft className={`w-3 h-3 ${accent.text}`} />
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-white/10 bg-white/4 font-mono">
              <span className="text-white/85">Burak Aslan</span>
              <span className="text-(--color-text-muted)">·</span>
              <span className={accent.text}>TR</span>
            </span>
          </div>
          <span className="ml-auto text-[10px] font-mono text-(--color-text-muted)">
            otomatik dil tespiti açık
          </span>
        </div>

        <div className="px-5 py-4 space-y-4">
          {TURNS.map((t, i) => (
            <DialogBubble key={i} turn={t} accent={accent} />
          ))}
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Çeviri Yorumu"
            meta="3 mesaj"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-4">
            <div>
              <SectionLabel accent={accent}>Algılanan Yön</SectionLabel>
              <div className="mt-2 flex items-center gap-3">
                <LangPill code="DE" label={flagLabel("DE")} confidence={99} accent={accent} />
                <ArrowRightLeft className="w-3.5 h-3.5 text-(--color-text-muted)" />
                <LangPill code="TR" label={flagLabel("TR")} confidence={100} accent={accent} primary />
              </div>
              <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">
                Hedef dil teknisyen profilinden otomatik seçildi.
              </div>
            </div>

            <div>
              <SectionLabel>Kalite Metrikleri</SectionLabel>
              <div className="mt-2 space-y-2">
                <QualityBar accent={accent} label="Anlam koruma" value={97} />
                <QualityBar accent={accent} label="Terim doğruluğu" value={95} />
                <QualityBar accent={accent} label="Ton uyumu" value={92} />
                <QualityBar accent={accent} label="Akıcılık" value={94} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <SectionLabel>Korunan Terimler</SectionLabel>
                <span className="text-[10px] font-mono text-(--color-text-muted)">
                  glossary
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {GLOSSARY.map((g) => (
                  <span
                    key={g.term}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${accent.border} ${accent.bg} text-[10px] font-mono ${accent.text}`}
                  >
                    <ShieldCheck className="w-2.5 h-2.5" />
                    {g.term}
                  </span>
                ))}
              </div>
              <div className="mt-1.5 text-[10px] font-mono text-(--color-text-muted)">
                Bu terimler çeviride değiştirilmedi (özel adlar, kısaltmalar, ürün adları).
              </div>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<Languages className="w-3.5 h-3.5" />}
            title="Desteklenen Diller"
            meta="12 yön"
            accent={accent}
          />
          <div className="px-5 py-3 flex flex-wrap gap-1.5">
            {SUPPORTED.map((l) => (
              <span
                key={l}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border ${
                  l === "TR" || l === "DE" ? `${accent.border} ${accent.bg} ${accent.text}` : "border-white/8 bg-white/3 text-white/75"
                } text-[10px] font-mono font-semibold`}
              >
                {l === "TR" || l === "DE" ? <Check className="w-2.5 h-2.5" /> : null}
                {l}
              </span>
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Languages className="w-3.5 h-3.5" />} title="Bu Çeyrek · Translate" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Mesaj" value="18.420" trend="çevrildi" trendTone="up" />
            <KpiTile label="Dil çifti" value="38" trend="aktif" trendTone="up" />
            <KpiTile label="Anlam" value="96%" trend="ortalama" trendTone="flat" />
            <KpiTile label="MTTR" value="−21%" trend="çok dilli" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface DialogBubbleProps {
  turn: DialogTurn;
  accent: AccentClasses;
}

function DialogBubble({ turn, accent }: DialogBubbleProps) {
  const isUser = turn.speaker === "kullanıcı";
  return (
    <div className="space-y-1.5">
      <div className={`flex items-center gap-2 ${isUser ? "" : "flex-row-reverse"}`}>
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-mono ${
            isUser ? "bg-white/8 text-white/85" : `${accent.bg} ${accent.text} ring-1 ${accent.ring}`
          }`}
        >
          {isUser ? turn.initials : <Bot className="w-3.5 h-3.5" />}
        </span>
        <span className="text-xs font-medium text-white/85">{turn.name}</span>
        <span className="text-[10px] font-mono text-(--color-text-muted)">{turn.time}</span>
      </div>
      <div className={`flex flex-col gap-1.5 ${isUser ? "ml-9 mr-0" : "mr-9 ml-0 items-end"}`}>
        <BubbleBlock
          tone={isUser ? "neutral" : "accent"}
          accent={accent}
          align={isUser ? "left" : "right"}
          tag={turn.source.lang}
          tagLabel={`${flagLabel(turn.source.lang)} · orijinal`}
          isOriginal
          text={turn.source.text}
        />
        <BubbleBlock
          tone="translation"
          accent={accent}
          align={isUser ? "left" : "right"}
          tag={turn.target.lang}
          tagLabel={`${flagLabel(turn.target.lang)} · çeviri`}
          text={turn.target.text}
        />
      </div>
    </div>
  );
}

interface BubbleBlockProps {
  tone: "neutral" | "accent" | "translation";
  accent: AccentClasses;
  align: "left" | "right";
  tag: string;
  tagLabel: string;
  text: string;
  isOriginal?: boolean;
}

function BubbleBlock({ tone, accent, align, tag, tagLabel, text, isOriginal = false }: BubbleBlockProps) {
  const styles =
    tone === "accent"
      ? `border ${accent.border} ${accent.bg}`
      : tone === "translation"
        ? "border border-dashed border-white/15 bg-white/2"
        : "border border-white/10 bg-white/4";
  return (
    <div className={`max-w-[85%] rounded-2xl ${styles} px-3.5 py-2.5 ${align === "right" ? "rounded-tr-sm" : "rounded-tl-sm"}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className={`inline-flex items-center justify-center min-w-7 h-4 px-1 rounded-sm text-[9px] font-mono font-semibold tabular-nums ${
            isOriginal ? "bg-white/10 text-white/85" : `${accent.bg} ${accent.text}`
          }`}
        >
          {tag}
        </span>
        <span className="text-[9px] font-mono text-(--color-text-muted) uppercase tracking-wider">
          {tagLabel}
        </span>
      </div>
      <p className={`text-xs leading-relaxed ${isOriginal ? "text-white/90" : "text-white/85 italic"}`}>
        {text}
      </p>
    </div>
  );
}

interface LangPillProps {
  code: string;
  label: string;
  confidence: number;
  accent: AccentClasses;
  primary?: boolean;
}

function LangPill({ code, label, confidence, accent, primary = false }: LangPillProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 ${
        primary ? `${accent.border} ${accent.bg}` : "border-white/8 bg-white/3"
      }`}
    >
      <span
        className={`inline-flex items-center justify-center w-7 h-5 rounded text-[9px] font-mono font-semibold tabular-nums ${
          primary ? `${accent.bg} ${accent.text}` : "bg-white/10 text-white/85"
        }`}
      >
        {code}
      </span>
      <div>
        <div className="text-[11px] text-white font-medium leading-none">{label}</div>
        <div className="text-[9px] font-mono text-(--color-text-muted) leading-none mt-0.5">
          %{confidence} güven
        </div>
      </div>
    </div>
  );
}

interface QualityBarProps {
  accent: AccentClasses;
  label: ReactNode;
  value: number;
}

function QualityBar({ accent, label, value }: QualityBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-[11px]">
        <span className="text-white/85">{label}</span>
        <span
          className={`font-mono tabular-nums ${value >= 95 ? accent.text : "text-(--color-text-muted)"}`}
        >
          %{value}
        </span>
      </div>
      <div className="h-1 rounded-full bg-white/8 overflow-hidden">
        <div className={`h-full rounded-full ${accent.dot}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
