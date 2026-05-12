import { Activity, AlertTriangle, Clock, TrendingUp } from "lucide-react";
import {
  Chip,
  KpiTile,
  MockFrame,
  PriorityChip,
  SectionLabel,
  Sparkline,
  TicketRow,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

export function PredictCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<AlertTriangle className="w-3.5 h-3.5" />}
          title="PredictCoreAI · Hizmet Seviyesi İhlal Riski"
          meta="11 Mar · canlı"
          accent={accent}
        />

        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <PriorityChip priority="P1" />
            <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums">
              INC-2847
            </span>
            <Chip tone="warn">Hizmet Seviyesi · 1s 46d kaldı</Chip>
          </div>
          <h4 className="text-sm font-semibold text-white tracking-tight leading-snug mb-3">
            Posta sunucusu yanıt vermiyor — şube ekipleri etkilendi
          </h4>

          <div className="rounded-2xl border border-white/8 bg-white/2 p-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <SectionLabel accent={accent}>Tahmini İhlal Olasılığı</SectionLabel>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white tabular-nums tracking-tight">
                    78
                  </span>
                  <span className={`text-xl font-semibold ${accent.text}`}>%</span>
                </div>
                <div className="mt-1 text-[11px] font-mono text-(--color-text-muted)">
                  güven aralığı 71% – 84%
                </div>
              </div>
              <div className="text-right">
                <SectionLabel>Tahmini Çözüm Süresi</SectionLabel>
                <div className="mt-2 text-2xl font-semibold text-white tabular-nums tracking-tight">
                  3<span className="text-base text-(--color-text-muted)">s</span> 12
                  <span className="text-base text-(--color-text-muted)">dk</span>
                </div>
                <div className="mt-1 text-[11px] font-mono text-red-300">
                  Hizmet Seviyesi&apos;yı 1s 26dk aşıyor
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-(--color-text-muted) tracking-wider">
                  {trUpper("Risk Eğrisi · Son 4 saat")}
                </span>
                <div className="flex items-center gap-1 text-[10px] font-mono text-red-300">
                  <TrendingUp className="w-3 h-3" />
                  +34 puan
                </div>
              </div>
              <Sparkline
                values={[18, 22, 28, 35, 41, 52, 64, 71, 78]}
                accent={accent}
                width={420}
                height={56}
                showThreshold={50}
              />
              <div className="mt-1.5 flex justify-between text-[9px] font-mono text-(--color-text-muted)">
                <span>05:14</span>
                <span>06:14</span>
                <span>07:14</span>
                <span>08:14</span>
                <span className={accent.text}>şimdi · 09:14</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <SectionLabel accent={accent}>Tahmin Gerekçesi</SectionLabel>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="rounded-lg border border-white/8 bg-white/2 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/85">Benzer 47 incident geçmişi</span>
                  <span className={`text-xs font-mono ${accent.text} tabular-nums`}>+38%</span>
                </div>
                <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">
                  Posta sunucusu, P1, son 90 gün
                </div>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/2 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/85">Yedek sunucu kapasitesi düşük</span>
                  <span className={`text-xs font-mono ${accent.text} tabular-nums`}>+22%</span>
                </div>
                <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">
                  CPU 84%, kuyruk 12.400 mesaj
                </div>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/2 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/85">Atanan teknisyen yük 6 P1</span>
                  <span className={`text-xs font-mono ${accent.text} tabular-nums`}>+12%</span>
                </div>
                <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">
                  Mert Kaya · paralel işler aktif
                </div>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/2 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/85">Etkilenen kullanıcı sayısı tırmanıyor</span>
                  <span className={`text-xs font-mono ${accent.text} tabular-nums`}>+6%</span>
                </div>
                <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">
                  +124 / saat — 14 şube
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-4 rounded-xl border ${accent.border} ${accent.bg} p-3 flex items-start gap-3`}>
            <Activity className={`w-4 h-4 ${accent.text} shrink-0 mt-0.5`} />
            <div>
              <div className="text-xs font-semibold text-white">Önerilen Aksiyon</div>
              <div className="mt-0.5 text-xs text-white/80 leading-relaxed">
                Atamayı vardiya yöneticisine eskalasyona aç + ikinci posta sunucusuna trafik
                yönlendir. Bu iki adım uygulanırsa risk %78 → %34&apos;e düşer.
              </div>
            </div>
          </div>
        </div>
      </MockFrame>

      <MockFrame>
        <TitleBar
          icon={<Clock className="w-3.5 h-3.5" />}
          title="Risk Altındaki Açık Kayıtlar"
          meta="bugün"
          accent={accent}
        />

        <div className="px-4 py-3">
          <div className="grid grid-cols-3 gap-2 mb-3">
            <KpiTile label="Yüksek Risk" value="7" trend="+2 saat" trendTone="down" />
            <KpiTile label="Orta Risk" value="14" trend="±0" trendTone="flat" />
            <KpiTile label="İhlal" value="2" trend="dün 5" trendTone="up" />
          </div>
        </div>

        <div className="border-t border-white/8">
          <TicketRow
            id="INC-2847"
            title="Posta sunucusu yanıt vermiyor"
            priority="P1"
            meta="78%"
            active
            rightSlot={<span className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />}
          />
          <TicketRow
            id="INC-2851"
            title="Çekirdek bankacılık 502 hatası"
            priority="P1"
            meta="62%"
          />
          <TicketRow
            id="INC-7104"
            title="Gebze deposu el terminalleri kopuyor"
            priority="P2"
            meta="58%"
          />
          <TicketRow
            id="INC-7115"
            title="Soğuk zincir aracı GPS sinyali"
            priority="P2"
            meta="44%"
          />
          <TicketRow
            id="REQ-1442"
            title="Online sınav portalı şifre sıfırlama"
            priority="P2"
            meta="36%"
          />
          <TicketRow
            id="INC-1487"
            title="Kütüphane Wi-Fi yoğun saatlerde"
            priority="P3"
            meta="21%"
          />
        </div>
      </MockFrame>
    </div>
  );
}
