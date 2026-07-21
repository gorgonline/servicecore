import {
  Check,
  Database,
  History,
  Moon,
  Pencil,
  RefreshCcw,
  Scale,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

type Stage = "tarama" | "cikarim" | "yargic" | "onay" | "bakim";

interface LoopStep {
  time: string;
  stage: Stage;
  title: string;
  detail: string;
  current?: boolean;
}

const LOOP_STEPS: LoopStep[] = [
  {
    time: "03:00",
    stage: "tarama",
    title: "14 yeni olumsuz geri bildirim okundu",
    detail: "İmleç #4807 → #4821 · hiçbir oy iki kez sayılmaz, hiçbiri kaçmaz",
  },
  {
    time: "03:04",
    stage: "cikarim",
    title: "5 tekrar eden hata kalıbı çıkarıldı",
    detail: "Kategori + tek cümlelik kural + güven seviyesi",
  },
  {
    time: "03:09",
    stage: "yargic",
    title: "Kalite yargıcı: 3/5 bulgu eşiği geçti",
    detail: "0-10 ölçek · eşik 7.0 · puan kalıcı yazılır",
  },
  {
    time: "03:12",
    stage: "onay",
    title: "3 kural insan onay kuyruğunda",
    detail: "Onaysız hiçbir kural devreye girmez",
    current: true,
  },
  {
    time: "03:15",
    stage: "bakim",
    title: "1 ders pekişti · 2 kural söndü",
    detail: "Tekrar eden ders kanıt kazanır; pekişmeyen kural zamanla erir",
  },
];

const STAGE_META: Record<Stage, { label: string; icon: ReactNode; color: string }> = {
  tarama: { label: "Tarama", icon: <Database className="w-3 h-3" />, color: "text-cyan-300 bg-cyan-500/12 border-cyan-400/30" },
  cikarim: { label: "Çıkarım", icon: <Sparkles className="w-3 h-3" />, color: "text-purple-300 bg-purple-500/12 border-purple-400/30" },
  yargic: { label: "Yargıç", icon: <Scale className="w-3 h-3" />, color: "text-amber-300 bg-amber-500/12 border-amber-400/30" },
  onay: { label: "İnsan Onayı", icon: <UserCheck className="w-3 h-3" />, color: "text-emerald-300 bg-emerald-500/12 border-emerald-400/30" },
  bakim: { label: "Bakım", icon: <RefreshCcw className="w-3 h-3" />, color: "text-blue-300 bg-blue-500/12 border-blue-400/30" },
};

interface StoredRule {
  text: string;
  status: "pekisti" | "aktif" | "sonuyor";
  meta: string;
  strength: number;
}

const STORED_RULES: StoredRule[] = [
  {
    text: "Parola sıfırlama kayıtlarında self-servis bağlantısını cevabın en üstünde ver.",
    status: "pekisti",
    meta: "kanıt 5 · güven yüksek",
    strength: 90,
  },
  {
    text: "Yazıcı kayıtlarında sürücü sürümü sorulmadan kurulum adımı önerme.",
    status: "aktif",
    meta: "kanıt 3 · güven orta",
    strength: 60,
  },
  {
    text: "Eski VPN istemcisine ait kurulum adımlarını önerme.",
    status: "sonuyor",
    meta: "21 gündür pekişmedi",
    strength: 25,
  },
];

const RULE_STATUS_CHIP: Record<StoredRule["status"], { label: string; tone: "success" | "info" | "warn" }> = {
  pekisti: { label: "pekişti", tone: "success" },
  aktif: { label: "aktif", tone: "info" },
  sonuyor: { label: "sönüyor", tone: "warn" },
};

export function RootCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Moon className="w-3.5 h-3.5" />}
          title="Gece Koşusu · Öğrenme Döngüsü"
          meta="feedback.db · son tarama 03:00"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <AiBadge label="teknisyen geri bildiriminden öğrenir" accent={accent} />
          <Chip tone="info">5 aşama</Chip>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
            <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />
            gece döngüsü
          </span>
        </div>

        <div className="relative px-5 py-4">
          <div className="absolute top-4 bottom-4 left-12 w-px bg-white/12" />
          <div className="space-y-3.5">
            {LOOP_STEPS.map((s) => {
              const meta = STAGE_META[s.stage];
              return (
                <div key={s.time} className="relative flex items-start gap-3">
                  <div className="w-7 text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0 pt-1">
                    {s.time}
                  </div>
                  <div className="relative shrink-0">
                    <span
                      className={`relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full border ${meta.color} ${
                        s.current ? `ring-2 ${accent.ring}` : ""
                      }`}
                    >
                      {meta.icon}
                    </span>
                    {s.current && (
                      <span className={`absolute inset-0 rounded-full ${accent.dot} opacity-30 animate-ping`} />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-lg border ${
                      s.current ? `${accent.border} ${accent.bg}` : "border-white/8 bg-white/2"
                    } px-3 py-2`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[9px] font-mono font-semibold ${meta.color}`}
                      >
                        {trUpper(meta.label)}
                      </span>
                      {s.current && (
                        <span className={`ml-auto text-[10px] font-mono font-semibold ${accent.text}`}>
                          {trUpper("insan kararı bekliyor")}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-white/90 font-medium">{s.title}</div>
                    <div className="text-[11px] text-(--color-text-muted)">{s.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<UserCheck className="w-3.5 h-3.5" />}
            title="Onay Kuyruğu · İnsan Kararı"
            meta="3 kural beklemede"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-2.5">
              <Chip tone="neutral">eskalasyon_kalibi</Chip>
              <Chip tone="warn">yargıç 8.4/10</Chip>
              <Chip tone="info">4 kanıt</Chip>
            </div>
            <p className="text-[12px] text-white/90 leading-snug">
              VPN bağlantı kayıtlarında kullanıcıya doğrudan yeniden kurulum önerme;
              önce MFA oturum durumunun kontrolünü öner.
            </p>
            <div className="mt-2 text-[10px] font-mono text-(--color-text-muted)">
              4 teknisyen reddi aynı kalıbı gösteriyor · son örnek INC-31842
            </div>

            <div className="mt-4 pt-3 border-t border-white/8 flex items-center gap-2">
              <button
                className={`flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
              >
                <Check className="w-3 h-3" />
                Onayla
              </button>
              <button className="text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5">
                <Pencil className="w-3 h-3" />
                Düzelt
              </button>
              <button className="text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5">
                <X className="w-3 h-3" />
                Reddet
              </button>
            </div>
          </div>
        </MockFrame>

        <MockFrame className={accent.glow}>
          <TitleBar
            icon={<RefreshCcw className="w-3.5 h-3.5" />}
            title="Kural Deposu · Pekiştirme & Unutma"
            meta="onaylı kurallar"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3">
            {STORED_RULES.map((r) => (
              <RuleRow key={r.text} rule={r} accent={accent} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<History className="w-3.5 h-3.5" />}
            title="Bu Çeyrek · RootCore"
            accent={accent}
          />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Taranan Oy" value="1.248" trend="geri bildirim" trendTone="up" />
            <KpiTile label="Çıkan Bulgu" value="86" trend="yargıç süzgeçli" trendTone="up" />
            <KpiTile label="Onaylı Kural" value="31" trend="insan kararı" trendTone="up" />
            <KpiTile label="Sönen Kural" value="12" trend="oto bakım" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface RuleRowProps {
  rule: StoredRule;
  accent: AccentClasses;
}

function RuleRow({ rule, accent }: RuleRowProps) {
  const chip = RULE_STATUS_CHIP[rule.status];
  return (
    <div className={`rounded-xl border ${rule.status === "pekisti" ? accent.border : "border-white/8"} ${rule.status === "pekisti" ? accent.bg : "bg-white/2"} p-3`}>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-white/90 leading-snug">{rule.text}</p>
          <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">{rule.meta}</div>
        </div>
        <Chip tone={chip.tone} className="shrink-0">
          {chip.label}
        </Chip>
      </div>
      <div className="mt-2 h-1 rounded-full bg-white/8 overflow-hidden">
        <div
          className={`h-full rounded-full ${rule.status === "sonuyor" ? "bg-white/25" : accent.dot}`}
          style={{ width: `${rule.strength}%` }}
        />
      </div>
    </div>
  );
}
