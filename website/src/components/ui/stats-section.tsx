"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, LayoutGrid, Server, Link2, Activity } from "lucide-react";

interface AnimatedCounterProps {
  from: number;
  to: number;
}

const AnimatedCounter = ({ from, to }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px", amount: 0.5 });
  
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { 
    damping: 50,
    stiffness: 100,
    mass: 1
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, motionValue, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("tr-TR").format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref}>{Intl.NumberFormat("tr-TR").format(from)}</span>;
};

const STATS_DATA = [
  {
    id: 1,
    icon: <Users className="w-6 h-6 text-(--color-accent-blue-light)" />,
    number: 600000,
    suffix: "+",
    label: "Aktif Kullanıcı",
    accent: "bg-blue-500/10 border-blue-500/20"
  },
  {
    id: 2,
    icon: <LayoutGrid className="w-6 h-6 text-(--color-accent-purple-light)" />,
    number: 24,
    suffix: "",
    label: "Kapsamlı Modül",
    accent: "bg-purple-500/10 border-purple-500/20"
  },
  {
    id: 3,
    icon: <Server className="w-6 h-6 text-(--color-accent-emerald-light)" />,
    number: 1000000,
    suffix: "+",
    label: "Yönetilen Varlık",
    accent: "bg-emerald-500/10 border-emerald-500/20"
  },
  {
    id: 4,
    icon: <Link2 className="w-6 h-6 text-pink-400" />,
    number: 100,
    suffix: "+",
    label: "Hazır Entegrasyon",
    accent: "bg-pink-500/10 border-pink-500/20"
  },
  {
    id: 5,
    icon: <Activity className="w-6 h-6 text-amber-400" />,
    number: 300000,
    suffix: "+",
    label: "Aylık İşlem",
    accent: "bg-amber-500/10 border-amber-500/20"
  }
];

export function StatsSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background styling for breathing room */}
      <div className="absolute inset-0 bg-linear-to-b from-(--color-surface-base) via-(--color-surface-mid-gradient) to-(--color-surface-base) opacity-50" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-12">
          {STATS_DATA.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] ${stat.accent}`}>
                {stat.icon}
              </div>
              
              {/* Number Container */}
              <div className="flex items-baseline gap-1">
                <h4 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-mono">
                  <AnimatedCounter from={0} to={stat.number} />
                </h4>
                <span className="text-2xl font-bold text-(--color-text-secondary)">{stat.suffix}</span>
              </div>
              
              {/* Label Container */}
              <p className="text-xs text-(--color-text-secondary) font-semibold uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
      
      {/* Decorative separators */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
