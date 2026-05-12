import type { ReactNode } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bell,
  Bot,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  Eye,
  FileText,
  Filter,
  Flag,
  Gauge,
  GitBranch,
  HardDrive,
  HelpCircle,
  Laptop,
  Layers,
  Lightbulb,
  Lock,
  Mail,
  MessageCircle,
  Monitor,
  Network,
  Phone,
  Plus,
  Printer,
  RefreshCw,
  Scale,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  User,
  Users,
  Wallet,
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
  | "emerald";

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
// Main dispatcher
// ============================================================

export function ModuleMock({ moduleId, accent }: ModuleMockProps): ReactNode {
  const a = ACCENT_MAP[accent];

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
    default:
      return null;
  }
}
