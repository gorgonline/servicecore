"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, AlertCircle, XCircle, Terminal } from "lucide-react";

interface LogEntry {
  id: string;
  agent: string;
  status: "success" | "fail" | "warning";
  message: string;
  timestamp: string;
}

const mockLogs: LogEntry[] = [
  { id: "1", agent: "@UI-UX-Architect", status: "success", message: "Design tokens validated.", timestamp: "10:15" },
  { id: "2", agent: "@Next-Code-Master", status: "warning", message: "Hydration mismatch risk detected.", timestamp: "10:22" },
  { id: "3", agent: "@The-Polis", status: "success", message: "PoW Verification Passed.", timestamp: "10:30" }
];

const statusIcons = {
  success: <CheckCircle2 size={14} className="text-(--color-accent-emerald-light)" />,
  warning: <AlertCircle size={14} className="text-yellow-400" />,
  fail: <XCircle size={14} className="text-(--color-accent-red-light)" />
};

export default function AuditLogWidget() {
  return (
    <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-(--color-accent-blue-light) border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <ShieldCheck size={20} />
          </div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white/90">Live Audit Feed</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-[9px] font-black text-(--color-accent-emerald-light) uppercase tracking-widest">
          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          System Verified
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {mockLogs.map((log, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={log.id} 
            className="flex items-start justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors group/item"
          >
            <div className="flex gap-4">
              <div className="mt-1">{statusIcons[log.status]}</div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-blue-400/80 uppercase tracking-tighter">{log.agent}</div>
                <div className="text-[11px] font-medium text-(--color-text-overline) leading-relaxed">{log.message}</div>
              </div>
            </div>
            <div className="text-[9px] font-bold text-(--color-text-dim) group-hover/item:text-(--color-text-secondary) transition-colors">{log.timestamp}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-[9px] font-black text-(--color-text-muted) uppercase tracking-widest">
          <Terminal size={12} />
          Polis ID: #SC-8829-PX
        </div>
        <span className="text-[9px] font-bold text-slate-700 italic">v1.0.0 Stable</span>
      </div>
    </div>
  );
}
