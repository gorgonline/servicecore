import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronUp,
  Clock,
  GraduationCap,
  Heart,
  MessageCircle,
  Sparkles,
  Star,
  Target,
  UserCheck,
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

interface Skill {
  label: string;
  current: number;
  target: number;
  baseline: number;
}

const SKILLS: Skill[] = [
  { label: "Teknik Beceri", current: 8.6, target: 9.0, baseline: 7.8 },
  { label: "Çözüm Hızı", current: 8.2, target: 8.5, baseline: 7.4 },
  { label: "İletişim Tonu", current: 5.4, target: 7.5, baseline: 6.1 },
  { label: "Müşteri Empatisi", current: 5.8, target: 7.5, baseline: 6.4 },
  { label: "Takım Çalışması", current: 7.2, target: 8.0, baseline: 7.0 },
];

interface Training {
  title: string;
  duration: string;
  type: "video" | "atölye" | "okuma";
  effect: string;
  selected?: boolean;
}

const TRAININGS: Training[] = [
  {
    title: "Empatik İletişim · Pratik Senaryolar",
    duration: "4 saat · 6 oturum",
    type: "atölye",
    effect: "İletişim Tonu +1.8 (tahmini)",
    selected: true,
  },
  {
    title: "Zor Müşteri Yönetimi",
    duration: "2 saat · canlı",
    type: "video",
    effect: "Müşteri Empatisi +1.2",
  },
  {
    title: "ITIL4 · Servis Mantığı Yeniden",
    duration: "90 dk",
    type: "okuma",
    effect: "Takım Çalışması +0.6",
  },
];

interface PlanItem {
  icon: ReactNode;
  title: string;
  cadence: string;
}

const PLAN: PlanItem[] = [
  {
    icon: <Sparkles className="w-3 h-3" />,
    title: "Her yanıt taslağında ToneCoreAI'yi açık tut",
    cadence: "günlük · arka plan",
  },
  {
    icon: <UserCheck className="w-3 h-3" />,
    title: "Ayşe Demir ile 1:1 mentor görüşmesi",
    cadence: "haftalık · 30 dk",
  },
  {
    icon: <MessageCircle className="w-3 h-3" />,
    title: "5 olumsuz CSAT için kapanış görüşmesi",
    cadence: "ay sonu · gönüllü",
  },
  {
    icon: <BookOpen className="w-3 h-3" />,
    title: "Empatik İletişim atölyesi tamamla",
    cadence: "3 hafta içinde",
  },
];

export function CoachCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<GraduationCap className="w-3.5 h-3.5" />}
          title="Teknisyen Performansı · Mert Kaya"
          meta="Birikim · L2 Mesajlaşma · 4 yıl"
          accent={accent}
        />

        <div className="px-5 py-4 border-b border-white/8 bg-white/2">
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/8 text-sm font-mono font-semibold text-white">
              MK
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">Mert Kaya</div>
              <div className="text-[11px] font-mono text-(--color-text-muted)">
                L2 Teknisyen · Mesajlaşma Ekibi · 4 yıl 3 ay
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <Chip>284 çözülen</Chip>
                <Chip tone="success">Tier-1 onaylı</Chip>
                <Chip>Q1 değerlendirme</Chip>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono tracking-[0.18em] text-(--color-text-muted)">
                {trUpper("genel skor")}
              </div>
              <div className="mt-1 flex items-baseline gap-1.5 justify-end">
                <span className={`text-3xl font-bold tabular-nums ${accent.text}`}>7.4</span>
                <span className="text-base font-semibold text-white/60">/10</span>
              </div>
              <div className="mt-0.5 text-[10px] font-mono text-emerald-300 inline-flex items-center justify-end gap-0.5">
                <ChevronUp className="w-3 h-3" />
                +0.6 / çeyrek
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-5 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-5">
          <div>
            <SectionLabel accent={accent}>Yetkinlik Radarı</SectionLabel>
            <div className="mt-3 flex items-center justify-center">
              <SkillRadar skills={SKILLS} accent={accent} />
            </div>
            <div className="mt-3 flex items-center justify-center gap-3 text-[10px] font-mono">
              <span className="inline-flex items-center gap-1">
                <span className={`w-2 h-2 rounded-sm ${accent.dot}`} />
                <span className="text-white/70">şimdi</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm border border-purple-300/70" />
                <span className="text-white/70">3 ay hedefi</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-white/15" />
                <span className="text-white/70">çeyrek başı</span>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <SectionLabel>Skor Kırılımı</SectionLabel>
            {SKILLS.map((s) => (
              <SkillBar key={s.label} skill={s} accent={accent} />
            ))}
          </div>
        </div>

        <div className="border-t border-white/8 px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <SectionLabel accent={accent}>Güçlü Yönler</SectionLabel>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <StrengthChip icon={<Star className="w-2.5 h-2.5" />} label="Exchange uzmanı" />
              <StrengthChip icon={<Clock className="w-2.5 h-2.5" />} label="Çözüm hızı 22 dk" />
              <StrengthChip icon={<Award className="w-2.5 h-2.5" />} label="Tier-1 sertifika" />
              <StrengthChip icon={<Sparkles className="w-2.5 h-2.5" />} label="RootCore mentor" />
            </div>
          </div>
          <div>
            <SectionLabel>Gelişim Alanları</SectionLabel>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <GrowthChip icon={<MessageCircle className="w-2.5 h-2.5" />} label="Empatik dil" />
              <GrowthChip icon={<Heart className="w-2.5 h-2.5" />} label="Olumsuz CSAT kapanışı" />
              <GrowthChip icon={<MessageCircle className="w-2.5 h-2.5" />} label="Jargon azaltma" />
            </div>
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Target className="w-3.5 h-3.5" />}
            title="3 Ay Hedefi"
            meta="kişiye özel"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <div className="text-xs font-medium text-white/85">İletişim Tonu</div>
                <div className="text-[10px] font-mono text-(--color-text-muted)">
                  ToneCoreAI sinyali ile ölçülecek
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-(--color-text-muted)">şimdi → hedef</div>
                <div className="text-sm font-semibold text-white tabular-nums">
                  5.4 → <span className={accent.text}>7.5</span>
                </div>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/8 overflow-hidden relative">
              <div className={`h-full ${accent.dot}`} style={{ width: "54%" }} />
              <div
                className={`absolute top-0 bottom-0 w-px bg-white/40`}
                style={{ left: "75%" }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[9px] font-mono">
              <span className="text-(--color-text-muted)">0</span>
              <span className={accent.text}>şimdi 54%</span>
              <span className="text-white/85">hedef 75%</span>
              <span className="text-(--color-text-muted)">100</span>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<BookOpen className="w-3.5 h-3.5" />}
            title="Önerilen Eğitimler"
            meta="3 modül"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-2.5">
            {TRAININGS.map((t) => (
              <TrainingCard key={t.title} training={t} accent={accent} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<UserCheck className="w-3.5 h-3.5" />}
            title="Mentor Önerisi"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/8 text-xs font-mono font-semibold text-white">
                AD
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-white">Ayşe Demir</div>
                <div className="text-[10px] font-mono text-(--color-text-muted)">
                  Servis Yöneticisi · 11 yıl · İletişim ortalaması 9.2
                </div>
              </div>
              <AiBadge label="91% uyum" accent={accent} pulse={false} />
            </div>
            <p className="mt-2 text-[11px] text-white/80 leading-snug">
              Ayşe, geçen çeyrek aynı kapasitedeki teknisyenlerden 3&apos;ünün iletişim skorunu
              ortalama +1.6 puan yükseltti. Mert ile sektörel uzmanlık benzerliği yüksek.
            </p>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<Calendar className="w-3.5 h-3.5" />}
            title="Eylem Planı · 12 hafta"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            {PLAN.map((p, i) => (
              <PlanRow key={i} plan={p} accent={accent} index={i + 1} />
            ))}
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<GraduationCap className="w-3.5 h-3.5" />} title="Bu Çeyrek · Coach" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Plan" value="38" trend="aktif" trendTone="up" />
            <KpiTile label="Tamamlanan" value="142" trend="modül" trendTone="up" />
            <KpiTile label="Skor artışı" value="+0.7" trend="ortalama" trendTone="up" />
            <KpiTile label="Tükenme" value="−26%" trend="CoachCoreAI hedefi" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface SkillRadarProps {
  skills: Skill[];
  accent: AccentClasses;
}

function SkillRadar({ skills, accent }: SkillRadarProps) {
  const cx = 130;
  const cy = 130;
  const maxR = 100;
  const n = skills.length;
  const step = (2 * Math.PI) / n;
  const start = -Math.PI / 2;

  const ring = (frac: number) => {
    const r = maxR * frac;
    const pts = Array.from({ length: n }, (_, i) => {
      const a = start + i * step;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
    return pts;
  };

  const polygonFor = (key: keyof Skill) => {
    return skills
      .map((s, i) => {
        const v = (s[key] as number) / 10;
        const a = start + i * step;
        const x = cx + maxR * v * Math.cos(a);
        const y = cy + maxR * v * Math.sin(a);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  return (
    <svg width="260" height="260" viewBox="0 0 260 260">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={ring(f)}
          fill="none"
          className="stroke-white/8"
          strokeWidth={1}
        />
      ))}
      {skills.map((_, i) => {
        const a = start + i * step;
        const x = cx + maxR * Math.cos(a);
        const y = cy + maxR * Math.sin(a);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            className="stroke-white/8"
            strokeWidth={1}
          />
        );
      })}

      <polygon
        points={polygonFor("baseline")}
        className="fill-white/8 stroke-white/25"
        strokeWidth={1}
        strokeDasharray="2 2"
      />

      <polygon
        points={polygonFor("target")}
        fill="none"
        className="stroke-purple-300/80"
        strokeWidth={1.4}
        strokeDasharray="4 3"
      />

      <polygon
        points={polygonFor("current")}
        className={`${accent.text}`}
        fill="currentColor"
        fillOpacity={0.22}
        stroke="currentColor"
        strokeWidth={1.6}
      />

      {skills.map((s, i) => {
        const a = start + i * step;
        const lx = cx + (maxR + 14) * Math.cos(a);
        const ly = cy + (maxR + 14) * Math.sin(a);
        return (
          <text
            key={s.label}
            x={lx}
            y={ly}
            textAnchor={Math.cos(a) > 0.1 ? "start" : Math.cos(a) < -0.1 ? "end" : "middle"}
            dominantBaseline="middle"
            className="fill-white/85 font-mono"
            style={{ fontSize: "9px" }}
          >
            {s.label}
          </text>
        );
      })}
    </svg>
  );
}

interface SkillBarProps {
  skill: Skill;
  accent: AccentClasses;
}

function SkillBar({ skill, accent }: SkillBarProps) {
  const delta = skill.current - skill.baseline;
  const deltaColor = delta >= 0 ? "text-emerald-300" : "text-red-300";
  const reachedTarget = skill.current >= skill.target;
  return (
    <div className="rounded-md border border-white/6 bg-white/2 px-3 py-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-white/85">{skill.label}</span>
        <div className="flex items-baseline gap-1.5 text-[10px] font-mono">
          <span className={`tabular-nums font-semibold ${reachedTarget ? "text-emerald-300" : accent.text}`}>
            {skill.current.toFixed(1)}
          </span>
          <span className="text-(--color-text-muted)">/ {skill.target.toFixed(1)}</span>
          <span className={`tabular-nums ${deltaColor}`}>
            {delta >= 0 ? "+" : ""}
            {delta.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="relative h-1 rounded-full bg-white/8 overflow-hidden">
        <div
          className={`h-full ${reachedTarget ? "bg-emerald-400" : accent.dot}`}
          style={{ width: `${(skill.current / 10) * 100}%` }}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-white/50"
          style={{ left: `${(skill.target / 10) * 100}%` }}
        />
      </div>
    </div>
  );
}

interface ChipBaseProps {
  icon: ReactNode;
  label: string;
}

function StrengthChip({ icon, label }: ChipBaseProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-emerald-400/30 bg-emerald-500/8 text-[10px] font-mono text-emerald-200">
      {icon}
      {label}
    </span>
  );
}

function GrowthChip({ icon, label }: ChipBaseProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-amber-400/30 bg-amber-500/8 text-[10px] font-mono text-amber-200">
      {icon}
      {label}
    </span>
  );
}

interface TrainingCardProps {
  training: Training;
  accent: AccentClasses;
}

function TrainingCard({ training, accent }: TrainingCardProps) {
  const typeTone = {
    atölye: "border-purple-400/30 bg-purple-500/10 text-purple-200",
    video: "border-blue-400/30 bg-blue-500/10 text-blue-200",
    okuma: "border-amber-400/30 bg-amber-500/10 text-amber-200",
  }[training.type];
  return (
    <div
      className={`rounded-xl border ${training.selected ? accent.border : "border-white/8"} ${
        training.selected ? accent.bg : "bg-white/2"
      } p-3`}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md ${accent.bg} ${accent.text} mt-0.5`}
        >
          <BookOpen className="w-3 h-3" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-white truncate">{training.title}</div>
          <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5 flex items-center gap-2">
            <span>{training.duration}</span>
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded border ${typeTone} text-[9px]`}
            >
              {training.type}
            </span>
          </div>
          <div className={`mt-1 text-[10px] font-mono ${accent.text}`}>{training.effect}</div>
        </div>
        {training.selected && (
          <CheckCircle2 className={`w-3.5 h-3.5 ${accent.text} shrink-0 mt-0.5`} />
        )}
      </div>
    </div>
  );
}

interface PlanRowProps {
  plan: PlanItem;
  accent: AccentClasses;
  index: number;
}

function PlanRow({ plan, accent, index }: PlanRowProps) {
  return (
    <div className="px-4 py-2.5 flex items-start gap-3">
      <span
        className={`shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border ${accent.border} ${accent.bg} ${accent.text} text-[9px] font-mono font-semibold tabular-nums mt-0.5`}
      >
        {index}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-xs text-white/85">
          <span className={accent.text}>{plan.icon}</span>
          <span>{plan.title}</span>
        </div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">{plan.cadence}</div>
      </div>
    </div>
  );
}
