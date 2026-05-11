import {
  CheckCircle2,
  Clock,
  Link2,
  Merge,
  Server,
  Sparkles,
  Users,
} from "lucide-react";
import {
  type AccentClasses,
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  PriorityChip,
  SectionLabel,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

interface MergeCandidate {
  id: string;
  title: string;
  user: string;
  time: string;
  similarity: number;
  selected: boolean;
}

const PRIMARY = {
  id: "INC-2847",
  title: "Posta sunucusu yanıt vermiyor — şube ekipleri etkilendi",
  priority: "P0",
  user: "Selin Yıldız",
  time: "09:14",
  category: "Altyapı / E-posta",
};

const CANDIDATES: MergeCandidate[] = [
  { id: "INC-2848", title: "Bugün maillerim hiç açılmıyor lütfen yardım", user: "Ayşe Demir", time: "09:16", similarity: 94, selected: true },
  { id: "INC-2849", title: "Outlook donuyor postaları çekemiyorum", user: "Mert Kaya", time: "09:18", similarity: 91, selected: true },
  { id: "INC-2850", title: "E-mail çalışmıyor müşteri arıyor cevap veremiyorum", user: "Cem Polat", time: "09:19", similarity: 89, selected: true },
  { id: "INC-2852", title: "Posta sunucusu erişilemiyor diyor şube duyurusu yapılamadı", user: "Deniz Aydın", time: "09:21", similarity: 92, selected: true },
  { id: "INC-2854", title: "Mailler ne zaman gelir kuyruk birikti", user: "Burak Aslan", time: "09:24", similarity: 87, selected: true },
  { id: "INC-2856", title: "Outlook 'sunucuya bağlanılamıyor' hatası", user: "Kerem Doğan", time: "09:27", similarity: 90, selected: true },
];

function highlightTitle(title: string, keywords: string[]): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = title;
  let key = 0;

  while (remaining.length > 0) {
    let earliest: { index: number; word: string } | null = null;
    for (const word of keywords) {
      const idx = remaining.toLocaleLowerCase("tr-TR").indexOf(word.toLocaleLowerCase("tr-TR"));
      if (idx !== -1 && (earliest === null || idx < earliest.index)) {
        earliest = { index: idx, word };
      }
    }
    if (!earliest) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
    if (earliest.index > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, earliest.index)}</span>);
    }
    const matched = remaining.slice(earliest.index, earliest.index + earliest.word.length);
    parts.push(
      <span
        key={key++}
        className="bg-emerald-500/22 text-emerald-200 rounded px-0.5"
      >
        {matched}
      </span>
    );
    remaining = remaining.slice(earliest.index + earliest.word.length);
  }
  return <>{parts}</>;
}

const KEYWORDS = ["posta", "mail", "outlook", "sunucu", "kuyruk", "bağlan", "açılmıyor", "çalışmıyor"];

export function MergeCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const selectedCount = CANDIDATES.filter((c) => c.selected).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Merge className="w-3.5 h-3.5" />}
          title="MergeCoreAI · Aday Birleştirme"
          meta="Birikim · 09:30"
          accent={accent}
        />

        <div className="px-5 py-4 border-b border-white/8 bg-white/2">
          <div className="flex items-center gap-2 mb-2">
            <SectionLabel accent={accent}>Ana Kayıt</SectionLabel>
            <AiBadge label="seçildi" accent={accent} pulse={false} />
          </div>
          <div className="flex items-center gap-2.5">
            <PriorityChip priority={PRIMARY.priority} />
            <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums shrink-0">
              {PRIMARY.id}
            </span>
            <span className="text-sm text-white truncate flex-1 font-medium">
              {PRIMARY.title}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-[10px] font-mono text-(--color-text-muted)">
            <span>{PRIMARY.user}</span>
            <span>·</span>
            <span>{PRIMARY.time}</span>
            <span>·</span>
            <span>{PRIMARY.category}</span>
          </div>
        </div>

        <div className="px-5 py-3 flex items-center gap-2 border-b border-white/8">
          <Sparkles className={`w-3 h-3 ${accent.text}`} />
          <span className={`text-[11px] font-mono font-semibold ${accent.text}`}>
            6 olası kopya tespit edildi
          </span>
          <span className="ml-auto text-[10px] font-mono text-(--color-text-muted)">
            {selectedCount} işaretli
          </span>
        </div>

        <div className="relative">
          <svg
            className="absolute left-7 top-0 bottom-0 pointer-events-none"
            width="40"
            height="100%"
            viewBox="0 0 40 360"
            preserveAspectRatio="none"
          >
            {CANDIDATES.map((_, i) => {
              const y = 30 + i * 56;
              return (
                <path
                  key={i}
                  d={`M 8 0 L 8 ${y - 14} Q 8 ${y} 24 ${y}`}
                  fill="none"
                  className="stroke-emerald-400/40"
                  strokeWidth={1}
                  strokeDasharray="3 2"
                />
              );
            })}
            <circle cx="8" cy="0" r="3" className="fill-emerald-400" />
          </svg>

          <div className="divide-y divide-white/6">
            {CANDIDATES.map((c) => (
              <div key={c.id} className="px-5 py-3 pl-14 flex items-center gap-3">
                <div
                  className={`shrink-0 w-4 h-4 rounded border ${
                    c.selected
                      ? `${accent.border} ${accent.bg}`
                      : "border-white/15 bg-white/4"
                  } flex items-center justify-center`}
                >
                  {c.selected && <CheckCircle2 className={`w-3 h-3 ${accent.text}`} />}
                </div>
                <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0 w-16">
                  {c.id}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-white/85 truncate">
                    {highlightTitle(c.title, KEYWORDS)}
                  </div>
                  <div className="mt-0.5 text-[10px] font-mono text-(--color-text-muted)">
                    {c.user} · {c.time}
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <div className="w-16 h-1 rounded-full bg-white/8 overflow-hidden">
                    <div
                      className={`h-full ${accent.dot}`}
                      style={{ width: `${c.similarity}%` }}
                    />
                  </div>
                  <span className={`text-[11px] font-mono tabular-nums ${accent.text} w-9 text-right`}>
                    {c.similarity}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-3 border-t border-white/8 bg-white/2 flex items-center gap-2">
          <button className="text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
            Yeni cluster
          </button>
          <button className="text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
            Ayrı tut
          </button>
          <button
            className={`ml-auto inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer`}
          >
            <Merge className="w-3 h-3" />
            {selectedCount} kaydı birleştir
          </button>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Link2 className="w-3.5 h-3.5" />}
            title="Neden Benzer?"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3">
            <ReasonRow
              accent={accent}
              icon={<Server className="w-3 h-3" />}
              label="Ortak servis"
              note="SRV-MAIL kümesi"
              weight={0.34}
            />
            <ReasonRow
              accent={accent}
              icon={<Clock className="w-3 h-3" />}
              label="Zaman penceresi"
              note="09:14–09:27 (13 dk)"
              weight={0.28}
            />
            <ReasonRow
              accent={accent}
              icon={<Sparkles className="w-3 h-3" />}
              label="Anahtar kelime kümesi"
              note="posta · mail · outlook · sunucu"
              weight={0.24}
            />
            <ReasonRow
              accent={accent}
              icon={<Users className="w-3 h-3" />}
              label="Kullanıcı segmenti"
              note="14 farklı şube · ofis kullanıcıları"
              weight={0.14}
            />
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Merge className="w-3.5 h-3.5" />}
            title="Birleşme Sonrası"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                {trUpper("Tek kayıt")}
              </span>
              <PriorityChip priority="P0" />
              <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums">
                INC-2847
              </span>
            </div>
            <p className="text-xs text-white/85 leading-relaxed">
              Posta servisi kesintisi · 14 etkilenen kullanıcı tek olay altında toplandı,
              CSAT etkisi bir kayıttan ölçülecek.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] font-mono">
              <div>
                <div className="text-(--color-text-muted) tracking-wider">{trUpper("Önce")}</div>
                <div className="mt-0.5 text-white tabular-nums text-base">7</div>
                <div className="text-(--color-text-muted)">açık kayıt</div>
              </div>
              <div>
                <div className="text-(--color-text-muted) tracking-wider">{trUpper("Sonra")}</div>
                <div className={`mt-0.5 ${accent.text} tabular-nums text-base font-semibold`}>1</div>
                <div className="text-(--color-text-muted)">ana + 6 ek</div>
              </div>
              <div>
                <div className="text-(--color-text-muted) tracking-wider">{trUpper("Tasarruf")}</div>
                <div className="mt-0.5 text-emerald-300 tabular-nums text-base">~36 dk</div>
                <div className="text-(--color-text-muted)">L1 işi</div>
              </div>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Merge className="w-3.5 h-3.5" />} title="Bu Hafta · Birleştirme" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Cluster" value="38" trend="+12 hafta" trendTone="up" />
            <KpiTile label="Engellenen kopya" value="247" trend="L1 yükü ↓" trendTone="down" />
            <KpiTile label="Doğruluk" value="97%" trend="onaylanan" trendTone="flat" />
            <KpiTile label="Yanlış birleşme" value="3" trend="manuel ayrıldı" trendTone="flat" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface ReasonRowProps {
  accent: AccentClasses;
  icon: React.ReactNode;
  label: string;
  note: string;
  weight: number;
}

function ReasonRow({ accent, icon, label, note, weight }: ReasonRowProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md ${accent.bg} ${accent.text}`}>
          {icon}
        </span>
        <span className="text-xs font-medium text-white/85">{label}</span>
        <span className="ml-auto text-[10px] font-mono tabular-nums text-(--color-text-muted)">
          {(weight * 100).toFixed(0)}% ağırlık
        </span>
      </div>
      <div className="pl-7 flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
          <div
            className={`h-full rounded-full ${accent.dot}`}
            style={{ width: `${weight * 100}%` }}
          />
        </div>
        <Chip>{note}</Chip>
      </div>
    </div>
  );
}
