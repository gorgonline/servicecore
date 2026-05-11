import { Database, Layers, Network, Search, Server, Shield, Wifi } from "lucide-react";
import type { ReactNode } from "react";
import {
  Chip,
  KpiTile,
  MockFrame,
  SectionLabel,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

interface NodeProps {
  x: number;
  y: number;
  label: string;
  sub?: string;
  icon: ReactNode;
  status?: "ok" | "warn" | "danger" | "new";
  size?: "sm" | "md" | "lg";
}

function GraphNode({ x, y, label, sub, icon, status = "ok", size = "md" }: NodeProps) {
  const w = size === "lg" ? 156 : size === "sm" ? 116 : 136;
  const h = size === "lg" ? 60 : size === "sm" ? 44 : 52;
  const ring =
    status === "new"
      ? "ring-purple-400/60 shadow-[0_0_30px_-8px_rgba(168,85,247,0.55)]"
      : status === "warn"
        ? "ring-amber-400/50"
        : status === "danger"
          ? "ring-red-400/50"
          : "ring-white/10";
  const dot =
    status === "new"
      ? "bg-purple-400"
      : status === "warn"
        ? "bg-amber-400"
        : status === "danger"
          ? "bg-red-400"
          : "bg-emerald-400";

  return (
    <div
      className={`absolute rounded-xl border border-white/10 bg-(--color-surface-elevated)/95 backdrop-blur-sm ring-1 ${ring} px-3 py-2 flex items-center gap-2`}
      style={{ left: x, top: y, width: w, height: h, transform: "translate(-50%, -50%)" }}
    >
      <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/8 text-white/85">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold text-white truncate flex items-center gap-1.5">
          {label}
          <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${dot} ${status === "new" ? "animate-pulse" : ""}`} />
        </div>
        {sub && (
          <div className="text-[9px] font-mono text-(--color-text-muted) truncate">{sub}</div>
        )}
      </div>
    </div>
  );
}

interface EdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  variant?: "solid" | "dashed";
  highlight?: boolean;
}

function GraphEdge({ x1, y1, x2, y2, variant = "solid", highlight = false }: EdgeProps) {
  const stroke = highlight ? "stroke-purple-400/70" : "stroke-white/15";
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={stroke}
      strokeWidth={highlight ? 1.6 : 1}
      strokeDasharray={variant === "dashed" ? "4 4" : undefined}
    />
  );
}

export function DiscoverCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const W = 720;
  const H = 420;

  return (
    <MockFrame className={accent.glow}>
      <TitleBar
        icon={<Network className="w-3.5 h-3.5" />}
        title="DiscoverCoreAI · CMDB Keşif Haritası"
        meta="Birikim Holding · 14 dk önce tarandı"
        accent={accent}
      />

      <div className="px-5 py-3 flex items-center gap-3 border-b border-white/8 bg-white/2">
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
          <Search className="w-3.5 h-3.5 text-(--color-text-muted)" />
          <span className="text-xs text-white/60 font-mono">Posta servisi · etki alanı</span>
        </div>
        <Chip tone="success">132 düğüm</Chip>
        <Chip tone="info">218 bağlantı</Chip>
        <Chip tone="warn">7 yeni</Chip>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-0">
        <div className="relative overflow-hidden" style={{ height: H }}>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            className="absolute -top-32 -right-20 w-96 h-96 rounded-full pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(34,211,238,0.35), transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            <GraphEdge x1={360} y1={210} x2={180} y2={110} highlight />
            <GraphEdge x1={360} y1={210} x2={180} y2={310} highlight />
            <GraphEdge x1={360} y1={210} x2={560} y2={110} />
            <GraphEdge x1={360} y1={210} x2={560} y2={310} />
            <GraphEdge x1={180} y1={110} x2={80} y2={60} variant="dashed" />
            <GraphEdge x1={180} y1={110} x2={80} y2={170} variant="dashed" />
            <GraphEdge x1={180} y1={310} x2={80} y2={260} variant="dashed" />
            <GraphEdge x1={180} y1={310} x2={80} y2={370} variant="dashed" />
            <GraphEdge x1={560} y1={110} x2={650} y2={60} />
            <GraphEdge x1={560} y1={110} x2={650} y2={170} />
            <GraphEdge x1={560} y1={310} x2={650} y2={260} />
            <GraphEdge x1={560} y1={310} x2={650} y2={370} />
            <GraphEdge x1={360} y1={210} x2={360} y2={380} />
          </svg>

          <GraphNode
            x={360}
            y={210}
            label="Posta Servisi"
            sub="Birincil + İkincil"
            icon={<Server className="w-3.5 h-3.5" />}
            status="warn"
            size="lg"
          />

          <GraphNode
            x={180}
            y={110}
            label="SRV-MAIL-01"
            sub="CPU 84% · kritik"
            icon={<Server className="w-3.5 h-3.5" />}
            status="danger"
          />
          <GraphNode
            x={180}
            y={310}
            label="SRV-MAIL-02"
            sub="CPU 41% · yedek"
            icon={<Server className="w-3.5 h-3.5" />}
            status="ok"
          />
          <GraphNode
            x={560}
            y={110}
            label="LB-WEB-02"
            sub="Yük dengeleyici"
            icon={<Layers className="w-3.5 h-3.5" />}
            status="ok"
          />
          <GraphNode
            x={560}
            y={310}
            label="DB-CORE-01"
            sub="Adres veritabanı"
            icon={<Database className="w-3.5 h-3.5" />}
            status="ok"
          />

          <GraphNode
            x={80}
            y={60}
            label="STORE-IST-12"
            sub="depolama"
            icon={<Database className="w-3 h-3" />}
            size="sm"
          />
          <GraphNode
            x={80}
            y={170}
            label="VLAN-MAIL"
            sub="ağ"
            icon={<Wifi className="w-3 h-3" />}
            size="sm"
            status="new"
          />
          <GraphNode
            x={80}
            y={260}
            label="STORE-IST-14"
            sub="depolama"
            icon={<Database className="w-3 h-3" />}
            size="sm"
            status="new"
          />
          <GraphNode
            x={80}
            y={370}
            label="VLAN-DR"
            sub="dr ağı"
            icon={<Wifi className="w-3 h-3" />}
            size="sm"
          />

          <GraphNode
            x={650}
            y={60}
            label="FW-EDGE-03"
            sub="firewall"
            icon={<Shield className="w-3 h-3" />}
            size="sm"
          />
          <GraphNode
            x={650}
            y={170}
            label="DNS-INT-01"
            sub="dns"
            icon={<Network className="w-3 h-3" />}
            size="sm"
          />
          <GraphNode
            x={650}
            y={260}
            label="MX-RELAY"
            sub="smtp relay"
            icon={<Server className="w-3 h-3" />}
            size="sm"
            status="new"
          />
          <GraphNode
            x={650}
            y={370}
            label="AD-CTRL-01"
            sub="kimlik"
            icon={<Shield className="w-3 h-3" />}
            size="sm"
          />

          <GraphNode
            x={360}
            y={380}
            label="14 şube ofisi"
            sub="bağımlı kullanıcılar"
            icon={<Layers className="w-3.5 h-3.5" />}
          />
        </div>

        <div className="border-l border-white/8 px-4 py-4 space-y-4">
          <div>
            <SectionLabel accent={accent}>Bu Tarama</SectionLabel>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <KpiTile label="Yeni" value="7" trend="bağlandı" trendTone="up" />
              <KpiTile label="Değişti" value="3" trend="config" trendTone="flat" />
            </div>
          </div>

          <div>
            <SectionLabel>Yeni Keşfedilen</SectionLabel>
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-purple-500/30 bg-purple-500/8">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[11px] text-white/85 truncate">VLAN-MAIL</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-purple-500/30 bg-purple-500/8">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[11px] text-white/85 truncate">STORE-IST-14</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-purple-500/30 bg-purple-500/8">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[11px] text-white/85 truncate">MX-RELAY</span>
              </div>
            </div>
          </div>

          <div className={`rounded-xl border ${accent.border} ${accent.bg} p-3`}>
            <div className="text-[10px] font-mono font-semibold tracking-[0.18em] text-white/85 mb-1">
              {trUpper("AI Yorumu")}
            </div>
            <p className="text-[11px] text-white/75 leading-snug">
              Posta servisi yedeklemesi <span className={`${accent.text} font-medium`}>tek depolamaya</span>{" "}
              bağımlı görünüyor. STORE-IST-14 üzerinden yedek izolasyonu önerilir.
            </p>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}
