"use client";

import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import { tokens as runtimeTokens } from "@/lib/tokens";
import {
  ShieldCheck,
  LucideIcon,
  Workflow, 
  Layers, 
  Terminal, 
  MonitorCheck, 
  Zap, 
  User,
  Activity,
  CheckCircle2,
  Clock,
  BookOpen,
  Scale,
  Coins,
  Timer,
  BrainCircuit
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "@Chief-Agent": ShieldCheck,
  "@Brand-Expert": User,
  "@Content-SEO-Lead": Workflow,
  "@UI-UX-Architect": Layers,
  "@Motion-Master": Zap,
  "@Next-Code-Master": Terminal,
  "@QA-Engineer": MonitorCheck,
  "@Design-System-Guardian": Scale
};

const statusStyles: Record<string, { border: string, glow: string, dot: string, opacity: string, bg: string }> = {
  active: {
    border: "border-blue-500/40",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    dot: "bg-blue-400",
    opacity: "opacity-100",
    bg: "bg-(--color-surface-elevated-solid)/95"
  },
  success: {
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.1)]",
    dot: "bg-emerald-400",
    opacity: "opacity-100",
    bg: "bg-(--color-surface-elevated-solid)/80"
  },
  idle: {
    border: "border-white/5",
    glow: "",
    dot: "bg-slate-800",
    opacity: "opacity-40",
    bg: "bg-white/[0.01]"
  }
};

const AgentNode = ({ data }: NodeProps) => {
  const Icon = iconMap[data.name as string] || Activity;
  const status = (data.status as string) || "idle";
  const currentStyles = statusStyles[status] || statusStyles.idle;
  const skills = (data.skills as string[]) || [];
  const activeSkill = data.activeSkill as string | null;
  const isActive = status === "active";
  const lessons = ["L1", "L2", "L3", "L4", "L5", "L6", "L7"];

  return (
    <div className="flex items-center gap-8 group font-mono">
      {/* Uzman Kartı - Daha İnce ve Şık */}
      <motion.div
        layout
        className={`relative flex items-center gap-4 p-4 rounded-[1.8rem] border-2 backdrop-blur-3xl min-w-[320px] transition-all duration-700 ${currentStyles.border} ${currentStyles.glow} ${currentStyles.bg} ${currentStyles.opacity}`}
      >
        {/* MALİYET & SÜRE (Mini) */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-(--color-surface-base) border border-blue-500/20">
            <Coins size={10} className="text-yellow-500/80" />
            <span className="text-[8px] font-black text-white/80">{(data.cost as string) || "$0.00"}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-(--color-surface-base) border border-emerald-500/20">
            <Timer size={10} className="text-emerald-500/80" />
            <span className="text-[8px] font-black text-white/80">{(data.time as string) || "00:00"}</span>
          </div>
        </div>

        {/* HATA HAFIZASI (Ultra-Minimalist Enerji Hattı - Canlandırıldı) */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-30">
          {lessons.map((l, i) => (
            <motion.div 
              key={l} 
              animate={isActive ? {
                opacity: [0.1, 1, 0.1],
                backgroundColor: [runtimeTokens.colors.accent.slateBase, runtimeTokens.colors.accent.blueBase, runtimeTokens.colors.accent.slateBase],
                boxShadow: [`0 0 0px ${runtimeTokens.colors.accent.blueBase}`, `0 0 8px ${runtimeTokens.colors.accent.blueBase}`, `0 0 0px ${runtimeTokens.colors.accent.blueBase}`]
              } : { opacity: 0.1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              className="w-[2px] h-2.5 rounded-full"
            />
          ))}
        </div>

        <div className={`p-3 rounded-[1rem] bg-white/5 border border-white/5 ${isActive ? 'text-blue-400' : 'text-slate-600'} transition-all duration-500`}>
          <Icon size={24} />
        </div>
        
        <div className="flex flex-col grow">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-black text-white/90 tracking-tighter uppercase">{data.name as string}</h3>
            <div className={`w-1.5 h-1.5 rounded-full ${currentStyles.dot} ${isActive ? 'animate-pulse shadow-[0_0_8px_#3B82F6]' : ''}`} />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{(data.lastActivity as string) || "IDLE"}</div>
            {isActive && (
              <div className="flex items-center gap-1 text-[8px] font-black text-blue-400/80">
                <BrainCircuit size={8} className="animate-spin" />
                <span>ACTIVE PRO</span>
              </div>
            )}
          </div>
        </div>

        {/* DÜŞÜNCE BALONU - Daha zarif */}
        <AnimatePresence>
          {(isActive || status === 'hovered') && (
            <motion.div 
              initial={{ opacity: 0, y: 5, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.98 }}
              className="absolute left-0 -top-20 pointer-events-none z-50 w-full"
            >
              <div className={`text-white text-[10px] font-bold px-4 py-2.5 rounded-2xl shadow-2xl border leading-relaxed
                ${isActive ? 'bg-(--color-brand-primary) border-white/20' : 'bg-(--color-surface-elevated-solid) border-white/10'}
              `}>
                {(data.task as string) || "..."}
                <div className={`absolute -bottom-2 left-6 w-3 h-3 transform rotate-45 border-r border-b 
                  ${isActive ? 'bg-(--color-brand-primary) border-white/20' : 'bg-(--color-surface-elevated-solid) border-white/10'}
                `} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Handle type="target" position={Position.Left} className="!opacity-0" />
        <Handle type="source" position={Position.Right} className="!opacity-0" />
      </motion.div>

      {/* Yetenek Rayı - Minimalist Nodes */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-[1px] bg-white/10" />
        <div className="flex items-center gap-1.5">
          {skills.map((skill) => {
            const isSkillActive = skill === activeSkill;
            return (
              <div
                key={skill}
                className={`px-2.5 py-1 rounded-md border text-[8px] font-black uppercase tracking-widest transition-all duration-700
                  ${isSkillActive 
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                    : 'bg-white/[0.02] border-white/5 text-slate-700 opacity-40'}
                `}
              >
                {skill}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(AgentNode);
