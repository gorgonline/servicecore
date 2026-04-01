"use client";

import React, { useState, useMemo } from "react";
import { 
  ShieldCheck, 
  Cpu, 
  Calendar, 
  Search, 
  ChevronRight, 
  Zap, 
  History, 
  CheckCircle2, 
  Sparkles, 
  Terminal,
  Filter,
  ArrowUpRight,
  Package,
  Layers,
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import updatesData from "@/data/updates.json";

// Types
interface UpdateItem {
  month: string;
  year: string;
  items: string[];
}

export default function UpdatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Extract all unique years
  const years = useMemo(() => {
    const allYears = updatesData.map(u => u.year);
    return Array.from(new Set(allYears)).sort((a, b) => b.localeCompare(a));
  }, []);

  // Filter logic
  const filteredUpdates = useMemo(() => {
    return updatesData.filter(update => {
      const matchesYear = !selectedYear || update.year === selectedYear;
      const matchesSearch = !searchQuery || 
        update.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
        update.month.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesYear && matchesSearch;
    }).map(update => {
      // If searching, only show matching items
      if (searchQuery) {
        return {
          ...update,
          items: update.items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
        };
      }
      return update;
    }).filter(update => update.items.length > 0);
  }, [searchQuery, selectedYear]);

  // Icon helper based on content
  const getIconForItem = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("mobil uygulama")) return <Smartphone size={14} className="text-(--color-accent-emerald-light)" />;
    if (t.includes("hata") || t.includes("sorun") || t.includes("düzeltildi") || t.includes("giderildi")) return <CheckCircle2 size={14} className="text-(--color-accent-blue-light)" />;
    if (t.includes("performans") || t.includes("iyileştirildi")) return <Zap size={14} className="text-yellow-400" />;
    if (t.includes("eklendi") || t.includes("yeni")) return <Sparkles size={14} className="text-(--color-accent-purple-light)" />;
    if (t.includes("rapor") || t.includes("grafik")) return <Layers size={14} className="text-pink-400" />;
    return <Package size={14} className="text-(--color-text-secondary)" />;
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) text-white font-sans selection:bg-blue-500/30">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        
        {/* HEADER SECTION */}
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light) shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <History size={20} />
            </div>
            <span className="text-xs font-black tracking-[0.3em] uppercase text-blue-500/80">Sistem Protokolleri</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8"
          >
            Güncelleme <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-brand-primary) to-(--color-brand-accent)">logları</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-(--color-text-secondary) max-w-2xl text-base font-medium leading-relaxed"
          >
            Servicecore ITSM Suite için yayınlanan en son özellikler, kritik hata düzeltmeleri ve sistem iyileştirmelerini buradan takip edebilirsiniz.
          </motion.p>
        </header>

        {/* CONTROLS */}
        <div className="sticky top-8 z-[100] mb-12 flex flex-col md:flex-row gap-4 p-2 bg-(--color-surface-elevated-solid)/80 backdrop-blur-2xl border border-white/5 rounded-2xl shadow-2xl">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-muted) group-focus-within:text-(--color-accent-blue-light) transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Güncelleme ara (örn: mobil, rapor, hata...)" 
              className="w-full bg-white/5 border border-white/5 focus:border-blue-500/50 rounded-xl py-3 pl-12 pr-4 outline-none transition-all font-medium text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <button 
              onClick={() => setSelectedYear(null)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${!selectedYear ? 'bg-(--color-accent-blue-base) text-white border-blue-400 shadow-lg shadow-blue-500/20' : 'bg-white/5 text-(--color-text-secondary) border-white/5 hover:bg-white/10'}`}
            >
              Tümü
            </button>
            {years.map(year => (
              <button 
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${selectedYear === year ? 'bg-(--color-accent-blue-base) text-white border-blue-400 shadow-lg shadow-blue-500/20' : 'bg-white/5 text-(--color-text-secondary) border-white/5 hover:bg-white/10'}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* TIMELINE */}
        <div className="space-y-32 relative">
          
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 via-white/5 to-transparent hidden md:block" />

          {filteredUpdates.length === 0 ? (
            <div className="py-40 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6 text-(--color-text-dim)">
                <Filter size={32} />
              </div>
              <h3 className="text-xl font-bold text-(--color-text-secondary)">Sonuç bulunamadı</h3>
              <p className="text-(--color-text-dim) mt-2">Arama kriterlerinize uygun güncelleme kaydı mevcut değil.</p>
            </div>
          ) : (
            filteredUpdates.map((update, idx) => (
              <motion.section 
                key={`${update.month}-${update.year}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-12`}
              >
                
                {/* DATE BADGE */}
                <div className="md:w-1/2 flex flex-col justify-center items-center md:items-end">
                  <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'} gap-2`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-500">{update.year}</span>
                      <div className="h-[1px] w-8 bg-blue-500/30" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white/90">
                      {update.month}
                    </h2>
                  </div>
                </div>

                {/* TIMELINE NODE */}
                <div className="absolute left-[-12px] md:left-1/2 md:-ml-[12px] top-8 w-6 h-6 rounded-full bg-(--color-surface-base) border-4 border-(--color-accent-blue-base) z-20 hidden md:flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                </div>

                {/* CONTENT CARD */}
                <div className="md:w-1/2 w-full">
                  <div className="bg-(--color-surface-elevated-solid)/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden shadow-2xl">
                    {/* Hover Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
                    
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-(--color-text-secondary)">
                          <Terminal size={14} />
                        </div>
                        <span className="text-[10px] font-black tracking-widest uppercase text-(--color-text-muted)">Log Protocol Alpha</span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-(--color-accent-emerald-light) uppercase tracking-widest">
                        Değişiklik Seti
                      </div>
                    </div>

                    <ul className="space-y-6 relative">
                      {update.items.map((item, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-4 group/item"
                        >
                          <div className="mt-1.5 shrink-0 w-5 h-5 rounded-md bg-white/5 border border-white/5 flex items-center justify-center group-hover/item:border-blue-500/30 transition-colors">
                            {getIconForItem(item)}
                          </div>
                          <p className="text-sm md:text-base text-(--color-text-overline) leading-relaxed font-medium group-hover/item:text-white transition-colors">
                            {item}
                          </p>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Footer decoration */}
                    <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter text-(--color-text-muted)">
                        <Cpu size={10} />
                        <span>Sistem Kararlılığı: +12.4%</span>
                      </div>
                      <ArrowUpRight size={14} className="text-blue-500" />
                    </div>
                  </div>
                </div>
              </motion.section>
            ))
          )}
        </div>

        {/* FOOTER */}
        <footer className="mt-60 pt-20 border-t border-white/5 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 mb-8">
            <ShieldCheck size={14} className="text-(--color-accent-blue-light)" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-(--color-accent-blue-light)">Tüm Güncellemeler Denetlendi</span>
          </div>
          <p className="text-(--color-text-muted) text-sm font-medium">© 2026 Servicecore Orkestra. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </div>
  );
}
