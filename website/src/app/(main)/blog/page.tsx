"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Globe,
  RefreshCw,
  Network,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  MousePointerClick,
  FileText,
  Box,
  Settings,
  TrendingUp,
  Activity,
  Terminal,
  LineChart,
  CheckCircle2,
  Users,
  Layers,
  Building2,
  UserCircle,
  Sliders,
  Smartphone,
  GitBranch,
  Link2,
  Code,
  FileSignature,
} from "lucide-react";
import data from "@/data/blog.json";
import PrivacyContact from "@/components/ui/privacy-contact";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Globe,
  RefreshCw,
  Network,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  MousePointerClick,
  FileText,
  Box,
  Settings,
  TrendingUp,
  Activity,
  Terminal,
  LineChart,
  CheckCircle2,
  Users,
  Layers,
  Building2,
  UserCircle,
  Sliders,
  Smartphone,
  GitBranch,
  Link2,
  Code,
  FileSignature,
};

const toneMap: Record<
  string,
  {
    card: string;
    iconBg: string;
    chip: string;
    glow: string;
    accent: string;
  }
> = {
  blue: {
    card: "from-blue-500/15 to-blue-500/5 border-blue-500/25",
    iconBg: "bg-blue-500/20 border-blue-500/35 text-(--color-accent-blue-light)",
    chip: "bg-blue-500/15 border-blue-500/30 text-(--color-accent-blue-light)",
    glow: "shadow-[0_0_25px_rgba(59,130,246,0.12)]",
    accent: "text-(--color-accent-blue-light)",
  },
  purple: {
    card: "from-purple-500/15 to-purple-500/5 border-purple-500/25",
    iconBg: "bg-purple-500/20 border-purple-500/35 text-(--color-accent-purple-light)",
    chip: "bg-purple-500/15 border-purple-500/30 text-(--color-accent-purple-light)",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.12)]",
    accent: "text-(--color-accent-purple-light)",
  },
  emerald: {
    card: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25",
    iconBg: "bg-emerald-500/20 border-emerald-500/35 text-(--color-accent-emerald-light)",
    chip: "bg-emerald-500/15 border-emerald-500/30 text-(--color-accent-emerald-light)",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.12)]",
    accent: "text-(--color-accent-emerald-light)",
  },
  cyan: {
    card: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25",
    iconBg: "bg-cyan-500/20 border-cyan-500/35 text-(--color-accent-cyan-light)",
    chip: "bg-cyan-500/15 border-cyan-500/30 text-(--color-accent-cyan-light)",
    glow: "shadow-[0_0_25px_rgba(6,182,212,0.12)]",
    accent: "text-(--color-accent-cyan-light)",
  },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      {/* HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <Sparkles size={14} />
              Blog · ITSM & ITIL4 Yazıları
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              {data.title.split(" ")[0]}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                Blog
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl"
            >
              {data.subtitle}
            </motion.p>
          </div>

          {/* POST GRID */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {data.posts.map((post) => {
              const Icon = iconMap[post.icon] || BookOpen;
              const tone = toneMap[post.tone] || toneMap.blue;
              return (
                <motion.div key={post.slug} variants={fadeUp}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`group block rounded-3xl bg-linear-to-br ${tone.card} border p-6 lg:p-8 hover:-translate-y-1 transition-transform duration-300 ${tone.glow} h-full flex flex-col gap-5 cursor-pointer`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${tone.iconBg}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${tone.chip}`}
                      >
                        {post.category}
                      </span>
                    </div>

                    {/* Title + subtitle */}
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                        {post.subtitle}
                      </p>
                    </div>

                    {/* Excerpt */}
                    <p className="text-[13px] text-(--color-text-muted) font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-(--color-text-secondary)"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/8">
                      <div className="flex items-center gap-3 text-[10px] font-mono text-(--color-text-muted)">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 text-xs font-semibold ${tone.accent} group-hover:gap-2.5 transition-all`}
                      >
                        <span>Oku</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <PrivacyContact />
    </div>
  );
}
