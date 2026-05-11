import {
  BookOpen,
  CheckCircle2,
  FileText,
  Layers,
  Link2,
  Sparkles,
  Tag,
  Wand2,
} from "lucide-react";
import {
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  SectionLabel,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

export function KnowCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<BookOpen className="w-3.5 h-3.5" />}
          title="Bilgi Bankası · AI Taslak"
          meta="KB-DRAFT-2284"
          accent={accent}
        />

        <div className="px-5 py-4 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <AiBadge label="otomatik üretildi" accent={accent} />
          <Chip tone="info">Workaround</Chip>
          <Chip>4 kaynak kayıt</Chip>
          <span className="ml-auto text-[10px] font-mono text-(--color-text-muted)">
            2.8s&apos;de hazırlandı
          </span>
        </div>

        <div className="px-6 py-5">
          <h4 className="text-base font-semibold text-white tracking-tight leading-snug">
            Posta sunucusu kuyruk birikmesinde ikinci sunucuya trafik yönlendirme
          </h4>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Tag className="w-3 h-3 text-(--color-text-muted)" />
            <Chip>posta</Chip>
            <Chip>exchange</Chip>
            <Chip>kuyruk</Chip>
            <Chip>yük dengeleme</Chip>
            <Chip>sla</Chip>
          </div>

          <div className="mt-5 space-y-4">
            <Section accent={accent} label="Belirti">
              Şube ekipleri Outlook&apos;ta &ldquo;sunucuya bağlanılamıyor&rdquo; uyarısı görür, gönderim
              kuyruğu birikir, gelen kutusu yenilenmez. Aynı dakikalarda{" "}
              <span className={`${accent.text} font-medium`}>14 farklı şubeden</span> birden çok
              destek talebi açılır.
            </Section>

            <Section accent={accent} label="Kök Neden">
              Birincil posta sunucusu (SRV-MAIL-01) kuyruğu eşik üzerine çıkınca trafik otomatik
              olarak ikinciye aktarılmıyor. Yedek devreye giriş eşiği yapılandırma dosyasında{" "}
              <span className="font-mono text-white/85">queue_threshold = 8000</span> olarak
              kalıyor; aktif yük ortalaması 12.000 mesaja yakın seyrediyor.
            </Section>

            <Section accent={accent} label="Çözüm Adımları">
              <ol className="space-y-2 mt-1">
                <Step n={1}>
                  <span>
                    Yönetici konsolunda <span className="font-mono text-white">SRV-MAIL-01 → Trafik</span>{" "}
                    sekmesini açın.
                  </span>
                </Step>
                <Step n={2}>
                  <span>
                    Yedek geçiş eşiğini <span className="font-mono text-white">5000</span>&apos;a düşürün
                    ve yapılandırmayı kaydedin.
                  </span>
                </Step>
                <Step n={3}>
                  <span>
                    SRV-MAIL-02 üzerinde <span className="font-mono text-white">queue:warm</span>{" "}
                    durumunu doğrulayın.
                  </span>
                </Step>
                <Step n={4}>
                  <span>
                    Kuyruk drenajını izleyin — 8 dakika içinde 0&apos;a inmesi beklenir.
                  </span>
                </Step>
              </ol>
            </Section>

            <Section accent={accent} label="İlgili Varlıklar">
              <div className="flex flex-wrap gap-1.5 mt-1">
                <AssetChip>SRV-MAIL-01</AssetChip>
                <AssetChip>SRV-MAIL-02</AssetChip>
                <AssetChip>LB-WEB-02</AssetChip>
                <AssetChip>AD-CTRL-01</AssetChip>
              </div>
            </Section>
          </div>

          <div className="mt-5 pt-4 border-t border-white/8">
            <div className="flex items-center gap-2 mb-3">
              <Link2 className={`w-3 h-3 ${accent.text}`} />
              <span className="text-[10px] font-mono font-semibold tracking-[0.18em] text-white/85">
                {trUpper("Bu Taslağı Besleyen Kayıtlar")}
              </span>
            </div>
            <div className="space-y-1.5">
              <SourceTicket id="INC-2847" title="Posta sunucusu yanıt vermiyor" date="11 Mar" weight={0.42} accent={accent} primary />
              <SourceTicket id="INC-2691" title="Mailler 30 dk gecikmeli" date="04 Şub" weight={0.24} accent={accent} />
              <SourceTicket id="INC-2418" title="Şube postası kuyrukta" date="17 Oca" weight={0.21} accent={accent} />
              <SourceTicket id="INC-2103" title="Outlook bağlanamıyor (3 şube)" date="22 Ara" weight={0.13} accent={accent} />
            </div>
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Üretim Skoru"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                {trUpper("Kalite Skoru")}
              </span>
              <span className="text-2xl font-semibold text-white tabular-nums">8.6<span className="text-sm text-(--color-text-muted)">/10</span></span>
            </div>
            <ScoreBar accent={accent} label="Tamlık" value={92} />
            <ScoreBar accent={accent} label="Açıklık" value={88} />
            <ScoreBar accent={accent} label="Atıf doğruluğu" value={95} />
            <ScoreBar accent={accent} label="Tekrar kullanılabilirlik" value={73} />
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Wand2 className="w-3.5 h-3.5" />} title="Yayın Akışı" accent={accent} />
          <div className="px-5 py-4">
            <div className="space-y-3">
              <FlowStep done label="AI taslak hazırlandı" detail="2.8s · 4 kaynak" />
              <FlowStep done label="Şablon eşleşmesi" detail="Workaround" />
              <FlowStep current accent={accent} label="Editör incelemesi" detail="Ayşe Demir · bekliyor" />
              <FlowStep label="Yayın" detail="Self-service portal + arama" />
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
                Düzenle
              </button>
              <button className={`flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer`}>
                Yayınla
              </button>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<BookOpen className="w-3.5 h-3.5" />} title="Bu Ay · KB Üretimi" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Üretildi" value="71" trend="+%34" trendTone="up" />
            <KpiTile label="Yayında" value="58" trend="onaylandı" trendTone="up" />
            <KpiTile label="Self-Servis çözüm" value="42%" trend="↑ 8 puan" trendTone="up" />
            <KpiTile label="Ort. süre" value="3.1s" trend="taslak/kayıt" trendTone="flat" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface SectionProps {
  accent: ReturnType<typeof resolveAccent>;
  label: string;
  children: React.ReactNode;
}

function Section({ accent, label, children }: SectionProps) {
  return (
    <div>
      <SectionLabel accent={accent}>{label}</SectionLabel>
      <div className="mt-1.5 text-sm font-light text-white/85 leading-relaxed">{children}</div>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm font-light text-white/85 leading-relaxed">
      <span className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/15 bg-white/4 text-[10px] font-mono tabular-nums text-white/85 mt-0.5">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

function AssetChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-white/10 bg-white/4 text-[11px] font-mono text-white/85">
      <Layers className="w-2.5 h-2.5 text-(--color-text-muted)" />
      {children}
    </span>
  );
}

interface SourceTicketProps {
  id: string;
  title: string;
  date: string;
  weight: number;
  accent: ReturnType<typeof resolveAccent>;
  primary?: boolean;
}

function SourceTicket({ id, title, date, weight, accent, primary = false }: SourceTicketProps) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${
        primary ? accent.border : "border-white/8"
      } ${primary ? accent.bg : "bg-white/2"}`}
    >
      <FileText className={`w-3 h-3 ${primary ? accent.text : "text-(--color-text-muted)"} shrink-0`} />
      <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0">
        {id}
      </span>
      <span className="text-xs text-white/85 truncate flex-1">{title}</span>
      <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0">{date}</span>
      <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden shrink-0">
        <div className={`h-full ${accent.dot}`} style={{ width: `${weight * 100}%` }} />
      </div>
      <span className={`text-[10px] font-mono tabular-nums shrink-0 ${primary ? accent.text : "text-(--color-text-muted)"}`}>
        {(weight * 100).toFixed(0)}%
      </span>
    </div>
  );
}

interface ScoreBarProps {
  accent: ReturnType<typeof resolveAccent>;
  label: string;
  value: number;
}

function ScoreBar({ accent, label, value }: ScoreBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1 text-[11px]">
        <span className="text-white/85">{label}</span>
        <span className={`font-mono tabular-nums ${value >= 90 ? accent.text : "text-(--color-text-muted)"}`}>
          %{value}
        </span>
      </div>
      <div className="h-1 rounded-full bg-white/8 overflow-hidden">
        <div className={`h-full rounded-full ${accent.dot}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

interface FlowStepProps {
  label: string;
  detail: string;
  done?: boolean;
  current?: boolean;
  accent?: ReturnType<typeof resolveAccent>;
}

function FlowStep({ label, detail, done = false, current = false, accent }: FlowStepProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full border ${
          done
            ? "border-emerald-400/50 bg-emerald-500/14 text-emerald-300"
            : current && accent
              ? `${accent.border} ${accent.bg} ${accent.text}`
              : "border-white/12 bg-white/4 text-(--color-text-muted)"
        }`}
      >
        {done ? (
          <CheckCircle2 className="w-3 h-3" />
        ) : current ? (
          <span className={`w-1.5 h-1.5 rounded-full ${accent?.dot ?? "bg-white/40"} animate-pulse`} />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className={`text-xs font-medium ${done ? "text-white/85" : current ? "text-white" : "text-white/55"}`}>
          {label}
        </div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">{detail}</div>
      </div>
    </div>
  );
}
