import React from "react";
import { Metadata } from "next";
import { BrainCircuit, Activity, Cpu } from "lucide-react";
import AuditLogWidget from "@/components/ui/AuditLogWidget";

export const metadata: Metadata = {
  title: "ServiceCore Test Odası | Ajan Denetim ve PoW Laboratuvarı",
  description: "ServiceCore'un yeni nesil otonom ajan ekosistemini ve External Auditor denetim mekanizmasını canlı olarak test edin.",
};

export default function TestOdasiPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) text-white py-24 px-8 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black uppercase tracking-widest">
            <Cpu size={14} /> ⚡ Otonom Deneyim Alanı
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8">
            ServiceCore <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-brand-accent)">Test Odası</span>
          </h1>
          <p className="max-w-2xl mx-auto text-(--color-text-secondary) text-lg font-medium leading-relaxed">
            Ajanlar arası protokollerin, PoW (Proof-of-Work) güvenliğinin ve &ldquo;The Polis&rdquo; denetim otoritesinin canlı laboratuvarına hoş geldiniz.
          </p>
        </section>

        {/* BENTO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* WORKFLOW MONITOR */}
          <div className="md:col-span-2 p-10 rounded-[2.5rem] bg-white/2 border border-white/5 backdrop-blur-3xl relative overflow-hidden group hover:border-blue-500/20 transition-all duration-700">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 text-(--color-accent-blue-light)">
                <BrainCircuit size={24} />
                <h2 className="text-xl font-black uppercase tracking-widest">Ajanik İş Akışları</h2>
              </div>
              <Activity size={20} className="text-blue-500/40 animate-pulse" />
            </div>
            <p className="text-(--color-text-secondary) mb-12 leading-relaxed">
              Ajanlar arası protokollerin nasıl çalıştığını ve her adımın nasıl doğrulandığını burada gözlemleyin. Her geçiş bir &ldquo;Sözleşme&rdquo; (Contract) niteliğindedir.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black text-(--color-text-dim) uppercase tracking-widest group-hover:border-blue-500/20 transition-all">
                  Node 0{i}
                </div>
              ))}
            </div>
          </div>

          {/* DİNAMİK AUDIT WIDGET */}
          <AuditLogWidget />

        </section>

      </div>
    </main>
  );
}
