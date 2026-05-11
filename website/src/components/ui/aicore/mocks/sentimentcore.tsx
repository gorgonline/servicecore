import { Headphones, Heart, MessageSquare, TrendingDown } from "lucide-react";
import {
  AiBadge,
  Chip,
  MockFrame,
  PriorityChip,
  SectionLabel,
  Sparkline,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

export function SentimentCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Headphones className="w-3.5 h-3.5" />}
          title="Service Desk · Ticket Detayı"
          meta="BRK · 09:14"
          accent={accent}
        />

        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <PriorityChip priority="P1" />
            <span className="text-[11px] font-mono text-(--color-text-muted) tabular-nums">
              INC-2847
            </span>
            <Chip tone="warn">SLA · 1s 46d kaldı</Chip>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
              <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />
              Canlı
            </span>
          </div>

          <h4 className="text-base font-semibold text-white tracking-tight leading-snug">
            Posta sunucusu yanıt vermiyor — şube ekipleri etkilendi
          </h4>
          <p className="mt-1 text-xs text-(--color-text-muted)">
            Selin Yıldız (L1) · Birikim Holding · Atandı: Mert Kaya
          </p>

          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/3 p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/8 text-[10px] font-mono text-white/80">
                  SY
                </span>
                <span className="text-xs text-white/85 font-medium">Selin Yıldız</span>
                <span className="text-[10px] font-mono text-(--color-text-muted)">09:14</span>
                <AiBadge label="Öfke · 87%" accent={accent} />
              </div>
              <p className="text-xs text-white/75 leading-relaxed pl-8">
                &ldquo;Bu sorun <span className={`${accent.text} font-medium`}>üçüncü kez</span> bu ay yaşanıyor,
                çözümün ne zaman geleceğini öğrenmek istiyoruz.&rdquo;
              </p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/3 p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/8 text-[10px] font-mono text-white/80">
                  SY
                </span>
                <span className="text-xs text-white/85 font-medium">Selin Yıldız</span>
                <span className="text-[10px] font-mono text-(--color-text-muted)">09:21</span>
                <AiBadge label="Sabırsızlık · 64%" accent={accent} />
              </div>
              <p className="text-xs text-white/75 leading-relaxed pl-8">
                &ldquo;Şube müdürü beni arıyor, müşteri kuyruğu büyüyor, lütfen bir şey söyleyin.&rdquo;
              </p>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/3 p-3 opacity-70">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/8 text-[10px] font-mono text-white/80">
                  MK
                </span>
                <span className="text-xs text-white/85 font-medium">Mert Kaya</span>
                <span className="text-[10px] font-mono text-(--color-text-muted)">09:24</span>
              </div>
              <p className="text-xs text-white/65 leading-relaxed pl-8">
                &ldquo;Birincil posta sunucusunda kuyruk birikti, ikinciye trafik aktarıyorum.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Heart className="w-3.5 h-3.5" />}
            title="SentimentCoreAI · Konuşma Sinyali"
            meta="3 mesaj"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-4">
            <div>
              <SectionLabel accent={accent}>Genel Duygu</SectionLabel>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-white tabular-nums">−0.74</span>
                <span className={`text-xs font-mono ${accent.text}`}>çok olumsuz</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-white/8 overflow-hidden">
                <div
                  className={`h-full rounded-full ${accent.dot}`}
                  style={{ width: "87%" }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[9px] font-mono text-(--color-text-muted)">
                <span>−1.0</span>
                <span>0</span>
                <span>+1.0</span>
              </div>
            </div>

            <div>
              <SectionLabel>Duygu Eğilimi · Son 30 dk</SectionLabel>
              <div className="mt-2 flex items-end gap-3">
                <Sparkline
                  values={[-0.2, -0.35, -0.5, -0.62, -0.71, -0.74]}
                  accent={accent}
                  width={150}
                  height={36}
                />
                <div className="flex items-center gap-1 text-[10px] font-mono text-red-300">
                  <TrendingDown className="w-3 h-3" />
                  Kötüye gidiyor
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-white/4 px-2 py-1.5">
                <div className="text-[9px] font-mono text-(--color-text-muted) tracking-wider">{trUpper("Öfke")}</div>
                <div className="text-sm font-semibold text-white tabular-nums">87%</div>
              </div>
              <div className="rounded-lg bg-white/4 px-2 py-1.5">
                <div className="text-[9px] font-mono text-(--color-text-muted) tracking-wider">{trUpper("Sabırsız")}</div>
                <div className="text-sm font-semibold text-white tabular-nums">64%</div>
              </div>
              <div className="rounded-lg bg-white/4 px-2 py-1.5">
                <div className="text-[9px] font-mono text-(--color-text-muted) tracking-wider">{trUpper("Hayal Kır.")}</div>
                <div className="text-sm font-semibold text-white tabular-nums">52%</div>
              </div>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<MessageSquare className="w-3.5 h-3.5" />}
            title="Önerilen Aksiyonlar"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            <div className="flex items-start gap-2.5">
              <span className={`mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full ${accent.bg} ${accent.text} text-[9px] font-mono font-semibold`}>
                1
              </span>
              <p className="text-xs text-white/85 leading-snug">
                Servis yöneticisini eskalasyon listesine al — ikinci tekrar eden olay.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className={`mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full ${accent.bg} ${accent.text} text-[9px] font-mono font-semibold`}>
                2
              </span>
              <p className="text-xs text-white/85 leading-snug">
                Ara yanıt taslağı hazırla — empatik dil, ETA içersin (Replycore).
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className={`mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full ${accent.bg} ${accent.text} text-[9px] font-mono font-semibold`}>
                3
              </span>
              <p className="text-xs text-white/85 leading-snug">
                Çözüm sonrası CSAT anketini öncelikli kuyruğa ekle.
              </p>
            </div>
          </div>
        </MockFrame>
      </div>
    </div>
  );
}
