"use client";

import { motion, Variants } from "framer-motion";
import {
  User,
  Building2,
  Monitor,
  Layers,
  Rocket,
  HelpCircle,
  Award,
  GraduationCap,
  FileText,
  BookOpen,
  Star,
  BookMarked,
  KanbanSquare,
  ArrowUpRight,
  Download
} from "lucide-react";
import sunumlarData from "@/data/sunumlar.json";

interface Presentation {
  id: string;
  title: string;
  url: string;
  pdf?: string;
  icon: string;
}

const iconsMap: Record<string, React.ElementType> = {
  "user": User,
  "building": Building2,
  "monitor": Monitor,
  "layers": Layers,
  "rocket": Rocket,
  "help-circle": HelpCircle,
  "award": Award,
  "graduation-cap": GraduationCap,
  "file-text": FileText,
  "book-open": BookOpen,
  "star": Star,
  "book-marked": BookMarked,
  "kanban-square": KanbanSquare,
};

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

export function PresentationsGrid() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const presentations = sunumlarData.presentations as Presentation[];

  return (
    <motion.div
      variants={containerVariants}
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {presentations.map((item, idx) => {
        const Icon = iconsMap[item.icon] || FileText;
        const colorSet = accentColors[idx % accentColors.length];
        const hoverGrad = hoverGradients[idx % hoverGradients.length];

        return (
          <motion.div key={item.id} variants={itemVariants} className="h-full">
            <div className="relative h-full flex flex-col p-10 rounded-4xl bg-white/2 border border-white/5 transition-all duration-500 hover:bg-white/4 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden group">

              {/* Background Hover Effects */}
              <div className={`absolute inset-0 bg-linear-to-br ${hoverGrad} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container */}
                <div className={`mb-8 h-16 w-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ease-out ${colorSet}`}>
                  <Icon className="w-8 h-8 stroke-[1.5]" />
                </div>

                {/* Content */}
                <div className="grow">
                  <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight mb-4 group-hover:text-(--color-accent-blue-light) transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Action Links */}
                <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between gap-4">
                  {/* Sunumu Görüntüle (sol) */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/view inline-flex items-center gap-2 text-sm font-medium text-(--color-text-muted) hover:text-(--color-accent-blue-light) transition-colors duration-300 cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <span>Sunumu Görüntüle</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5" />
                  </a>

                  {/* PDF'i İndir (sağ) */}
                  {item.pdf && (
                    <a
                      href={item.pdf}
                      download
                      className="group/dl inline-flex items-center gap-2 text-sm font-medium text-(--color-text-muted) hover:text-white transition-colors duration-300 cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    >
                      <Download className="w-4 h-4 transition-transform duration-300 group-hover/dl:translate-y-0.5" />
                      <span>PDF&apos;i İndir</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
