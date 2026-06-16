import type { ReactNode } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bell,
  BookOpen,
  Bot,
  Boxes,
  Briefcase,
  Building2,
  Calendar,
  CalendarClock,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Clock,
  Cloud,
  Code,
  Combine,
  Cpu,
  Database,
  Eye,
  FileSignature,
  FileText,
  Filter,
  Flag,
  Gauge,
  GitBranch,
  GitMerge,
  Globe,
  HardDrive,
  HelpCircle,
  History,
  KeyRound,
  Laptop,
  Layers,
  Lightbulb,
  Link2,
  List,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Monitor,
  Moon,
  Network,
  Package,
  Phone,
  Play,
  Plug,
  Plus,
  Printer,
  Radar,
  RefreshCw,
  Repeat,
  Scale,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Sliders,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Sun,
  Target,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Truck,
  Type,
  Upload,
  User,
  Users,
  Wallet,
  Waypoints,
  Webhook,
  WifiOff,
  XCircle,
  Zap,
} from "lucide-react";

// ============================================================
// Types
// ============================================================

export type MockAccent =
  | "blue"
  | "red"
  | "amber"
  | "cyan"
  | "purple"
  | "orange"
  | "sky"
  | "pink"
  | "emerald"
  | "indigo";

interface ModuleMockProps {
  moduleId: string;
  accent: MockAccent;
}

interface AccentClasses {
  text: string;
  bg: string;
  border: string;
  chip: string;
  dot: string;
}

const ACCENT_MAP: Record<MockAccent, AccentClasses> = {
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/30",
    chip: "text-blue-400 bg-blue-500/15 border-blue-500/30",
    dot: "bg-blue-400",
  },
  red: {
    text: "text-red-400",
    bg: "bg-red-500/15",
    border: "border-red-500/30",
    chip: "text-red-400 bg-red-500/15 border-red-500/30",
    dot: "bg-red-400",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/15",
    border: "border-amber-500/30",
    chip: "text-amber-400 bg-amber-500/15 border-amber-500/30",
    dot: "bg-amber-400",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/15",
    border: "border-cyan-500/30",
    chip: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
    dot: "bg-cyan-400",
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-500/15",
    border: "border-purple-500/30",
    chip: "text-purple-400 bg-purple-500/15 border-purple-500/30",
    dot: "bg-purple-400",
  },
  orange: {
    text: "text-orange-400",
    bg: "bg-orange-500/15",
    border: "border-orange-500/30",
    chip: "text-orange-400 bg-orange-500/15 border-orange-500/30",
    dot: "bg-orange-400",
  },
  sky: {
    text: "text-sky-400",
    bg: "bg-sky-500/15",
    border: "border-sky-500/30",
    chip: "text-sky-400 bg-sky-500/15 border-sky-500/30",
    dot: "bg-sky-400",
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-500/15",
    border: "border-pink-500/30",
    chip: "text-pink-400 bg-pink-500/15 border-pink-500/30",
    dot: "bg-pink-400",
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/30",
    chip: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-500/15",
    border: "border-indigo-500/30",
    chip: "text-indigo-400 bg-indigo-500/15 border-indigo-500/30",
    dot: "bg-indigo-400",
  },
};

// Shared frame wrapper
interface FrameProps {
  children: ReactNode;
}

function Frame({ children }: FrameProps) {
  return (
    <div className="relative rounded-[4mm] border border-white/10 bg-white/2 overflow-hidden p-[5mm] w-full">
      {children}
    </div>
  );
}

// Shared title bar
interface TitleBarProps {
  icon: ReactNode;
  title: string;
  meta?: string;
  accent: AccentClasses;
}

function TitleBar({ icon, title, meta, accent }: TitleBarProps) {
  return (
    <div className="flex items-center justify-between pb-[2mm] mb-[3mm] border-b border-white/8">
      <div className="flex items-center gap-[2mm]">
        <span className={accent.text}>{icon}</span>
        <span className="text-[8pt] font-mono font-semibold uppercase tracking-[0.2em] text-white">
          {title}
        </span>
      </div>
      {meta && (
        <span className="text-[7pt] font-mono text-slate-500">{meta}</span>
      )}
    </div>
  );
}

// ============================================================
// 1. Service Desk & Interaction Management — omnichannel inbox
// ============================================================

function ServiceDeskMock({ accent }: { accent: AccentClasses }) {
  const channels = [
    { icon: Mail, label: "E-posta", n: 12, tone: "text-blue-400 bg-blue-500/15 border-blue-500/30" },
    { icon: MessageCircle, label: "Chat", n: 8, tone: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30" },
    { icon: Phone, label: "Telefon", n: 6, tone: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30" },
    { icon: Activity, label: "Sosyal", n: 4, tone: "text-purple-400 bg-purple-500/15 border-purple-500/30" },
  ];

  const interactions = [
    { icon: Mail, title: "VPN erişim hatası — kullanıcı raporu", time: "2 dk önce", status: "Yeni", statusTone: "text-blue-400 bg-blue-500/10 border-blue-500/25" },
    { icon: MessageCircle, title: "Yazılım kurulum talebi", time: "8 dk önce", status: "Sınıf.", statusTone: "text-amber-400 bg-amber-500/10 border-amber-500/25" },
    { icon: Phone, title: "ERP raporlama soru — Finans", time: "14 dk önce", status: "Atandı", statusTone: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25" },
    { icon: Activity, title: "Yazıcı arıza şikayeti — Kat 4", time: "26 dk önce", status: "Olay", statusTone: "text-red-400 bg-red-500/10 border-red-500/25" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<MessageCircle className="w-[3mm] h-[3mm]" />}
        title="Etkileşim Gelen Kutusu"
        meta="30 aktif"
        accent={accent}
      />

      {/* Channel ribbon */}
      <div className="flex items-center gap-[1.5mm] mb-[3mm] flex-wrap">
        <span className="text-[7pt] font-mono uppercase tracking-[0.2em] text-slate-500 mr-[1mm]">
          Kanallar
        </span>
        {channels.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-[1mm] px-[1.5mm] py-[0.5mm] rounded-md border ${c.tone}`}
            >
              <Icon className="w-[2.5mm] h-[2.5mm]" />
              <span className="text-[7pt] font-medium text-white">{c.label}</span>
              <span className="text-[7pt] font-mono">{c.n}</span>
            </div>
          );
        })}
      </div>

      {/* Interaction rows */}
      <div className="flex flex-col gap-[1.5mm]">
        {interactions.map((r, i) => {
          const Icon = r.icon;
          return (
            <div
              key={i}
              className="grid grid-cols-[auto_1fr_auto_auto] gap-[2mm] items-center px-[2mm] py-[1.5mm] rounded-md bg-white/2 border border-white/5"
            >
              <Icon className={`w-[3mm] h-[3mm] ${accent.text}`} />
              <span className="text-[8pt] font-medium text-white truncate">
                {r.title}
              </span>
              <span className="text-[7pt] font-mono text-slate-500">{r.time}</span>
              <span
                className={`text-[7pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border ${r.statusTone}`}
              >
                {r.status}
              </span>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

// ============================================================
// 2. Incident Management — active incident list
// ============================================================

function IncidentMock({ accent }: { accent: AccentClasses }) {
  const rows = [
    { id: "#4218", title: "VPN bağlantı sorunu — istek yanıtsız", assignee: "Ahmet Y.", priority: "Yüksek", sla: "1s 22d", pTone: "text-red-400 bg-red-500/10 border-red-500/25", sTone: "text-amber-400" },
    { id: "#4217", title: "Mail sunucu gecikme alarmı", assignee: "Selin K.", priority: "Kritik", sla: "0s 18d", pTone: "text-red-400 bg-red-500/15 border-red-500/30", sTone: "text-red-400" },
    { id: "#4216", title: "ERP raporlama hatası", assignee: "Mehmet T.", priority: "Orta", sla: "3s 45d", pTone: "text-amber-400 bg-amber-500/10 border-amber-500/25", sTone: "text-emerald-400" },
    { id: "#4215", title: "Yazıcı arızası — Kat 4", assignee: "Ayşe D.", priority: "Düşük", sla: "6s 10d", pTone: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25", sTone: "text-emerald-400" },
    { id: "#4214", title: "Disk %95 dolu — DB sunucu", assignee: "Sistem", priority: "Yüksek", sla: "2s 03d", pTone: "text-red-400 bg-red-500/10 border-red-500/25", sTone: "text-amber-400" },
  ];

  return (
    <Frame>
      <div className="flex items-center justify-between pb-[2mm] mb-[3mm] border-b border-white/8">
        <div className="flex items-center gap-[2mm]">
          <span className="text-[7pt] font-mono font-semibold uppercase tracking-[0.2em] text-slate-500">
            Aktif Olaylar
          </span>
          <span className="text-[10pt] font-bold text-white">42</span>
          <span className={`w-[1.2mm] h-[1.2mm] rounded-full ${accent.dot}`} />
        </div>
        <div className="flex items-center gap-[1.5mm]">
          <div className="flex items-center gap-[1mm] px-[1.5mm] py-[0.5mm] rounded-md bg-white/3 border border-white/8">
            <Search className="w-[2.5mm] h-[2.5mm] text-slate-500" />
            <span className="text-[7pt] font-mono text-slate-500">ara</span>
          </div>
          <div className="flex items-center gap-[1mm] px-[1.5mm] py-[0.5mm] rounded-md bg-white/3 border border-white/8">
            <Filter className="w-[2.5mm] h-[2.5mm] text-slate-500" />
            <span className="text-[7pt] font-mono text-slate-500">filtre</span>
          </div>
          <Bell className={`w-[3mm] h-[3mm] ${accent.text}`} />
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[10mm_1fr_22mm_18mm_14mm] gap-[2mm] px-[2mm] py-[1mm] text-[7pt] font-mono font-semibold uppercase tracking-[0.18em] text-slate-500 bg-white/2 border border-white/5 rounded-md mb-[1.5mm]">
        <span>ID</span>
        <span>Başlık</span>
        <span>Atanan</span>
        <span>Önc.</span>
        <span>Hizmet Seviyesi</span>
      </div>

      {/* Incident rows */}
      <div className="flex flex-col gap-[1mm]">
        {rows.map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-[10mm_1fr_22mm_18mm_14mm] gap-[2mm] items-center px-[2mm] py-[1.5mm] rounded-md bg-white/2 border border-white/5"
          >
            <span className="text-[7pt] font-mono text-slate-500">{r.id}</span>
            <span className="text-[8pt] font-medium text-white truncate">
              {r.title}
            </span>
            <span className="text-[7pt] text-slate-300 truncate">{r.assignee}</span>
            <span
              className={`text-[7pt] font-mono font-semibold px-[1.2mm] py-[0.3mm] rounded-full border text-center ${r.pTone}`}
            >
              {r.priority}
            </span>
            <span className={`text-[8pt] font-mono font-bold ${r.sTone}`}>
              {r.sla}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// 3. Problem Management — problem analysis cards
// ============================================================

function ProblemMock({ accent }: { accent: AccentClasses }) {
  const problems = [
    {
      id: "P-018",
      title: "VPN sertifika süresi dolan kullanıcı kümesi",
      cause: "Otomatik yenileme servisi çakışması",
      incidents: 12,
      knownError: true,
    },
    {
      id: "P-017",
      title: "ERP toplu rapor zaman aşımı",
      cause: "İndeks fragmentasyonu",
      incidents: 8,
      knownError: true,
    },
    {
      id: "P-016",
      title: "Mail sunucu gecikme paterni",
      cause: "Spam filtresi gecikmesi",
      incidents: 5,
      knownError: false,
    },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<HelpCircle className="w-[3mm] h-[3mm]" />}
        title="Problem Kayıt Defteri"
        meta="3 aktif analiz"
        accent={accent}
      />

      <div className="flex flex-col gap-[2mm]">
        {problems.map((p, i) => (
          <div
            key={i}
            className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[2mm]">
                <span className={`text-[8pt] font-mono font-bold ${accent.text}`}>
                  {p.id}
                </span>
                <span className="text-[8pt] font-medium text-white truncate">
                  {p.title}
                </span>
              </div>
              {p.knownError && (
                <span className="text-[7pt] font-mono px-[1.5mm] py-[0.3mm] rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">
                  Bilinen Hata
                </span>
              )}
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-[2mm] items-center">
              <div className="flex items-center gap-[1.5mm] min-w-0">
                <Lightbulb className="w-[2.5mm] h-[2.5mm] text-amber-400 shrink-0" />
                <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500 shrink-0">
                  Kök neden
                </span>
                <span className="text-[7pt] text-slate-300 truncate">{p.cause}</span>
              </div>
              <div className="flex items-center gap-[1mm]">
                <AlertCircle className="w-[2.5mm] h-[2.5mm] text-red-400" />
                <span className="text-[7pt] font-mono text-white">
                  {p.incidents} olay
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// 4. Request Management — service catalog form preview
// ============================================================

function RequestMock({ accent }: { accent: AccentClasses }) {
  const fields = [
    { label: "Hizmet Türü", value: "Yazılım Kurulumu", icon: BookOpen },
    { label: "Talep Eden", value: "Selin K. · Pazarlama", icon: User },
    { label: "Aciliyet", value: "Orta · 3 iş günü", icon: Clock },
    { label: "Açıklama", value: "Adobe Creative Cloud lisans aktivasyonu", icon: FileText },
  ];

  const approvalChain = [
    { role: "Yönetici", name: "Mehmet T.", status: "done" },
    { role: "BT Onay", name: "Ahmet Y.", status: "active" },
    { role: "Finans", name: "Ayşe D.", status: "pending" },
    { role: "Tedarik", name: "Ekip", status: "pending" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<ShoppingCart className="w-[3mm] h-[3mm]" />}
        title="Servis Talep Formu — REQ-2418"
        meta="Yeni"
        accent={accent}
      />

      <div className="grid grid-cols-[1fr_50mm] gap-[3mm]">
        {/* Form fields */}
        <div className="flex flex-col gap-[1.5mm]">
          {fields.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="rounded-md border border-white/8 bg-white/2 p-[2mm] flex flex-col gap-[0.5mm]"
              >
                <div className="flex items-center gap-[1mm]">
                  <Icon className="w-[2.5mm] h-[2.5mm] text-slate-500" />
                  <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
                    {f.label}
                  </span>
                </div>
                <span className="text-[8pt] font-medium text-white truncate pl-[3.5mm]">
                  {f.value}
                </span>
              </div>
            );
          })}

          <div className="flex items-center gap-[2mm] mt-[1mm]">
            <div
              className={`flex items-center gap-[1mm] px-[3mm] py-[1.5mm] rounded-full ${accent.bg} border ${accent.border}`}
            >
              <span className={`text-[8pt] font-semibold ${accent.text}`}>
                Talep Gönder
              </span>
              <ArrowRight className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
            </div>
            <div className="flex items-center gap-[1mm] px-[3mm] py-[1.5mm] rounded-full bg-white/3 border border-white/10">
              <span className="text-[8pt] font-medium text-slate-300">Taslak</span>
            </div>
          </div>
        </div>

        {/* Approval chain */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm]">
          <div className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500 mb-[2mm]">
            Onay Zinciri
          </div>
          <div className="flex flex-col gap-[1.5mm]">
            {approvalChain.map((a, i) => {
              const isDone = a.status === "done";
              const isActive = a.status === "active";
              const isPending = a.status === "pending";
              return (
                <div key={i} className="flex items-center gap-[1.5mm]">
                  <div
                    className={`w-[3mm] h-[3mm] rounded-full border flex items-center justify-center shrink-0 ${
                      isDone
                        ? "bg-emerald-500/20 border-emerald-500/40"
                        : isActive
                        ? `${accent.bg} ${accent.border}`
                        : "bg-white/3 border-white/10"
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-[2mm] h-[2mm] text-emerald-400" />}
                    {isActive && <Clock className={`w-[2mm] h-[2mm] ${accent.text}`} />}
                    {isPending && <span className="w-[1mm] h-[1mm] rounded-full bg-white/20" />}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
                      {a.role}
                    </span>
                    <span className="text-[8pt] text-white truncate">{a.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// 5. Change Management — RFC approval timeline
// ============================================================

function ChangeMock({ accent }: { accent: AccentClasses }) {
  const stages = [
    { label: "RFC Açıldı", actor: "Ahmet Y.", time: "14:02", icon: FileText, status: "done" },
    { label: "Plan Hazır", actor: "Release Ekibi", time: "15:30", icon: Calendar, status: "done" },
    { label: "CAB İncelemesi", actor: "Mehmet T. · Selin K.", time: "16:45", icon: Users, status: "active" },
    { label: "Onay & Uygulama", actor: "Cmt 02:00 penceresi", time: "Bekliyor", icon: CheckCircle2, status: "pending" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<RefreshCw className="w-[3mm] h-[3mm]" />}
        title="CHG-2841 · Auth Service v4.2"
        meta="Risk: Düşük"
        accent={accent}
      />

      <div className="relative pl-[2mm]">
        {/* Vertical line */}
        <div className="absolute left-[6mm] top-[2mm] bottom-[2mm] w-[0.3mm] bg-white/10" />

        <div className="flex flex-col gap-[3mm]">
          {stages.map((s, i) => {
            const Icon = s.icon;
            const isDone = s.status === "done";
            const isActive = s.status === "active";
            return (
              <div key={i} className="grid grid-cols-[10mm_1fr_auto] gap-[2mm] items-start">
                <div
                  className={`relative z-10 w-[8mm] h-[8mm] rounded-full border flex items-center justify-center shrink-0 ${
                    isDone
                      ? "bg-emerald-500/15 border-emerald-500/35"
                      : isActive
                      ? `${accent.bg} ${accent.border}`
                      : "bg-white/3 border-white/10"
                  }`}
                >
                  <Icon
                    className={`w-[3mm] h-[3mm] ${
                      isDone
                        ? "text-emerald-400"
                        : isActive
                        ? accent.text
                        : "text-slate-500"
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-[0.5mm] min-w-0 pt-[1mm]">
                  <span className="text-[8pt] font-semibold text-white">
                    {s.label}
                  </span>
                  <span className="text-[7pt] text-slate-400 truncate">{s.actor}</span>
                </div>
                <span className="text-[7pt] font-mono text-slate-500 pt-[1.5mm] tabular-nums">
                  {s.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// 6. Asset Management — asset table
// ============================================================

function AssetMock({ accent }: { accent: AccentClasses }) {
  const assets = [
    { id: "AST-2148", name: "DELL Latitude 7440", icon: Laptop, owner: "Ahmet Y.", status: "Aktif", sTone: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
    { id: "AST-2147", name: "HP LaserJet M404", icon: Printer, owner: "Kat 4", status: "Bakım", sTone: "text-amber-400 bg-amber-500/10 border-amber-500/25" },
    { id: "AST-2146", name: "Dell PowerEdge R750", icon: Server, owner: "Veri Merkezi", status: "Aktif", sTone: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
    { id: "AST-2145", name: "Cisco Catalyst 9300", icon: Network, owner: "Ağ Ekibi", status: "Aktif", sTone: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
    { id: "AST-2144", name: "Apple MacBook Pro 14", icon: Laptop, owner: "Selin K.", status: "Atama", sTone: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<HardDrive className="w-[3mm] h-[3mm]" />}
        title="Varlık Envanteri"
        meta="2.148 kayıt"
        accent={accent}
      />

      <div className="grid grid-cols-[16mm_auto_1fr_22mm_18mm] gap-[2mm] px-[2mm] py-[1mm] text-[7pt] font-mono font-semibold uppercase tracking-[0.18em] text-slate-500 bg-white/2 border border-white/5 rounded-md mb-[1.5mm]">
        <span>Varlık ID</span>
        <span>Tür</span>
        <span>İsim</span>
        <span>Sahip</span>
        <span>Durum</span>
      </div>

      <div className="flex flex-col gap-[1mm]">
        {assets.map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={i}
              className="grid grid-cols-[16mm_auto_1fr_22mm_18mm] gap-[2mm] items-center px-[2mm] py-[1.5mm] rounded-md bg-white/2 border border-white/5"
            >
              <span className="text-[7pt] font-mono text-slate-500">{a.id}</span>
              <Icon className={`w-[3mm] h-[3mm] ${accent.text}`} />
              <span className="text-[8pt] font-medium text-white truncate">
                {a.name}
              </span>
              <span className="text-[7pt] text-slate-300 truncate">{a.owner}</span>
              <span
                className={`text-[7pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border text-center ${a.sTone}`}
              >
                {a.status}
              </span>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

// ============================================================
// 7. Configuration Management & CMDB — CI graph
// ============================================================

function CmdbMock({ accent }: { accent: AccentClasses }) {
  const nodes = [
    { id: "app", label: "Uygulama Sunucu", icon: Server, x: 50, y: 18 },
    { id: "db", label: "Veritabanı", icon: Database, x: 18, y: 50 },
    { id: "lb", label: "Yük Dengeleyici", icon: Network, x: 82, y: 50 },
    { id: "client", label: "Web İstemci", icon: Monitor, x: 35, y: 82 },
    { id: "auth", label: "Auth Servisi", icon: Lock, x: 65, y: 82 },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<GitBranch className="w-[3mm] h-[3mm]" />}
        title="CI Bağıntı Haritası — ERP Hizmeti"
        meta="5 bileşen"
        accent={accent}
      />

      <div className="relative w-full h-[55mm]">
        {/* Connection lines via SVG */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {nodes
            .filter((n) => n.id !== "app")
            .map((n, i) => (
              <line
                key={i}
                x1={50}
                y1={32}
                x2={n.x}
                y2={n.y}
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="1.5 1"
                className={`${accent.text} opacity-50`}
                vectorEffect="non-scaling-stroke"
              />
            ))}
        </svg>

        {/* Center service node */}
        <div
          className={`absolute w-[24mm] h-[14mm] rounded-md ${accent.bg} border ${accent.border} flex flex-col items-center justify-center gap-[0.5mm]`}
          style={{ left: "50%", top: "18%", transform: "translate(-50%, -50%)" }}
        >
          <Layers className={`w-[3.5mm] h-[3.5mm] ${accent.text}`} />
          <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-white">
            HİZMET
          </span>
          <span className={`text-[7pt] font-medium ${accent.text}`}>ERP-PROD</span>
        </div>

        {/* Connected CI nodes */}
        {nodes
          .filter((n) => n.id !== "app")
          .map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className="absolute w-[20mm] h-[12mm] rounded-md bg-white/4 border border-white/15 flex flex-col items-center justify-center gap-[0.5mm]"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Icon className="w-[3mm] h-[3mm] text-slate-300" />
                <span className="text-[6.5pt] font-medium text-white text-center px-[1mm] leading-tight">
                  {n.label}
                </span>
              </div>
            );
          })}
      </div>
    </Frame>
  );
}

// ============================================================
// 8. Knowledge Management — KB article grid
// ============================================================

function KnowledgeMock({ accent }: { accent: AccentClasses }) {
  const articles = [
    { cat: "VPN", title: "VPN bağlantı sertifikası nasıl yenilenir?", views: 2418, updated: "2 gün önce" },
    { cat: "ERP", title: "Toplu rapor zaman aşımı çözümü", views: 1862, updated: "5 gün önce" },
    { cat: "E-posta", title: "Outlook profil onarım rehberi", views: 1247, updated: "1 hafta önce" },
    { cat: "Erişim", title: "AD parola sıfırlama prosedürü", views: 3104, updated: "3 gün önce" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<BookOpen className="w-[3mm] h-[3mm]" />}
        title="Bilgi Bankası"
        meta="284 makale"
        accent={accent}
      />

      <div className="grid grid-cols-2 gap-[2mm]">
        {articles.map((a, i) => (
          <div
            key={i}
            className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]"
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[7pt] font-mono uppercase tracking-[0.18em] px-[1.5mm] py-[0.3mm] rounded-full border ${accent.chip}`}
              >
                {a.cat}
              </span>
              <span className="text-[7pt] font-mono text-slate-500">
                {a.updated}
              </span>
            </div>
            <span className="text-[8pt] font-semibold text-white leading-tight line-clamp-2">
              {a.title}
            </span>
            <div className="flex items-center gap-[1mm] mt-auto">
              <Eye className="w-[2.5mm] h-[2.5mm] text-slate-500" />
              <span className="text-[7pt] font-mono text-slate-400 tabular-nums">
                {a.views.toLocaleString("tr-TR")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// 9. Service Catalog — service tile grid
// ============================================================

function CatalogMock({ accent }: { accent: AccentClasses }) {
  const services = [
    { title: "Yeni Çalışan Onboarding", desc: "Hesap, donanım, erişim", icon: User },
    { title: "VPN Erişim Talebi", desc: "Uzak ofis bağlantısı", icon: Shield },
    { title: "Yazılım Kurulum", desc: "Lisanslı uygulama isteği", icon: Laptop },
    { title: "Donanım Tedarik", desc: "Bilgisayar, monitör, çevre", icon: Monitor },
    { title: "Toplantı Odası", desc: "Rezervasyon ve donanım", icon: Calendar },
    { title: "Şifre Sıfırlama", desc: "Acil erişim çözümü", icon: Lock },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Layers className="w-[3mm] h-[3mm]" />}
        title="Servis Kataloğu"
        meta="184 hizmet"
        accent={accent}
      />

      <div className="grid grid-cols-3 gap-[2mm]">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]"
            >
              <div
                className={`w-[6mm] h-[6mm] rounded-md ${accent.bg} border ${accent.border} flex items-center justify-center`}
              >
                <Icon className={`w-[3mm] h-[3mm] ${accent.text}`} />
              </div>
              <span className="text-[8pt] font-semibold text-white leading-tight">
                {s.title}
              </span>
              <span className="text-[7pt] font-light text-slate-400 leading-tight">
                {s.desc}
              </span>
              <div
                className={`mt-[0.5mm] inline-flex items-center gap-[1mm] px-[1.5mm] py-[0.5mm] rounded-full ${accent.bg} border ${accent.border} self-start`}
              >
                <span className={`text-[7pt] font-medium ${accent.text}`}>İste</span>
                <ArrowRight className={`w-[2mm] h-[2mm] ${accent.text}`} />
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

// ============================================================
// 10. Service Level Management — Hizmet Seviyesi dashboard
// ============================================================

function SlaMock({ accent }: { accent: AccentClasses }) {
  const metrics = [
    { label: "Yanıt Süresi", target: "15 dk", actual: "12 dk", percent: 96, tone: "emerald" },
    { label: "Çözüm Süresi", target: "4 sa", actual: "3.4 sa", percent: 92, tone: "emerald" },
    { label: "İlk Temas Çözüm", target: "%70", actual: "%64", percent: 85, tone: "amber" },
  ];

  const policies = [
    { name: "P1 · Kritik Olay", scope: "0/15 dk · 7/24", status: "Aktif" },
    { name: "P2 · Yüksek Olay", scope: "1 sa · iş saatleri", status: "Aktif" },
    { name: "P3 · Standart Talep", scope: "8 sa · iş saatleri", status: "Aktif" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Gauge className="w-[3mm] h-[3mm]" />}
        title="Hizmet Seviyesi Performans Paneli"
        meta="Mayıs 2026"
        accent={accent}
      />

      {/* Metric cards with progress bars */}
      <div className="grid grid-cols-3 gap-[2mm] mb-[3mm]">
        {metrics.map((m, i) => {
          const barTone =
            m.tone === "emerald"
              ? "bg-emerald-400"
              : m.tone === "amber"
              ? "bg-amber-400"
              : "bg-red-400";
          const textTone =
            m.tone === "emerald"
              ? "text-emerald-400"
              : m.tone === "amber"
              ? "text-amber-400"
              : "text-red-400";
          return (
            <div
              key={i}
              className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]"
            >
              <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
                {m.label}
              </span>
              <div className="flex items-baseline gap-[1.5mm]">
                <span className={`text-[12pt] font-mono font-bold ${textTone}`}>
                  {m.actual}
                </span>
                <span className="text-[7pt] font-mono text-slate-500">
                  hedef {m.target}
                </span>
              </div>
              <div className="h-[1.2mm] rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full ${barTone} rounded-full`}
                  style={{ width: `${m.percent}%` }}
                />
              </div>
              <span className={`text-[7pt] font-mono ${textTone} tabular-nums`}>
                %{m.percent}
              </span>
            </div>
          );
        })}
      </div>

      {/* Policy list */}
      <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm]">
        <div className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500 mb-[1.5mm]">
          Politika Tanımları
        </div>
        <div className="flex flex-col gap-[1mm]">
          {policies.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_auto] gap-[2mm] items-center px-[1.5mm] py-[1mm] rounded-md bg-white/2 border border-white/5"
            >
              <span className="text-[8pt] font-medium text-white truncate">
                {p.name}
              </span>
              <span className="text-[7pt] font-mono text-slate-400">{p.scope}</span>
              <span
                className={`text-[7pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border ${accent.chip}`}
              >
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// 11. Measurement & Reporting — KPI dashboard
// ============================================================

function ReportingMock({ accent }: { accent: AccentClasses }) {
  return (
    <Frame>
      <TitleBar
        icon={<TrendingUp className="w-[3mm] h-[3mm]" />}
        title="MRM · KPI Paneli"
        meta="30 gün"
        accent={accent}
      />

      <div className="grid grid-cols-4 gap-[2mm]">
        {/* Card 1: Bar chart */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
          <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
            Olay Hacmi
          </span>
          <span className="text-[14pt] font-mono font-bold text-white leading-none">
            1.418
          </span>
          <div className="flex items-end gap-[0.5mm] h-[10mm] mt-auto">
            {[2, 3, 2, 4, 3, 5, 4, 6, 5, 7].map((v, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm ${accent.bg} border ${accent.border}`}
                style={{ height: `${(v / 7) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Card 2: Line chart */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
          <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
            MTTR
          </span>
          <span className="text-[14pt] font-mono font-bold text-emerald-400 leading-none">
            3.4sa
          </span>
          <svg viewBox="0 0 60 24" className="w-full h-[10mm] mt-auto" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-emerald-400"
              points="0,18 10,16 20,14 30,12 40,10 50,8 60,6"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeDasharray="1 1"
              className="text-slate-500"
              points="0,14 60,14"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Card 3: Donut */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
          <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
            Hizmet Seviyesi Uyum
          </span>
          <span className="text-[14pt] font-mono font-bold text-white leading-none">
            %92
          </span>
          <div className="flex items-center justify-center mt-auto">
            <svg viewBox="0 0 36 36" className="w-[12mm] h-[12mm]">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-white/8"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="80 100"
                strokeDashoffset="0"
                className={accent.text}
                transform="rotate(-90 18 18)"
              />
            </svg>
          </div>
        </div>

        {/* Card 4: Gauge */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
          <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
            CSAT
          </span>
          <span className="text-[14pt] font-mono font-bold text-white leading-none">
            4.6 / 5
          </span>
          <div className="flex items-center gap-[0.5mm] mt-auto">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-[4mm] flex-1 rounded-sm ${
                  s <= 4 ? "bg-emerald-400" : "bg-emerald-400/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// 12. Self-Service Portal — landing
// ============================================================

function PortalMock({ accent }: { accent: AccentClasses }) {
  const myRequests = [
    { id: "REQ-2418", title: "Adobe lisans aktivasyonu", status: "Onayda", sTone: "text-amber-400" },
    { id: "REQ-2412", title: "VPN erişim talebi", status: "Atandı", sTone: "text-cyan-400" },
    { id: "REQ-2405", title: "Yeni klavye tedarik", status: "Tamamlandı", sTone: "text-emerald-400" },
  ];

  const tips = [
    "VPN bağlantısı için sertifikanızın güncel olduğundan emin olun.",
    "Yazılım talebi formunda lisans tipini belirtmeyi unutmayın.",
    "Acil olaylar için doğrudan 444CORE arayın.",
  ];

  return (
    <Frame>
      <TitleBar
        icon={<User className="w-[3mm] h-[3mm]" />}
        title="Servis Portalı — Hoş geldin Selin"
        meta="Pazarlama"
        accent={accent}
      />

      {/* Hero CTA */}
      <div
        className={`rounded-md ${accent.bg} border ${accent.border} p-[3mm] mb-[2.5mm] flex items-center justify-between`}
      >
        <div className="flex flex-col gap-[0.5mm]">
          <span className="text-[9pt] font-semibold text-white">
            Yeni bir talep oluştur
          </span>
          <span className="text-[7pt] font-light text-slate-300">
            Servis kataloğundan ihtiyacın olan hizmeti seç
          </span>
        </div>
        <div
          className={`flex items-center gap-[1.5mm] px-[3mm] py-[1.5mm] rounded-full bg-white/10 border border-white/20`}
        >
          <Plus className={`w-[3mm] h-[3mm] ${accent.text}`} />
          <span className="text-[8pt] font-semibold text-white">Talep Oluştur</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_50mm] gap-[2.5mm]">
        {/* My requests */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm]">
          <div className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500 mb-[1.5mm]">
            Son Taleplerim
          </div>
          <div className="flex flex-col gap-[1mm]">
            {myRequests.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-[16mm_1fr_auto] gap-[2mm] items-center px-[1.5mm] py-[1mm] rounded-md bg-white/2 border border-white/5"
              >
                <span className="text-[7pt] font-mono text-slate-500">{r.id}</span>
                <span className="text-[8pt] text-white truncate">{r.title}</span>
                <span className={`text-[7pt] font-mono ${r.sTone}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* KB tips */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm]">
          <div className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500 mb-[1.5mm]">
            Bilgi İpuçları
          </div>
          <div className="flex flex-col gap-[1.5mm]">
            {tips.map((t, i) => (
              <div key={i} className="flex items-start gap-[1.5mm]">
                <Lightbulb
                  className={`w-[2.5mm] h-[2.5mm] ${accent.text} shrink-0 mt-[0.5mm]`}
                />
                <span className="text-[7pt] font-light text-slate-300 leading-tight">
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// 13. Continual Improvement — CI register table
// ============================================================

function ContinualImprovementMock({ accent }: { accent: AccentClasses }) {
  const items = [
    { id: "CI-082", title: "Olay sınıflandırma otomasyonu", priority: "Yüksek", status: "Uygulama", owner: "Ahmet Y.", pTone: "text-red-400 bg-red-500/10 border-red-500/25" },
    { id: "CI-081", title: "KB makale arama puanı iyileştirme", priority: "Orta", status: "Analiz", owner: "Selin K.", pTone: "text-amber-400 bg-amber-500/10 border-amber-500/25" },
    { id: "CI-080", title: "Onay süresi kısaltma — standart RFC", priority: "Yüksek", status: "Pilot", owner: "Mehmet T.", pTone: "text-red-400 bg-red-500/10 border-red-500/25" },
    { id: "CI-079", title: "Self-servis kullanım oranını artırma", priority: "Orta", status: "Ölçüm", owner: "Ayşe D.", pTone: "text-amber-400 bg-amber-500/10 border-amber-500/25" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<TrendingUp className="w-[3mm] h-[3mm]" />}
        title="Sürekli İyileştirme Defteri"
        meta="82 girdi"
        accent={accent}
      />

      <div className="grid grid-cols-[14mm_1fr_18mm_18mm_22mm] gap-[2mm] px-[2mm] py-[1mm] text-[7pt] font-mono font-semibold uppercase tracking-[0.18em] text-slate-500 bg-white/2 border border-white/5 rounded-md mb-[1.5mm]">
        <span>ID</span>
        <span>Başlık</span>
        <span>Öncelik</span>
        <span>Durum</span>
        <span>Sahip</span>
      </div>

      <div className="flex flex-col gap-[1mm]">
        {items.map((it, i) => (
          <div
            key={i}
            className="grid grid-cols-[14mm_1fr_18mm_18mm_22mm] gap-[2mm] items-center px-[2mm] py-[1.5mm] rounded-md bg-white/2 border border-white/5"
          >
            <span className="text-[7pt] font-mono text-slate-500">{it.id}</span>
            <span className="text-[8pt] font-medium text-white truncate">
              {it.title}
            </span>
            <span
              className={`text-[7pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border text-center ${it.pTone}`}
            >
              {it.priority}
            </span>
            <span
              className={`text-[7pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border text-center ${accent.chip}`}
            >
              {it.status}
            </span>
            <span className="text-[7pt] text-slate-300 truncate">{it.owner}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// 14. Service Automation — When → Conditions → Actions
// ============================================================

function AutomationMock({ accent }: { accent: AccentClasses }) {
  return (
    <Frame>
      <TitleBar
        icon={<Bot className="w-[3mm] h-[3mm]" />}
        title="Otomasyon Kuralı — Olay Yönlendirme"
        meta="AUTO-014"
        accent={accent}
      />

      <div className="grid grid-cols-3 gap-[2mm]">
        {/* Column 1: When (trigger) */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
          <div className="flex items-center gap-[1.5mm] pb-[1mm] border-b border-white/8">
            <Zap className={`w-[3mm] h-[3mm] ${accent.text}`} />
            <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-white">
              When
            </span>
          </div>
          <div className="flex flex-col gap-[1mm]">
            <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
              Tetikleyici
            </span>
            <div className="flex items-center gap-[1mm] px-[1.5mm] py-[1mm] rounded-md bg-white/3 border border-white/8">
              <AlertCircle className="w-[2.5mm] h-[2.5mm] text-red-400" />
              <span className="text-[8pt] text-white">Yeni olay açıldı</span>
            </div>
            <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500 mt-[1mm]">
              Kanal
            </span>
            <div className="flex items-center gap-[1mm] px-[1.5mm] py-[1mm] rounded-md bg-white/3 border border-white/8">
              <Mail className="w-[2.5mm] h-[2.5mm] text-blue-400" />
              <span className="text-[8pt] text-white">E-posta · Monitoring</span>
            </div>
          </div>
        </div>

        {/* Column 2: Conditions */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
          <div className="flex items-center gap-[1.5mm] pb-[1mm] border-b border-white/8">
            <Filter className={`w-[3mm] h-[3mm] ${accent.text}`} />
            <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-white">
              Conditions
            </span>
          </div>
          <div className="flex flex-col gap-[1mm]">
            <div className="flex items-center gap-[1mm] px-[1.5mm] py-[1mm] rounded-md bg-white/3 border border-white/8">
              <span className="text-[7pt] font-mono text-slate-500">öncelik</span>
              <span className="text-[7pt] font-mono text-amber-400">=</span>
              <span className="text-[8pt] text-white font-semibold">Kritik</span>
            </div>
            <div className="flex items-center gap-[1mm] px-[1.5mm] py-[1mm] rounded-md bg-white/3 border border-white/8">
              <span className="text-[7pt] font-mono text-slate-500">kategori</span>
              <span className="text-[7pt] font-mono text-amber-400">∋</span>
              <span className="text-[8pt] text-white font-semibold">Altyapı</span>
            </div>
            <div className="flex items-center gap-[1mm] px-[1.5mm] py-[1mm] rounded-md bg-white/3 border border-white/8">
              <span className="text-[7pt] font-mono text-slate-500">saat</span>
              <span className="text-[7pt] font-mono text-amber-400">∈</span>
              <span className="text-[8pt] text-white font-semibold">7/24</span>
            </div>
          </div>
        </div>

        {/* Column 3: Actions */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
          <div className="flex items-center gap-[1.5mm] pb-[1mm] border-b border-white/8">
            <Sparkles className={`w-[3mm] h-[3mm] ${accent.text}`} />
            <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-white">
              Actions
            </span>
          </div>
          <div className="flex flex-col gap-[1mm]">
            <div className="flex items-center gap-[1mm] px-[1.5mm] py-[1mm] rounded-md bg-emerald-500/10 border border-emerald-500/25">
              <Users className="w-[2.5mm] h-[2.5mm] text-emerald-400" />
              <span className="text-[8pt] text-white">Nöbet ekibine ata</span>
            </div>
            <div className="flex items-center gap-[1mm] px-[1.5mm] py-[1mm] rounded-md bg-emerald-500/10 border border-emerald-500/25">
              <Bell className="w-[2.5mm] h-[2.5mm] text-emerald-400" />
              <span className="text-[8pt] text-white">SMS + e-posta gönder</span>
            </div>
            <div className="flex items-center gap-[1mm] px-[1.5mm] py-[1mm] rounded-md bg-emerald-500/10 border border-emerald-500/25">
              <Flag className="w-[2.5mm] h-[2.5mm] text-emerald-400" />
              <span className="text-[8pt] text-white">Hizmet Seviyesi P1 ata</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connector arrows */}
      <div className="flex items-center justify-around mt-[1.5mm] px-[10mm]">
        <ChevronRight className={`w-[3mm] h-[3mm] ${accent.text}`} />
        <ChevronRight className={`w-[3mm] h-[3mm] ${accent.text}`} />
      </div>
    </Frame>
  );
}

// ============================================================
// 15. Task Management — kanban board
// ============================================================

function TaskMock({ accent }: { accent: AccentClasses }) {
  const columns = [
    {
      title: "Yapılacak",
      count: 8,
      tone: "text-blue-400 bg-blue-500/12 border-blue-500/25",
      cards: [
        { id: "T-4218", title: "VPN sertifika incele", owner: "AY", priority: "Yüksek", pTone: "text-red-400 bg-red-500/10 border-red-500/25" },
        { id: "T-4217", title: "Mail server log analizi", owner: "SK", priority: "Orta", pTone: "text-amber-400 bg-amber-500/10 border-amber-500/25" },
      ],
    },
    {
      title: "Devam Eden",
      count: 12,
      tone: "text-amber-400 bg-amber-500/12 border-amber-500/25",
      cards: [
        { id: "T-4214", title: "DB performans test", owner: "MT", priority: "Kritik", pTone: "text-red-400 bg-red-500/15 border-red-500/30" },
        { id: "T-4210", title: "AD parola sync", owner: "AY", priority: "Yüksek", pTone: "text-red-400 bg-red-500/10 border-red-500/25" },
        { id: "T-4208", title: "Yazıcı bakım planı", owner: "AD", priority: "Düşük", pTone: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25" },
      ],
    },
    {
      title: "Tamamlandı",
      count: 16,
      tone: "text-emerald-400 bg-emerald-500/12 border-emerald-500/25",
      cards: [
        { id: "T-4198", title: "Yazıcı bakım — Kat 4", owner: "AY", priority: "Düşük", pTone: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25" },
        { id: "T-4196", title: "VPN reset", owner: "SK", priority: "Yüksek", pTone: "text-red-400 bg-red-500/10 border-red-500/25" },
      ],
    },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Target className="w-[3mm] h-[3mm]" />}
        title="Görev Panosu — Olay Modülü"
        meta="36 görev · 18 teknisyen"
        accent={accent}
      />

      <div className="grid grid-cols-3 gap-[2mm]">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[1.5mm] min-w-0">
            <div
              className={`flex items-center justify-between px-[2mm] py-[1mm] rounded-md border ${col.tone}`}
            >
              <span className="text-[7pt] font-mono font-bold uppercase tracking-[0.18em] text-white">
                {col.title}
              </span>
              <span className="text-[7pt] font-mono font-bold">{col.count}</span>
            </div>
            <div className="flex flex-col gap-[1mm]">
              {col.cards.map((c, i) => (
                <div
                  key={i}
                  className="rounded-md bg-white/3 border border-white/8 p-[1.5mm] flex flex-col gap-[1mm]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7pt] font-mono text-slate-500">
                      {c.id}
                    </span>
                    <div className={`w-[3.5mm] h-[3.5mm] rounded-full ${accent.bg} border ${accent.border} flex items-center justify-center`}>
                      <span className={`text-[6pt] font-mono font-bold ${accent.text}`}>
                        {c.owner}
                      </span>
                    </div>
                  </div>
                  <span className="text-[7.5pt] font-medium text-white leading-tight">
                    {c.title}
                  </span>
                  <span
                    className={`text-[7pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border self-start ${c.pTone}`}
                  >
                    {c.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// 16. Project Management — sprint board
// ============================================================

function ProjectMock({ accent }: { accent: AccentClasses }) {
  const metrics = [
    { label: "Story Points", value: "84", suffix: "/ 120", tone: "text-white" },
    { label: "Velocity", value: "92", suffix: "ort.", tone: "text-emerald-400" },
    { label: "Sprint Gün", value: "7", suffix: "/ 14", tone: "text-amber-400" },
    { label: "Risk", value: "2", suffix: "açık", tone: "text-red-400" },
  ];

  const backlog = [
    { id: "PROJ-218", title: "Kullanıcı arama deneyimi yenile", points: "8", owner: "AY", status: "Sprint" },
    { id: "PROJ-217", title: "API rate-limit politikası", points: "5", owner: "MT", status: "Sprint" },
    { id: "PROJ-216", title: "Dashboard widget kütüphanesi", points: "13", owner: "SK", status: "Backlog" },
    { id: "PROJ-215", title: "E-posta şablon editörü", points: "5", owner: "AD", status: "Backlog" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Briefcase className="w-[3mm] h-[3mm]" />}
        title="Sprint #18 — Servis Portalı"
        meta="14 gün · 4 ekip"
        accent={accent}
      />

      {/* Metric strip */}
      <div className="grid grid-cols-4 gap-[1.5mm] mb-[2.5mm]">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="rounded-md border border-white/8 bg-white/2 p-[2mm] flex flex-col gap-[0.5mm]"
          >
            <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
              {m.label}
            </span>
            <div className="flex items-baseline gap-[1mm]">
              <span className={`text-[12pt] font-mono font-bold ${m.tone} leading-none`}>
                {m.value}
              </span>
              <span className="text-[7pt] font-mono text-slate-500">{m.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_46mm] gap-[2mm]">
        {/* Backlog */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm]">
          <div className="flex items-center justify-between mb-[1.5mm]">
            <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
              Sprint Backlog
            </span>
            <span className="text-[7pt] font-mono text-slate-500">4 hikaye</span>
          </div>
          <div className="flex flex-col gap-[1mm]">
            {backlog.map((b, i) => (
              <div
                key={i}
                className="grid grid-cols-[18mm_1fr_8mm_18mm] gap-[2mm] items-center px-[1.5mm] py-[1mm] rounded-md bg-white/2 border border-white/5"
              >
                <span className={`text-[7pt] font-mono ${accent.text}`}>{b.id}</span>
                <span className="text-[8pt] text-white truncate">{b.title}</span>
                <span className="text-[7pt] font-mono font-bold text-white text-center">
                  {b.points}
                </span>
                <span className="text-[7pt] font-mono text-slate-400">{b.owner} · {b.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Burndown */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
          <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
            Burndown
          </span>
          <svg viewBox="0 0 60 30" className="w-full h-[16mm]" preserveAspectRatio="none">
            {/* Ideal line */}
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="1 1"
              className="text-slate-500"
              points="0,2 60,28"
              vectorEffect="non-scaling-stroke"
            />
            {/* Actual */}
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className={accent.text}
              points="0,2 8,5 16,8 24,12 32,14 40,18 48,20 60,22"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="flex items-center justify-between text-[7pt] font-mono text-slate-500">
            <span>0g</span>
            <span>14g</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// 17. Enterprise Service Management — department grid
// ============================================================

function EsmMock({ accent }: { accent: AccentClasses }) {
  const departments = [
    { name: "Bilgi Teknolojileri", desc: "1.418 olay · 184 hizmet", icon: Cpu, count: 184 },
    { name: "İnsan Kaynakları", desc: "Onboarding · İzin", icon: Users, count: 62 },
    { name: "Finans", desc: "Satınalma · Bütçe onay", icon: Wallet, count: 48 },
    { name: "Hukuk", desc: "Sözleşme inceleme", icon: Scale, count: 24 },
    { name: "Lojistik", desc: "Sevkiyat · Filo", icon: Truck, count: 36 },
    { name: "Tedarik", desc: "Tedarikçi · Sözleşme", icon: Building2, count: 42 },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Layers className="w-[3mm] h-[3mm]" />}
        title="Kurumsal Servis Yönetimi — Departman Görünümü"
        meta="6 birim aktif"
        accent={accent}
      />

      <div className="grid grid-cols-3 gap-[2mm]">
        {departments.map((d, i) => {
          const Icon = d.icon;
          return (
            <div
              key={i}
              className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-[7mm] h-[7mm] rounded-md ${accent.bg} border ${accent.border} flex items-center justify-center`}
                >
                  <Icon className={`w-[3.5mm] h-[3.5mm] ${accent.text}`} />
                </div>
                <span className={`text-[8pt] font-mono font-bold ${accent.text}`}>
                  {d.count}
                </span>
              </div>
              <span className="text-[8pt] font-semibold text-white leading-tight">
                {d.name}
              </span>
              <span className="text-[7pt] font-light text-slate-400 leading-tight">
                {d.desc}
              </span>
              <div className="flex items-center gap-[1mm] mt-auto pt-[1mm] border-t border-white/5">
                <span className={`w-[1.2mm] h-[1.2mm] rounded-full ${accent.dot}`} />
                <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
                  Aktif Süreç
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

// ============================================================
// Discovery — ağ & varlık keşfi tarama paneli
// ============================================================

function DiscoveryMock({ accent }: { accent: AccentClasses }) {
  const methods = [
    { label: "SNMP", active: true },
    { label: "WMI", active: true },
    { label: "SSH", active: true },
    { label: "Agentless", active: false },
  ];

  const categories = [
    { label: "Sunucular", count: 412, delta: 6, icon: Server },
    { label: "Ağ Cihazları", count: 318, delta: 4, icon: Network },
    { label: "Endpoint", count: 1284, delta: 22, icon: Laptop },
    { label: "Yazılım Lisansları", count: 346, delta: 9, icon: Package },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Radar className="w-[3mm] h-[3mm]" />}
        title="Ağ ve Varlık Keşfi"
        meta="DISC-07 · gerçek zamanlı"
        accent={accent}
      />

      {/* Scan progress bar */}
      <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] mb-[3mm] flex flex-col gap-[1.5mm]">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-[1.5mm]">
            <span className={`w-[1.5mm] h-[1.5mm] rounded-full ${accent.dot} animate-pulse`} />
            <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
              Tarama Sürüyor
            </span>
          </div>
          <div className="flex items-baseline gap-[1.5mm]">
            <span className={`text-[11pt] font-mono font-bold ${accent.text} leading-none`}>
              %78
            </span>
            <span className="text-[7pt] font-mono text-slate-400 tabular-nums">
              1.842 / 2.360 varlık
            </span>
          </div>
        </div>

        <div className="h-[1.6mm] rounded-full bg-white/5 overflow-hidden">
          <div
            className={`h-full ${accent.dot} rounded-full`}
            style={{ width: "78%" }}
          />
        </div>

        {/* Scan method badges */}
        <div className="flex items-center gap-[1.5mm] flex-wrap pt-[0.5mm]" lang="en">
          <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500 mr-[0.5mm]" lang="tr">
            Yöntem
          </span>
          {methods.map((m, i) => (
            <div
              key={i}
              className={`flex items-center gap-[1mm] px-[1.5mm] py-[0.4mm] rounded-md border ${
                m.active
                  ? `${accent.chip}`
                  : "text-slate-400 bg-white/2 border-white/8"
              }`}
            >
              <span
                className={`w-[1mm] h-[1mm] rounded-full ${
                  m.active ? accent.dot : "bg-slate-500"
                }`}
              />
              <span className="text-[7pt] font-mono font-medium">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Discovered asset categories */}
      <div className="grid grid-cols-4 gap-[2mm] mb-[3mm]">
        {categories.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]"
            >
              <div
                className={`w-[7mm] h-[7mm] rounded-md ${accent.bg} border ${accent.border} flex items-center justify-center`}
              >
                <Icon className={`w-[3.5mm] h-[3.5mm] ${accent.text}`} />
              </div>
              <span className="text-[14pt] font-mono font-bold text-white leading-none tabular-nums">
                {c.count.toLocaleString("tr-TR")}
              </span>
              <span className="text-[7pt] font-light text-slate-400 leading-tight">
                {c.label}
              </span>
              <div className="flex items-center gap-[1mm] mt-auto pt-[1mm] border-t border-white/5">
                <Plus className="w-[2.5mm] h-[2.5mm] text-emerald-400" />
                <span className="text-[7pt] font-mono text-emerald-400 tabular-nums">
                  yeni +{c.delta}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security footer */}
      <div className="flex items-center justify-between rounded-md border border-emerald-500/25 bg-emerald-500/10 px-[2.5mm] py-[1.5mm]">
        <div className="flex items-center gap-[1.5mm]">
          <KeyRound className="w-[3mm] h-[3mm] text-emerald-400 shrink-0" />
          <span className="text-[7.5pt] font-medium text-white">
            Kimlik bilgileri{" "}
            <span className="font-mono text-emerald-400">AES-256</span> ile
            şifreli{" "}
            <span lang="en" className="font-mono">
              credential vault
            </span>
          </span>
        </div>
        <div className="flex items-center gap-[1mm]">
          <RefreshCw className="w-[2.5mm] h-[2.5mm] text-emerald-400" />
          <span className="text-[7pt] font-mono text-emerald-400 uppercase tracking-[0.16em]">
            CMDB senkron
          </span>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// Service Topologies — katmanlı topoloji + zaman yolculuğu
// ============================================================

function TopologyMock({ accent }: { accent: AccentClasses }) {
  // Three horizontal tiers. Each node carries a tier-relative x (%) used both
  // for absolute placement and for the SVG link endpoints.
  const serviceTier = [
    { id: "svc", label: "Sipariş Yönetimi", icon: Globe, x: 50 },
  ];

  const appTier = [
    { id: "web", label: "Web Ön Yüz", icon: Monitor, x: 22, onPath: false },
    { id: "api", label: "Sipariş API", icon: Layers, x: 50, onPath: true },
    { id: "auth", label: "Kimlik Servisi", icon: Lock, x: 78, onPath: false },
  ];

  const infraTier = [
    { id: "db", label: "PostgreSQL", icon: Database, x: 18, onPath: true },
    { id: "cache", label: "Redis Önbellek", icon: Cpu, x: 41, onPath: false },
    { id: "lb", label: "Yük Dengeleyici", icon: Network, x: 64, onPath: false },
    { id: "host", label: "Sunucu Düğümü", icon: Server, x: 87, onPath: false },
  ];

  // Tier vertical anchors (% of the diagram box) for SVG link endpoints.
  const yService = 16;
  const yApp = 50;
  const yInfra = 84;

  // Impact path: Sipariş Yönetimi → Sipariş API → PostgreSQL.
  const impactAppX = 50;
  const impactInfraX = 18;

  return (
    <Frame>
      <TitleBar
        icon={<Waypoints className="w-[3mm] h-[3mm]" />}
        title="Servis Topoloji Keşfi"
        meta="8 düğüm · 3 katman"
        accent={accent}
      />

      {/* Tier legend + live impact note */}
      <div className="flex items-center justify-between mb-[2.5mm]">
        <div className="flex items-center gap-[2mm]">
          <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
            Etki Yolu
          </span>
          <div className="flex items-center gap-[1mm]">
            <span className={`w-[3mm] h-[0.6mm] rounded-full ${accent.dot}`} />
            <span className={`text-[7pt] font-mono ${accent.text}`}>
              Sipariş Yönetimi → API → Veritabanı
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[1mm] px-[1.5mm] py-[0.5mm] rounded-full bg-red-500/10 border border-red-500/25">
          <span className="w-[1.2mm] h-[1.2mm] rounded-full bg-red-400" />
          <span className="text-[7pt] font-mono text-red-400">3 hizmet etkilenir</span>
        </div>
      </div>

      {/* Layered diagram */}
      <div className="relative w-full h-[50mm] mb-[3mm]">
        {/* Links between tiers */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {/* Service → App links */}
          {appTier.map((n, i) => (
            <line
              key={`sa-${i}`}
              x1={serviceTier[0].x}
              y1={yService}
              x2={n.x}
              y2={yApp}
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="1.5 1"
              className="text-white/15"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* App → Infra links */}
          {infraTier.map((n, i) => (
            <line
              key={`ai-${i}`}
              x1={n.x < 50 ? appTier[0].x : appTier[2].x}
              y1={yApp}
              x2={n.x}
              y2={yInfra}
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="1.5 1"
              className="text-white/15"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* Highlighted impact path: Service → API → DB */}
          <line
            x1={serviceTier[0].x}
            y1={yService}
            x2={impactAppX}
            y2={yApp}
            stroke="currentColor"
            strokeWidth="0.8"
            className={accent.text}
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={impactAppX}
            y1={yApp}
            x2={impactInfraX}
            y2={yInfra}
            stroke="currentColor"
            strokeWidth="0.8"
            className={accent.text}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Tier labels (left rail) */}
        <span
          className="absolute left-0 text-[6.5pt] font-mono uppercase tracking-[0.2em] text-slate-500"
          style={{ top: `${yService}%`, transform: "translateY(-50%)" }}
        >
          Hizmet
        </span>
        <span
          className="absolute left-0 text-[6.5pt] font-mono uppercase tracking-[0.2em] text-slate-500"
          style={{ top: `${yApp}%`, transform: "translateY(-50%)" }}
        >
          Uygulama
        </span>
        <span
          className="absolute left-0 text-[6.5pt] font-mono uppercase tracking-[0.2em] text-slate-500"
          style={{ top: `${yInfra}%`, transform: "translateY(-50%)" }}
        >
          Altyapı
        </span>

        {/* Service tier node */}
        {serviceTier.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`absolute w-[30mm] h-[10mm] rounded-md ${accent.bg} border ${accent.border} flex items-center justify-center gap-[1.5mm]`}
              style={{
                left: `${n.x}%`,
                top: `${yService}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Icon className={`w-[3.5mm] h-[3.5mm] ${accent.text}`} />
              <div className="flex flex-col">
                <span className="text-[6pt] font-mono uppercase tracking-[0.16em] text-slate-400 leading-none">
                  Hizmet
                </span>
                <span className="text-[7.5pt] font-semibold text-white leading-tight">
                  {n.label}
                </span>
              </div>
            </div>
          );
        })}

        {/* Application tier nodes */}
        {appTier.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`absolute w-[24mm] h-[9mm] rounded-md flex items-center justify-center gap-[1mm] ${
                n.onPath
                  ? `${accent.bg} border ${accent.border}`
                  : "bg-white/4 border border-white/12"
              }`}
              style={{
                left: `${n.x}%`,
                top: `${yApp}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Icon
                className={`w-[3mm] h-[3mm] ${
                  n.onPath ? accent.text : "text-slate-300"
                }`}
              />
              <span className="text-[6.5pt] font-medium text-white leading-tight text-center">
                {n.label}
              </span>
            </div>
          );
        })}

        {/* Infrastructure tier nodes */}
        {infraTier.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`absolute w-[20mm] h-[9mm] rounded-md flex flex-col items-center justify-center gap-[0.5mm] ${
                n.onPath
                  ? `${accent.bg} border ${accent.border}`
                  : "bg-white/4 border border-white/12"
              }`}
              style={{
                left: `${n.x}%`,
                top: `${yInfra}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Icon
                className={`w-[3mm] h-[3mm] ${
                  n.onPath ? accent.text : "text-slate-300"
                }`}
              />
              <span className="text-[6pt] font-medium text-white leading-none text-center">
                {n.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Time-travel scrubber */}
      <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[1.5mm]">
            <History className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
            <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
              Zaman Yolculuğu
            </span>
          </div>
          <div className="flex items-center gap-[1mm]">
            <CalendarClock className="w-[2.5mm] h-[2.5mm] text-slate-500" />
            <span className="text-[7pt] font-mono text-white tabular-nums">
              02 Mart 2026 · 14:20
            </span>
          </div>
        </div>

        {/* Track + handle */}
        <div className="relative h-[2.5mm] flex items-center">
          <div className="absolute inset-x-0 h-[0.6mm] rounded-full bg-white/8" />
          {/* Filled (past → now) segment */}
          <div
            className={`absolute left-0 h-[0.6mm] rounded-full ${accent.dot}`}
            style={{ width: "62%" }}
          />
          {/* Tick marks */}
          {[12, 30, 48, 78, 92].map((p, i) => (
            <span
              key={i}
              className="absolute w-[0.4mm] h-[2mm] rounded-full bg-white/15"
              style={{ left: `${p}%`, transform: "translateX(-50%)" }}
            />
          ))}
          {/* Draggable handle */}
          <div
            className={`absolute w-[3mm] h-[3mm] rounded-full ${accent.bg} border ${accent.border} flex items-center justify-center`}
            style={{ left: "62%", transform: "translateX(-50%)" }}
          >
            <span className={`w-[1mm] h-[1mm] rounded-full ${accent.dot}`} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[6.5pt] font-mono uppercase tracking-[0.16em] text-slate-500">
            ← geçmiş
          </span>
          <span className="text-[6.5pt] font-mono text-slate-400">
            Değişiklik CHG-2841 öncesi topoloji
          </span>
          <span className="text-[6.5pt] font-mono uppercase tracking-[0.16em] text-slate-500">
            bugün →
          </span>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// Shift Management — haftalık vardiya cizelgesi
// ============================================================

function ShiftMock({ accent }: { accent: AccentClasses }) {
  const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  // Vardiya kodları: G = Gündüz (emerald), A = Akşam (amber), N = Nöbet (accent), "" = İzin/Off
  const technicians: { name: string; initials: string; shifts: string[] }[] = [
    { name: "Ahmet Y.", initials: "AY", shifts: ["G", "G", "A", "A", "N", "N", ""] },
    { name: "Selin K.", initials: "SK", shifts: ["A", "A", "G", "G", "G", "", "N"] },
    { name: "Mehmet T.", initials: "MT", shifts: ["N", "", "G", "A", "A", "G", "G"] },
    { name: "Ayşe D.", initials: "AD", shifts: ["G", "N", "N", "", "G", "A", "A"] },
  ];

  const shiftStyle = (code: string): { cls: string; icon: ReactNode | null } => {
    if (code === "G")
      return {
        cls: "text-emerald-400 bg-emerald-500/12 border-emerald-500/30",
        icon: <Sun className="w-[2mm] h-[2mm]" />,
      };
    if (code === "A")
      return {
        cls: "text-amber-400 bg-amber-500/12 border-amber-500/30",
        icon: <Moon className="w-[2mm] h-[2mm]" />,
      };
    if (code === "N")
      return {
        cls: `${accent.text} ${accent.bg} ${accent.border}`,
        icon: <Clock className="w-[2mm] h-[2mm]" />,
      };
    return { cls: "text-slate-600 bg-white/2 border-white/5", icon: null };
  };

  const legend = [
    { code: "G", label: "Gündüz", cls: "text-emerald-400 bg-emerald-500/12 border-emerald-500/30" },
    { code: "A", label: "Akşam", cls: "text-amber-400 bg-amber-500/12 border-amber-500/30" },
    { code: "N", label: "Nöbet", cls: `${accent.text} ${accent.bg} ${accent.border}` },
    { code: "—", label: "İzin", cls: "text-slate-600 bg-white/2 border-white/8" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<CalendarClock className="w-[3mm] h-[3mm]" />}
        title="Vardiya Çizelgesi — 23-29 Haziran"
        meta="7/24 · 4 teknisyen"
        accent={accent}
      />

      <div className="grid grid-cols-[1fr_52mm] gap-[3mm]">
        {/* Sol: haftalık vardiya matrisi */}
        <div className="flex flex-col gap-[1.5mm] min-w-0">
          {/* Gün başlıkları */}
          <div className="grid grid-cols-[20mm_repeat(7,1fr)] gap-[1mm] items-center">
            <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
              Teknisyen
            </span>
            {days.map((d, i) => (
              <span
                key={i}
                className={`text-[7pt] font-mono font-semibold uppercase tracking-[0.12em] text-center ${
                  i >= 5 ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Teknisyen satırları */}
          {technicians.map((t, ri) => (
            <div
              key={ri}
              className="grid grid-cols-[20mm_repeat(7,1fr)] gap-[1mm] items-center"
            >
              <div className="flex items-center gap-[1.5mm] min-w-0">
                <span
                  className={`w-[4mm] h-[4mm] rounded-full ${accent.bg} border ${accent.border} flex items-center justify-center shrink-0`}
                >
                  <span className={`text-[6pt] font-mono font-bold ${accent.text}`}>
                    {t.initials}
                  </span>
                </span>
                <span className="text-[7.5pt] font-medium text-white truncate">
                  {t.name}
                </span>
              </div>
              {t.shifts.map((code, ci) => {
                const s = shiftStyle(code);
                return (
                  <div
                    key={ci}
                    className={`h-[6mm] rounded-sm border flex items-center justify-center gap-[0.5mm] ${s.cls}`}
                  >
                    {s.icon}
                    <span className="text-[7pt] font-mono font-bold">
                      {code === "" ? "·" : code}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Lejant + kapasite */}
          <div className="flex items-center justify-between mt-[1mm] pt-[2mm] border-t border-white/8">
            <div className="flex items-center gap-[1.5mm] flex-wrap">
              {legend.map((l, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-[1mm] px-[1.2mm] py-[0.3mm] rounded-full border ${l.cls}`}
                >
                  <span className="text-[6.5pt] font-mono font-bold">{l.code}</span>
                  <span className="text-[6.5pt] font-medium text-white">{l.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-[1mm] shrink-0">
              <Users className="w-[2.5mm] h-[2.5mm] text-slate-500" />
              <span className="text-[7pt] font-mono text-slate-400">kapasite %92</span>
            </div>
          </div>
        </div>

        {/* Sağ: nöbet devri notu + on-call rozeti */}
        <div className="flex flex-col gap-[2mm]">
          {/* On-call rozeti */}
          <div
            className={`rounded-md ${accent.bg} border ${accent.border} p-[2.5mm] flex items-center gap-[2mm]`}
          >
            <span className="w-[6mm] h-[6mm] rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Clock className={`w-[3mm] h-[3mm] ${accent.text}`} />
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-400">
                Aktif Nöbet
              </span>
              <span className="text-[8pt] font-semibold text-white truncate">
                Ahmet Y. · 7/24
              </span>
            </div>
          </div>

          {/* Nöbet devri notu */}
          <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
            <div className="flex items-center gap-[1.5mm] pb-[1mm] border-b border-white/8">
              <GitMerge className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
              <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-white">
                Nöbet Devri
              </span>
            </div>
            <div className="flex items-center gap-[1.5mm] text-[7pt] font-mono">
              <span className="text-slate-300">Selin K.</span>
              <ArrowRight className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
              <span className="text-white font-semibold">Ahmet Y.</span>
              <span className="text-slate-500 ml-auto">20:00</span>
            </div>
            <div className="flex items-start gap-[1.5mm]">
              <span className="w-[1.2mm] h-[1.2mm] rounded-full bg-amber-400 shrink-0 mt-[1mm]" />
              <span className="text-[7pt] font-light text-slate-300 leading-tight">
                Açık olay #4217 izlemede — mail sunucu gecikme alarmı devredildi.
              </span>
            </div>
            <div className="flex items-center gap-[1mm] mt-[0.5mm] pt-[1.5mm] border-t border-white/5">
              <Repeat className="w-[2.5mm] h-[2.5mm] text-slate-500" />
              <span className="text-[6.5pt] font-mono uppercase tracking-[0.14em] text-slate-500">
                Devir bilgi kaybını önler
              </span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// Service Relations — müşteri 360
// ============================================================

function SrmMock({ accent }: { accent: AccentClasses }) {
  const stats = [
    { label: "Açık Talep", value: "14", icon: ShoppingCart, tone: accent.text },
    { label: "Aktif Sözleşme", value: "06", icon: FileSignature, tone: accent.text },
    { label: "Sağlık", value: "%92", icon: Activity, tone: "text-emerald-400" },
  ];

  const contracts = [
    { type: "SLA", icon: FileSignature, scope: "P1 Kritik · 7/24 yanıt", end: "31.12.2026", status: "Aktif", sTone: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25", tTone: "text-cyan-400 bg-cyan-500/12 border-cyan-500/25" },
    { type: "OLA", icon: Scale, scope: "Altyapı ekibi · 4 sa onarım", end: "30.09.2026", status: "Aktif", sTone: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25", tTone: "text-purple-400 bg-purple-500/12 border-purple-500/25" },
    { type: "Tedarikçi", icon: Truck, scope: "Donanım bakımı · yerinde", end: "18.07.2026", status: "Yenileme", sTone: "text-amber-400 bg-amber-500/10 border-amber-500/25", tTone: "text-orange-400 bg-orange-500/12 border-orange-500/25" },
    { type: "SLA", icon: FileSignature, scope: "Standart talep · 8 sa", end: "12.06.2026", status: "Süre Doluyor", sTone: "text-red-400 bg-red-500/10 border-red-500/25", tTone: "text-cyan-400 bg-cyan-500/12 border-cyan-500/25" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Users className="w-[3mm] h-[3mm]" />}
        title="Müşteri 360 Görünümü"
        meta="REL-2026"
        accent={accent}
      />

      {/* Account header: logo + name + tier, with mini stats */}
      <div className="grid grid-cols-[1fr_auto] gap-[3mm] items-center mb-[3mm]">
        <div className="flex items-center gap-[2mm] min-w-0">
          <div
            className={`w-[9mm] h-[9mm] rounded-md ${accent.bg} border ${accent.border} flex items-center justify-center shrink-0`}
          >
            <Building2 className={`w-[4.5mm] h-[4.5mm] ${accent.text}`} />
          </div>
          <div className="flex flex-col gap-[0.5mm] min-w-0">
            <div className="flex items-center gap-[1.5mm]">
              <span className="text-[10pt] font-semibold text-white truncate">
                Akçe Holding
              </span>
              <span
                className={`text-[7pt] font-mono uppercase tracking-[0.18em] px-[1.5mm] py-[0.3mm] rounded-full border ${accent.chip}`}
              >
                Kurumsal
              </span>
            </div>
            <span className="text-[7pt] font-mono text-slate-500">
              Müşteri No · ACC-0412 · Hesap Yöneticisi: Selin K.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[1.5mm]">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="rounded-md border border-white/8 bg-white/2 px-[2mm] py-[1.5mm] flex flex-col gap-[0.5mm] min-w-[22mm]"
              >
                <div className="flex items-center gap-[1mm]">
                  <Icon className="w-[2.5mm] h-[2.5mm] text-slate-500" />
                  <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500 truncate">
                    {s.label}
                  </span>
                </div>
                <span className={`text-[12pt] font-mono font-bold leading-none ${s.tone}`}>
                  {s.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contract table */}
      <div className="grid grid-cols-[20mm_1fr_20mm_22mm] gap-[2mm] px-[2mm] py-[1mm] text-[7pt] font-mono font-semibold uppercase tracking-[0.18em] text-slate-500 bg-white/2 border border-white/5 rounded-md mb-[1.5mm]">
        <span>Tip</span>
        <span>Kapsam</span>
        <span className="flex items-center gap-[1mm]">
          <CalendarClock className="w-[2.5mm] h-[2.5mm]" />
          Bitiş
        </span>
        <span>Durum</span>
      </div>

      <div className="flex flex-col gap-[1mm] mb-[3mm]">
        {contracts.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="grid grid-cols-[20mm_1fr_20mm_22mm] gap-[2mm] items-center px-[2mm] py-[1.5mm] rounded-md bg-white/2 border border-white/5"
            >
              <span
                className={`flex items-center gap-[1mm] text-[7pt] font-mono font-semibold px-[1.2mm] py-[0.3mm] rounded-full border ${c.tTone}`}
              >
                <Icon className="w-[2.5mm] h-[2.5mm]" />
                {c.type}
              </span>
              <span className="text-[8pt] font-medium text-white truncate">
                {c.scope}
              </span>
              <span className="text-[7pt] font-mono text-slate-300 tabular-nums">
                {c.end}
              </span>
              <span
                className={`text-[7pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border text-center ${c.sTone}`}
              >
                {c.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Customer health / satisfaction bar */}
      <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[1.5mm]">
            <TrendingUp className={`w-[3mm] h-[3mm] ${accent.text}`} />
            <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
              Müşteri Sağlık Skoru
            </span>
          </div>
          <div className="flex items-baseline gap-[1.5mm]">
            <span className="text-[10pt] font-mono font-bold text-emerald-400 leading-none">
              92
            </span>
            <span className="text-[7pt] font-mono text-slate-500">/ 100 · Memnuniyet 4.6</span>
          </div>
        </div>
        <div className="h-[1.5mm] rounded-full bg-white/5 overflow-hidden flex">
          <div className="h-full bg-emerald-400 rounded-l-full" style={{ width: "78%" }} />
          <div className="h-full bg-amber-400" style={{ width: "14%" }} />
          <div className="h-full bg-red-400 rounded-r-full" style={{ width: "8%" }} />
        </div>
        <div className="flex items-center gap-[3mm]">
          <div className="flex items-center gap-[1mm]">
            <span className="w-[1.2mm] h-[1.2mm] rounded-full bg-emerald-400" />
            <span className="text-[7pt] font-mono text-slate-500">Sağlıklı %78</span>
          </div>
          <div className="flex items-center gap-[1mm]">
            <span className="w-[1.2mm] h-[1.2mm] rounded-full bg-amber-400" />
            <span className="text-[7pt] font-mono text-slate-500">İzlemede %14</span>
          </div>
          <div className="flex items-center gap-[1mm]">
            <span className="w-[1.2mm] h-[1.2mm] rounded-full bg-red-400" />
            <span className="text-[7pt] font-mono text-slate-500">Riskli %8</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// Federation Engine — multi-tenant hub-and-spoke
// ============================================================

function FederationMock({ accent }: { accent: AccentClasses }) {
  const tenants = [
    { id: "hq", label: "Holding Merkez", icon: Building2, x: 50, y: 13, sync: "ok" },
    { id: "a", label: "İştirak A", icon: Briefcase, x: 86, y: 40, sync: "ok" },
    { id: "b", label: "İştirak B", icon: Briefcase, x: 74, y: 87, sync: "sync" },
    { id: "msp", label: "MSP Müşteri", icon: Users, x: 26, y: 87, sync: "ok" },
    { id: "tr", label: "Bölge — TR", icon: Globe, x: 14, y: 40, sync: "ok" },
  ];

  const federation = [
    { label: "Politika Federasyonu", detail: "Öncelik matrisi · onay zinciri", status: "Aktif", icon: Shield },
    { label: "Katalog Federasyonu", detail: "184 hizmet dağıtıldı", status: "Aktif", icon: Layers },
    { label: "Veri Sınırı İzolasyonu", detail: "Tenant başına ayrık şema", status: "Garanti", icon: Lock },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Combine className="w-[3mm] h-[3mm]" />}
        title="Federasyon Orkestratörü"
        meta="5 tenant · senkron"
        accent={accent}
      />

      <div className="relative w-full h-[52mm] mb-[3mm]">
        {/* Hub-and-spoke connections */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {tenants.map((t, i) => (
            <line
              key={i}
              x1={50}
              y1={50}
              x2={t.x}
              y2={t.y}
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="1.5 1"
              className={`${accent.text} opacity-50`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Center hub */}
        <div
          className={`absolute w-[26mm] h-[15mm] rounded-md ${accent.bg} border ${accent.border} flex flex-col items-center justify-center gap-[0.5mm]`}
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <Combine className={`w-[4mm] h-[4mm] ${accent.text}`} />
          <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-white">
            Federasyon Hub
          </span>
          <span className={`text-[7pt] font-medium ${accent.text}`}>orkestratör</span>
        </div>

        {/* Tenant nodes */}
        {tenants.map((t) => {
          const Icon = t.icon;
          const dotTone = t.sync === "ok" ? "bg-emerald-400" : "bg-amber-400";
          return (
            <div
              key={t.id}
              className="absolute w-[20mm] h-[12mm] rounded-md bg-white/4 border border-white/15 flex flex-col items-center justify-center gap-[0.5mm]"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex items-center gap-[1mm]">
                <Icon className="w-[2.5mm] h-[2.5mm] text-slate-300" />
                <span className={`w-[1.2mm] h-[1.2mm] rounded-full ${dotTone}`} />
              </div>
              <span className="text-[6.5pt] font-medium text-white text-center px-[1mm] leading-tight">
                {t.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Federation status rows */}
      <div className="flex flex-col gap-[1mm]">
        {federation.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="grid grid-cols-[auto_1fr_auto] gap-[2mm] items-center px-[2mm] py-[1.5mm] rounded-md bg-white/2 border border-white/5"
            >
              <Icon className={`w-[3mm] h-[3mm] ${accent.text}`} />
              <div className="flex items-center gap-[2mm] min-w-0">
                <span className="text-[8pt] font-medium text-white shrink-0">
                  {f.label}
                </span>
                <span className="text-[7pt] text-slate-400 truncate">{f.detail}</span>
              </div>
              <span
                className={`text-[7pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border ${accent.chip}`}
              >
                {f.status}
              </span>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

// ============================================================
// Admin Panel — sistem yapılandırma
// ============================================================

function AdminMock({ accent }: { accent: AccentClasses }) {
  const categories = [
    { label: "Kullanıcılar ve Roller", icon: Users, meta: "248 kullanıcı", active: true },
    { label: "CMDB", icon: Database, meta: "2.148 CI", active: false },
    { label: "Hizmet Seviyesi", icon: Gauge, meta: "12 politika", active: false },
    { label: "Bildirimler", icon: Bell, meta: "8 kanal", active: false },
    { label: "Güvenlik", icon: Shield, meta: "SSO · MFA", active: false },
  ];

  const toggles = [
    { label: "Çok faktörlü kimlik doğrulama", desc: "Tüm yönetici hesapları için zorunlu", on: true },
    { label: "Otomatik rol ataması", desc: "AD grubuna göre yetki eşle", on: true },
    { label: "Misafir kullanıcı erişimi", desc: "Dış paydaş self-servis portalı", on: false },
    { label: "Oturum kaydı ve izleme", desc: "Yönetim işlemlerini denetim defterine yaz", on: true },
  ];

  const fields = [
    { label: "Varsayılan rol", value: "Hizmet Masası Ajanı" },
    { label: "Oturum zaman aşımı", value: "30 dk · iş saatleri" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Sliders className="w-[3mm] h-[3mm]" />}
        title="Yönetim Paneli — Yapılandırma"
        meta="5 kategori"
        accent={accent}
      />

      <div className="grid grid-cols-1 md:grid-cols-[44mm_1fr] gap-[3mm]">
        {/* Left: category navigation */}
        <div className="flex flex-col gap-[1mm]">
          <div className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500 mb-[0.5mm] px-[1mm]">
            Kategoriler
          </div>
          {categories.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className={`grid grid-cols-[auto_1fr] gap-[1.5mm] items-center px-[2mm] py-[1.5mm] rounded-md border cursor-pointer transition-colors ${
                  c.active
                    ? `${accent.bg} ${accent.border}`
                    : "bg-white/2 border-white/5 hover:bg-white/3 hover:border-white/8"
                }`}
              >
                <Icon
                  className={`w-[3mm] h-[3mm] ${
                    c.active ? accent.text : "text-slate-500"
                  }`}
                />
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-[8pt] font-medium truncate ${
                      c.active ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {c.label}
                  </span>
                  <span className="text-[7pt] font-mono text-slate-500 truncate">
                    {c.meta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: settings panel for the active category */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[2mm]">
          <div className="flex items-center justify-between pb-[1.5mm] border-b border-white/8">
            <span className="text-[8pt] font-semibold text-white">
              Kullanıcılar ve Roller
            </span>
            <span
              className={`text-[7pt] font-mono px-[1.5mm] py-[0.3mm] rounded-full border ${accent.chip}`}
            >
              Düzenleniyor
            </span>
          </div>

          {/* Toggle rows */}
          <div className="flex flex-col gap-[1.5mm]">
            {toggles.map((t, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_auto] gap-[2mm] items-center px-[2mm] py-[1.5mm] rounded-md bg-white/2 border border-white/5"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[8pt] font-medium text-white truncate">
                    {t.label}
                  </span>
                  <span className="text-[7pt] font-light text-slate-400 leading-tight truncate">
                    {t.desc}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-[1mm] px-[1.5mm] py-[0.4mm] rounded-full border cursor-pointer transition-colors ${
                    t.on
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/25 hover:bg-emerald-500/15 hover:border-emerald-500/35"
                      : "text-slate-500 bg-white/3 border-white/10 hover:bg-white/5 hover:border-white/15"
                  }`}
                >
                  {t.on ? (
                    <ToggleRight className="w-[3mm] h-[3mm]" />
                  ) : (
                    <ToggleLeft className="w-[3mm] h-[3mm]" />
                  )}
                  <span className="text-[7pt] font-mono font-semibold uppercase tracking-[0.12em]">
                    {t.on ? "Açık" : "Kapalı"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Field rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5mm]">
            {fields.map((f, i) => (
              <div
                key={i}
                className="rounded-md bg-white/2 border border-white/5 px-[2mm] py-[1.5mm] flex flex-col gap-[0.5mm]"
              >
                <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
                  {f.label}
                </span>
                <span className="text-[8pt] font-medium text-white truncate">
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// Mobile Service (FSM) — saha teknisyeni uygulaması
// ============================================================

function MobileMock({ accent }: { accent: AccentClasses }) {
  const jobs = [
    {
      id: "FSM-3142",
      title: "Sunucu odası klima arızası",
      location: "Ankara · Veri Merkezi · Kat -1",
      time: "09:40",
      priority: "Kritik",
      pTone: "text-red-400 bg-red-500/15 border-red-500/30",
    },
    {
      id: "FSM-3139",
      title: "Şube ağ anahtarı değişimi",
      location: "İzmir · Bornova Şubesi",
      time: "11:15",
      priority: "Yüksek",
      pTone: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    },
    {
      id: "FSM-3127",
      title: "POS terminali kurulum",
      location: "İstanbul · Kadıköy Mağaza",
      time: "14:00",
      priority: "Orta",
      pTone: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
    },
  ];

  const stats: Array<{
    label: string;
    value: string;
    icon: typeof Briefcase;
    tone: string;
  }> = [
    { label: "Açık İş", value: "5", icon: Briefcase, tone: "text-white" },
    { label: "Tamamlanan", value: "12", icon: CheckCircle2, tone: "text-emerald-400" },
    { label: "Çevrimdışı Senk.", value: "3", icon: RefreshCw, tone: "text-amber-400" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Smartphone className="w-[3mm] h-[3mm]" />}
        title="Mobil Servis Yönetimi · FSM"
        meta="Saha Teknisyeni"
        accent={accent}
      />

      <div className="grid grid-cols-[1fr_42mm] gap-[3mm]">
        {/* Phone body */}
        <div className="rounded-[6mm] border-[1mm] border-white/15 bg-white/2 p-[2mm] flex flex-col gap-[2mm]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-[1.5mm] pt-[0.5mm]">
            <span className="text-[7pt] font-mono font-semibold text-white tabular-nums">
              09:41
            </span>
            <div className="h-[1.5mm] w-[12mm] rounded-full bg-white/10" />
            <div className="flex items-center gap-[1mm]">
              <div className="flex items-center gap-[1mm] px-[1.2mm] py-[0.2mm] rounded-full bg-amber-500/10 border border-amber-500/25">
                <WifiOff className="w-[2.2mm] h-[2.2mm] text-amber-400" />
                <span className="text-[6.5pt] font-mono text-amber-400">Çevrimdışı</span>
              </div>
            </div>
          </div>

          {/* Push notification banner */}
          <div
            className={`rounded-[2.5mm] ${accent.bg} border ${accent.border} px-[2mm] py-[1.5mm] flex items-center gap-[2mm]`}
          >
            <div
              className={`w-[6mm] h-[6mm] rounded-[1.5mm] bg-white/10 border ${accent.border} flex items-center justify-center shrink-0`}
            >
              <Bell className={`w-[3mm] h-[3mm] ${accent.text}`} />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center justify-between gap-[2mm]">
                <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-white">
                  Yeni İş Atandı
                </span>
                <span className="text-[6.5pt] font-mono text-slate-400 shrink-0">şimdi</span>
              </div>
              <span className="text-[8pt] font-medium text-white truncate">
                FSM-3142 · Konum bazlı atama
              </span>
            </div>
          </div>

          {/* Assigned job cards */}
          <div className="flex flex-col gap-[1.5mm]">
            {jobs.map((j, i) => (
              <div
                key={i}
                className="rounded-[2mm] bg-white/3 border border-white/8 p-[2mm] flex flex-col gap-[1mm]"
              >
                <div className="flex items-center justify-between gap-[2mm]">
                  <span className={`text-[7pt] font-mono ${accent.text}`}>{j.id}</span>
                  <div className="flex items-center gap-[1.5mm] shrink-0">
                    <span
                      className={`text-[7pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border ${j.pTone}`}
                    >
                      {j.priority}
                    </span>
                    <div className="flex items-center gap-[0.8mm]">
                      <Clock className="w-[2.2mm] h-[2.2mm] text-slate-500" />
                      <span className="text-[7pt] font-mono text-slate-400 tabular-nums">
                        {j.time}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-[8pt] font-medium text-white leading-tight truncate">
                  {j.title}
                </span>
                <div className="flex items-center gap-[1mm] min-w-0">
                  <MapPin className={`w-[2.5mm] h-[2.5mm] ${accent.text} shrink-0`} />
                  <span className="text-[7pt] font-light text-slate-400 truncate">
                    {j.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Offline / sync footer */}
          <div className="flex items-center justify-between mt-auto px-[1.5mm] py-[1mm] rounded-[2mm] bg-white/2 border border-white/5">
            <div className="flex items-center gap-[1.5mm]">
              <WifiOff className="w-[2.5mm] h-[2.5mm] text-amber-400" />
              <span className="text-[7pt] font-light text-slate-400">
                Çevrimdışı çalışma açık
              </span>
            </div>
            <div className="flex items-center gap-[1mm]">
              <RefreshCw className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
              <span className={`text-[7pt] font-mono font-semibold ${accent.text}`}>
                3 bekliyor
              </span>
            </div>
          </div>
        </div>

        {/* FSM stat column */}
        <div className="flex flex-col gap-[2mm]">
          <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500 px-[0.5mm]">
            Saha Durumu
          </span>
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
                    {s.label}
                  </span>
                  <Icon className={`w-[3mm] h-[3mm] ${accent.text}`} />
                </div>
                <span className={`text-[14pt] font-mono font-bold leading-none ${s.tone}`}>
                  {s.value}
                </span>
              </div>
            );
          })}

          <div
            className={`rounded-md ${accent.bg} border ${accent.border} p-[2.5mm] flex flex-col gap-[1mm] mt-auto`}
          >
            <div className="flex items-center gap-[1.5mm]">
              <Bell className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
              <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-white">
                Bildirim Kanalı
              </span>
            </div>
            <span className="text-[7pt] font-light text-slate-300 leading-tight">
              Push · E-posta · Uygulama içi
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// Workflow Management — no-code akış tasarımcısı
// ============================================================

function WorkflowMock({ accent }: { accent: AccentClasses }) {
  const palette = [
    { label: "Görev", icon: FileText, tone: "text-blue-400 bg-blue-500/15 border-blue-500/30" },
    { label: "Koşul", icon: GitBranch, tone: "text-amber-400 bg-amber-500/15 border-amber-500/30" },
    { label: "Onay", icon: CheckCircle2, tone: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30" },
    { label: "Bildirim", icon: Bell, tone: "text-purple-400 bg-purple-500/15 border-purple-500/30" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<GitBranch className="w-[3mm] h-[3mm]" />}
        title="İş Akışı Tasarımcısı — WF-031"
        meta="No-code · Yayında"
        accent={accent}
      />

      {/* Canvas: horizontal BPMN flow */}
      <div className="relative w-full h-[52mm] rounded-md border border-white/8 bg-white/2 overflow-hidden">
        {/* Dotted grid hint */}
        <div className="absolute inset-0 opacity-40">
          <svg
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="wf-grid"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="0.6" cy="0.6" r="0.4" className="fill-white/10" />
              </pattern>
              <marker
                id="wf-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0,1 L9,5 L0,9 Z" className="fill-current" />
              </marker>
              <marker
                id="wf-arrow-emerald"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0,1 L9,5 L0,9 Z" className="fill-emerald-400" />
              </marker>
              <marker
                id="wf-arrow-red"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0,1 L9,5 L0,9 Z" className="fill-red-400" />
              </marker>
            </defs>
            <rect width="100" height="60" fill="url(#wf-grid)" />
          </svg>
        </div>

        {/* Connector layer */}
        <svg
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {/* Start -> Talep Oluştur */}
          <line
            x1={11}
            y1={30}
            x2={20}
            y2={30}
            stroke="currentColor"
            strokeWidth="0.6"
            className={accent.text}
            markerEnd="url(#wf-arrow)"
            vectorEffect="non-scaling-stroke"
          />
          {/* Talep Oluştur -> Onay (decision) */}
          <line
            x1={40}
            y1={30}
            x2={47}
            y2={30}
            stroke="currentColor"
            strokeWidth="0.6"
            className={accent.text}
            markerEnd="url(#wf-arrow)"
            vectorEffect="non-scaling-stroke"
          />
          {/* Onay -> (Onaylandı) up to Otomasyon */}
          <polyline
            points="58,24 64,24 64,16 71,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-emerald-400"
            markerEnd="url(#wf-arrow-emerald)"
            vectorEffect="non-scaling-stroke"
          />
          {/* Onay -> (Reddedildi) down to terminal */}
          <polyline
            points="58,36 64,36 64,46 71,46"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-red-400"
            markerEnd="url(#wf-arrow-red)"
            vectorEffect="non-scaling-stroke"
          />
          {/* Otomasyon -> Bitiş */}
          <line
            x1={91}
            y1={16}
            x2={93.5}
            y2={16}
            stroke="currentColor"
            strokeWidth="0.6"
            className={accent.text}
            markerEnd="url(#wf-arrow)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Node: Start */}
        <div
          className={`absolute w-[9mm] h-[9mm] rounded-full ${accent.bg} border ${accent.border} flex items-center justify-center`}
          style={{ left: "5%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <Play className={`w-[3mm] h-[3mm] ${accent.text}`} />
        </div>

        {/* Node: Talep Oluştur (task) */}
        <div
          className="absolute w-[20mm] rounded-md bg-white/4 border border-white/15 px-[1.5mm] py-[1.5mm] flex flex-col gap-[0.5mm]"
          style={{ left: "30%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div className="flex items-center gap-[1mm]">
            <FileText className="w-[2.5mm] h-[2.5mm] text-blue-400 shrink-0" />
            <span className="text-[6.5pt] font-mono uppercase tracking-[0.12em] text-slate-500">
              Görev
            </span>
          </div>
          <span className="text-[7pt] font-semibold text-white leading-tight">
            Talep Oluştur
          </span>
        </div>

        {/* Node: Onay (decision diamond) */}
        <div
          className="absolute flex items-center justify-center"
          style={{ left: "52.5%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div className="relative w-[13mm] h-[13mm]">
            <div className="absolute inset-[1.6mm] rotate-45 rounded-[1mm] bg-amber-500/12 border border-amber-500/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[0.3mm]">
              <Filter className="w-[2.5mm] h-[2.5mm] text-amber-400" />
              <span className="text-[6.5pt] font-semibold text-white leading-none">
                Onay
              </span>
            </div>
          </div>
        </div>

        {/* Branch label: Onaylandı */}
        <span
          className="absolute text-[6pt] font-mono text-emerald-400"
          style={{ left: "60%", top: "13%" }}
        >
          Onaylandı
        </span>
        {/* Branch label: Reddedildi */}
        <span
          className="absolute text-[6pt] font-mono text-red-400"
          style={{ left: "60%", top: "62%" }}
        >
          Reddedildi
        </span>

        {/* Node: Otomasyon (bot action) */}
        <div
          className="absolute w-[20mm] rounded-md bg-emerald-500/10 border border-emerald-500/25 px-[1.5mm] py-[1.5mm] flex flex-col gap-[0.5mm]"
          style={{ left: "81%", top: "27%", transform: "translate(-50%, -50%)" }}
        >
          <div className="flex items-center gap-[1mm]">
            <Bot className="w-[2.5mm] h-[2.5mm] text-emerald-400 shrink-0" />
            <span className="text-[6.5pt] font-mono uppercase tracking-[0.12em] text-slate-500">
              Otomasyon
            </span>
          </div>
          <span className="text-[7pt] font-semibold text-white leading-tight">
            Hesap Sağla
          </span>
        </div>

        {/* Node: Reddedildi terminal (notify) */}
        <div
          className="absolute w-[20mm] rounded-md bg-red-500/10 border border-red-500/25 px-[1.5mm] py-[1.5mm] flex flex-col gap-[0.5mm]"
          style={{ left: "81%", top: "77%", transform: "translate(-50%, -50%)" }}
        >
          <div className="flex items-center gap-[1mm]">
            <Bell className="w-[2.5mm] h-[2.5mm] text-red-400 shrink-0" />
            <span className="text-[6.5pt] font-mono uppercase tracking-[0.12em] text-slate-500">
              Bildirim
            </span>
          </div>
          <span className="text-[7pt] font-semibold text-white leading-tight">
            Talep Edene Dön
          </span>
        </div>

        {/* Node: End */}
        <div
          className="absolute w-[7mm] h-[7mm] rounded-full bg-emerald-500/15 border-[0.5mm] border-emerald-500/40 flex items-center justify-center"
          style={{ left: "95%", top: "27%", transform: "translate(-50%, -50%)" }}
        >
          <Flag className="w-[2.5mm] h-[2.5mm] text-emerald-400" />
        </div>
      </div>

      {/* Node-type palette */}
      <div className="flex items-center gap-[1.5mm] mt-[2.5mm] flex-wrap">
        <span className="text-[7pt] font-mono uppercase tracking-[0.2em] text-slate-500 mr-[0.5mm]">
          Düğümler
        </span>
        {palette.map((p, i) => {
          const Icon = p.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-[1mm] px-[1.5mm] py-[0.5mm] rounded-md border ${p.tone}`}
            >
              <Icon className="w-[2.5mm] h-[2.5mm]" />
              <span className="text-[7pt] font-medium text-white">{p.label}</span>
            </div>
          );
        })}
        <div className="flex items-center gap-[1mm] ml-auto">
          <XCircle className="w-[2.5mm] h-[2.5mm] text-slate-500" />
          <span className="text-[7pt] font-mono text-slate-500">
            sürükle ve bırak · 14 düğüm
          </span>
          <ArrowRight className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// Integration Management — REST API konsolu
// ============================================================

function IntegrationApiMock({ accent }: { accent: AccentClasses }) {
  const endpoints = [
    { method: "GET", path: "/api/v1/incidents", auth: Lock, code: "200", codeTone: "text-emerald-400", mTone: "text-emerald-400 bg-emerald-500/12 border-emerald-500/30" },
    { method: "POST", path: "/api/v1/requests", auth: Lock, code: "201", codeTone: "text-emerald-400", mTone: "text-blue-400 bg-blue-500/12 border-blue-500/30" },
    { method: "PUT", path: "/api/v1/changes/{id}", auth: Lock, code: "200", codeTone: "text-emerald-400", mTone: "text-amber-400 bg-amber-500/12 border-amber-500/30" },
    { method: "GET", path: "/api/v1/assets", auth: KeyRound, code: "200", codeTone: "text-emerald-400", mTone: "text-emerald-400 bg-emerald-500/12 border-emerald-500/30" },
    { method: "DELETE", path: "/api/v1/webhooks/{id}", auth: Lock, code: "204", codeTone: "text-slate-400", mTone: "text-red-400 bg-red-500/12 border-red-500/30" },
  ];

  const scopes = [
    "incidents:read",
    "requests:write",
    "assets:read",
    "cmdb:read",
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Link2 className="w-[3mm] h-[3mm]" />}
        title="REST API Konsolu"
        meta="v1 · canlı"
        accent={accent}
      />

      <div className="grid grid-cols-[1fr_52mm] gap-[3mm]">
        {/* Endpoint table */}
        <div className="flex flex-col min-w-0">
          {/* Base URL bar */}
          <div className="flex items-center gap-[1.5mm] px-[2mm] py-[1.5mm] rounded-md bg-white/3 border border-white/8 mb-[2mm]">
            <Webhook className={`w-[2.5mm] h-[2.5mm] ${accent.text} shrink-0`} />
            <span className="text-[7pt] font-mono text-slate-500 shrink-0">
              base
            </span>
            <span className="text-[7.5pt] font-mono text-white truncate">
              https://api.servicecore.app
            </span>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[16mm_1fr_8mm_12mm] gap-[2mm] px-[2mm] py-[1mm] text-[7pt] font-mono font-semibold uppercase tracking-[0.18em] text-slate-500 bg-white/2 border border-white/5 rounded-md mb-[1.5mm]">
            <span>Metod</span>
            <span>Uç Nokta</span>
            <span>Yetki</span>
            <span>Yanıt</span>
          </div>

          {/* Endpoint rows */}
          <div className="flex flex-col gap-[1mm]">
            {endpoints.map((e, i) => {
              const AuthIcon = e.auth;
              return (
                <div
                  key={i}
                  className="grid grid-cols-[16mm_1fr_8mm_12mm] gap-[2mm] items-center px-[2mm] py-[1.5mm] rounded-md bg-white/2 border border-white/5"
                >
                  <span
                    className={`text-[7pt] font-mono font-bold px-[1.2mm] py-[0.3mm] rounded-md border text-center ${e.mTone}`}
                  >
                    {e.method}
                  </span>
                  <span className="text-[8pt] font-mono text-white truncate">
                    {e.path}
                  </span>
                  <AuthIcon className="w-[2.5mm] h-[2.5mm] text-slate-400 justify-self-center" />
                  <span className={`text-[8pt] font-mono font-bold tabular-nums ${e.codeTone}`}>
                    {e.code}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Audit footer */}
          <div className="flex items-center gap-[1.5mm] mt-[2mm] pt-[1.5mm] border-t border-white/5">
            <Activity className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
            <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
              Denetim İzi
            </span>
            <span className="text-[7pt] font-mono text-slate-400 truncate">
              14.218 çağrı · son 24 sa
            </span>
            <span className={`ml-auto w-[1.2mm] h-[1.2mm] rounded-full ${accent.dot}`} />
          </div>
        </div>

        {/* Auth / token panel */}
        <div className="flex flex-col gap-[2mm] min-w-0">
          {/* Bearer token card */}
          <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
            <div className="flex items-center gap-[1.5mm]">
              <KeyRound className={`w-[3mm] h-[3mm] ${accent.text}`} />
              <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-white">
                Erişim Anahtarı
              </span>
            </div>
            <div className="flex items-center gap-[1mm] px-[1.5mm] py-[1.5mm] rounded-md bg-black/20 border border-white/8">
              <span className="text-[7pt] font-mono text-slate-500 shrink-0">
                Bearer
              </span>
              <span className={`text-[7pt] font-mono ${accent.text} truncate`}>
                sk_live_8f2a••••4c1e
              </span>
            </div>
            <div className="flex items-center gap-[1.5mm]">
              <Shield className="w-[2.5mm] h-[2.5mm] text-emerald-400 shrink-0" />
              <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
                Rol
              </span>
              <span className="text-[7.5pt] font-medium text-white truncate">
                Entegrasyon Servisi
              </span>
            </div>
          </div>

          {/* Scope chips */}
          <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
            <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
              Kapsam (Scope)
            </span>
            <div className="flex flex-wrap gap-[1mm]">
              {scopes.map((s, i) => (
                <span
                  key={i}
                  className={`text-[6.5pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border ${accent.chip}`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Rate limit gauge */}
          <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[1.5mm]">
                <Gauge className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
                <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
                  Hız Limiti
                </span>
              </div>
              <span className="text-[7pt] font-mono text-slate-400 tabular-nums">
                742 / 1.000
              </span>
            </div>
            <div className="h-[1.5mm] rounded-full bg-white/5 overflow-hidden">
              <div
                className={`h-full ${accent.bg} border ${accent.border} rounded-full`}
                style={{ width: "74%" }}
              />
            </div>
            <span className="text-[6.5pt] font-mono text-slate-500">
              istek / dakika · sıfırlama 18s
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// Integration System — connector katalogu & çalıştırma
// ============================================================

function IntegrationSystemMock({ accent }: { accent: AccentClasses }) {
  const connectors = [
    { label: "E-posta", system: "SMTP / IMAP", icon: Mail, online: true },
    { label: "Teams", system: "Microsoft 365", icon: MessageSquare, online: true },
    { label: "Webhook", system: "HTTP / REST", icon: Webhook, online: true },
    { label: "Veritabanı", system: "PostgreSQL", icon: Database, online: true },
    { label: "Bulut Depolama", system: "Azure Blob", icon: Cloud, online: true },
    { label: "ERP", system: "SAP S/4HANA", icon: GitMerge, online: false },
  ];

  const runs = [
    {
      flow: "Olay → Teams bildirim",
      trigger: "Olay",
      tIcon: CheckCircle2,
      tTone: "text-purple-400 bg-purple-500/10 border-purple-500/25",
      state: "Başarılı",
      sIcon: CheckCircle2,
      sTone: "text-emerald-400",
      dur: "1,2 sn",
    },
    {
      flow: "ERP varlık eşitleme",
      trigger: "Cron",
      tIcon: CalendarClock,
      tTone: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
      state: "Çalışıyor",
      sIcon: RefreshCw,
      sTone: accent.text,
      dur: "4,8 sn",
    },
    {
      flow: "CRM talep oluştur",
      trigger: "Webhook",
      tIcon: Webhook,
      tTone: "text-amber-400 bg-amber-500/10 border-amber-500/25",
      state: "Başarılı",
      sIcon: CheckCircle2,
      sTone: "text-emerald-400",
      dur: "0,9 sn",
    },
    {
      flow: "Toplu kullanıcı içe aktar",
      trigger: "Manuel",
      tIcon: MessageSquare,
      tTone: "text-slate-300 bg-white/5 border-white/10",
      state: "Hata",
      sIcon: XCircle,
      sTone: "text-red-400",
      dur: "2,1 sn",
    },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Plug className="w-[3mm] h-[3mm]" />}
        title="Entegrasyon İstasyonu — Akış Motoru"
        meta="6 connector · 248 çalıştırma/gün"
        accent={accent}
      />

      {/* Connector catalog */}
      <div className="mb-[3mm]">
        <div className="flex items-center justify-between mb-[1.5mm]">
          <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
            Connector Kataloğu
          </span>
          <div className="flex items-center gap-[1mm]">
            <span className="w-[1.2mm] h-[1.2mm] rounded-full bg-emerald-400" />
            <span className="text-[7pt] font-mono text-slate-500">5 bağlı</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[1.5mm]">
          {connectors.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="rounded-md border border-white/8 bg-white/2 p-[2mm] flex items-center gap-[1.5mm]"
              >
                <div
                  className={`w-[6mm] h-[6mm] rounded-md ${accent.bg} border ${accent.border} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-[3mm] h-[3mm] ${accent.text}`} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[8pt] font-semibold text-white truncate">
                    {c.label}
                  </span>
                  <span className="text-[6.5pt] font-mono text-slate-500 truncate">
                    {c.system}
                  </span>
                </div>
                <span
                  className={`w-[1.5mm] h-[1.5mm] rounded-full shrink-0 ${
                    c.online ? "bg-emerald-400" : "bg-slate-600"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent runs */}
      <div className="rounded-md border border-white/8 bg-white/2 p-[2.5mm]">
        <div className="flex items-center justify-between mb-[1.5mm]">
          <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
            Son Çalıştırmalar
          </span>
          <span className="text-[7pt] font-mono text-slate-500">canlı</span>
        </div>

        <div className="grid grid-cols-[16mm_1fr_18mm_14mm] gap-[2mm] px-[1.5mm] pb-[1mm] text-[6.5pt] font-mono font-semibold uppercase tracking-[0.16em] text-slate-500 border-b border-white/5 mb-[1mm]">
          <span>Tetikleyici</span>
          <span>Akış</span>
          <span>Durum</span>
          <span className="text-right">Süre</span>
        </div>

        <div className="flex flex-col gap-[1mm]">
          {runs.map((r, i) => {
            const TIcon = r.tIcon;
            const SIcon = r.sIcon;
            return (
              <div
                key={i}
                className="grid grid-cols-[16mm_1fr_18mm_14mm] gap-[2mm] items-center px-[1.5mm] py-[1mm] rounded-md bg-white/2 border border-white/5"
              >
                <span
                  className={`flex items-center gap-[1mm] text-[6.5pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border ${r.tTone}`}
                >
                  <TIcon className="w-[2mm] h-[2mm]" />
                  {r.trigger}
                </span>
                <span className="text-[8pt] font-medium text-white truncate">
                  {r.flow}
                </span>
                <span
                  className={`flex items-center gap-[1mm] text-[7pt] font-mono font-semibold ${r.sTone}`}
                >
                  <SIcon className="w-[2.5mm] h-[2.5mm]" />
                  {r.state}
                </span>
                <span className="text-[7pt] font-mono text-slate-400 tabular-nums text-right">
                  {r.dur}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-[1mm] mt-[1.5mm] pt-[1.5mm] border-t border-white/5">
          <span className={`text-[7pt] font-mono ${accent.text}`}>
            Tüm çalıştırma geçmişi
          </span>
          <ArrowRight className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// Low Code — form tasarım stüdyosu
// ============================================================

function LowCodeMock({ accent }: { accent: AccentClasses }) {
  const palette = [
    { label: "Metin Kutusu", icon: Type },
    { label: "Seçim Listesi", icon: List },
    { label: "Tarih", icon: Calendar },
    { label: "Dosya", icon: Upload },
    { label: "Onay Kutusu", icon: CheckSquare },
  ];

  const canvas = [
    { label: "Talep Eden", placeholder: "Ad Soyad · Departman", icon: Type, selected: false },
    { label: "Hizmet Türü", placeholder: "Listeden seçin…", icon: List, selected: true },
    { label: "İhtiyaç Tarihi", placeholder: "gg.aa.yyyy", icon: Calendar, selected: false },
    { label: "Onay Belgesi", placeholder: "Dosya yükle (PDF)", icon: Upload, selected: false },
  ];

  const props = [
    { label: "Alan Adı", value: "hizmet_turu" },
    { label: "Etiket", value: "Hizmet Türü" },
    { label: "Tip", value: "Seçim Listesi" },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<Code className="w-[3mm] h-[3mm]" />}
        title="Form Tasarım Stüdyosu — FRM-208"
        meta="Taslak · v3"
        accent={accent}
      />

      <div className="grid grid-cols-[33mm_1fr_42mm] gap-[2mm] items-stretch">
        {/* Left: component palette */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2mm] flex flex-col gap-[1.5mm]">
          <div className="flex items-center gap-[1.5mm] pb-[1mm] border-b border-white/8">
            <Boxes className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
            <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
              Bileşenler
            </span>
          </div>
          {palette.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-[1.5mm] px-[1.5mm] py-[1mm] rounded-md bg-white/3 border border-white/8"
              >
                <span className="flex flex-col gap-[0.5mm] shrink-0">
                  <span className="flex gap-[0.5mm]">
                    <span className="w-[0.6mm] h-[0.6mm] rounded-full bg-white/25" />
                    <span className="w-[0.6mm] h-[0.6mm] rounded-full bg-white/25" />
                  </span>
                  <span className="flex gap-[0.5mm]">
                    <span className="w-[0.6mm] h-[0.6mm] rounded-full bg-white/25" />
                    <span className="w-[0.6mm] h-[0.6mm] rounded-full bg-white/25" />
                  </span>
                  <span className="flex gap-[0.5mm]">
                    <span className="w-[0.6mm] h-[0.6mm] rounded-full bg-white/25" />
                    <span className="w-[0.6mm] h-[0.6mm] rounded-full bg-white/25" />
                  </span>
                </span>
                <Icon className="w-[2.5mm] h-[2.5mm] text-slate-300 shrink-0" />
                <span className="text-[7.5pt] font-medium text-white truncate">
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center: form canvas */}
        <div className="rounded-md border border-dashed border-white/12 bg-white/2 p-[2.5mm] flex flex-col gap-[1.5mm]">
          <div className="flex items-center justify-between pb-[1mm] border-b border-white/8">
            <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
              Personel Talep Formu
            </span>
            <span className="text-[7pt] font-mono text-slate-500">4 alan</span>
          </div>
          {canvas.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`rounded-md p-[2mm] flex flex-col gap-[1mm] border ${
                  f.selected
                    ? `${accent.bg} ${accent.border}`
                    : "bg-white/3 border-white/8"
                }`}
              >
                <div className="flex items-center gap-[1mm]">
                  <Icon
                    className={`w-[2.5mm] h-[2.5mm] ${
                      f.selected ? accent.text : "text-slate-500"
                    }`}
                  />
                  <span className="text-[7.5pt] font-medium text-white">
                    {f.label}
                  </span>
                  {f.selected && (
                    <span
                      className={`ml-auto text-[6.5pt] font-mono uppercase tracking-[0.16em] px-[1.2mm] py-[0.2mm] rounded-full border ${accent.chip}`}
                    >
                      Seçili
                    </span>
                  )}
                </div>
                <div className="h-[4mm] rounded-sm bg-white/4 border border-white/8 flex items-center px-[1.5mm]">
                  <span className="text-[7pt] font-light text-slate-500 truncate">
                    {f.placeholder}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="rounded-md border border-dashed border-white/15 bg-white/2 py-[1.5mm] flex items-center justify-center gap-[1mm]">
            <Plus className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
            <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-400">
              Bileşeni buraya bırak
            </span>
          </div>
        </div>

        {/* Right: field properties */}
        <div className="rounded-md border border-white/8 bg-white/2 p-[2mm] flex flex-col gap-[1.5mm]">
          <div className="flex items-center gap-[1.5mm] pb-[1mm] border-b border-white/8">
            <SlidersHorizontal className={`w-[2.5mm] h-[2.5mm] ${accent.text}`} />
            <span className="text-[7pt] font-mono uppercase tracking-[0.16em] text-slate-500">
              Alan Özellikleri
            </span>
          </div>

          {props.map((pr, i) => (
            <div key={i} className="flex flex-col gap-[0.5mm]">
              <span className="text-[6.5pt] font-mono uppercase tracking-[0.16em] text-slate-500">
                {pr.label}
              </span>
              <div className="h-[4mm] rounded-sm bg-white/4 border border-white/8 flex items-center px-[1.5mm]">
                <span className="text-[7.5pt] font-mono text-white truncate">
                  {pr.value}
                </span>
              </div>
            </div>
          ))}

          {/* Zorunlu toggle — on */}
          <div className="flex items-center justify-between px-[1.5mm] py-[1mm] rounded-md bg-white/3 border border-white/8 mt-[0.5mm]">
            <span className="text-[7.5pt] font-medium text-white">Zorunlu</span>
            <ToggleRight className={`w-[4mm] h-[4mm] ${accent.text}`} />
          </div>

          {/* Görünürlük */}
          <div className="flex items-center justify-between px-[1.5mm] py-[1mm] rounded-md bg-white/3 border border-white/8">
            <div className="flex items-center gap-[1mm]">
              <Eye className="w-[2.5mm] h-[2.5mm] text-slate-500" />
              <span className="text-[7.5pt] font-medium text-white">Görünürlük</span>
            </div>
            <span className="text-[6.5pt] font-mono uppercase tracking-[0.16em] text-emerald-400">
              Koşullu
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// Contract Management — sözleşme yaşam döngüsü
// ============================================================

function ContractMock({ accent }: { accent: AccentClasses }) {
  const lifecycle = [
    { label: "Taslak", status: "done" },
    { label: "İnceleme", status: "done" },
    { label: "Onay", status: "done" },
    { label: "İmza", status: "done" },
    { label: "Aktif", status: "active" },
    { label: "İzleme", status: "pending" },
    { label: "Yenileme", status: "pending" },
    { label: "Kapanış", status: "pending" },
  ];

  const contracts = [
    {
      id: "CTR-2418",
      type: "SLA",
      typeIcon: Shield,
      typeTone: "text-blue-400 bg-blue-500/12 border-blue-500/30",
      party: "Bilgi Teknolojileri",
      end: "31.07.2026",
      status: "Aktif",
      sTone: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      left: "46 gün",
      lTone: "text-emerald-400",
    },
    {
      id: "CTR-2417",
      type: "Tedarikçi",
      typeIcon: Building2,
      typeTone: "text-purple-400 bg-purple-500/12 border-purple-500/30",
      party: "Netaş Telekom A.Ş.",
      end: "28.06.2026",
      status: "Yenilenecek",
      sTone: "text-amber-400 bg-amber-500/10 border-amber-500/25",
      left: "13 gün",
      lTone: "text-amber-400",
    },
    {
      id: "CTR-2416",
      type: "OLA",
      typeIcon: Scale,
      typeTone: "text-cyan-400 bg-cyan-500/12 border-cyan-500/30",
      party: "Ağ Operasyon Ekibi",
      end: "30.09.2026",
      status: "Aktif",
      sTone: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      left: "107 gün",
      lTone: "text-emerald-400",
    },
    {
      id: "CTR-2415",
      type: "Tedarikçi",
      typeIcon: Building2,
      typeTone: "text-purple-400 bg-purple-500/12 border-purple-500/30",
      party: "Dell EMC Bakım",
      end: "08.06.2026",
      status: "Süresi Doldu",
      sTone: "text-red-400 bg-red-500/12 border-red-500/30",
      left: "-7 gün",
      lTone: "text-red-400",
    },
    {
      id: "CTR-2414",
      type: "SLA",
      typeIcon: Shield,
      typeTone: "text-blue-400 bg-blue-500/12 border-blue-500/30",
      party: "İnsan Kaynakları",
      end: "20.06.2026",
      status: "Yenilenecek",
      sTone: "text-amber-400 bg-amber-500/10 border-amber-500/25",
      left: "5 gün",
      lTone: "text-amber-400",
    },
  ];

  return (
    <Frame>
      <TitleBar
        icon={<FileSignature className="w-[3mm] h-[3mm]" />}
        title="Sözleşme Yaşam Döngüsü"
        meta="184 sözleşme · 6 yenileme"
        accent={accent}
      />

      {/* Lifecycle stepper — 8 stages, horizontally compressed */}
      <div className="rounded-md border border-white/8 bg-white/2 px-[2.5mm] py-[2.5mm] mb-[3mm]">
        <div className="flex items-center justify-between mb-[2mm]">
          <span className="text-[7pt] font-mono uppercase tracking-[0.18em] text-slate-500">
            Sözleşme Aşamaları
          </span>
          <span className={`text-[7pt] font-mono font-semibold ${accent.text}`}>
            5 / 8 · Aktif
          </span>
        </div>
        <div className="flex items-start">
          {lifecycle.map((s, i) => {
            const isDone = s.status === "done";
            const isActive = s.status === "active";
            const isLast = i === lifecycle.length - 1;
            const connectorTone = isDone
              ? "bg-emerald-500/50"
              : "bg-white/10";
            return (
              <div key={i} className="flex items-start flex-1 min-w-0">
                <div className="flex flex-col items-center gap-[1mm] shrink-0">
                  <div
                    className={`w-[4mm] h-[4mm] rounded-full border flex items-center justify-center ${
                      isDone
                        ? "bg-emerald-500/15 border-emerald-500/40"
                        : isActive
                        ? `${accent.bg} ${accent.border}`
                        : "bg-white/3 border-white/12"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-[2.5mm] h-[2.5mm] text-emerald-400" />
                    ) : isActive ? (
                      <span className={`w-[1.6mm] h-[1.6mm] rounded-full ${accent.dot}`} />
                    ) : (
                      <span className="w-[1.2mm] h-[1.2mm] rounded-full bg-white/25" />
                    )}
                  </div>
                  <span
                    className={`text-[6.5pt] font-mono text-center leading-tight ${
                      isActive
                        ? `${accent.text} font-semibold`
                        : isDone
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className={`h-[0.5mm] flex-1 rounded-full mt-[1.75mm] mx-[0.5mm] ${connectorTone}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contract ledger table */}
      <div className="grid grid-cols-[16mm_20mm_1fr_20mm_22mm_16mm] gap-[2mm] px-[2mm] py-[1mm] text-[7pt] font-mono font-semibold uppercase tracking-[0.18em] text-slate-500 bg-white/2 border border-white/5 rounded-md mb-[1.5mm]">
        <span>Sözleşme</span>
        <span>Tip</span>
        <span>Taraf</span>
        <span>Bitiş</span>
        <span>Durum</span>
        <span>Kalan</span>
      </div>

      <div className="flex flex-col gap-[1mm]">
        {contracts.map((c, i) => {
          const TypeIcon = c.typeIcon;
          const expired = c.left.startsWith("-");
          return (
            <div
              key={i}
              className="grid grid-cols-[16mm_20mm_1fr_20mm_22mm_16mm] gap-[2mm] items-center px-[2mm] py-[1.5mm] rounded-md bg-white/2 border border-white/5"
            >
              <span className="text-[7pt] font-mono text-slate-500">{c.id}</span>
              <span
                className={`flex items-center gap-[1mm] text-[7pt] font-mono font-semibold px-[1.2mm] py-[0.3mm] rounded-full border ${c.typeTone}`}
              >
                <TypeIcon className="w-[2.2mm] h-[2.2mm]" />
                {c.type}
              </span>
              <span className="text-[8pt] font-medium text-white truncate">
                {c.party}
              </span>
              <div className="flex items-center gap-[1mm] min-w-0">
                <Calendar className="w-[2.2mm] h-[2.2mm] text-slate-500 shrink-0" />
                <span className="text-[7pt] font-mono text-slate-300 tabular-nums truncate">
                  {c.end}
                </span>
              </div>
              <span
                className={`flex items-center justify-center gap-[1mm] text-[7pt] font-mono px-[1.2mm] py-[0.3mm] rounded-full border ${c.sTone}`}
              >
                {c.status === "Süresi Doldu" ? (
                  <AlertCircle className="w-[2.2mm] h-[2.2mm]" />
                ) : c.status === "Yenilenecek" ? (
                  <RefreshCw className="w-[2.2mm] h-[2.2mm]" />
                ) : (
                  <CheckCircle2 className="w-[2.2mm] h-[2.2mm]" />
                )}
                {c.status}
              </span>
              <span
                className={`flex items-center gap-[1mm] text-[7.5pt] font-mono font-bold tabular-nums ${c.lTone}`}
              >
                <Clock className="w-[2.2mm] h-[2.2mm] shrink-0" />
                {expired ? "Doldu" : c.left}
              </span>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

// ============================================================
// Main dispatcher
// ============================================================

export function ModuleMock({ moduleId, accent }: ModuleMockProps): ReactNode {
  const a = ACCENT_MAP[accent] ?? ACCENT_MAP.blue;

  switch (moduleId) {
    case "service-desk-and-interaction-management":
      return <ServiceDeskMock accent={a} />;
    case "incident-management":
      return <IncidentMock accent={a} />;
    case "problem-management":
      return <ProblemMock accent={a} />;
    case "request-management":
      return <RequestMock accent={a} />;
    case "change-management":
      return <ChangeMock accent={a} />;
    case "asset-management":
      return <AssetMock accent={a} />;
    case "configuration-management-and-cmdb":
      return <CmdbMock accent={a} />;
    case "knowledge-management":
      return <KnowledgeMock accent={a} />;
    case "service-catalog-management":
      return <CatalogMock accent={a} />;
    case "service-level-management":
      return <SlaMock accent={a} />;
    case "measurement-and-reporting-management":
      return <ReportingMock accent={a} />;
    case "self-service-portal":
      return <PortalMock accent={a} />;
    case "continual-improvement":
      return <ContinualImprovementMock accent={a} />;
    case "service-automation":
      return <AutomationMock accent={a} />;
    case "task-management-workforce-and-talent-management":
      return <TaskMock accent={a} />;
    case "project-management":
      return <ProjectMock accent={a} />;
    case "enterprise-service-management":
      return <EsmMock accent={a} />;
    case "discovery":
      return <DiscoveryMock accent={a} />;
    case "service-topologies-explorer":
      return <TopologyMock accent={a} />;
    case "shift-management":
      return <ShiftMock accent={a} />;
    case "service-relations-management":
      return <SrmMock accent={a} />;
    case "federation-engine":
      return <FederationMock accent={a} />;
    case "admin-panel":
      return <AdminMock accent={a} />;
    case "mobile-service-management":
      return <MobileMock accent={a} />;
    case "workflow-management":
      return <WorkflowMock accent={a} />;
    case "integration-management":
      return <IntegrationApiMock accent={a} />;
    case "integration-system":
      return <IntegrationSystemMock accent={a} />;
    case "low-code-development":
      return <LowCodeMock accent={a} />;
    case "contract-management":
      return <ContractMock accent={a} />;
    default:
      return null;
  }
}
