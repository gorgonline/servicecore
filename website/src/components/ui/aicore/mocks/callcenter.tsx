import {
  AlertTriangle,
  BookOpen,
  Building2,
  CheckCircle2,
  Headphones,
  Heart,
  Mic,
  Pause,
  Phone,
  PhoneOff,
  Sparkles,
  Volume2,
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

interface CallTurn {
  speaker: "kullanıcı" | "agent";
  name: string;
  initials: string;
  time: string;
  text: string;
  sentiment?: "öfke" | "sabırsız" | "rahatladı";
}

const TURNS: CallTurn[] = [
  {
    speaker: "kullanıcı",
    name: "Selçuk Tan",
    initials: "ST",
    time: "00:14",
    text: "Merhaba, bireysel emeklilik hesabımla ilgili e-posta bildirimleri gelmiyor. Mesai bitmeden onay maili almam lazım.",
    sentiment: "sabırsız",
  },
  {
    speaker: "agent",
    name: "Selin Yıldız",
    initials: "SY",
    time: "00:27",
    text: "Selçuk Bey, durumu hemen inceliyorum. Bu sabahtan beri sürekli aramayla karşılaşıyoruz, bir saniye lütfen.",
  },
  {
    speaker: "kullanıcı",
    name: "Selçuk Tan",
    initials: "ST",
    time: "00:41",
    text: "Bu üçüncü kez, son iki haftadır aynı sorun yaşanıyor, ciddiye alındığına emin değilim.",
    sentiment: "öfke",
  },
  {
    speaker: "agent",
    name: "Selin Yıldız",
    initials: "SY",
    time: "00:54",
    text: "Anlıyorum efendim. Aslında bu sabah aynı sorunu kurumsal düzeyde tespit edip kayıt altına aldık, IT ekibimiz aktif çalışıyor.",
  },
];

const SUGGESTED_REPLY =
  "Selçuk Bey, ekibimiz şu an konuyu INC-2847 altında izliyor. Tahmini 25 dakika içinde maillerinizin gelmeye başlayacağını öngörüyoruz. Onay mailinizi 17:00'dan önce ulaştırmayı taahhüt ediyorum, çözüldüğünde size kişisel olarak teyit edeceğim.";

const KB_HITS = [
  { id: "KB-1284", title: "Bireysel emeklilik bildirim akışı", match: 91 },
  { id: "KB-0734", title: "Posta kuyruğu manuel drenajı", match: 78 },
  { id: "KB-0871", title: "Müşteriye eskalasyon iletişimi", match: 62 },
];

export function CallcenterMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Phone className="w-3.5 h-3.5" />}
          title="Çağrı Merkezi · Canlı"
          meta="BRK · ext-4180"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-red-400/55 bg-red-500/22 text-[10px] font-mono font-semibold text-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {trUpper("canlı çağrı")}
          </span>
          <span className="text-[11px] font-mono text-white tabular-nums">01:08</span>
          <AiBadge label="canlı asistan" accent={accent} />
          <span className="ml-auto inline-flex items-center gap-3 text-[10px] font-mono text-(--color-text-muted)">
            <button className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-white/10 hover:bg-white/5 cursor-pointer">
              <Mic className="w-3 h-3" />
            </button>
            <button className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-white/10 hover:bg-white/5 cursor-pointer">
              <Pause className="w-3 h-3" />
            </button>
            <button className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-red-400/40 bg-red-500/12 text-red-300 cursor-pointer">
              <PhoneOff className="w-3 h-3" />
            </button>
          </span>
        </div>

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/8 text-[11px] font-mono font-semibold text-white shrink-0">
            ST
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-white">Selçuk Tan</div>
            <div className="text-[10px] font-mono text-(--color-text-muted) flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <Building2 className="w-2.5 h-2.5" />
                BES Müşteri · 8 yıl
              </span>
              <span>·</span>
              <span>Şube 042 · Kadıköy</span>
              <span>·</span>
              <span>Son ticket 12 gün önce</span>
            </div>
          </div>
          <Chip tone="warn">3. çağrı / 2 hafta</Chip>
        </div>

        <div className="px-5 py-4 space-y-3.5">
          {TURNS.map((t, i) => (
            <CallTurnBlock key={i} turn={t} accent={accent} />
          ))}
          <div className="flex items-center gap-2 text-[10px] font-mono text-(--color-text-muted) pl-9">
            <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />
            agent yazıyor · AI yanıt taslağı sağda
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Heart className="w-3.5 h-3.5" />}
            title="Canlı Sinyal"
            meta="SentimentAI ile"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3.5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <SectionLabel accent={accent}>Anlık Duygu</SectionLabel>
                <span className="text-xs font-mono text-red-300">−0.62 · öfke yükseliyor</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                <div className="h-full bg-red-400" style={{ width: "76%" }} />
              </div>
              <div className="mt-1 flex justify-between text-[9px] font-mono text-(--color-text-muted)">
                <span>−1.0</span>
                <span>0</span>
                <span>+1.0</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <SignalChip label="Konuşma tempo" value="hızlı" tone="warn" />
              <SignalChip label="Tek. doğru" value="2.4s" tone="ok" />
              <SignalChip label="Çağrı türü" value="şikayet" tone="warn" />
            </div>

            <div className="rounded-xl border border-red-400/30 bg-red-500/8 p-3 flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-red-300 shrink-0 mt-0.5" />
              <p className="text-[11px] text-white/85 leading-snug">
                Müşteri &lsquo;üçüncü kez&rsquo; ifadesini kullandı — eskalasyon riski. Önerilen aksiyon:
                taahhütlü zaman + kişisel teyit.
              </p>
            </div>
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Önerilen Yanıt · canlı"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="mb-2 flex items-center gap-2">
              <Chip tone="info">Replycore eşleşti</Chip>
              <span className="text-[10px] font-mono text-(--color-text-muted)">
                INC-2847 bağlı
              </span>
            </div>
            <div className={`rounded-xl border ${accent.border} ${accent.bg} p-3`}>
              <p className="text-xs text-white/90 leading-relaxed">{SUGGESTED_REPLY}</p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
                Yeniden üret
              </button>
              <button
                className={`flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
              >
                <Volume2 className="w-3 h-3" />
                Söyle (prompter)
              </button>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<BookOpen className="w-3.5 h-3.5" />} title="Canlı KB Eşleşmesi" accent={accent} />
          <div className="divide-y divide-white/6">
            {KB_HITS.map((kb) => (
              <div key={kb.id} className="px-4 py-2.5 flex items-center gap-3">
                <BookOpen className={`w-3 h-3 ${accent.text} shrink-0`} />
                <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0 w-14">
                  {kb.id}
                </span>
                <span className="text-[11px] text-white/85 truncate flex-1">{kb.title}</span>
                <span className={`text-[10px] font-mono tabular-nums shrink-0 ${kb.match >= 80 ? accent.text : "text-(--color-text-muted)"}`}>
                  %{kb.match}
                </span>
              </div>
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<CheckCircle2 className="w-3.5 h-3.5" />}
            title="Çağrı Sonu Çıktısı"
            meta="otomatik"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            <Outcome
              accent={accent}
              icon={<AlertTriangle className="w-3 h-3" />}
              label="INC-2847 · not eklendi"
              detail="3. müşteri etkisi · BES kanalı"
            />
            <Outcome
              accent={accent}
              icon={<Phone className="w-3 h-3" />}
              label="Geri arama · 17:00"
              detail="Çözüm sonrası teyit"
            />
            <Outcome
              accent={accent}
              icon={<PriorityChipMini priority="P2" />}
              label="CRM duyurusu"
              detail="BES müşterileri · proaktif e-posta"
            />
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Headphones className="w-3.5 h-3.5" />} title="Bu Çeyrek · Callcenter" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Çağrı" value="14.820" trend="canlı asistan" trendTone="up" />
            <KpiTile label="Kayıt Zamanı" value="−74%" trend="çağrı sonrası" trendTone="down" />
            <KpiTile label="FCR" value="+18%" trend="ilk çağrıda" trendTone="up" />
            <KpiTile label="CSAT" value="+0.5" trend="canlı asistan" trendTone="up" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface CallTurnProps {
  turn: CallTurn;
  accent: AccentClasses;
}

function CallTurnBlock({ turn, accent }: CallTurnProps) {
  const isCustomer = turn.speaker === "kullanıcı";
  return (
    <div className={`flex items-start gap-2.5 ${isCustomer ? "" : "flex-row-reverse"}`}>
      <span
        className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-mono ${
          isCustomer ? "bg-white/8 text-white/85" : `${accent.bg} ${accent.text} ring-1 ${accent.ring}`
        }`}
      >
        {turn.initials}
      </span>
      <div className={`flex-1 max-w-[78%] ${isCustomer ? "" : "ml-auto"}`}>
        <div className={`flex items-center gap-2 mb-1 ${isCustomer ? "" : "justify-end"}`}>
          <span className="text-[11px] font-medium text-white/85">{turn.name}</span>
          <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums">{turn.time}</span>
          {turn.sentiment && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-red-400/35 bg-red-500/10 text-[9px] font-mono text-red-200">
              <Heart className="w-2 h-2" />
              {turn.sentiment}
            </span>
          )}
        </div>
        <div
          className={`rounded-2xl px-3.5 py-2.5 ${isCustomer ? "rounded-tl-sm" : "rounded-tr-sm"} ${
            isCustomer
              ? "border border-white/10 bg-white/5"
              : `border ${accent.border} ${accent.bg}`
          }`}
        >
          <p className="text-xs text-white/90 leading-relaxed">{turn.text}</p>
        </div>
      </div>
    </div>
  );
}

interface SignalChipProps {
  label: string;
  value: string;
  tone: "ok" | "warn";
}

function SignalChip({ label, value, tone }: SignalChipProps) {
  const valColor = tone === "ok" ? "text-emerald-300" : "text-amber-300";
  return (
    <div className="rounded-lg border border-white/8 bg-white/2 px-2.5 py-1.5">
      <div className="text-[9px] font-mono text-(--color-text-muted) tracking-wider">
        {trUpper(label)}
      </div>
      <div className={`text-[11px] font-semibold ${valColor} mt-0.5`}>{value}</div>
    </div>
  );
}

interface OutcomeProps {
  accent: AccentClasses;
  icon: ReactNode;
  label: string;
  detail: string;
}

function Outcome({ accent, icon, label, detail }: OutcomeProps) {
  return (
    <div className="flex items-start gap-3">
      <span className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md ${accent.bg} ${accent.text} mt-0.5`}>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-white">{label}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">{detail}</div>
      </div>
    </div>
  );
}

function PriorityChipMini({ priority }: { priority: string }) {
  return (
    <span className="text-[9px] font-mono font-bold tabular-nums">{priority}</span>
  );
}
