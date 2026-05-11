import {
  ArrowRight,
  Bell,
  CheckCircle2,
  GitBranch,
  Mail,
  Play,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
  Zap,
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

interface FlowNode {
  id: string;
  x: number;
  y: number;
  label: string;
  sub?: string;
  icon: ReactNode;
  type: "trigger" | "task" | "decision" | "end";
}

const NODES: FlowNode[] = [
  { id: "trigger", x: 40, y: 130, label: "Yeni Personel", sub: "İK kaydı tetikler", icon: <Play className="w-3.5 h-3.5" />, type: "trigger" },
  { id: "validate", x: 200, y: 130, label: "Profil Doğrulama", sub: "Kayıt eksiksiz mi?", icon: <UserCheck className="w-3.5 h-3.5" />, type: "task" },
  { id: "decision", x: 360, y: 130, label: "Kıdem?", sub: "Karar", icon: <GitBranch className="w-3.5 h-3.5" />, type: "decision" },
  { id: "approval", x: 520, y: 50, label: "Müdür Onayı", sub: "yönetici / üzeri", icon: <ShieldCheck className="w-3.5 h-3.5" />, type: "task" },
  { id: "provision", x: 520, y: 220, label: "Donanım + Hesap", sub: "asset + AD + e-posta", icon: <Zap className="w-3.5 h-3.5" />, type: "task" },
  { id: "merge", x: 680, y: 130, label: "VPN & Erişim", sub: "rol bazlı", icon: <Mail className="w-3.5 h-3.5" />, type: "task" },
  { id: "notify", x: 840, y: 130, label: "Bildirim", sub: "kullanıcı + ekip", icon: <Bell className="w-3.5 h-3.5" />, type: "task" },
  { id: "end", x: 1000, y: 130, label: "Tamamlandı", sub: "kayıt kapatıldı", icon: <CheckCircle2 className="w-3.5 h-3.5" />, type: "end" },
];

interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

const EDGES: FlowEdge[] = [
  { from: "trigger", to: "validate" },
  { from: "validate", to: "decision" },
  { from: "decision", to: "approval", label: "yönetici/üst" },
  { from: "decision", to: "provision", label: "diğer" },
  { from: "approval", to: "merge" },
  { from: "provision", to: "merge" },
  { from: "merge", to: "notify" },
  { from: "notify", to: "end" },
];

function nodeById(id: string): FlowNode | undefined {
  return NODES.find((n) => n.id === id);
}

export function FlowCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);
  const W = 1080;
  const H = 280;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Workflow className="w-3.5 h-3.5" />}
          title="FlowCoreAI · Üretilen İş Akışı"
          meta="ESM · Onboarding"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
              {trUpper("Doğal Dil Komutu")}
            </span>
            <AiBadge label="yorumlandı" accent={accent} pulse={false} />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/4">
            <Search className="w-3.5 h-3.5 text-(--color-text-muted) shrink-0" />
            <span className="text-xs text-white/85 leading-snug flex-1">
              &ldquo;Yeni personel için: profili doğrula, eğer yönetici ya da üstüyse müdür onayı
              al, donanım ve hesabı hazırla, VPN ile rol bazlı erişimi ver, kullanıcı ve ekibe
              bildir.&rdquo;
            </span>
            <button
              className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md ${accent.bg} ${accent.text} ring-1 ${accent.ring} cursor-pointer`}
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
          <div
            className="absolute -top-20 -right-10 w-80 h-80 rounded-full pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.30), transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="relative w-full"
            style={{ aspectRatio: `${W} / ${H}` }}
          >
            <defs>
              <marker
                id="arrow-flowcore"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-purple-300/70" />
              </marker>
            </defs>

            {EDGES.map((e, i) => {
              const a = nodeById(e.from);
              const b = nodeById(e.to);
              if (!a || !b) return null;
              const x1 = a.x + 60;
              const y1 = a.y;
              const x2 = b.x - 60;
              const y2 = b.y;
              const midX = (x1 + x2) / 2;
              const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
              return (
                <g key={i}>
                  <path
                    d={path}
                    fill="none"
                    className="stroke-purple-400/45"
                    strokeWidth={1.4}
                    markerEnd="url(#arrow-flowcore)"
                  />
                  {e.label && (
                    <text
                      x={midX}
                      y={(y1 + y2) / 2 - 6}
                      textAnchor="middle"
                      className="fill-(--color-text-muted) font-mono"
                      style={{ fontSize: "10px" }}
                    >
                      {e.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {NODES.map((n) => (
            <FlowNodeBox
              key={n.id}
              node={n}
              accent={accent}
              boundsW={W}
              boundsH={H}
            />
          ))}
        </div>

        <div className="px-5 py-3 border-t border-white/8 bg-white/2 flex items-center gap-2">
          <Chip>BPMN-uyumlu</Chip>
          <Chip>{trUpper("8 düğüm")}</Chip>
          <Chip>{trUpper("1 karar")}</Chip>
          <Chip>{trUpper("paralel kol")}</Chip>
          <button className="ml-auto text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
            Editörde aç
          </button>
          <button
            className={`text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center gap-1.5`}
          >
            <Workflow className="w-3 h-3" />
            Akışı Yayınla
          </button>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="FlowCore Yorumu"
            meta="güven %92"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-4">
            <div>
              <span className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
                {trUpper("Çıkarılan Yapı")}
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <SmallStat icon={<Workflow className="w-3 h-3" />} label="Düğüm" value="8" />
                <SmallStat icon={<GitBranch className="w-3 h-3" />} label="Karar" value="1" />
                <SmallStat icon={<Zap className="w-3 h-3" />} label="Otomasyon" value="5" />
                <SmallStat icon={<UserCheck className="w-3 h-3" />} label="İnsan onayı" value="1" />
              </div>
            </div>

            <div>
              <span className="text-[9px] font-mono font-semibold tracking-[0.22em] text-(--color-text-muted)">
                {trUpper("Önerilen Otomasyonlar")}
              </span>
              <div className="mt-2 space-y-1.5">
                <SuggestionRow accent={accent}>
                  Donanım hazırlama → varlık modülünde mevcut envanterden otomatik atama.
                </SuggestionRow>
                <SuggestionRow accent={accent}>
                  E-posta hesabı → AD provisioning servisi ile entegre.
                </SuggestionRow>
                <SuggestionRow accent={accent}>
                  Müdür onayı zaman aşımı → 24 saat sonra üst yöneticiye eskalasyon.
                </SuggestionRow>
              </div>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<GitBranch className="w-3.5 h-3.5" />} title="Benzer Akışlar" accent={accent} />
          <div className="divide-y divide-white/6">
            <SimilarFlow id="WF-0142" name="Yeni Personel · ITSM" steps={9} match={94} />
            <SimilarFlow id="WF-0089" name="İşten Ayrılma · Erişim İptali" steps={7} match={71} />
            <SimilarFlow id="WF-0052" name="Departman Değişikliği" steps={6} match={64} />
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Workflow className="w-3.5 h-3.5" />} title="Bu Çeyrek · Flow" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Üretildi" value="184" trend="akış" trendTone="up" />
            <KpiTile label="Yayınlandı" value="142" trend="prod'a" trendTone="up" />
            <KpiTile label="Ort. Süre" value="3.6s" trend="metin → diyagram" trendTone="flat" />
            <KpiTile label="Kazanım" value="−68%" trend="manuel tasarım" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface FlowNodeBoxProps {
  node: FlowNode;
  accent: AccentClasses;
  boundsW: number;
  boundsH: number;
}

function FlowNodeBox({ node, accent, boundsW, boundsH }: FlowNodeBoxProps) {
  const widthPx = 124;
  const heightPx = 56;
  const leftPct = (node.x / boundsW) * 100;
  const topPct = (node.y / boundsH) * 100;

  const tone =
    node.type === "trigger"
      ? "border-emerald-400/40 bg-emerald-500/12 text-emerald-200"
      : node.type === "decision"
        ? `${accent.border} ${accent.bg} ${accent.text}`
        : node.type === "end"
          ? "border-blue-400/40 bg-blue-500/12 text-blue-200"
          : "border-white/12 bg-white/5 text-white/85";

  return (
    <div
      className={`absolute rounded-xl border ${tone} backdrop-blur-sm px-3 py-2 flex items-center gap-2 ${
        node.type === "decision" ? "rounded-lg" : ""
      }`}
      style={{
        width: widthPx,
        height: heightPx,
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/8">
        {node.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold text-white truncate">{node.label}</div>
        {node.sub && (
          <div className="text-[9px] font-mono text-(--color-text-muted) truncate">{node.sub}</div>
        )}
      </div>
    </div>
  );
}

interface SmallStatProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function SmallStat({ icon, label, value }: SmallStatProps) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/2 px-3 py-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
        {icon}
        <span>{trUpper(label)}</span>
      </div>
      <div className="mt-0.5 text-base font-semibold text-white tabular-nums">{value}</div>
    </div>
  );
}

interface SuggestionRowProps {
  accent: AccentClasses;
  children: ReactNode;
}

function SuggestionRow({ accent, children }: SuggestionRowProps) {
  return (
    <div className="flex items-start gap-2 text-[11px] text-white/85 leading-snug">
      <ArrowRight className={`w-3 h-3 ${accent.text} shrink-0 mt-0.5`} />
      <span>{children}</span>
    </div>
  );
}

interface SimilarFlowProps {
  id: string;
  name: string;
  steps: number;
  match: number;
}

function SimilarFlow({ id, name, steps, match }: SimilarFlowProps) {
  return (
    <div className="px-4 py-2.5 flex items-center gap-3">
      <Workflow className="w-3.5 h-3.5 text-(--color-text-muted) shrink-0" />
      <span className="text-[10px] font-mono text-(--color-text-muted) tabular-nums shrink-0">
        {id}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-white/85 truncate">{name}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">{steps} düğüm</div>
      </div>
      <span className="text-[11px] font-mono text-purple-300 tabular-nums shrink-0">{match}%</span>
    </div>
  );
}
