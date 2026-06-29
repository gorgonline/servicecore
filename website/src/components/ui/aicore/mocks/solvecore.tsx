import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileSearch,
  FileText,
  Filter,
  GitBranch,
  History,
  MicOff,
  Search,
  ShieldCheck,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  SectionLabel,
  Sparkline,
  TitleBar,
  resolveAccent,
} from "../primitives";

type ChipTone = "neutral" | "success" | "warn" | "danger" | "info";

interface SummaryPoint {
  head: string;
  tone: ChipTone;
  text: string;
}

interface EvidenceRow {
  id: string;
  title: string;
  note: string;
  score: number;
  primary?: boolean;
}

interface Threshold {
  label: string;
  range: string;
  verdict: string;
  tone: ChipTone;
  width: string;
  active?: boolean;
}

interface SourceChip {
  tone: ChipTone;
  label: string;
}

interface OtherRow {
  id: string;
  title: string;
  score: number;
  verdict: string;
  tone: ChipTone;
}

interface Kpi {
  label: string;
  value: string;
  trend: string;
  trendTone: "up" | "down" | "flat";
}

const HEADER = {
  badge: "1 kayıt çözüm hattında",
  chips: [
    { tone: "info" as ChipTone, label: "küçük model + sağlam kod" },
    { tone: "neutral" as ChipTone, label: "halüsinasyon-yok · kaynak zorunlu" },
  ],
  live: "değerlendirme 1,8 sn",
};

const TICKET = {
  id: "INC-3194",
  title: "MFA sıfırlamasından sonra VPN bağlanmıyor — hata 1135",
  ci: "LAPTOP-IST-2291 · GlobalProtect 6.2 · açan: Mert Aydın (Saha Satış) · 3 yorum",
  sla: "Hizmet Seviyesi 3s 12d kaldı · atanan: Selin Yıldız L1",
  raw: "Cihazımı kaybettim, yardım masası MFA'yı sıfırladı. Kullanıcı adı ve parolam doğru ama GlobalProtect ofis dışından bağlanmıyor, 'hata 1135' veriyor. Yeniden denedim, istemciyi kapatıp açtım; web posta çalışıyor ama VPN açılmıyor.",
};

const SUMMARY: SummaryPoint[] = [
  {
    head: "Sorun ne",
    tone: "danger",
    text: "MFA sıfırlandıktan sonra GlobalProtect VPN ofis dışından bağlanmıyor; hata 1135, kimlik bilgileri doğru.",
  },
  {
    head: "Ne denenmiş",
    tone: "warn",
    text: "Yeniden giriş, parola doğrulama, istemci kapat-aç; yardım masası MFA kaydını sıfırladı.",
  },
  {
    head: "Nerede kalınmış",
    tone: "info",
    text: "Yeni MFA kaydından sonra istemci hâlâ eski sertifika/HIP eşleşme önbelleğine bakıyor; istemci tarafı yenileme yapılmamış.",
  },
];

const SIMILAR_ROWS: EvidenceRow[] = [
  {
    id: "INC-2087",
    title: "MFA sonrası VPN 1135 — sertifika önbelleği eski",
    note: "İstemci sertifika önbelleği temizlenerek çözüldü · kapandı",
    score: 0.92,
    primary: true,
  },
  {
    id: "INC-1744",
    title: "Yeni MFA kaydı sonrası GlobalProtect HIP reddi",
    note: "HIP yeniden kayıt + yeniden başlatma · kapandı",
    score: 0.81,
  },
  {
    id: "INC-2553",
    title: "Cihaz değişimi sonrası VPN token eşleşmiyor",
    note: "Yeni cihaz token eşleme yenilendi · kapandı",
    score: 0.74,
  },
];

const KB_ROWS: EvidenceRow[] = [
  {
    id: "KB-0418",
    title: "GlobalProtect 1135: MFA sonrası istemci sertifika önbelleği temizleme",
    note: "Çözüm Adımları · güncel 2026-04",
    score: 0.89,
    primary: true,
  },
  {
    id: "KB-0871",
    title: "MFA cihaz kaydı sıfırlama akışı",
    note: "Sorun Giderme · 5 madde",
    score: 0.7,
  },
  {
    id: "KB-0356",
    title: "VPN genel sorun giderme",
    note: "Genel · eski 2024-09",
    score: 0.52,
  },
];

const GATE = {
  sub: "Karar yalnız arama skoruna bakar — modelin 'eminim' demesine değil",
  topScore: 0.91,
  needleValue: 91,
  rationale: "0.91 ≥ 0.70",
  scoreTrend: [0.31, 0.38, 0.52, 0.61, 0.7, 0.74, 0.81, 0.89, 0.91],
  scoreTrendThreshold: 0.7,
  scoreTrendCaption: "kanıt biriktikçe skor yükseldi — eşik 0.70 aşıldı",
};

const THRESHOLDS: Threshold[] = [
  { label: "Sus", range: "< 0.45", verdict: "kanıt yok → sus", tone: "danger", width: "45%" },
  { label: "Eskale", range: "0.45 – 0.70", verdict: "sınırda → insana devret", tone: "warn", width: "25%" },
  {
    label: "Öner",
    range: "≥ 0.70",
    verdict: "güçlü kanıt → kaynak göstererek öner",
    tone: "success",
    width: "30%",
    active: true,
  },
];

const SUGGESTION = {
  headline: "MFA sonrası eski sertifika/HIP önbelleğini temizleyip istemciyi yeniden kaydet.",
  steps: [
    "İstemciden çıkış yapılıp sertifika önbelleği temizlensin (KB-0418 · madde 2–4).",
    "Cihaz yeniden başlatılsın, HIP yeniden kayıt yapılsın ve yeni token ile giriş denensin.",
    "Portal günlüğünden hata 1135'in kapandığı doğrulansın — profil silmeye gerek yok.",
  ],
  sources: [
    { tone: "info" as ChipTone, label: "KB-0418 · 0.89" },
    { tone: "info" as ChipTone, label: "INC-2087 · 0.92" },
    { tone: "neutral" as ChipTone, label: "sonuç_id COZ-7741" },
  ] satisfies SourceChip[],
  cta: "Öneriyi kayda yanıt olarak ekle",
};

const GROUNDING = {
  question: "Bu önerinin dayandığı kaynak gerçekten konuyla ilgili mi?",
  checks: [
    "Konu örtüşmesi yüksek: KB-0418 'MFA sonrası 1135 + sertifika önbelleği' tarifi kayıtla birebir.",
    "Kaynak güncel: KB-0418 son güncelleme 2026-04 — eski KB-0356 öneriye dahil edilmedi.",
    "Uydurma riski düşük: INC-2087 çözümü aynı belirtide gerçekten uygulanmış ve kapanmış.",
  ],
  note: "Alakasız çıksaydı öneri atılır → cevap üretilmezdi. Bu adım uydurmayı keser.",
};

const SUPPRESS = {
  ticketId: "INC-3205",
  ticketTitle: "Özel uygulama açılışta çöküyor (tek kullanıcı)",
  topScore: 0.29,
  decisionText: "Birleşik kanıt skoru 0.29, 0.45 eşiğinin altında → güvenilir kanıt yok.",
  bodyText:
    "Öneri üretmiyorum; uydurma yerine kaydı L2'ye devrettim ve bilgi bankası boşluğunu işaretledim.",
  chips: [
    { tone: "warn" as ChipTone, label: "insana devret → L2" },
    { tone: "neutral" as ChipTone, label: "bilgi bankası boşluğu raporlandı" },
  ] satisfies SourceChip[],
};

const OTHER_ROWS: OtherRow[] = [
  { id: "INC-3201", title: "Yazıcı kuyruğu takılı — şube", score: 0.86, verdict: "ÖNER", tone: "success" },
  { id: "INC-3198", title: "Paylaşımlı klasör ara ara erişilemiyor", score: 0.63, verdict: "ESKALE", tone: "warn" },
  { id: "INC-3205", title: "Özel uygulama açılışta çöküyor (tek kullanıcı)", score: 0.29, verdict: "SUS", tone: "danger" },
  { id: "INC-3210", title: "Toplantı odası ekranı görüntü vermiyor", score: 0.78, verdict: "ÖNER", tone: "success" },
];

const KPIS: Kpi[] = [
  { label: "Çözülen", value: "1.964", trend: "öneri üretildi", trendTone: "up" },
  { label: "Eskale", value: "612", trend: "sınırda kanıt", trendTone: "flat" },
  { label: "Dürüst sus", value: "418", trend: "uydurma yok", trendTone: "flat" },
  { label: "İlk yanıt", value: "−47%", trend: "süre kazancı", trendTone: "down" },
];

function gateTextColor(score: number): string {
  return score >= 0.7 ? "text-emerald-300" : score >= 0.45 ? "text-amber-300" : "text-red-300";
}

function gateBarColor(score: number): string {
  return score >= 0.7 ? "bg-emerald-400" : score >= 0.45 ? "bg-amber-400" : "bg-red-400";
}

function toneDot(tone: ChipTone): string {
  return tone === "danger"
    ? "bg-red-400"
    : tone === "warn"
      ? "bg-amber-400"
      : tone === "success"
        ? "bg-emerald-400"
        : tone === "info"
          ? "bg-sky-400"
          : "bg-white/40";
}

export function SolveCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Zap className="w-3.5 h-3.5" />}
          title="Çözüm Hattı · Kanıt Kapısı"
          meta="Birikim · INC-3194 · canlı"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2 flex-wrap">
          <AiBadge label={HEADER.badge} accent={accent} />
          {HEADER.chips.map((c) => (
            <Chip key={c.label} tone={c.tone}>
              {c.label}
            </Chip>
          ))}
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
            <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />
            {HEADER.live}
          </span>
        </div>

        <div className="relative px-5 py-5">
          <div className="absolute top-7 bottom-7 left-[26px] w-px bg-white/12" />
          <div className="space-y-5">
            {/* Düğüm 1 — Kayıt */}
            <SpineNode accent={accent} icon={<FileText className="w-3.5 h-3.5" />} label="Oku & Özetle" step="1 / 3">
              <div className="rounded-xl border border-white/8 bg-white/2 px-4 py-3">
                <div className="flex items-center gap-2 flex-wrap font-mono text-[10px] text-(--color-text-muted) tabular-nums">
                  <span>{TICKET.id}</span>
                  <Chip tone="warn">P2</Chip>
                  <Chip>Atandı</Chip>
                  <Chip>Self-Servis Portal</Chip>
                </div>
                <h4 className="mt-1.5 text-sm font-semibold text-white tracking-tight">{TICKET.title}</h4>
                <div className="mt-1 text-[11px] font-mono text-(--color-text-muted) leading-snug">
                  {TICKET.ci}
                </div>
                <div className="mt-0.5 text-[11px] font-mono text-(--color-text-muted) leading-snug">
                  {TICKET.sla}
                </div>
                <p className="mt-2 rounded-lg border border-white/8 bg-white/2 px-3 py-2 text-[11px] text-white/70 leading-snug italic">
                  {TICKET.raw}
                </p>
              </div>
            </SpineNode>

            {/* Düğüm 2 — Üç Başlıkta Özet */}
            <SpineNode
              accent={accent}
              icon={<Sparkles className="w-3.5 h-3.5" />}
              label="Üç Başlıkta Özet"
              step="özet · küçük model"
              stepIsChip
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {SUMMARY.map((p) => (
                  <div key={p.head} className="rounded-lg border border-white/8 bg-white/2 px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${toneDot(p.tone)}`} />
                      <span className="text-[11px] font-semibold text-white">{p.head}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-white/75 leading-snug">{p.text}</p>
                  </div>
                ))}
              </div>
            </SpineNode>

            {/* Düğüm 3 — Kanıt Topla */}
            <SpineNode
              accent={accent}
              icon={<Search className="w-3.5 h-3.5" />}
              label="Kanıt Topla"
              step="19.649 aday · en iyi 5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/8 bg-white/2 px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <SectionLabel accent={accent}>Benzer Kapanmış Kayıt · Anlamsal Arama (cosine)</SectionLabel>
                    <span className="text-[9px] font-mono text-(--color-text-muted) shrink-0 tabular-nums">
                      18.402 kapalı
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {SIMILAR_ROWS.map((row) => (
                      <EvidenceLine key={row.id} row={row} accent={accent} closed />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/8 bg-white/2 px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <SectionLabel accent={accent}>Resmi Bilgi Bankası · Çözüm Makalesi (yeniden-sıralama)</SectionLabel>
                    <span className="text-[9px] font-mono text-(--color-text-muted) shrink-0 tabular-nums">
                      1.247 makale
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {KB_ROWS.map((row) => (
                      <EvidenceLine key={row.id} row={row} accent={accent} />
                    ))}
                  </div>
                </div>

                <div
                  className={`md:col-span-2 rounded-lg border ${accent.border} ${accent.bg} px-3 py-2 flex items-center gap-2`}
                >
                  <BookOpen className={`w-3 h-3 shrink-0 ${accent.text}`} />
                  <span className="text-[11px] text-white/85">
                    Kanıt paketi · birleşik — en güçlü skor{" "}
                    <span className={`font-mono tabular-nums ${accent.text}`}>0.91</span> · 6 kaynak
                  </span>
                </div>
              </div>
            </SpineNode>

            {/* Düğüm 4 — KANIT KAPISI (HERO) */}
            <SpineNode
              accent={accent}
              icon={<Filter className="w-3.5 h-3.5" />}
              label="Kanıt Kapısı · CRAG"
              step="hero"
              stepHidden
              hero
            >
              <div className={`rounded-xl border ${accent.border} ${accent.bg} px-4 py-4`}>
                <SectionLabel accent={accent}>Kanıt Kapısı · CRAG</SectionLabel>
                <p className="mt-1 text-[11px] text-white/70 leading-snug">{GATE.sub}</p>

                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-white tabular-nums tracking-tight">
                    {GATE.topScore.toFixed(2)}
                  </span>
                  <Chip tone="success" className="text-xs px-3 py-1">
                    ÖNER
                  </Chip>
                  <span className="ml-auto text-[10px] font-mono text-(--color-text-muted) tabular-nums">
                    {GATE.rationale}
                  </span>
                </div>

                <div className="mt-3 relative h-2 rounded-full overflow-hidden flex">
                  {THRESHOLDS.map((t) => (
                    <span
                      key={t.label}
                      className={
                        t.tone === "danger"
                          ? "bg-red-400/35"
                          : t.tone === "warn"
                            ? "bg-amber-400/35"
                            : "bg-emerald-400/45"
                      }
                      style={{ width: t.width }}
                    />
                  ))}
                  <span
                    className="absolute -top-1.5 -bottom-1.5 border-l border-dashed border-white/60"
                    style={{ left: `${GATE.needleValue}%` }}
                  />
                  <span
                    className={`absolute -top-2 w-2 h-2 rounded-full ${accent.dot} animate-pulse`}
                    style={{ left: `calc(${GATE.needleValue}% - 4px)` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-1.5 mt-2">
                  {THRESHOLDS.map((t) => (
                    <ThresholdTile key={t.label} threshold={t} />
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/8">
                  <Sparkline
                    values={GATE.scoreTrend}
                    accent={accent}
                    width={260}
                    height={32}
                    showThreshold={GATE.scoreTrendThreshold}
                  />
                  <div className="mt-1 text-[10px] font-mono text-(--color-text-muted) leading-snug">
                    {GATE.scoreTrendCaption}
                  </div>
                </div>
              </div>
            </SpineNode>
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={`border ${accent.border} ${accent.glow}`}>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Önerilen Çözüm"
            meta="güçlü kanıt"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <SectionLabel accent={accent}>Kaynak Gösteren Öneri</SectionLabel>
              <AiBadge label="güçlü kanıt" accent={accent} pulse={false} />
            </div>
            <div className="text-xs font-semibold text-white leading-snug">{SUGGESTION.headline}</div>
            <div className="mt-3 space-y-2">
              {SUGGESTION.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    className={`shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full ${accent.bg} ${accent.text} text-[9px] font-mono font-semibold mt-0.5`}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[11px] text-white/85 leading-snug">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5 flex-wrap">
              {SUGGESTION.sources.map((s) => (
                <Chip key={s.label} tone={s.tone}>
                  {s.label}
                </Chip>
              ))}
            </div>
            <button
              className={`w-full mt-3 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
            >
              <ArrowRight className="w-3 h-3" />
              {SUGGESTION.cta}
            </button>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<ShieldCheck className="w-3.5 h-3.5" />}
            title="Kaynak Doğrulama"
            meta="öneri yazıldıktan sonra"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] text-white/75 italic leading-snug">{GROUNDING.question}</p>
              <Chip tone="success" className="shrink-0">
                GEÇTİ
              </Chip>
            </div>
            <div className="mt-3 space-y-2">
              {GROUNDING.checks.map((check, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-white/85 leading-snug">{check}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/8 text-[10px] font-mono text-(--color-text-muted) leading-snug">
              {GROUNDING.note}
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<GitBranch className="w-3.5 h-3.5" />}
            title="Sonuç Kaydı"
            meta="sonuç_id COZ-7741"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3">
            <Chip tone="success">Öneri üretildi · kayda eklendi</Chip>
            <p className="text-[11px] text-white/80">Bu öneri işe yaradı mı?</p>
            <div className="flex items-center gap-2">
              <button className="flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 text-emerald-200 font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5">
                <ThumbsUp className="w-3 h-3" />
                Olumlu · çözdü
              </button>
              <button className="flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer inline-flex items-center justify-center gap-1.5">
                <ThumbsDown className="w-3 h-3" />
                Olumsuz · çözmedi
              </button>
            </div>
            <p className="text-[10px] font-mono text-(--color-text-muted) leading-snug">
              Her sonuç ve teknisyen geri bildirimi bir sonuç kimliğiyle kaydedilir — izlenebilir ve denetlenebilir kalır.
            </p>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<MicOff className="w-3.5 h-3.5" />}
            title="Dürüstçe Sus · Örnek"
            meta="karar: SUS"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] text-(--color-text-muted) tabular-nums shrink-0">
                {SUPPRESS.ticketId}
              </span>
              <span className="text-[11px] text-white/85 truncate flex-1">{SUPPRESS.ticketTitle}</span>
              <div className="w-12 h-1 rounded-full bg-white/8 overflow-hidden shrink-0">
                <div className="h-full bg-red-400" style={{ width: "29%" }} />
              </div>
              <span className="font-mono text-[10px] tabular-nums text-red-300 shrink-0">
                {SUPPRESS.topScore.toFixed(2)}
              </span>
            </div>
            <div className="rounded-lg border border-red-500/22 bg-red-500/8 px-3 py-2.5 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-red-300 shrink-0 mt-0.5" />
              <p className="text-[11px] text-white/85 leading-snug">{SUPPRESS.decisionText}</p>
            </div>
            <p className="text-[11px] text-white/75 leading-snug">{SUPPRESS.bodyText}</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {SUPPRESS.chips.map((c) => (
                <Chip key={c.label} tone={c.tone}>
                  {c.label}
                </Chip>
              ))}
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<History className="w-3.5 h-3.5" />}
            title="Hattaki Diğer Kayıtlar"
            meta="4 kayıt · kapı kararıyla"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            {OTHER_ROWS.map((row) => (
              <OtherTicketRow key={row.id} row={row} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<History className="w-3.5 h-3.5" />} title="Bu Çeyrek · SolveCore" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            {KPIS.map((k) => (
              <KpiTile key={k.label} label={k.label} value={k.value} trend={k.trend} trendTone={k.trendTone} />
            ))}
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface SpineNodeProps {
  accent: AccentClasses;
  icon: ReactNode;
  label: string;
  step: string;
  stepIsChip?: boolean;
  stepHidden?: boolean;
  hero?: boolean;
  children: ReactNode;
}

function SpineNode({
  accent,
  icon,
  label,
  step,
  stepIsChip = false,
  stepHidden = false,
  hero = false,
  children,
}: SpineNodeProps) {
  return (
    <div className="relative flex items-start gap-4">
      <div className="relative shrink-0">
        <span
          className={`relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full border ${accent.bg} ${accent.text} ring-1 ${accent.ring} ${
            hero ? `ring-2 ${accent.ring}` : ""
          }`}
        >
          {icon}
        </span>
        {hero && (
          <span className={`absolute inset-0 rounded-full ${accent.dot} opacity-30 animate-ping`} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <SectionLabel accent={accent}>{label}</SectionLabel>
          {!stepHidden &&
            (stepIsChip ? (
              <Chip>{step}</Chip>
            ) : (
              <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0 tabular-nums">
                {step}
              </span>
            ))}
        </div>
        {children}
      </div>
    </div>
  );
}

interface EvidenceLineProps {
  row: EvidenceRow;
  accent: AccentClasses;
  closed?: boolean;
}

function EvidenceLine({ row, accent, closed = false }: EvidenceLineProps) {
  return (
    <div
      className={`relative flex items-center gap-2 rounded-lg border px-2 py-1.5 ${
        row.primary ? `${accent.border} ${accent.bg} ring-1 ${accent.ring}` : "border-white/8 bg-white/2"
      }`}
    >
      <span className="font-mono text-[10px] text-(--color-text-muted) tabular-nums w-16 shrink-0">
        {row.id}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] text-white/85 truncate">{row.title}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted) truncate">{row.note}</div>
      </div>
      {closed && (
        <Chip tone="success" className="shrink-0 hidden sm:inline-flex">
          çözüldü
        </Chip>
      )}
      <div className="w-12 h-1 rounded-full bg-white/8 overflow-hidden shrink-0">
        <div className={`h-full ${gateBarColor(row.score)}`} style={{ width: `${row.score * 100}%` }} />
      </div>
      <span className={`font-mono text-[10px] tabular-nums shrink-0 w-9 text-right ${gateTextColor(row.score)}`}>
        {row.score.toFixed(2)}
      </span>
      {row.primary && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot} animate-pulse`} />}
    </div>
  );
}

interface ThresholdTileProps {
  threshold: Threshold;
}

function ThresholdTile({ threshold }: ThresholdTileProps) {
  const dot =
    threshold.tone === "danger" ? "bg-red-400" : threshold.tone === "warn" ? "bg-amber-400" : "bg-emerald-400";
  const text =
    threshold.tone === "danger"
      ? "text-red-300/70"
      : threshold.tone === "warn"
        ? "text-amber-300/70"
        : "text-emerald-200";
  const container = threshold.active
    ? "border-emerald-500/30 bg-emerald-500/10 ring-1 ring-emerald-500/30"
    : "border-white/8 bg-white/2";
  return (
    <div className={`rounded-lg border px-2 py-1.5 ${container}`}>
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
        <span className={`text-[10px] font-semibold ${text}`}>{threshold.label}</span>
        {threshold.active && <CheckCircle2 className="w-3 h-3 text-emerald-300 ml-auto" />}
      </div>
      <div className={`mt-0.5 text-[9px] font-mono tabular-nums ${text}`}>{threshold.range}</div>
      <div className={`mt-0.5 text-[9px] font-mono leading-snug ${text}`}>{threshold.verdict}</div>
    </div>
  );
}

function OtherTicketRow({ row }: { row: OtherRow }) {
  return (
    <div className="px-4 py-2.5 flex items-center gap-3">
      <FileSearch className="w-3 h-3 text-(--color-text-muted) shrink-0" />
      <span className="font-mono text-[10px] text-(--color-text-muted) tabular-nums w-16 shrink-0">{row.id}</span>
      <span className="text-[11px] text-white/85 truncate flex-1">{row.title}</span>
      <div className="w-12 h-1 rounded-full bg-white/8 overflow-hidden shrink-0">
        <div className={`h-full ${gateBarColor(row.score)}`} style={{ width: `${row.score * 100}%` }} />
      </div>
      <span className={`font-mono text-[10px] tabular-nums shrink-0 w-9 text-right ${gateTextColor(row.score)}`}>
        {row.score.toFixed(2)}
      </span>
      <Chip tone={row.tone} className="shrink-0">
        {row.verdict}
      </Chip>
    </div>
  );
}
