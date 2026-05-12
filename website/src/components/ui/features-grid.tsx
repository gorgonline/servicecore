"use client";

import { motion } from "framer-motion";
import {
  FileSignature,
  Users,
  Smartphone,
  LineChart,
  Building2,
  GitBranch,
  Link as LinkIcon,
  Code,
  Sliders,
  Layers,
  CheckCircle2,
  TrendingUp,
  Terminal,
  UserCircle,
  BookOpen,
  Activity,
  Box,
  RefreshCw,
  HelpCircle,
  AlertCircle,
  MessageSquare,
  MousePointerClick,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react";
import featuresData from "@/lib/data/features.json";
import LinkWrapper from "next/link";

const iconsMap: Record<string, React.ElementType> = {
  "Hizmet Masası ve Etkileşim Yönetimi": MessageSquare,
  "Olay Yönetimi": AlertCircle,
  "Problem Yönetimi": HelpCircle,
  "İstek Yönetimi": MousePointerClick,
  "Bilgi ve Doküman Yönetimi": FileText,
  "Değişiklik Yönetimi": RefreshCw,
  "Varlık Yönetimi": Box,
  "Servis Konfigürasyon Yönetimi": Settings,
  "Sürekli İyileştirme": TrendingUp,
  "Servis Katalog Yönetimi": BookOpen,
  "Servis Seviye Yönetimi": Activity,
  "Servis Otomasyonu": Terminal,
  "Raporlama Yönetimi": LineChart,
  "Görev Yönetimi": CheckCircle2,
  "Servis İlişkileri Yönetimi": Users,
  "Agile Proje ve SDLC Yönetimi": Layers,
  "ESM Kurumsal Servis Yönetimi": Building2,
  "Self Servis Portal": UserCircle,
  "Yönetim Paneli": Sliders,
  "Mobil Servis Yönetimi": Smartphone,
  "İş Akışı Yönetimi": GitBranch,
  "Entegrasyon Modülü": LinkIcon,
  "Low Code Geliştirme Modülü": Code,
  "Sözleşme Yönetimi": FileSignature,
  "AI Yol Haritası": Sparkles,
};

// Colors mapping for slightly varied accents based on index
const accentColors = [
  "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/50 group-hover:bg-blue-500/20",
  "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/50 group-hover:bg-purple-500/20",
  "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/20",
  "text-(--color-accent-orange-light) bg-orange-500/10 border-orange-500/20 group-hover:border-orange-500/50 group-hover:bg-orange-500/20",
  "text-pink-400 bg-pink-500/10 border-pink-500/20 group-hover:border-pink-500/50 group-hover:bg-pink-500/20",
  "text-(--color-accent-cyan-light) bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/20",
];

const hoverGradients = [
  "from-blue-500/20 via-transparent to-transparent",
  "from-purple-500/20 via-transparent to-transparent",
  "from-emerald-500/20 via-transparent to-transparent",
  "from-orange-500/20 via-transparent to-transparent",
  "from-pink-500/20 via-transparent to-transparent",
  "from-cyan-500/20 via-transparent to-transparent",
];

interface FeaturesGridProps {
  filterLinks?: string[];
}

export function FeaturesGrid({ filterLinks }: FeaturesGridProps = {}) {
  const visibleFeatures = filterLinks
    ? featuresData.filter((f) => filterLinks.includes(f.link))
    : featuresData;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {visibleFeatures.map((feature, idx) => {
        const Icon = iconsMap[feature.title] || Settings; // Fallback icon
        const colorSet = accentColors[idx % accentColors.length];
        const hoverGrad = hoverGradients[idx % hoverGradients.length];

        return (
          <motion.div key={feature.title} variants={itemVariants} className="h-full">
            <LinkWrapper href={feature.link} className="block h-full focus:outline-none focus:ring-2 focus:ring-(--color-border-active) rounded-3xl">
              <div className="group relative flex flex-col justify-between h-full overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8 transition-all duration-300 hover:bg-white/4 hover:-translate-y-1 hover:shadow-2xl">
                
                {/* Background Hover Gradient */}
                <div className={`absolute inset-0 bg-linear-to-br ${hoverGrad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Area */}
                  <div className={`mb-6 h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ease-out shadow-inner ${colorSet}`}>
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>

                  {/* Content Area */}
                  <div className="grow">
                    <h3 className="mb-3 text-xl font-semibold text-white tracking-tight group-hover:text-(--color-brand-accent) transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed line-clamp-4 group-hover:text-(--color-text-overline) transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Fake "Read more" indicator */}
                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-(--color-text-muted) group-hover:text-(--color-brand-accent) transition-colors duration-300">
                      <span>İncele</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transform transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                  </div>
                </div>
              </div>
            </LinkWrapper>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
