"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { MousePointer2, Layout, Users, Layers, Globe, Settings2, Zap, HeartHandshake, TrendingUp, Shield, Target, type LucideIcon } from "lucide-react";

interface Principle {
  title: string;
  description: string;
}

interface DesignPhilosophyGridProps {
  title: string;
  principles: Principle[];
}

const icons: Record<string, LucideIcon> = {
  "Sezgisel Sadelik": MousePointer2,
  "İşlevsel Estetik": Layout,
  "İnsan + Otomasyon Uyumu": Users,
  "Bütünsel ve Entegre Yaklaşım": Layers,
  "Yerel Gerçeklik + Küresel Standart": Globe,
  "Modülerlik ve Esneklik": Settings2,
  "Hızlı Öğrenme ve Adaptasyon": Zap,
  "Teknisyen Dostu Tasarım": HeartHandshake,
  "Akışlarda Sadelik": TrendingUp,
  "Onay ve Kural Setlerinde İsrafı Önleme": Shield,
  "Sürdürülebilir Konfigürasyon": Settings2,
  "Son Kullanıcıya Empati": Target,
  "Servis Kataloğunda Çeviklik": Zap,
  "Demokratik Yönetim": Users
};

export default function DesignPhilosophyGrid({ title, principles }: DesignPhilosophyGridProps) {
  return (
    <section className="py-24 bg-(--color-surface-base) relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-16 text-center mx-auto md:text-left md:mx-0">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-6"
          >
            {title}
          </motion.h2>
          <div className="h-1 w-16 bg-(--color-accent-blue-base) rounded-full mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, idx) => (
            <PrincipleCard 
              key={idx} 
              principle={principle} 
              index={idx} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({ principle, index }: { principle: Principle; index: number }) {
  const Icon = icons[principle.title] || Shield;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col p-8 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/4 hover:border-white/10 transition-all duration-300 overflow-hidden"
    >
      {/* Icon Area — Micro-animated on hover */}
      <div className="mb-6 w-12 h-12 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-(--color-accent-blue-light) group-hover:border-blue-500/30 group-hover:bg-blue-500/15 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-300 ease-out">
        <Icon size={24} strokeWidth={1.5} />
      </div>

      <div className="relative z-10">
        <h3 className="mb-3 text-xl font-semibold text-white tracking-tight">
          {principle.title}
        </h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {principle.description}
        </p>
      </div>
      
      {/* Disciplined Hover State Line */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-(--color-accent-blue-base) w-0 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}
