import { ArrowRight, Filter, Inbox, Layers, Users } from "lucide-react";
import {
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

interface QueueItem {
  id: string;
  title: string;
  priority: string;
  company: string;
  rawCategory: string;
  category: string;
  team: string;
  confidence: number;
  active?: boolean;
}

const QUEUE: QueueItem[] = [
  {
    id: "INC-2847",
    title: "Posta sunucusu yanıt vermiyor — şube ekipleri etkilendi",
    priority: "P1",
    company: "BRK",
    rawCategory: "Altyapı",
    category: "Altyapı / E-posta",
    team: "Mesajlaşma Ekibi",
    confidence: 96,
    active: true,
  },
  {
    id: "INC-2851",
    title: "Çekirdek bankacılık ekranı 502 hatası veriyor",
    priority: "P1",
    company: "BRK",
    rawCategory: "Uygulama",
    category: "Çekirdek Bankacılık / API",
    team: "Çekirdek Bankacılık",
    confidence: 94,
  },
  {
    id: "INC-7104",
    title: "Gebze deposu el terminalleri kablosuz ağda kalmıyor",
    priority: "P2",
    company: "VNT",
    rawCategory: "Saha",
    category: "Saha / Kablosuz Ağ",
    team: "Saha Mühendisliği",
    confidence: 91,
  },
  {
    id: "REQ-9132",
    title: "Yeni başlayan kullanıcı için VPN erişim talebi",
    priority: "P3",
    company: "BRK",
    rawCategory: "Erişim",
    category: "Erişim / VPN",
    team: "Kimlik & Erişim",
    confidence: 99,
  },
  {
    id: "INC-7115",
    title: "Soğuk zincir aracı GPS sinyali kayboldu",
    priority: "P2",
    company: "VNT",
    rawCategory: "Saha",
    category: "Saha / IoT",
    team: "Saha Mühendisliği",
    confidence: 88,
  },
  {
    id: "REQ-1442",
    title: "Online sınav portalı şifre sıfırlama akışı çalışmıyor",
    priority: "P2",
    company: "LYR",
    rawCategory: "Self-Service",
    category: "Self-Service / Kimlik",
    team: "Kimlik & Erişim",
    confidence: 73,
  },
];

export function ClassifyCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const active = QUEUE.find((q) => q.active) ?? QUEUE[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Inbox className="w-3.5 h-3.5" />}
          title="Service Desk · Triage Kuyruğu"
          meta="Birikim · Vento · Lyra"
          accent={accent}
        />

        <div className="px-4 py-2.5 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <Filter className="w-3 h-3 text-(--color-text-muted)" />
          <button className={`text-[11px] font-mono px-2 py-1 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer`}>
            Tümü · 47
          </button>
          <button className="text-[11px] font-mono px-2 py-1 rounded-md text-white/60 hover:bg-white/5 cursor-pointer">
            Sınıflandırıldı · 42
          </button>
          <button className="text-[11px] font-mono px-2 py-1 rounded-md text-white/60 hover:bg-white/5 cursor-pointer">
            Belirsiz · 5
          </button>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
            <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />
            canlı
          </span>
        </div>

        <div className="divide-y divide-white/6">
          {QUEUE.map((q) => (
            <div
              key={q.id}
              className={`px-4 py-3 ${q.active ? "bg-white/5" : "hover:bg-white/3"}`}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <PriorityChip priority={q.priority} />
                <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0">
                  {q.id}
                </span>
                <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0">
                  {q.company}
                </span>
                <span className="text-xs text-white/85 truncate flex-1">{q.title}</span>
              </div>
              <div className="flex items-center gap-2 pl-12">
                <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0">
                  {q.rawCategory}
                </span>
                <ArrowRight className="w-2.5 h-2.5 text-(--color-text-muted) shrink-0" />
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${accent.border} ${accent.bg} text-[10px] font-mono font-medium ${accent.text}`}
                >
                  {q.category}
                </span>
                <span className="text-[10px] text-(--color-text-muted) shrink-0">→</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-white/75">
                  <Users className="w-2.5 h-2.5" />
                  {q.team}
                </span>
                <span
                  className={`ml-auto text-[10px] font-mono tabular-nums shrink-0 ${
                    q.confidence >= 90 ? accent.text : "text-(--color-text-muted)"
                  }`}
                >
                  {q.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Layers className="w-3.5 h-3.5" />}
            title="ClassifyCore · Karar Akışı"
            meta={active.id}
            accent={accent}
          />

          <div className="px-5 py-4 space-y-4">
            <div>
              <SectionLabel accent={accent}>Ham Giriş</SectionLabel>
              <p className="mt-1.5 text-xs text-white/85 leading-relaxed">
                &ldquo;Posta sunucusu yanıt vermiyor, 14 şubeden çağrı geliyor.&rdquo;
              </p>
              <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">
                Selin Yıldız · L1 · 09:14
              </div>
            </div>

            <div>
              <SectionLabel>Sınıflandırma Zinciri</SectionLabel>
              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center px-2 py-1 rounded-md border border-white/10 bg-white/4 text-[10px] font-mono text-white/75">
                  Altyapı
                </span>
                <ArrowRight className="w-3 h-3 text-(--color-text-muted)" />
                <span className={`inline-flex items-center px-2 py-1 rounded-md border ${accent.border} ${accent.bg} text-[10px] font-mono ${accent.text} font-semibold`}>
                  E-posta
                </span>
                <ArrowRight className="w-3 h-3 text-(--color-text-muted)" />
                <span className={`inline-flex items-center px-2 py-1 rounded-md border ${accent.border} ${accent.bg} text-[10px] font-mono ${accent.text} font-semibold`}>
                  Çekirdek hizmet
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                <span className="text-(--color-text-muted)">Güven skoru</span>
                <span className={accent.text}>%96 · yüksek</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-white/8 overflow-hidden">
                <div className={`h-full rounded-full ${accent.dot}`} style={{ width: "96%" }} />
              </div>
            </div>

            <div>
              <SectionLabel>Beceri Eşleşmesi</SectionLabel>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Chip tone="success">Exchange</Chip>
                <Chip tone="success">SMTP</Chip>
                <Chip tone="success">Yedek-yük dengeleme</Chip>
                <Chip>Powershell</Chip>
              </div>
            </div>

            <div className={`rounded-xl border ${accent.border} ${accent.bg} p-3`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-semibold tracking-[0.18em] text-white/85">
                  {trUpper("Önerilen Atama")}
                </span>
                <AiBadge label="otomatik" accent={accent} pulse={false} />
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/8 text-[11px] font-mono font-semibold text-white">
                  MK
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-white">Mert Kaya</div>
                  <div className="text-[10px] font-mono text-(--color-text-muted)">
                    L2 · Mesajlaşma · 2 P1 yüklü · 12 dk müsait
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-white/8 grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                <div>
                  <div className="text-(--color-text-muted)">Beceri</div>
                  <div className={accent.text}>%98</div>
                </div>
                <div>
                  <div className="text-(--color-text-muted)">Yük</div>
                  <div className="text-white/85">orta</div>
                </div>
                <div>
                  <div className="text-(--color-text-muted)">Geçmiş</div>
                  <div className="text-white/85">31 benzer</div>
                </div>
              </div>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<Inbox className="w-3.5 h-3.5" />}
            title="Bugün · Sınıflandırma"
            accent={accent}
          />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Sınıflandı" value="384" trend="+%18 hafta" trendTone="up" />
            <KpiTile label="Doğruluk" value="96%" trend="±0" trendTone="flat" />
            <KpiTile label="Belirsiz" value="5" trend="manuel" trendTone="flat" />
            <KpiTile label="Ort. Süre" value="0.4s" trend="ticket başı" trendTone="flat" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}
