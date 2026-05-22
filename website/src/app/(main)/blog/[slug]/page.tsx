"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Globe,
  RefreshCw,
  Network,
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  Sparkles,
  ExternalLink,
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
    heading: string;
  }
> = {
  blue: {
    card: "from-blue-500/15 to-blue-500/5 border-blue-500/25",
    iconBg: "bg-blue-500/20 border-blue-500/35 text-(--color-accent-blue-light)",
    chip: "bg-blue-500/15 border-blue-500/30 text-(--color-accent-blue-light)",
    glow: "shadow-[0_0_25px_rgba(59,130,246,0.12)]",
    accent: "text-(--color-accent-blue-light)",
    heading: "from-blue-400 to-cyan-400",
  },
  purple: {
    card: "from-purple-500/15 to-purple-500/5 border-purple-500/25",
    iconBg: "bg-purple-500/20 border-purple-500/35 text-(--color-accent-purple-light)",
    chip: "bg-purple-500/15 border-purple-500/30 text-(--color-accent-purple-light)",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.12)]",
    accent: "text-(--color-accent-purple-light)",
    heading: "from-purple-400 to-pink-400",
  },
  emerald: {
    card: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25",
    iconBg: "bg-emerald-500/20 border-emerald-500/35 text-(--color-accent-emerald-light)",
    chip: "bg-emerald-500/15 border-emerald-500/30 text-(--color-accent-emerald-light)",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.12)]",
    accent: "text-(--color-accent-emerald-light)",
    heading: "from-emerald-400 to-cyan-400",
  },
  cyan: {
    card: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25",
    iconBg: "bg-cyan-500/20 border-cyan-500/35 text-(--color-accent-cyan-light)",
    chip: "bg-cyan-500/15 border-cyan-500/30 text-(--color-accent-cyan-light)",
    glow: "shadow-[0_0_25px_rgba(6,182,212,0.12)]",
    accent: "text-(--color-accent-cyan-light)",
    heading: "from-cyan-400 to-blue-400",
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

interface ContentBlock {
  type: string;
  paragraphs?: string[];
  bullets?: string[];
  heading?: string;
  subSections?: {
    subheading: string;
    paragraphs: string[];
    bullets: string[];
  }[];
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = data.posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const Icon = iconMap[post.icon] || BookOpen;
  const tone = toneMap[post.tone] || toneMap.blue;
  const otherPosts = data.posts.filter((p) => p.slug !== slug).slice(0, 3);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      {/* HERO */}
      <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-16 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div
            className={`absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 blur-[120px] rounded-full mix-blend-screen ${
              post.tone === "blue"
                ? "bg-blue-600/20"
                : post.tone === "purple"
                  ? "bg-purple-600/20"
                  : post.tone === "emerald"
                    ? "bg-emerald-600/20"
                    : "bg-cyan-600/20"
            }`}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-4xl">
          {/* Breadcrumb back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-medium text-(--color-text-muted) hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tüm Yazılar</span>
            </Link>
          </motion.div>

          {/* Category + meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6 flex-wrap"
          >
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${tone.chip}`}
            >
              <Icon className="w-3 h-3" />
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-[11px] font-mono text-(--color-text-muted)">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.15]"
          >
            <span
              className={`text-transparent bg-clip-text bg-linear-to-r ${tone.heading}`}
            >
              {post.title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed mb-8"
          >
            {post.subtitle}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10 text-(--color-text-secondary)"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 lg:py-16 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-3xl">
          <motion.article
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-10"
          >
            {(post.content as ContentBlock[]).map((block, i) => {
              if (block.type === "intro") {
                return (
                  <div key={i} className="flex flex-col gap-5">
                    {block.paragraphs?.map((p, j) => (
                      <p
                        key={j}
                        className={`text-(--color-text-secondary) leading-relaxed font-light ${
                          j === 0 ? "text-lg lg:text-xl" : "text-base lg:text-lg"
                        }`}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                );
              }
              if (block.type === "section") {
                return (
                  <div key={i} className="flex flex-col gap-5">
                    {block.heading && (
                      <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight pt-6 border-t border-white/8">
                        {block.heading}
                      </h2>
                    )}
                    {block.paragraphs?.map((p, j) => (
                      <p
                        key={j}
                        className="text-base lg:text-lg text-(--color-text-secondary) leading-relaxed font-light"
                      >
                        {p}
                      </p>
                    ))}
                    {block.bullets && block.bullets.length > 0 && (
                      <ul className="flex flex-col gap-3">
                        {block.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-base text-(--color-text-secondary) font-light leading-relaxed"
                          >
                            <CheckCircle2
                              className={`w-5 h-5 shrink-0 mt-0.5 ${tone.accent}`}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {block.subSections?.map((sub, j) => (
                      <div key={j} className="flex flex-col gap-3 pt-4">
                        <h3 className="text-lg lg:text-xl font-semibold text-white tracking-tight">
                          {sub.subheading}
                        </h3>
                        {sub.paragraphs?.map((p, k) => (
                          <p
                            key={k}
                            className="text-base text-(--color-text-secondary) leading-relaxed font-light"
                          >
                            {p}
                          </p>
                        ))}
                        {sub.bullets && sub.bullets.length > 0 && (
                          <ul className="flex flex-col gap-2 ml-2">
                            {sub.bullets.map((b, k) => (
                              <li
                                key={k}
                                className="flex items-start gap-2 text-sm text-(--color-text-secondary) font-light"
                              >
                                <span className={`mt-1.5 w-1 h-1 rounded-full ${tone.accent} shrink-0`} />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}

            {/* Source link */}
            <div className="pt-8 mt-4 border-t border-white/8">
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-medium ${tone.accent} hover:gap-3 transition-all`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>İlgili ServiceCore modülünü görüntülemek için tıklayınız</span>
              </a>
            </div>
          </motion.article>
        </div>
      </section>

      {/* OTHER POSTS */}
      <section className="py-20 lg:py-24 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-(--color-accent-blue-light)" />
              <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                Diğer Yazılar
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-(--color-text-muted) hover:text-white transition-colors"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <motion.div
            variants={fadeUp}
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
          >
            {otherPosts.map((p) => {
              const PIcon = iconMap[p.icon] || BookOpen;
              const pTone = toneMap[p.tone] || toneMap.blue;
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className={`group block rounded-2xl bg-linear-to-br ${pTone.card} border p-5 hover:-translate-y-1 transition-transform duration-300 ${pTone.glow} flex flex-col gap-3 cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center ${pTone.iconBg}`}
                    >
                      <PIcon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${pTone.chip}`}
                    >
                      {p.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-xs text-(--color-text-muted) font-light line-clamp-2">
                    {p.subtitle}
                  </p>
                  <div
                    className={`flex items-center gap-1.5 text-[11px] font-semibold ${pTone.accent} group-hover:gap-2 transition-all mt-auto pt-2 border-t border-white/5`}
                  >
                    <span>Oku</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      <PrivacyContact />
    </div>
  );
}
