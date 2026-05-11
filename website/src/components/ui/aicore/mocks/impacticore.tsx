import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  GitBranch,
  History,
  RotateCcw,
  ShieldAlert,
  Users,
  XCircle,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  Chip,
  KpiTile,
  MockFrame,
  SectionLabel,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

export function ImpacticoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<GitBranch className="w-3.5 h-3.5" />}
          title="Değişiklik Yönetimi · CAB Önizleme"
          meta="Birikim · 11 Mar"
          accent={accent}
        />

        <div className="px-5 py-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums">
                  CHG-1148
                </span>
                <Chip tone="warn">Normal değişiklik</Chip>
                <Chip>Cuma 02:00-04:00</Chip>
              </div>
              <h4 className="text-sm font-semibold text-white tracking-tight leading-snug">
                Posta sunucusu Exchange 2019 → 2024 yükseltmesi
              </h4>
              <div className="mt-1 text-[11px] font-mono text-(--color-text-muted)">
                Talep eden: Mert Kaya · L2 Mesajlaşma · 11 Mar 08:42
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-end">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-red-400/55 bg-red-500/22 text-[11px] font-mono font-semibold text-red-200`}>
                <ShieldAlert className="w-3 h-3" />
                YÜKSEK RİSK
              </span>
              <span className="mt-1 text-[10px] font-mono text-(--color-text-muted)">
                AI skor 7.8 / 10
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/2 p-4">
            <SectionLabel accent={accent}>Etki Ağacı</SectionLabel>

            <div className="mt-3 font-mono text-[11px] space-y-1">
              <div className="flex items-center gap-2 text-white/85">
                <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
                <span className="font-semibold">SRV-MAIL kümesi</span>
                <span className="text-(--color-text-muted)">— birincil etki</span>
              </div>

              <TreeBranch label="SRV-MAIL-01" sub="Birincil · 14 şube hizmeti" status="down" />
              <TreeBranch label="SRV-MAIL-02" sub="İkincil · trafiği devralacak" status="ok" />

              <div className="flex items-center gap-2 mt-3 text-white/85">
                <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
                <span className="font-semibold">Bağımlı servisler</span>
                <span className="text-(--color-text-muted)">— dolaylı etki</span>
              </div>

              <TreeBranch
                label="Mobil Bankacılık · 2FA"
                sub="OTP e-posta kanalı bu sunucudan akar"
                status="risk"
              />
              <TreeBranch
                label="Şube bildirim servisi"
                sub="Yedek SMS akışı tamponluyor"
                status="warn"
              />
              <TreeBranch
                label="Müşteri kampanya e-postaları"
                sub="2 saat ertelenecek"
                status="warn"
                last
              />
            </div>

            <div className="mt-4 pt-3 border-t border-white/8 grid grid-cols-3 gap-3">
              <Stat icon={<Users className="w-3 h-3" />} label="Etkilenen kullanıcı" value="12.400" />
              <Stat icon={<Calendar className="w-3 h-3" />} label="Pencere" value="2 saat" />
              <Stat icon={<RotateCcw className="w-3 h-3" />} label="Rollback testi" value="Hazır" tone="ok" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <DimensionCard
              accent={accent}
              icon={<GitBranch className="w-3 h-3" />}
              label="Bağımlılık Riski"
              level="Yüksek"
              levelTone="danger"
              dots={3}
              note="3 dolaylı servis etkilenir"
            />
            <DimensionCard
              accent={accent}
              icon={<History className="w-3 h-3" />}
              label="Geçmiş Başarı"
              level="%89"
              levelTone="warn"
              dots={2}
              note="8 başarılı / 1 geri döndü"
            />
            <DimensionCard
              accent={accent}
              icon={<Calendar className="w-3 h-3" />}
              label="Zamanlama"
              level="Düşük"
              levelTone="ok"
              dots={1}
              note="Hafta sonu gece penceresi"
            />
            <DimensionCard
              accent={accent}
              icon={<RotateCcw className="w-3 h-3" />}
              label="Rollback Hazırlığı"
              level="Hazır"
              levelTone="ok"
              dots={1}
              note="DR senaryosu test edildi"
            />
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<History className="w-3.5 h-3.5" />}
            title="Benzer Değişiklikler · Son 18 Ay"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            <PastChange id="CHG-0871" title="Exchange 2016 → 2019" status="success" duration="1s 50dk" />
            <PastChange id="CHG-0734" title="SRV-MAIL kuyruk migrasyonu" status="success" duration="42dk" />
            <PastChange id="CHG-0682" title="Antispam ek modül" status="rollback" duration="3s 12dk" />
            <PastChange id="CHG-0621" title="Posta DB shard ayrımı" status="success" duration="2s 04dk" />
          </div>
        </MockFrame>

        <MockFrame className="border border-red-500/30">
          <TitleBar
            icon={<AlertTriangle className="w-3.5 h-3.5" />}
            title="Impacticore · CAB Önerisi"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white tabular-nums">7.8</span>
              <span className="text-sm font-mono text-(--color-text-muted)">/ 10 risk</span>
            </div>

            <div className="mt-3 space-y-2 text-[11px] text-white/85 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Pencere ve rollback hazırlığı uygun — <span className="text-emerald-300">onaylanabilir</span>.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Mobil 2FA bağımlılığı için yedek SMS kanalının önceden açılması{" "}
                  <span className="text-amber-300">şart</span>.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                <span>
                  Standard değişiklik kuyruğunda olamaz — <span className="text-red-300">CAB toplantısında</span> görüşülmeli.
                </span>
              </div>
            </div>

            <button className="mt-4 w-full inline-flex items-center justify-center gap-2 h-9 rounded-lg border border-red-400/40 bg-red-500/14 text-red-200 text-xs font-mono font-semibold cursor-pointer">
              <ShieldAlert className="w-3.5 h-3.5" />
              CAB toplantısına gönder
            </button>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<GitBranch className="w-3.5 h-3.5" />} title="Bu Çeyrek · CHG" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Skorlandı" value="142" trend="+%22" trendTone="up" />
            <KpiTile label="Yüksek risk" value="11" trend="CAB'a çıktı" trendTone="flat" />
            <KpiTile label="Otomatik onay" value="84" trend="standard" trendTone="up" />
            <KpiTile label="Geri dönüş" value="2" trend="dün 4" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface TreeBranchProps {
  label: string;
  sub: string;
  status: "ok" | "warn" | "risk" | "down";
  last?: boolean;
}

function TreeBranch({ label, sub, status, last = false }: TreeBranchProps) {
  const tone = {
    ok: { dot: "bg-emerald-400", chip: "text-emerald-300", text: "DEVAM" },
    warn: { dot: "bg-amber-400", chip: "text-amber-300", text: "GECİKME" },
    risk: { dot: "bg-red-400", chip: "text-red-300", text: "RİSK" },
    down: { dot: "bg-red-500", chip: "text-red-300", text: "KESİNTİ" },
  }[status];

  return (
    <div className="flex items-center gap-2 pl-4 relative">
      <span className="absolute left-1.5 top-0 bottom-1/2 w-px bg-white/15" />
      {!last && <span className="absolute left-1.5 top-1/2 bottom-0 w-px bg-white/15" />}
      <span className="absolute left-1.5 top-1/2 w-2.5 h-px bg-white/15" />
      <span className={`relative w-1.5 h-1.5 rounded-full ${tone.dot} ml-2`} />
      <span className="text-white/85">{label}</span>
      <span className="text-(--color-text-muted)">— {sub}</span>
      <span className={`ml-auto text-[10px] font-mono font-semibold ${tone.chip}`}>{tone.text}</span>
    </div>
  );
}

interface StatProps {
  icon: ReactNode;
  label: string;
  value: string;
  tone?: "ok" | "neutral";
}

function Stat({ icon, label, value, tone = "neutral" }: StatProps) {
  const valColor = tone === "ok" ? "text-emerald-300" : "text-white";
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
        {icon}
        <span className="tracking-wider">{trUpper(label)}</span>
      </div>
      <div className={`mt-1 text-sm font-semibold tabular-nums ${valColor}`}>{value}</div>
    </div>
  );
}

interface DimensionCardProps {
  accent: AccentClasses;
  icon: ReactNode;
  label: string;
  level: string;
  levelTone: "danger" | "warn" | "ok";
  dots: 1 | 2 | 3;
  note: string;
}

function DimensionCard({ icon, label, level, levelTone, dots, note }: DimensionCardProps) {
  const levelClass = {
    danger: "text-red-300",
    warn: "text-amber-300",
    ok: "text-emerald-300",
  }[levelTone];
  const dotClass = {
    danger: "bg-red-400",
    warn: "bg-amber-400",
    ok: "bg-emerald-400",
  }[levelTone];

  return (
    <div className="rounded-xl border border-white/8 bg-white/2 p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted) mb-2">
        {icon}
        <span className="tracking-wider">{trUpper(label)}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className={`text-sm font-semibold ${levelClass}`}>{level}</span>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i <= dots ? dotClass : "bg-white/12"}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-1 text-[10px] font-mono text-(--color-text-muted) leading-snug">
        {note}
      </div>
    </div>
  );
}

interface PastChangeProps {
  id: string;
  title: string;
  status: "success" | "rollback";
  duration: string;
}

function PastChange({ id, title, status, duration }: PastChangeProps) {
  return (
    <div className="px-4 py-2.5 flex items-center gap-3">
      {status === "success" ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
      ) : (
        <RotateCcw className="w-3.5 h-3.5 text-red-400 shrink-0" />
      )}
      <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0">
        {id}
      </span>
      <span className="text-xs text-white/85 truncate flex-1">{title}</span>
      <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0">
        {duration}
      </span>
    </div>
  );
}
