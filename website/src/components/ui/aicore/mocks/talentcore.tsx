import {
  ArrowRight,
  ArrowRightLeft,
  Award,
  BookOpen,
  BookPlus,
  ChartColumn,
  ChartNetwork,
  Check,
  CheckCircle2,
  Clock,
  Flag,
  GraduationCap,
  Handshake,
  History,
  KeyRound,
  ListChecks,
  Lock,
  Moon,
  Pencil,
  Route,
  Server,
  Sprout,
  Telescope,
  TriangleAlert,
  Unlink,
  UserCheck,
  UserPlus,
  UserRoundSearch,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  PriorityChip,
  SectionLabel,
  Sparkline,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

type Level = 0 | 1 | 2 | 3;
type Career = "Junior" | "Mid" | "Senior";
type AreaKind = "hizmet" | "uygulama" | "teknoloji" | "süreç";
type Criticality = "Kritik" | "Yüksek";
type CriticalityTone = "danger" | "warn" | "neutral";
type TrendTone = "up" | "down" | "flat";
type GlyphVariant = "cell" | "inline";
type AvatarSize = "sm" | "md" | "lg";
type AvatarTone = "neutral" | "accent";
type ContextKind = "erisim" | "kosul";
type InsightKind = "bagimlilik" | "egitim" | "gelecek";
type ReasonKind = "gecmis" | "hizmet" | "belge";
type ActionKind = "yedek" | "aktarim" | "kb";
type CandidateStatus = "önerildi" | "alternatif";
type PathState = "done" | "current" | "target";
type TrainingKind = "eğitim" | "sertifika";

interface LevelStyle {
  label: string;
  box: string;
  bar: string;
  text: string;
}

const LEVELS: Record<Level, LevelStyle> = {
  3: {
    label: "Uzman",
    box: "bg-emerald-500/15 border-emerald-400/40",
    bar: "bg-emerald-300",
    text: "text-emerald-200",
  },
  2: {
    label: "Yetkin",
    box: "bg-cyan-500/12 border-cyan-400/35",
    bar: "bg-cyan-300",
    text: "text-cyan-200",
  },
  1: {
    label: "Temel",
    box: "bg-white/5 border-white/15",
    bar: "bg-white/60",
    text: "text-white/75",
  },
  0: {
    label: "Kanıt yok",
    box: "border-dashed border-white/15",
    bar: "bg-white/10",
    text: "text-white/60",
  },
};

const BAR_EMPTY = "bg-white/12";
const LEGEND_LEVELS: Level[] = [3, 2, 1, 0];
// Tek uzmanlı hücre nötr bir halkayla ayrışır; risk işareti kişinin hücresinde değil, alan satırının sayacındadır.
const SOLE_EXPERT_RING = "ring-1 ring-white/40";

interface Tech {
  code: string;
  name: string;
  role: string;
  career: Career;
}

const TECHS: Tech[] = [
  { code: "MK", name: "Mert Kaya", role: "L2 Teknisyen · Mesajlaşma Ekibi", career: "Senior" },
  { code: "OT", name: "Okan Tekin", role: "L2 Teknisyen · Çekirdek Bankacılık Ekibi", career: "Senior" },
  { code: "ZE", name: "Zeynep Ersoy", role: "L2 Teknisyen · Ağ ve Güvenlik Ekibi", career: "Senior" },
  { code: "TU", name: "Tolga Uçar", role: "L2 Teknisyen · Sunucu ve Altyapı Ekibi", career: "Mid" },
  { code: "DG", name: "Derya Güneş", role: "L2 Teknisyen · Kimlik ve Erişim Ekibi", career: "Mid" },
  { code: "SY", name: "Selin Yıldız", role: "L1 Çağrı Karşılayıcı", career: "Junior" },
];

const MANAGER = { code: "AD", name: "Ayşe Demir", role: "Servis Yöneticisi" };
const ORG = "Birikim";
const WINDOW_MONTHS = 12; // tek zaman penceresi: matris, kanıt paneli ve risk gerekçesi aynı dönemi okur

interface Area {
  key: string;
  label: string;
  kind: AreaKind;
  asset?: string;
  criticality?: Criticality;
  levels: [Level, Level, Level, Level, Level, Level]; // TECHS sırası: MK, OT, ZE, TU, DG, SY
}

const AREAS: Area[] = [
  {
    key: "posta",
    label: "Exchange posta hizmeti",
    kind: "hizmet",
    asset: "SRV-MAIL-01/02",
    criticality: "Kritik",
    levels: [3, 0, 1, 3, 2, 1],
  },
  {
    key: "cekirdek",
    label: "Çekirdek bankacılık",
    kind: "uygulama",
    asset: "DB-CORE-01",
    criticality: "Kritik",
    levels: [0, 3, 1, 2, 0, 0],
  },
  {
    key: "yuk",
    label: "Yük dengeleme",
    kind: "teknoloji",
    asset: "LB-WEB-02",
    criticality: "Yüksek",
    levels: [1, 2, 3, 3, 0, 0],
  },
  {
    key: "guvenlik",
    label: "Güvenlik duvarı",
    kind: "teknoloji",
    asset: "FW-EDGE-03",
    criticality: "Yüksek",
    levels: [0, 0, 3, 1, 1, 0],
  },
  {
    key: "kimlik",
    label: "Active Directory",
    kind: "teknoloji",
    asset: "AD-CTRL-01",
    criticality: "Kritik",
    levels: [3, 1, 3, 2, 3, 1],
  },
  {
    key: "majorolay",
    label: "Majör olay yönetimi",
    kind: "süreç",
    levels: [3, 3, 2, 1, 1, 0],
  },
];

const SELECTED = { areaKey: "cekirdek", techCode: "TU" } as const; // hücre kanıt panelinde açıklanır
const FOCUS_TECH = "TU"; // başlıkta, kanıt panelinde ve gelişim yolunda vurgulanan kişi

function expertCount(area: Area): number {
  return area.levels.filter((level) => level === 3).length;
}

function areaByKey(key: string): Area | undefined {
  return AREAS.find((area) => area.key === key);
}

function areaLabel(key: string): string {
  return areaByKey(key)?.label ?? "";
}

// Satır alt bilgisi alan türünden, varlıktan ve kritiklikten üretilir; kritiklik ikinci kez elle yazılmaz.
function areaMeta(area: Area): string {
  const parts: string[] = [area.kind];
  if (area.asset) parts.push(area.asset);
  if (area.criticality) parts.push(area.criticality.toLocaleLowerCase("tr-TR"));
  return parts.join(" · ");
}

function levelOf(techCode: string, areaKey: string): Level {
  const area = areaByKey(areaKey);
  const index = TECHS.findIndex((tech) => tech.code === techCode);
  if (!area || index < 0) return 0;
  return area.levels[index] ?? 0;
}

function techName(code: string): string {
  return TECHS.find((tech) => tech.code === code)?.name ?? code;
}

function techRole(code: string): string {
  return TECHS.find((tech) => tech.code === code)?.role ?? "";
}

// Alandaki tek Uzman'ın kodu; alanda tam olarak bir Uzman yoksa boş döner.
function soleExpertCode(areaKey: string): string {
  const area = areaByKey(areaKey);
  if (!area || expertCount(area) !== 1) return "";
  return TECHS[area.levels.indexOf(3)]?.code ?? "";
}

function criticalityTone(criticality?: Criticality): CriticalityTone {
  if (criticality === "Kritik") return "danger";
  if (criticality === "Yüksek") return "warn";
  return "neutral";
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

// Sayıya gelen iyelik eki (1'i, 2'si, 3'ü, 10'u). Sahnedeki sayılar 0 ile 99 arasındadır.
const UNIT_SUFFIX = ["ı", "i", "si", "ü", "ü", "i", "sı", "si", "i", "u"];
const TENS_SUFFIX = ["", "u", "si", "u", "ı", "si", "ı", "i", "i", "ı"];

function withPossessive(count: number): string {
  const unit = count % 10;
  const tens = Math.floor(count / 10) % 10;
  return `${count}'${unit === 0 && tens > 0 ? TENS_SUFFIX[tens] : UNIT_SUFFIX[unit]}`;
}

// Matristen türetilen sayılar: KPI, içgörüler ve bağımlılık çerçevesi aynı kaynaktan okur.
const SOLE_EXPERT_AREAS = AREAS.filter((area) => expertCount(area) === 1);
const SOLE_EXPERT_SYSTEMS = SOLE_EXPERT_AREAS.filter((area) => area.asset !== undefined);
const CRITICAL_SOLE_EXPERT_SYSTEMS = SOLE_EXPERT_SYSTEMS.filter((area) => area.criticality === "Kritik");
// Yetkin seviyede yedek adayı olmayan tek uzmanlı sistemler; her biri bir uzman ihtiyacı doğurur.
const NO_BACKUP_SYSTEMS = SOLE_EXPERT_SYSTEMS.filter((area) => !area.levels.includes(2));
const STAFF_NEED = NO_BACKUP_SYSTEMS.length;
const MAJOR_INCIDENT_GAP = TECHS.filter((tech) => levelOf(tech.code, "majorolay") <= 1).length;

// Paneller arasında paylaşılan sahne sayıları tek yerde tanımlanır; metinler buradan okur.
const SERVICE_LEVEL_BREACHES = 3; // KPI "Hizmet Seviyesi etkisi" ve risk gerekçesi
const CORE_P1_RESOLVED = 7; // risk gerekçesi ve bilgi bankası önerisi
const TEAM_AVERAGE = "ekip ortalaması";
const TEAM_REOPEN_RATE = "%3,9"; // kanıt paneli ve KPI "Yeniden açılan"
const OPEN_RECORDS: Record<string, number> = { OT: 4, ZE: 1, TU: 2, DG: 1 }; // aday kartları ve iş yükü dengesi

function openRecords(code: string): number {
  return OPEN_RECORDS[code] ?? 0;
}

const FRAMES = {
  map: { title: "Yetkinlik Haritası" },
  analytics: { title: "Yetkinlik Analitiği" },
  dependency: { title: "Tek Noktaya Bağımlılık" },
  assignment: { title: "Atama Önerisi" },
  development: { title: "Gelişim Yolu" },
};

const HEADER = {
  badge: "karar destek",
  owner: "son değerlendirme yöneticide",
  noAuto: "öneriler otomatik uygulanmaz",
  live: "her yeni çözümle güncellenir",
};

const MATRIX = {
  label: "Ekip Yetkinlik Matrisi",
  metaParts: [
    `${ORG} BT Operasyon`,
    `son ${WINDOW_MONTHS} ay`,
    `${TECHS.length} teknisyen`,
    `${AREAS.length} alan`,
  ],
  countHead: "Uzman",
  countUnit: "uzman",
  ariaLabel: `Ekip yetkinlik matrisi: ${AREAS.length} alan, ${TECHS.length} teknisyen`,
  soleExpert: "alandaki tek uzman",
  selected: "seçili hücre: gerekçesi aşağıda",
  selectedShort: "seçili",
};

function cellLabel(tech: Tech, area: Area, level: Level, soleExpert: boolean, selected: boolean): string {
  const parts = [`${tech.name} · ${area.label}: ${LEVELS[level].label}`];
  if (soleExpert) parts.push(MATRIX.soleExpert);
  if (selected) parts.push(MATRIX.selectedShort);
  return parts.join(" · ");
}

interface ComplexityItem {
  label: string;
  value: number;
  color: string;
}

interface ContextItem {
  kind: ContextKind;
  title: string;
  text: string;
}

const HIGH_COMPLEXITY_TREND = [0, 1, 2, 3];

// Yüksek karmaşıklıklı kayıt sayısı çeyrek trendinin toplamıdır; çözülen kayıt sayısı dağılımın toplamıdır.
const COMPLEXITY_MIX: ComplexityItem[] = [
  { label: "yüksek", value: sum(HIGH_COMPLEXITY_TREND), color: "bg-purple-400/80" },
  { label: "orta", value: 5, color: "bg-sky-400/60" },
  { label: "düşük", value: 3, color: "bg-white/30" },
];

const RESOLVED = sum(COMPLEXITY_MIX.map((item) => item.value));

const EVIDENCE = {
  label: "Seviye Gerekçesi",
  badge: "kanıta dayalı",
  techCode: SELECTED.techCode,
  areaKey: SELECTED.areaKey,
  countOnlyLevel: 1 as Level,
  window: `son ${WINDOW_MONTHS} ay`,
  reopened: 0,
  teamReopen: `${TEAM_AVERAGE} ${TEAM_REOPEN_RATE}`,
  statLabels: {
    resolved: "çözülen kayıt",
    reopened: "yeniden açılma",
    complexity: "karmaşıklık",
  },
  trendLabel: "yüksek karmaşıklıklı kayıt · çeyrek bazında",
  trendCaption: `${HIGH_COMPLEXITY_TREND.join(" → ")} · son dört çeyrek`,
  context: [
    {
      kind: "erisim",
      title: "Sistem erişimi",
      text: "DB-CORE-01'de yalnız okuma yetkisi var; kayıt sayısı ve çözüm süresi bu kısıtla birlikte değerlendirildi.",
    },
    {
      kind: "kosul",
      title: "Çalışma koşulu",
      text: `${RESOLVED} kaydın 6'sı gece vardiyasında, ikinci uzman desteği olmadan çözüldü.`,
    },
  ] satisfies ContextItem[],
  verdictLead: "Yalnız kayıt sayısına bakılsaydı",
  verdictMid:
    "görünürdü; karmaşıklık, çözüm kalitesi, çalışma koşulları ve sistem erişimiyle birlikte değerlendirildiğinde seviye",
};

interface Insight {
  kind: InsightKind;
  title: string;
  text: string;
}

const INSIGHTS_LABEL = "Matristen Çıkanlar";

const INSIGHTS: Insight[] = [
  {
    kind: "bagimlilik",
    title: `Tek uzmana bağlı ${SOLE_EXPERT_AREAS.length} alan`,
    text: `Çekirdek bankacılık (${techName(soleExpertCode("cekirdek"))}) ve güvenlik duvarı (${techName(soleExpertCode("guvenlik"))}).`,
  },
  {
    kind: "egitim",
    title: "Ekip ortak eğitim ihtiyacı",
    text: `Majör olay yönetimi: ${MAJOR_INCIDENT_GAP} teknisyende Temel seviye ya da kanıt yok.`,
  },
  {
    kind: "gelecek",
    title: "Gelecek dönem ihtiyacı",
    text: `Güvenlik duvarında yedek aday yok; yetkinlik bazlı kapasite analizi +${STAFF_NEED} uzman ihtiyacı gösteriyor.`,
  },
];

const OVERSIGHT = {
  label: "Karar Yöneticide",
  ownerCode: MANAGER.code,
  owner: `${MANAGER.name} · ${MANAGER.role}`,
  checks: [
    "Çıktılar yönetici değerlendirmesini destekler; kariyer, performans ve personel kararlarında tek başına belirleyici olmaz.",
    "Hiçbir atama, eğitim ya da personel kararı kişiye kendiliğinden uygulanmaz.",
    "Kayıt sayısı tek ölçüt değildir: karmaşıklık, çözüm kalitesi, çalışma koşulları ve sistem erişimi birlikte değerlendirilir.",
  ],
};

interface Kpi {
  label: string;
  value: string;
  trend: string;
  trendTone: TrendTone;
}

const KPIS: Kpi[] = [
  {
    label: "Tek uzmanlı sistem",
    value: String(SOLE_EXPERT_SYSTEMS.length),
    trend: `${withPossessive(CRITICAL_SOLE_EXPERT_SYSTEMS.length)} kritik`,
    trendTone: "down",
  },
  { label: "Hizmet Seviyesi etkisi", value: String(SERVICE_LEVEL_BREACHES), trend: "ihlal", trendTone: "down" },
  { label: "Yeniden açılan", value: TEAM_REOPEN_RATE, trend: TEAM_AVERAGE, trendTone: "flat" },
  {
    label: "Personel ihtiyacı",
    value: `+${STAFF_NEED}`,
    trend: NO_BACKUP_SYSTEMS.map((area) => area.asset ?? "").join(", "),
    trendTone: "flat",
  },
];

interface Reason {
  kind: ReasonKind;
  text: string;
}

interface DependencyAction {
  kind: ActionKind;
  title: string;
  sub: string;
}

const DEPENDENCY_AREA_KEY = "cekirdek";
const SECONDARY_AREA_KEY = "guvenlik";
const DEPENDENCY_AREA = areaByKey(DEPENDENCY_AREA_KEY);
const SECONDARY_AREA = areaByKey(SECONDARY_AREA_KEY);
const DEPENDENCY_ASSET = DEPENDENCY_AREA?.asset ?? "";
const DEPENDENCY_EXPERT = soleExpertCode(DEPENDENCY_AREA_KEY);
const BACKUP_CODE = FOCUS_TECH; // çekirdek bankacılık satırındaki tek Yetkin

const DEPENDENCY = {
  areaKey: DEPENDENCY_AREA_KEY,
  asset: DEPENDENCY_ASSET,
  assetName: "Çekirdek Bankacılık DB",
  criticality: DEPENDENCY_AREA?.criticality,
  expertCode: DEPENDENCY_EXPERT,
  expertSub: "sistemin tek uzmanı · Çekirdek Bankacılık Ekibi",
  reasonsLabel: "Risk Gerekçesi",
  reasons: [
    {
      kind: "gecmis",
      text: `Son ${WINDOW_MONTHS} ayda ${DEPENDENCY_ASSET} kaynaklı ${CORE_P1_RESOLVED} P1 kaydının tamamını ${techName(DEPENDENCY_EXPERT)} çözdü.`,
    },
    {
      kind: "hizmet",
      text: `${SERVICE_LEVEL_BREACHES} Hizmet Seviyesi ihlali: ikinci bir Uzman olmadığı için kayıtlar sırada bekledi.`,
    },
    { kind: "belge", text: `Bilgi bankasında ${DEPENDENCY_ASSET} için güncel makale yok.` },
  ] satisfies Reason[],
  risk: "Personel ayrılığı ya da uzun süreli yokluk durumunda çekirdek bankacılık P1 kayıtlarını çözecek Uzman kalmaz.",
  actionsLabel: "Önerilen Aksiyonlar",
  actions: [
    {
      kind: "yedek",
      title: `Yedek uzman: ${techName(BACKUP_CODE)}`,
      sub: `çekirdek bankacılıkta ${LEVELS[levelOf(BACKUP_CODE, DEPENDENCY_AREA_KEY)].label} · en yakın aday`,
    },
    {
      kind: "aktarim",
      title: `Bilgi aktarımı planı: ${techName(DEPENDENCY_EXPERT)} → ${techName(BACKUP_CODE)}`,
      sub: "kritik bilgi tek kişide kalmaz",
    },
    {
      kind: "kb",
      title: "Bilgi bankası önerisi",
      sub: `Okan Tekin'in ${CORE_P1_RESOLVED} P1 çözümü makaleye aday`,
    },
  ] satisfies DependencyAction[],
  actionsNote: "Aksiyonlar öneridir; planı yönetici başlatır.",
  secondaryLabel: "Diğer Tek Uzmanlı Sistem",
  secondary: {
    asset: SECONDARY_AREA?.asset ?? "",
    label: SECONDARY_AREA?.label ?? "",
    criticality: SECONDARY_AREA?.criticality,
    note: `tek uzman: ${techName(soleExpertCode(SECONDARY_AREA_KEY))} · yedek aday yok · +${STAFF_NEED} uzman ihtiyacı`,
  },
};

const REQUIRED_AREA_KEYS = ["cekirdek", "yuk"];

const TICKET = {
  id: "INC-2851",
  priority: "P1",
  title: "Çekirdek bankacılık ekranı 502 hatası veriyor",
  snippet: "Şubelerden gelen tüm sorgulama uçları zaman aşımına düşüyor.",
  openedBy: "MK",
  openedAt: "10:02",
  serviceLevelMinutes: 240,
  elapsedMinutes: 56,
};

// Kalan Hizmet Seviyesi süresi kayıttan hesaplanır: 240 − 56 = 184 dk, yani 3s 4d.
const SERVICE_LEVEL_LEFT = TICKET.serviceLevelMinutes - TICKET.elapsedMinutes;
const TICKET_COMPLEXITY = `karmaşık · ${REQUIRED_AREA_KEYS.length} alan`;
const TICKET_META_PARTS = [
  `${techName(TICKET.openedBy)} açtı`,
  TICKET.openedAt,
  `Hizmet Seviyesi ${Math.floor(SERVICE_LEVEL_LEFT / 60)}s ${SERVICE_LEVEL_LEFT % 60}d kaldı`,
];

interface Candidate {
  code: string;
  areaKey: string;
  note?: string;
  loadWarn: boolean;
  availability: string;
  availabilityWarn: boolean;
  status: CandidateStatus;
}

// Ad, alan, uzmanlık seviyesi ve açık kayıt sayısı elle yazılmaz: TECHS, AREAS ve OPEN_RECORDS'tan okunur.
const CANDIDATES: Candidate[] = [
  {
    code: DEPENDENCY_EXPERT,
    areaKey: "cekirdek",
    loadWarn: true,
    availability: "müsait",
    availabilityWarn: false,
    status: "önerildi",
  },
  {
    code: "ZE",
    areaKey: "yuk",
    loadWarn: false,
    availability: "müsait",
    availabilityWarn: false,
    status: "önerildi",
  },
  {
    code: "TU",
    areaKey: "yuk",
    note: "şu an INC-2847 kaydında",
    loadWarn: false,
    availability: "meşgul",
    availabilityWarn: true,
    status: "alternatif",
  },
];

const SUGGESTED_COUNT = CANDIDATES.filter((candidate) => candidate.status === "önerildi").length;
const BALANCE_TARGET = "DG"; // Active Directory'de Uzman, bu sahnede boşta olan tek kişi

const ASSIGNMENT = {
  requiredLabel: "Gereken Uzmanlık",
  badge: `${SUGGESTED_COUNT} uzman önerildi`,
  why: "502 ve zaman aşımı iki alana dokunuyor: uygulama (DB-CORE-01) ve yük dengeleyici (LB-WEB-02). Tek kişi yerine iki uzman önerilir.",
  candidatesLabel: "Önerilen Uzmanlar",
  criteria: { expertise: "uzmanlık", load: "iş yükü", availability: "uygunluk" },
  balanceLabel: "İş Yükü Dengesi",
  balance: `Okan Tekin'in ${openRecords(DEPENDENCY_EXPERT)} açık kaydının 2'si Active Directory kaydı. Bu iki kayıt için ${techName(BALANCE_TARGET)} önerilir: Active Directory'de ${LEVELS[levelOf(BALANCE_TARGET, "kimlik")].label}, ${openRecords(BALANCE_TARGET)} açık kaydı var.`,
  escalation:
    "Eskalasyon hattı · çekirdek bankacılık: Tolga Uçar (Yetkin) → Okan Tekin (Uzman). Okan Tekin'den sonra aktarılacak Uzman yok.",
  approve: "Onayla ve ata",
  edit: "Düzelt",
  note: `Atama, ${MANAGER.name} onaylamadan yapılmaz.`,
};

interface PathStep {
  label: Career;
  sub: string;
  state: PathState;
}

const PATH: PathStep[] = [
  { label: "Junior", sub: "tamamlandı", state: "done" },
  { label: "Mid", sub: "şu an", state: "current" },
  { label: "Senior", sub: "hedef", state: "target" },
];

const DEVELOPMENT = {
  techCode: FOCUS_TECH,
  gapsLabel: "Hedef Pozisyon İçin Eksikler",
  levelGap: { areaKey: "majorolay", sub: "süreç", to: 2 as Level },
  leadershipGap: { title: "Ekip liderliği", sub: "mentorluk deneyimi henüz yok", chip: "ilk mentorluk" },
  met: "Karşılanan: Exchange posta hizmeti ve yük dengelemede Uzman.",
  successionLabel: "Halefiyet Yolu",
  succession: {
    areaKey: "cekirdek",
    sub: "DB-CORE-01 halefiyet adayı · yedek uzman ihtiyacını karşılar",
    to: 3 as Level,
  },
  mentorsLabel: "Mentor Eşleştirme",
  trainingsLabel: "Eğitim ve Sertifika Önerisi",
  trainingNote: "Eğitim sonrası etki, aynı alandaki kayıtlarda öncesiyle karşılaştırılır.",
  cta: "Değerlendirme taslağına ekle",
  note: "Öneri kişiye otomatik uygulanmaz; son değerlendirme yöneticide.",
};

interface MentorPair {
  mentor: string;
  mentee: string;
  area: string;
  note: string;
}

const MENTOR_PAIRS: MentorPair[] = [
  {
    mentor: "OT",
    mentee: "TU",
    area: "Majör olay yönetimi ve çekirdek bankacılık",
    note: "Okan Tekin iki alanda da Uzman",
  },
  { mentor: "TU", mentee: "SY", area: "Exchange posta hizmeti", note: "ekip liderliği için ilk mentorluk" },
];

interface Training {
  kind: TrainingKind;
  title: string;
  closes: string;
}

const TRAININGS: Training[] = [
  {
    kind: "eğitim",
    title: "ITIL4 Olay Yönetimi pratiği eğitimi",
    closes: "kapattığı eksik: majör olay yönetimi · ekip ortak eğitimiyle birlikte",
  },
  {
    kind: "sertifika",
    title: "Veritabanı yönetimi · ileri seviye sertifika programı",
    closes: "halefiyet yolu: çekirdek bankacılık",
  },
];

const GLYPH_BOX: Record<GlyphVariant, string> = {
  cell: "relative flex items-end justify-center gap-0.5 w-full h-6 sm:h-7 rounded-md border pb-1",
  inline: "relative inline-flex items-end justify-center gap-0.5 w-6 h-4 shrink-0 rounded border pb-[3px]",
};

const GLYPH_BARS: Record<GlyphVariant, [string, string, string]> = {
  cell: ["h-1.5", "h-2.5", "h-3.5"],
  inline: ["h-1", "h-1.5", "h-2"],
};

const AVATAR_SIZES: Record<AvatarSize, string> = {
  sm: "w-6 h-6 text-[9px]",
  md: "w-7 h-7 text-[10px]",
  lg: "w-8 h-8 text-[10px]",
};

const CONTEXT_ICONS: Record<ContextKind, LucideIcon> = {
  erisim: KeyRound,
  kosul: Moon,
};

const INSIGHT_STYLES: Record<InsightKind, { icon: LucideIcon; color: string }> = {
  bagimlilik: { icon: TriangleAlert, color: "text-red-300" },
  egitim: { icon: Users, color: "text-cyan-300" },
  gelecek: { icon: Telescope, color: "text-amber-300" },
};

const REASON_ICONS: Record<ReasonKind, LucideIcon> = {
  gecmis: History,
  hizmet: Clock,
  belge: BookOpen,
};

const ACTION_ICONS: Record<ActionKind, LucideIcon> = {
  yedek: UserPlus,
  aktarim: Handshake,
  kb: BookPlus,
};

const TRAINING_STYLES: Record<TrainingKind, { icon: LucideIcon; tag: string }> = {
  eğitim: { icon: GraduationCap, tag: "border-sky-400/30 bg-sky-500/10 text-sky-200" },
  sertifika: { icon: Award, tag: "border-purple-400/30 bg-purple-500/10 text-purple-200" },
};

// Üç butonun ortak sınıfları: dokunma hedefi, odak halkası ve imleç tek yerde.
const BUTTON_BASE =
  "min-h-11 text-[11px] font-mono px-2.5 py-1.5 rounded-md border cursor-pointer inline-flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base)";

export function TalentCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const evidenceLevel = levelOf(EVIDENCE.techCode, EVIDENCE.areaKey);
  const heroLevel = levelOf(DEPENDENCY.expertCode, DEPENDENCY.areaKey);
  const positionGapFrom = levelOf(DEVELOPMENT.techCode, DEVELOPMENT.levelGap.areaKey);
  const successionFrom = levelOf(DEVELOPMENT.techCode, DEVELOPMENT.succession.areaKey);
  const accentButton = `${BUTTON_BASE} font-semibold ${accent.border} ${accent.bg} ${accent.text} hover:brightness-125`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-4">
      <div className="space-y-4 min-w-0">
        <MockFrame className={accent.glow}>
          <TitleBar icon={<ChartNetwork className="w-3.5 h-3.5" />} title={FRAMES.map.title} accent={accent} />

          <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex flex-wrap items-center gap-2">
            <AiBadge label={HEADER.badge} accent={accent} />
            <Chip tone="success">
              <UserCheck className="w-3 h-3" />
              {HEADER.owner}
            </Chip>
            <Chip tone="neutral">
              <Lock className="w-3 h-3" />
              {HEADER.noAuto}
            </Chip>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-white/60">
              <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />
              {HEADER.live}
            </span>
          </div>

          <div className="px-4 sm:px-5 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <SectionLabel accent={accent}>{MATRIX.label}</SectionLabel>
              <span className="text-[10px] font-mono text-white/60">
                <MetaSegments parts={MATRIX.metaParts} />
              </span>
            </div>

            <div
              role="group"
              aria-label={MATRIX.ariaLabel}
              className="mt-3 grid grid-cols-6 sm:grid-cols-[minmax(0,1fr)_repeat(6,2.25rem)_2.5rem] gap-x-1.5 gap-y-1.5 items-center"
            >
              <div className="hidden sm:block" />
              {TECHS.map((tech) => (
                <TechHead key={tech.code} tech={tech} accent={accent} />
              ))}
              <div className="hidden sm:block text-right text-[9px] font-mono font-semibold tracking-[0.18em] text-white/60">
                {trUpper(MATRIX.countHead)}
              </div>

              {AREAS.map((area) => {
                const count = expertCount(area);
                return (
                  <div key={area.key} className="contents">
                    <AreaLabel area={area} count={count} />
                    {TECHS.map((tech) => {
                      const level = levelOf(tech.code, area.key);
                      const selected = area.key === SELECTED.areaKey && tech.code === SELECTED.techCode;
                      const soleExpert = count === 1 && level === 3;
                      return (
                        <LevelGlyph
                          key={tech.code}
                          level={level}
                          selected={selected}
                          soleExpert={soleExpert}
                          label={cellLabel(tech, area, level, soleExpert, selected)}
                          accent={accent}
                        />
                      );
                    })}
                    <ExpertCountCell count={count} label={area.label} />
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-mono">
              {LEGEND_LEVELS.map((level) => (
                <span key={level} className="inline-flex items-center gap-1.5">
                  <LevelGlyph level={level} variant="inline" accent={accent} />
                  <span className="text-white/75">{LEVELS[level].label}</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-sm bg-white/5 ${SOLE_EXPERT_RING}`} />
                <span className="text-white/75">{MATRIX.soleExpert}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-sm bg-white/5 ring-2 ${accent.ring}`} />
                <span className="text-white/75">{MATRIX.selected}</span>
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-mono">
              {TECHS.map((tech) => (
                <span key={tech.code}>
                  <span className="text-white font-semibold">{tech.code}</span>{" "}
                  <span className="text-white/65">{tech.name}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/8 px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <SectionLabel accent={accent}>{EVIDENCE.label}</SectionLabel>
              <AiBadge label={EVIDENCE.badge} accent={accent} pulse={false} />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Avatar code={EVIDENCE.techCode} size="sm" tone="accent" accent={accent} />
              <span className="text-xs font-semibold text-white">{techName(EVIDENCE.techCode)}</span>
              <span className="text-xs text-(--color-text-muted)">×</span>
              <span className="text-xs text-white/85">{areaLabel(EVIDENCE.areaKey)}</span>
              <LevelGlyph level={evidenceLevel} variant="inline" accent={accent} />
              <span className={`text-[11px] font-semibold ${LEVELS[evidenceLevel].text}`}>
                {LEVELS[evidenceLevel].label}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-[1fr_1fr_2fr] gap-2">
              <EvidenceStat label={EVIDENCE.statLabels.resolved} value={String(RESOLVED)} sub={EVIDENCE.window} />
              <EvidenceStat
                label={EVIDENCE.statLabels.reopened}
                value={`${EVIDENCE.reopened} / ${RESOLVED}`}
                sub={EVIDENCE.teamReopen}
              />
              <EvidenceStat label={EVIDENCE.statLabels.complexity} className="col-span-2 sm:col-span-1">
                <ComplexityBar items={COMPLEXITY_MIX} total={RESOLVED} />
              </EvidenceStat>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-white/8 bg-white/2 px-3 py-2">
              <div>
                <div className="text-[10px] font-mono text-white/60">{EVIDENCE.trendLabel}</div>
                <div className="text-[10px] font-mono text-white/70">{EVIDENCE.trendCaption}</div>
              </div>
              <div className="pr-2">
                <Sparkline values={HIGH_COMPLEXITY_TREND} accent={accent} width={180} height={28} />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {EVIDENCE.context.map((item) => (
                <ContextRow key={item.kind} item={item} />
              ))}
            </div>

            <p
              className={`mt-3 rounded-lg border ${accent.border} ${accent.bg} px-3 py-2.5 text-[11px] text-white/85 leading-relaxed`}
            >
              {EVIDENCE.verdictLead}{" "}
              <span className="line-through decoration-white/40 text-white/60">
                {LEVELS[EVIDENCE.countOnlyLevel].label}
              </span>{" "}
              {EVIDENCE.verdictMid}{" "}
              <span className={`font-semibold ${LEVELS[evidenceLevel].text}`}>{LEVELS[evidenceLevel].label}</span>.
            </p>
          </div>

          <div className="border-t border-white/8 px-5 py-4">
            <SectionLabel>{INSIGHTS_LABEL}</SectionLabel>
            <div className="mt-2 space-y-2">
              {INSIGHTS.map((insight) => (
                <InsightRow key={insight.kind} insight={insight} />
              ))}
            </div>
          </div>

          <div className="border-t border-white/8 px-5 py-4 bg-white/2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <SectionLabel accent={accent}>{OVERSIGHT.label}</SectionLabel>
              <span className="inline-flex items-center gap-1.5">
                <Avatar code={OVERSIGHT.ownerCode} size="sm" tone="neutral" accent={accent} />
                <span className="text-[10px] font-mono text-white/70">{OVERSIGHT.owner}</span>
              </span>
            </div>
            <div className="mt-2.5 space-y-1.5">
              {OVERSIGHT.checks.map((check) => (
                <CheckRow key={check} text={check} />
              ))}
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<ChartColumn className="w-3.5 h-3.5" />}
            title={FRAMES.analytics.title}
            accent={accent}
          />
          <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
            {KPIS.map((kpi) => (
              <KpiTile
                key={kpi.label}
                label={kpi.label}
                value={kpi.value}
                trend={kpi.trend}
                trendTone={kpi.trendTone}
              />
            ))}
          </div>
        </MockFrame>
      </div>

      <div className="space-y-4 min-w-0">
        <MockFrame>
          <TitleBar icon={<Unlink className="w-3.5 h-3.5" />} title={FRAMES.dependency.title} accent={accent} />
          <div className="px-5 py-4 space-y-4">
            <div className="rounded-xl border border-red-500/25 bg-red-500/8 p-3">
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-red-300" />
                <span className="text-[11px] font-mono font-semibold text-white whitespace-nowrap">
                  {DEPENDENCY.asset}
                </span>
                <Chip tone={criticalityTone(DEPENDENCY.criticality)} className="ml-auto">
                  {DEPENDENCY.criticality}
                </Chip>
              </div>
              <div className="mt-0.5 text-[11px] text-white/75">{DEPENDENCY.assetName}</div>

              <div className="mt-3 flex items-center gap-2.5">
                <Avatar code={DEPENDENCY.expertCode} size="lg" tone="neutral" accent={accent} />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">{techName(DEPENDENCY.expertCode)}</div>
                  <div className="text-[10px] font-mono text-white/60">{DEPENDENCY.expertSub}</div>
                </div>
                <span className="ml-auto inline-flex">
                  <LevelGlyph
                    level={heroLevel}
                    variant="inline"
                    label={`${techName(DEPENDENCY.expertCode)} · ${areaLabel(DEPENDENCY.areaKey)}: ${LEVELS[heroLevel].label}`}
                    accent={accent}
                  />
                </span>
              </div>

              <div className="mt-3">
                <SectionLabel>{DEPENDENCY.reasonsLabel}</SectionLabel>
              </div>
              <div className="mt-1.5 space-y-1.5">
                {DEPENDENCY.reasons.map((reason) => (
                  <ReasonRow key={reason.kind} reason={reason} />
                ))}
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-red-500/20 flex items-start gap-2">
                <TriangleAlert className="w-3.5 h-3.5 text-red-300 shrink-0 mt-0.5" />
                <p className="text-[11px] font-medium text-red-100 leading-snug">{DEPENDENCY.risk}</p>
              </div>
            </div>

            <div>
              <SectionLabel accent={accent}>{DEPENDENCY.actionsLabel}</SectionLabel>
              <div className="mt-2 space-y-2">
                {DEPENDENCY.actions.map((action, index) => (
                  <ActionRow key={action.kind} index={index + 1} action={action} accent={accent} />
                ))}
              </div>
              <NoteLine icon={UserCheck}>{DEPENDENCY.actionsNote}</NoteLine>
            </div>

            <div className="pt-3 border-t border-white/8">
              <SectionLabel>{DEPENDENCY.secondaryLabel}</SectionLabel>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Server className="w-3 h-3 text-(--color-text-muted)" />
                <span className="text-[11px] font-mono text-white whitespace-nowrap">{DEPENDENCY.secondary.asset}</span>
                <span className="text-[11px] text-white/85">{DEPENDENCY.secondary.label}</span>
                <Chip tone={criticalityTone(DEPENDENCY.secondary.criticality)} className="ml-auto">
                  {DEPENDENCY.secondary.criticality}
                </Chip>
              </div>
              <p className="mt-1 text-[11px] text-white/75">{DEPENDENCY.secondary.note}</p>
            </div>
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<UserRoundSearch className="w-3.5 h-3.5" />}
            title={FRAMES.assignment.title}
            meta={TICKET.id}
            accent={accent}
          />
          <div className="px-5 py-4 space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/2 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <PriorityChip priority={TICKET.priority} />
                <span className="text-[10px] font-mono text-white/60 tabular-nums whitespace-nowrap">{TICKET.id}</span>
                <Chip tone="warn">{TICKET_COMPLEXITY}</Chip>
              </div>
              <div className="mt-1.5 text-xs font-semibold text-white leading-snug">{TICKET.title}</div>
              <p className="mt-1 text-[11px] text-white/70 italic leading-snug">
                &ldquo;{TICKET.snippet}&rdquo;
              </p>
              <div className="mt-1.5 text-[10px] font-mono text-white/60">
                <MetaSegments parts={TICKET_META_PARTS} />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <SectionLabel accent={accent}>{ASSIGNMENT.requiredLabel}</SectionLabel>
                <AiBadge label={ASSIGNMENT.badge} accent={accent} pulse={false} />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {REQUIRED_AREA_KEYS.map((key) => (
                  <Chip key={key} tone="info">
                    {areaLabel(key)}
                  </Chip>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-white/75 leading-snug">
                <IdText text={ASSIGNMENT.why} />
              </p>
            </div>

            <div>
              <SectionLabel>{ASSIGNMENT.candidatesLabel}</SectionLabel>
              <div className="mt-2 space-y-2">
                {CANDIDATES.map((candidate) => (
                  <CandidateRow key={candidate.code} candidate={candidate} accent={accent} />
                ))}
              </div>
            </div>

            <div>
              <SectionLabel>{ASSIGNMENT.balanceLabel}</SectionLabel>
              <div className="mt-1.5 flex items-start gap-2">
                <ArrowRightLeft className={`w-3.5 h-3.5 ${accent.text} shrink-0 mt-0.5`} />
                <p className="text-[11px] text-white/85 leading-snug">{ASSIGNMENT.balance}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg border border-white/8 bg-white/2 px-3 py-2">
              <Route className="w-3.5 h-3.5 text-(--color-text-muted) shrink-0 mt-0.5" />
              <p className="text-[11px] text-white/80 leading-snug">{ASSIGNMENT.escalation}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <button type="button" className={`${accentButton} flex-1`}>
                  <Check className="w-3 h-3" />
                  {ASSIGNMENT.approve}
                </button>
                <button type="button" className={`${BUTTON_BASE} border-white/10 text-white/70 hover:bg-white/5`}>
                  <Pencil className="w-3 h-3" />
                  {ASSIGNMENT.edit}
                </button>
              </div>
              <NoteLine icon={Lock}>{ASSIGNMENT.note}</NoteLine>
            </div>
          </div>
        </MockFrame>
      </div>

      <MockFrame className="lg:col-span-2">
        <TitleBar
          icon={<Sprout className="w-3.5 h-3.5" />}
          title={FRAMES.development.title}
          meta={techName(DEVELOPMENT.techCode)}
          accent={accent}
        />
        <div className="px-5 py-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="space-y-4 min-w-0">
            <div>
              <CareerPath steps={PATH} accent={accent} />
              <div className="mt-2 text-center text-[10px] font-mono text-white/60">
                {techRole(DEVELOPMENT.techCode)}
              </div>
            </div>

            <div>
              <SectionLabel accent={accent}>{DEVELOPMENT.gapsLabel}</SectionLabel>
              <div className="mt-2 space-y-2">
                <GapRow
                  title={areaLabel(DEVELOPMENT.levelGap.areaKey)}
                  sub={DEVELOPMENT.levelGap.sub}
                  from={positionGapFrom}
                  to={DEVELOPMENT.levelGap.to}
                  accent={accent}
                />
                <GapRow
                  title={DEVELOPMENT.leadershipGap.title}
                  sub={DEVELOPMENT.leadershipGap.sub}
                  right={<Chip tone="info">{DEVELOPMENT.leadershipGap.chip}</Chip>}
                  accent={accent}
                />
              </div>
              <div className="mt-2 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                <p className="text-[11px] text-white/80">{DEVELOPMENT.met}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 min-w-0">
            <div>
              <SectionLabel>{DEVELOPMENT.successionLabel}</SectionLabel>
              <div className="mt-2">
                <GapRow
                  title={areaLabel(DEVELOPMENT.succession.areaKey)}
                  sub={DEVELOPMENT.succession.sub}
                  from={successionFrom}
                  to={DEVELOPMENT.succession.to}
                  icon={<Flag className={`w-3 h-3 ${accent.text} shrink-0`} />}
                  highlight
                  accent={accent}
                />
              </div>
            </div>

            <div>
              <SectionLabel>{DEVELOPMENT.mentorsLabel}</SectionLabel>
              <div className="mt-2 space-y-2">
                {MENTOR_PAIRS.map((pair) => (
                  <PairRow key={`${pair.mentor}-${pair.mentee}`} pair={pair} accent={accent} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 min-w-0">
            <div>
              <SectionLabel>{DEVELOPMENT.trainingsLabel}</SectionLabel>
              <div className="mt-2 space-y-2">
                {TRAININGS.map((training) => (
                  <TrainingRow key={training.title} training={training} accent={accent} />
                ))}
              </div>
              <div className="mt-2 text-[10px] font-mono text-white/60">{DEVELOPMENT.trainingNote}</div>
            </div>

            <div>
              <button type="button" className={`${accentButton} w-full`}>
                <ListChecks className="w-3 h-3" />
                {DEVELOPMENT.cta}
              </button>
              <NoteLine icon={Lock}>{DEVELOPMENT.note}</NoteLine>
            </div>
          </div>
        </div>
      </MockFrame>
    </div>
  );
}

interface LevelGlyphProps {
  level: Level;
  variant?: GlyphVariant;
  selected?: boolean;
  soleExpert?: boolean;
  label?: string;
  accent: AccentClasses;
}

function LevelGlyph({ level, variant = "cell", selected = false, soleExpert = false, label, accent }: LevelGlyphProps) {
  const style = LEVELS[level];
  const ring = selected ? `ring-2 ${accent.ring}` : soleExpert ? SOLE_EXPERT_RING : "";
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      title={label}
      className={`${GLYPH_BOX[variant]} ${style.box} ${ring}`}
    >
      {GLYPH_BARS[variant].map((height, index) => (
        <span
          key={height}
          className={`w-1 rounded-[1px] ${height} ${level === 0 || index < level ? style.bar : BAR_EMPTY}`}
        />
      ))}
      {selected && (
        <span className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`} />
      )}
    </span>
  );
}

interface AvatarProps {
  code: string;
  size: AvatarSize;
  tone: AvatarTone;
  accent: AccentClasses;
  title?: string;
}

// Başlık verilen avatar erişilebilir ad taşır; adı hemen yanında yazan avatar yardımcı teknolojiden gizlenir.
function Avatar({ code, size, tone, accent, title }: AvatarProps) {
  const toneClass = tone === "accent" ? `${accent.bg} ${accent.text} ring-1 ${accent.ring}` : "bg-white/8 text-white";
  return (
    <span
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      title={title}
      className={`inline-flex items-center justify-center rounded-full font-mono font-semibold shrink-0 ${AVATAR_SIZES[size]} ${toneClass}`}
    >
      {code}
    </span>
  );
}

interface TechHeadProps {
  tech: Tech;
  accent: AccentClasses;
}

function TechHead({ tech, accent }: TechHeadProps) {
  return (
    <div className="flex flex-col items-center gap-0.5 min-w-0">
      <Avatar
        code={tech.code}
        size="md"
        tone={tech.code === FOCUS_TECH ? "accent" : "neutral"}
        accent={accent}
        title={`${tech.name} · ${tech.career} · ${tech.role}`}
      />
      <span aria-hidden className="text-[8px] sm:text-[9px] font-mono leading-none text-white/70">
        {tech.career}
      </span>
    </div>
  );
}

interface AreaLabelProps {
  area: Area;
  count: number;
}

function AreaLabel({ area, count }: AreaLabelProps) {
  return (
    <div className="col-span-6 sm:col-span-1 min-w-0 flex items-start justify-between gap-2 pt-2 sm:pt-0">
      <div className="min-w-0">
        <div className="text-[11px] font-medium text-white/85 leading-tight">{area.label}</div>
        <div className="mt-0.5 text-[9px] font-mono text-white/60 leading-tight">
          <IdText text={areaMeta(area)} />
        </div>
      </div>
      <Chip tone={count === 1 ? "danger" : "neutral"} className="sm:hidden shrink-0">
        {`${count} ${MATRIX.countUnit}`}
      </Chip>
    </div>
  );
}

interface ExpertCountCellProps {
  count: number;
  label: string;
}

function ExpertCountCell({ count, label }: ExpertCountCellProps) {
  const sole = count === 1;
  return (
    <div
      role="img"
      aria-label={`${label}: ${count} ${MATRIX.countUnit}`}
      className={`hidden sm:flex items-center justify-end gap-1 text-[11px] font-mono tabular-nums ${
        sole ? "text-red-300" : "text-white/70"
      }`}
    >
      {sole && <TriangleAlert className="w-3 h-3" />}
      {count}
    </div>
  );
}

interface EvidenceStatProps {
  label: string;
  value?: string;
  sub?: string;
  className?: string;
  children?: ReactNode;
}

function EvidenceStat({ label, value, sub, className = "", children }: EvidenceStatProps) {
  return (
    <div className={`rounded-lg border border-white/8 bg-white/2 px-3 py-2 ${className}`}>
      <div className="text-[10px] font-mono text-white/60">{label}</div>
      {value !== undefined && <div className="mt-0.5 text-sm font-semibold text-white tabular-nums">{value}</div>}
      {sub !== undefined && <div className="text-[10px] font-mono text-white/60">{sub}</div>}
      {children}
    </div>
  );
}

interface ComplexityBarProps {
  items: ComplexityItem[];
  total: number;
}

function ComplexityBar({ items, total }: ComplexityBarProps) {
  return (
    <>
      <div className="mt-1.5 flex h-1.5 rounded-full overflow-hidden bg-white/8">
        {items.map((item) => (
          <span
            key={item.label}
            className={`h-full ${item.color}`}
            style={{ width: `${total > 0 ? (item.value / total) * 100 : 0}%` }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-2.5 gap-y-1 text-[10px] font-mono text-white/70">
        {items.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
            {`${item.label} ${item.value}`}
          </span>
        ))}
      </div>
    </>
  );
}

interface ContextRowProps {
  item: ContextItem;
}

function ContextRow({ item }: ContextRowProps) {
  const Icon = CONTEXT_ICONS[item.kind];
  return (
    <div className="flex items-start gap-2 rounded-lg border border-white/8 bg-white/2 px-3 py-2">
      <Icon className="w-3.5 h-3.5 text-sky-300 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <div className="text-[11px] font-semibold text-white">{item.title}</div>
        <p className="text-[11px] text-white/75 leading-snug">
          <IdText text={item.text} />
        </p>
      </div>
    </div>
  );
}

interface InsightRowProps {
  insight: Insight;
}

function InsightRow({ insight }: InsightRowProps) {
  const { icon: Icon, color } = INSIGHT_STYLES[insight.kind];
  return (
    <div className="flex items-start gap-2">
      <Icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${color}`} />
      <div className="min-w-0">
        <div className="text-[11px] font-semibold text-white">{insight.title}</div>
        <p className="text-[11px] text-white/75 leading-snug">
          <IdText text={insight.text} />
        </p>
      </div>
    </div>
  );
}

interface CheckRowProps {
  text: string;
}

function CheckRow({ text }: CheckRowProps) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
      <p className="text-[11px] text-white/85 leading-snug">{text}</p>
    </div>
  );
}

interface ReasonRowProps {
  reason: Reason;
}

function ReasonRow({ reason }: ReasonRowProps) {
  const Icon = REASON_ICONS[reason.kind];
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-3 h-3 text-red-200/80 shrink-0 mt-0.5" />
      <p className="text-[11px] text-white/85 leading-snug">
        <IdText text={reason.text} />
      </p>
    </div>
  );
}

interface ActionRowProps {
  index: number;
  action: DependencyAction;
  accent: AccentClasses;
}

function ActionRow({ index, action, accent }: ActionRowProps) {
  const Icon = ACTION_ICONS[action.kind];
  return (
    <div className="flex items-start gap-3">
      <span
        className={`shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border ${accent.border} ${accent.bg} ${accent.text} text-[9px] font-mono font-semibold tabular-nums mt-0.5`}
      >
        {index}
      </span>
      <div className="min-w-0">
        <div className="flex items-start gap-1.5 text-xs font-medium text-white/90">
          <Icon className={`w-3 h-3 ${accent.text} shrink-0 mt-0.5`} />
          <span>
            <IdText text={action.title} />
          </span>
        </div>
        <div className="text-[10px] font-mono text-white/60">
          <IdText text={action.sub} />
        </div>
      </div>
    </div>
  );
}

interface CandidateRowProps {
  candidate: Candidate;
  accent: AccentClasses;
}

function CandidateRow({ candidate, accent }: CandidateRowProps) {
  const level = levelOf(candidate.code, candidate.areaKey);
  const suggested = candidate.status === "önerildi";
  return (
    <div
      className={`rounded-lg border p-3 ${suggested ? `${accent.border} ${accent.bg}` : "border-white/8 bg-white/2"}`}
    >
      <div className="flex items-center gap-2.5">
        <Avatar code={candidate.code} size="md" tone="neutral" accent={accent} />
        <div className="min-w-0">
          <div className="text-xs font-semibold text-white">{techName(candidate.code)}</div>
          <div className="text-[10px] font-mono text-white/60">{areaLabel(candidate.areaKey)}</div>
        </div>
        <Chip tone={suggested ? "success" : "neutral"} className="ml-auto shrink-0">
          {candidate.status}
        </Chip>
      </div>
      {candidate.note && (
        <div className="mt-1.5 pl-[38px] text-[10px] font-mono text-amber-200">
          <IdText text={candidate.note} />
        </div>
      )}
      <div className="mt-2 pt-2 border-t border-white/8 grid grid-cols-3 gap-1.5">
        <Criterion label={ASSIGNMENT.criteria.expertise}>
          <span className="inline-flex items-center gap-1">
            <LevelGlyph level={level} variant="inline" accent={accent} />
            <span className={LEVELS[level].text}>{LEVELS[level].label}</span>
          </span>
        </Criterion>
        <Criterion label={ASSIGNMENT.criteria.load}>
          <span className={candidate.loadWarn ? "text-amber-200" : "text-white/85"}>
            {`${openRecords(candidate.code)} açık`}
          </span>
        </Criterion>
        <Criterion label={ASSIGNMENT.criteria.availability}>
          <span className={candidate.availabilityWarn ? "text-amber-200" : "text-emerald-200"}>
            {candidate.availability}
          </span>
        </Criterion>
      </div>
    </div>
  );
}

interface CriterionProps {
  label: string;
  children: ReactNode;
}

function Criterion({ label, children }: CriterionProps) {
  return (
    <div className="min-w-0">
      <div className="text-[9px] font-mono text-white/60">{label}</div>
      <div className="mt-0.5 text-[10px] font-mono">{children}</div>
    </div>
  );
}

interface CareerPathProps {
  steps: PathStep[];
  accent: AccentClasses;
}

function CareerPath({ steps, accent }: CareerPathProps) {
  return (
    <div className="relative grid grid-cols-3">
      <span
        aria-hidden
        className="absolute top-2.5 left-[16.67%] w-[33.33%] h-px bg-linear-to-r from-emerald-400/70 to-sky-400/70"
      />
      <span aria-hidden className="absolute top-2.5 left-1/2 w-[33.33%] border-t border-dashed border-white/25" />
      {steps.map((step) => {
        const labelColor =
          step.state === "current" ? accent.text : step.state === "done" ? "text-white/85" : "text-white/70";
        return (
          <div key={step.label} className="relative z-10 flex flex-col items-center gap-1">
            <span className="inline-flex rounded-full bg-(--color-surface-base)">
              <PathNode state={step.state} accent={accent} />
            </span>
            <span className={`text-[11px] font-semibold ${labelColor}`}>{step.label}</span>
            <span className="text-[9px] font-mono text-white/60">{step.sub}</span>
          </div>
        );
      })}
    </div>
  );
}

interface PathNodeProps {
  state: PathState;
  accent: AccentClasses;
}

function PathNode({ state, accent }: PathNodeProps) {
  if (state === "done") {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-200">
        <Check className="w-3 h-3" />
      </span>
    );
  }
  if (state === "current") {
    return (
      <span
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${accent.bg} border ${accent.border} ring-2 ${accent.ring}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
      </span>
    );
  }
  return <span className="inline-flex w-5 h-5 rounded-full border border-dashed border-white/30" />;
}

interface GapRowProps {
  title: string;
  sub: string;
  from?: Level;
  to?: Level;
  right?: ReactNode;
  icon?: ReactNode;
  highlight?: boolean;
  accent: AccentClasses;
}

function GapRow({ title, sub, from, to, right, icon, highlight = false, accent }: GapRowProps) {
  return (
    <div
      className={`flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg border px-3 py-2 ${
        highlight ? `${accent.border} ${accent.bg}` : "border-white/8 bg-white/2"
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/85">
          {icon}
          <span>{title}</span>
        </div>
        <div className="text-[10px] font-mono text-white/60">
          <IdText text={sub} />
        </div>
      </div>
      <div className="shrink-0 flex flex-col items-start sm:items-end gap-1">
        {from !== undefined && to !== undefined ? (
          <>
            <div className="flex items-center gap-1.5">
              <LevelGlyph level={from} variant="inline" accent={accent} />
              <ArrowRight className="w-3 h-3 text-(--color-text-muted)" />
              <LevelGlyph level={to} variant="inline" accent={accent} />
            </div>
            <div className="text-[10px] font-mono text-white/70">
              {`${LEVELS[from].label} → `}
              <span className={accent.text}>{LEVELS[to].label}</span>
            </div>
          </>
        ) : (
          right
        )}
      </div>
    </div>
  );
}

interface PairRowProps {
  pair: MentorPair;
  accent: AccentClasses;
}

function PairRow({ pair, accent }: PairRowProps) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar code={pair.mentor} size="sm" tone="neutral" accent={accent} title={techName(pair.mentor)} />
      <ArrowRight className="w-3 h-3 text-(--color-text-muted) shrink-0" />
      <Avatar
        code={pair.mentee}
        size="sm"
        tone={pair.mentee === FOCUS_TECH ? "accent" : "neutral"}
        accent={accent}
        title={techName(pair.mentee)}
      />
      <div className="min-w-0">
        <div className="text-[11px] text-white/85 leading-snug">{pair.area}</div>
        <div className="text-[10px] font-mono text-white/60">{pair.note}</div>
      </div>
    </div>
  );
}

interface TrainingRowProps {
  training: Training;
  accent: AccentClasses;
}

function TrainingRow({ training, accent }: TrainingRowProps) {
  const { icon: Icon, tag } = TRAINING_STYLES[training.kind];
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-white/8 bg-white/2 p-3">
      <span
        className={`w-6 h-6 rounded-md ${accent.bg} ${accent.text} inline-flex items-center justify-center shrink-0`}
      >
        <Icon className="w-3 h-3" />
      </span>
      <div className="min-w-0">
        <div className="text-xs font-semibold text-white leading-snug">{training.title}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className={`px-1.5 py-0.5 rounded border text-[9px] font-mono ${tag}`}>{training.kind}</span>
          <span className="text-[10px] font-mono text-white/65">{training.closes}</span>
        </div>
      </div>
    </div>
  );
}

// Kayıt ve varlık kimlikleri (INC-2851, DB-CORE-01, SRV-MAIL-01/02) tireden bölünmez; kimliğe bitişik ek de onunla kalır.
const ID_TOKEN = /([A-Z]{2,}(?:-[A-Z0-9]+)+(?:\/\d+)?(?:'[a-zçğıöşü]+)?)/;

interface IdTextProps {
  text: string;
}

function IdText({ text }: IdTextProps) {
  return (
    <>
      {text.split(ID_TOKEN).map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

interface MetaSegmentsProps {
  parts: string[];
}

// Alt bilgi parçaları kendi içinde bölünmez; satır yalnız "·" ayırıcısından sonra kırılır.
function MetaSegments({ parts }: MetaSegmentsProps) {
  return (
    <>
      {parts.map((part, index) => (
        <span key={part}>
          {index > 0 && " "}
          <span className="whitespace-nowrap">{index < parts.length - 1 ? `${part} ·` : part}</span>
        </span>
      ))}
    </>
  );
}

interface NoteLineProps {
  icon: LucideIcon;
  children: ReactNode;
}

function NoteLine({ icon: Icon, children }: NoteLineProps) {
  return (
    <div className="mt-2 flex items-start gap-1.5 text-[10px] font-mono text-white/70">
      <Icon className="w-3 h-3 shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}
