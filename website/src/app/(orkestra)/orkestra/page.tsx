"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  BackgroundVariant,
  MarkerType,
  BaseEdge,
  EdgeProps,
  getBezierPath
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import AgentNode from "@/components/orchestrator/AgentNode";
import { Cpu, Radio, CheckCircle2, Terminal as TerminalIcon, Coins, History, Activity, Zap, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CHIEF_PROTOCOLS, AGENT_PROTOCOLS } from "@/data/orchestrator-constants";
import { tokens as runtimeTokens } from "@/lib/tokens";

// MASTER KADRO
interface AgentInfo {
  name: string;
  skills: string[];
}

interface ProtocolStep {
  id?: string;
  status?: string;
  desc?: string;
  label?: string;
}

interface ActiveWorkflow {
  name?: string;
  activeAgentId?: string | null;
  pipeline?: ProtocolStep[];
  step?: number;
}

interface LiveTerminalState {
  agent?: string;
  timestamp?: string;
  content?: string;
}

const MASTER_ROSTER: Record<string, AgentInfo> = {
  "chief-agent": { name: "@Chief-Agent", skills: ["Gemini 3.1 Pro", "Orkestrasyon", "Denetim"] },
  "brand-expert": { name: "@Brand-Expert", skills: ["Marka Sesi", "Kurumsal Dil", "Strateji"] },
  "content-seo-lead": { name: "@Content-SEO-Lead", skills: ["SEO Mimari", "Semantik HTML", "Meta Veri"] },
  "ui-ux-architect": { name: "@UI-UX-Architect", skills: ["superdesign", "Premium UI", "Bento Grid"] },
  "design-system-guardian": { name: "@Design-System-Guardian", skills: ["Design Tokens", "Erişilebilirlik", "Desenler"] },
  "motion-master": { name: "@Motion-Master", skills: ["Framer Motion", "Micro-etkileşim", "SVG Animasyon"] },
  "next-code-master": { name: "@Next-Code-Master", skills: ["Next.js 15", "TypeScript", "App Router"] },
  "qa-engineer": { name: "@QA-Engineer", skills: ["Performans Testi", "Lighthouse", "Denetim"] }
};

const DataParticleEdge = ({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, data }: EdgeProps) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const isActive = data?.status === 'active';
  const isCompleted = data?.status === 'completed';

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{
        ...style,
        stroke: isCompleted ? runtimeTokens.colors.accent.emeraldBase : isActive ? runtimeTokens.colors.accent.blueBase : runtimeTokens.colors.accent.slateBase,
        strokeWidth: isActive ? 3 : 1,
        opacity: isCompleted || isActive ? 0.8 : 0.05,
        transition: 'all 0.5s ease'
      }} />
      {isActive && (
        <circle r="3" fill={runtimeTokens.colors.accent.blueBase}>
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
    </>
  );
};

const initialNodes: Node[] = Object.keys(MASTER_ROSTER).map((id, idx) => ({
  id,
  type: "agentNode",
  position: { x: 50, y: 100 + (idx * 130) },
  data: { ...MASTER_ROSTER[id], status: "idle", cost: "$0.00", time: "00:00" }
}));

const nodeTypes = { agentNode: AgentNode };
const edgeTypes = { dataParticle: DataParticleEdge };

export default function OrchestratorPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [activeWorkflow, setActiveWorkflow] = useState<ActiveWorkflow | null>(null);
  const [totalCost, setTotalCost] = useState<string>("$0.00");
  const [chiefProtocol, setChiefProtocol] = useState<ProtocolStep[]>([]);
  const [agentProtocols, setAgentProtocols] = useState<Record<string, ProtocolStep[]>>({});
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [liveTerminal, setLiveTerminal] = useState<LiveTerminalState | null>(null);
  const [workflowSteps, setWorkflowSteps] = useState<ProtocolStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/orchestrator-state");
        if (!response.ok) return;
        const data = await response.json();
        
        setLastUpdate(data.lastUpdated);
        setActiveWorkflow(data.activeWorkflow);
        
        // Handle new consolidated schema if it exists
        if (data.activeWorkflow && typeof data.activeWorkflow === 'object') {
          setTotalCost(data.governance?.totalProjectCost || "$0.00");
          setActiveAgentId(data.activeWorkflow.activeAgentId);
          setWorkflowSteps(data.activeWorkflow.pipeline || []);
          setCurrentStep(data.activeWorkflow.step || 0);
        } else {
          // Fallback for old schema
          setTotalCost(data.totalProjectCost || "$0.00");
          setActiveAgentId(data.activeAgentId);
          setWorkflowSteps(data.workflowSteps || []);
          setCurrentStep(data.currentStep || 0);
        }

        setChiefProtocol(data.chiefProtocol || []);
        setAgentProtocols(data.agentProtocols || {});
        setLiveTerminal(data.liveTerminal);

        setNodes((currentNodes) => 
          currentNodes.map((node) => {
            const stateNodes = data.nodes || [];
            const stateNode = stateNodes.find((n: { id: string }) => n.id === node.id);
            const masterData = MASTER_ROSTER[node.id];
            return { ...node, data: { ...masterData, ...stateNode?.data, id: node.id } };
          })
        );

        const mappedEdges = (data.edges || []).map((edge: { status?: string; [key: string]: unknown }) => ({
          ...edge,
          type: 'dataParticle',
          data: { status: edge.status },
          markerEnd: { type: MarkerType.ArrowClosed, color: edge.status === 'completed' ? runtimeTokens.colors.accent.emeraldBase : edge.status === 'active' ? runtimeTokens.colors.accent.blueBase : runtimeTokens.colors.accent.slateBase }
        }));
        setEdges(mappedEdges);
      } catch (error) {
        console.error("Sync error:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-(--color-surface-base) overflow-hidden text-white font-mono flex flex-col selection:bg-blue-500/30">
      
      {/* HEADER */}
      <header className="h-14 shrink-0 border-b border-white/5 bg-(--color-surface-elevated-solid)/80 backdrop-blur-3xl flex items-center justify-between px-8 z-[130] relative">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 rounded bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"><Cpu size={16} /></div>
          <h1 className="text-xs font-black tracking-widest uppercase italic">SC <span className="text-blue-500 not-italic">Orkestra</span> <span className="text-[9px] text-slate-500 font-bold ml-2">PRO v4.3</span></h1>
        </div>

        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-tighter">
          <div className="flex items-center gap-2 bg-yellow-500/5 border border-yellow-500/20 px-3 py-1 rounded-md"><Coins size={12} className="text-yellow-500" /><span>Bütçe: {totalCost}</span></div>
          <div className="flex items-center gap-3 bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20">
            <Radio size={12} className="text-blue-400 animate-pulse" />
            <span>
              {activeWorkflow?.name || "Sistem Beklemede"}
            </span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-8 text-emerald-400 font-bold tabular-nums tracking-widest">{lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : "00:00:00"}</div>
        </div>
      </header>

      <div className="flex-1 flex relative overflow-hidden z-10">
        
        {/* SIDEBARS - THE HACKER PROTOCOL (Dikey Ray ve İnce Hatlar) */}
        <div className="flex shrink-0 h-full z-[120]">
          
          {/* LEVEL 1: ŞEF PROTOKOLÜ */}
          <aside className="w-64 border-r border-white/5 bg-(--color-surface-elevated-solid)/95 backdrop-blur-3xl flex flex-col p-8 overflow-y-auto no-scrollbar relative">
            <div className="flex items-center gap-3 mb-12 text-blue-400 opacity-40">
              <Zap size={14} className="fill-current" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Şef Sistemi</h2>
            </div>

            {/* Dikey Ray (Timeline Line) */}
            <div className="absolute left-10 top-24 bottom-12 w-[1px] bg-white/5" />

            <div className="space-y-10 relative">
              {CHIEF_PROTOCOLS.map((step) => {
                const liveStep = (chiefProtocol || []).find(s => s.id === step.id);
                const status = liveStep?.status || 'idle';
                const isActive = status === 'active';
                const isSuccess = status === 'success';
                const description = liveStep?.desc || step.desc;

                return (
                  <div key={step.id} className="relative flex items-start gap-6 group">
                    {/* Node Dot */}
                    <div className={`mt-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-700 
                      ${isActive ? 'bg-blue-500 border-blue-400 shadow-[0_0_15px_#3B82F6]' : 
                        isSuccess ? 'bg-emerald-500 border-emerald-400' : 'bg-(--color-surface-base) border-white/10'}`}>
                      {isSuccess && <CheckCircle2 size={8} className="text-white" />}
                      {isActive && <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>

                    <div className={`flex flex-col gap-1.5 transition-all duration-500 ${isActive ? 'opacity-100 scale-105' : isSuccess ? 'opacity-90' : 'opacity-40'}`}>
                      <span className={`text-[11px] font-black tracking-widest uppercase ${isActive ? 'text-blue-400' : isSuccess ? 'text-emerald-400' : 'text-slate-400'}`}>{step.label}</span>
                      <p className={`text-[10px] leading-relaxed font-bold ${isActive ? 'text-white' : isSuccess ? 'text-slate-300' : 'text-slate-500'}`}>{description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* LEVEL 2: UZMAN DENETİMİ */}
          <AnimatePresence mode="wait">
            {activeAgentId && agentProtocols[activeAgentId] && (
              <motion.aside key={activeAgentId} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="w-64 border-r border-white/5 bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl flex flex-col p-8 overflow-y-auto no-scrollbar relative shadow-2xl">
                <div className="flex items-center gap-3 mb-12 text-emerald-400 opacity-40">
                  <BrainCircuit size={14} className="fill-current" />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Uzman Günlüğü</h2>
                </div>

                <div className="absolute left-10 top-24 bottom-12 w-[1px] bg-white/5" />

                <div className="space-y-10 relative">
                  {(AGENT_PROTOCOLS[activeAgentId] || []).map((step, i) => {
                    const liveSteps = agentProtocols[activeAgentId] || [];
                    const liveStep = liveSteps[i];
                    const status = liveStep?.status || 'idle';
                    const isActive = status === 'active';
                    const isSuccess = status === 'success';

                    return (
                      <div key={i} className="relative flex items-start gap-6 group">
                        <div className={`mt-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-700 
                          ${isActive ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_15px_#10B981]' : 
                            isSuccess ? 'bg-emerald-500 border-emerald-400' : 'bg-(--color-surface-base) border-white/10'}`}>
                          {isSuccess && <CheckCircle2 size={8} className="text-white" />}
                          {isActive && <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <div className={`flex flex-col gap-1.5 transition-all duration-500 ${isActive ? 'opacity-100 scale-105' : isSuccess ? 'opacity-90' : 'opacity-40'}`}>
                          <span className={`text-[11px] font-black tracking-widest uppercase ${isActive ? 'text-emerald-400' : isSuccess ? 'text-emerald-400' : 'text-slate-400'}`}>{step.label}</span>
                          <p className={`text-[10px] leading-relaxed font-bold ${isActive ? 'text-white' : isSuccess ? 'text-slate-300' : 'text-slate-500'}`}>{liveStep?.desc || step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>

        {/* TUVAL */}
        <main className="flex-1 relative z-10 min-h-0 bg-transparent">
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView minZoom={0.1} maxZoom={1.5} className="bg-transparent">
            <Background variant={BackgroundVariant.Dots} color="rgba(255,255,255,0.03)" gap={40} size={1} />
          </ReactFlow>
        </main>

        {/* TERMINAL */}
        <aside className="w-[450px] shrink-0 border-l border-white/5 bg-(--color-surface-base)/98 backdrop-blur-3xl z-[120] flex flex-col relative overflow-hidden">
          <div className="h-14 border-b border-white/10 bg-white/2 flex items-center justify-between px-8">
            <div className="flex items-center gap-3">
              <TerminalIcon size={16} className="text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Live Operations Terminal</span>
            </div>
          </div>
          <div className="flex-1 p-10 text-[12px] overflow-y-auto no-scrollbar relative z-10">
            {liveTerminal ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                  <div className="flex items-center gap-3 text-blue-400 font-black"><Activity size={14} className="animate-spin" /><span className="uppercase tracking-widest">{liveTerminal.agent}</span></div>
                  <span className="text-slate-500 text-[10px] font-bold">{liveTerminal.timestamp}</span>
                </div>
                <pre className="text-emerald-400 leading-loose font-black selection:bg-emerald-500/30 whitespace-pre-wrap">{liveTerminal.content}</pre>
                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2.5 h-5 bg-emerald-500 shadow-[0_0_15px_#10B981] inline-block align-middle ml-1" />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center space-y-8">
                <div className="w-24 h-24 rounded-4xl bg-white/5 border border-white/10 flex items-center justify-center"><History size={48} strokeWidth={1} /></div>
                <p className="uppercase tracking-[0.5em] font-black text-xs">Waiting for Signal...</p>
              </div>
            )}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,118,0.03))] bg-[length:100%_4px,4px_100%] opacity-20" />
        </aside>
      </div>

      {/* FOOTER PİPELİNE */}
      <footer className="h-[80px] shrink-0 border-t border-white/5 bg-(--color-surface-elevated-solid) z-[130] flex items-center justify-center px-12 relative shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8 min-w-max mx-auto h-full">
          {workflowSteps.map((step, idx) => {
            const isCompleted = idx < currentStep - 1;
            const isActive = idx === currentStep - 1;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center justify-center gap-2 h-full">
                  <motion.div animate={isActive ? { scale: [1, 1.1, 1] } : {}} transition={{ repeat: Infinity, duration: 2 }} className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-700 ${isCompleted ? 'bg-emerald-500 border-emerald-400 text-white' : isActive ? 'bg-blue-600 border-blue-400 text-white shadow-2xl scale-110' : 'bg-white/2 border-white/10 text-slate-600'}`}>
                    {isCompleted ? <CheckCircle2 size={12} /> : <span className="text-[10px] font-black">{idx + 1}</span>}
                  </motion.div>
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-700 ${isActive ? 'text-blue-400 underline underline-offset-4' : isCompleted ? 'text-emerald-500' : 'text-slate-700'}`}>{step.label}</span>
                </div>
                {idx < workflowSteps.length - 1 && <div className="w-12 h-px bg-white/5" />}
              </React.Fragment>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
