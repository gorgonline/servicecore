"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Play,
  Search,
  Video,
  ChevronRight
} from "lucide-react";
import ServiceCoreHero from "@/components/ui/ServiceCoreHero";
import videosData from "@/data/videos.json";
import { En } from "@/components/ui/En";
import PrivacyContact from "@/components/ui/privacy-contact";

interface VideoItem {
  id: string;
  title: string;
}

export default function VideolarPage() {
  const { hero, categories, videos } = videosData;
  const [activeTab, setActiveTab] = useState("tum");
  const [activeSubTab, setActiveSubTab] = useState("genel");
  const [searchQuery, setSearchQuery] = useState("");

  const allVideos = useMemo(() => {
    const uniqueVideos = new Map<string, VideoItem>();
    Object.values(videos).flat().forEach(v => {
      if (v.id) uniqueVideos.set(v.id, v);
    });
    return Array.from(uniqueVideos.values());
  }, [videos]);

  const filteredVideos = useMemo(() => {
    let currentVideos: VideoItem[] = [];

    if (activeTab === "tum") {
      currentVideos = allVideos;
    } else if (activeTab === "guncel") {
      currentVideos = videos.guncel;
    } else if (activeTab === "teknisyen") {
      currentVideos = videos.teknisyen;
    } else if (activeTab === "admin") {
      const key = `admin_${activeSubTab}` as keyof typeof videos;
      currentVideos = (videos[key] as VideoItem[]) || [];
    }

    if (searchQuery) {
      return currentVideos.filter(v => 
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return currentVideos;
  }, [activeTab, activeSubTab, searchQuery, videos, allVideos]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) text-white selection:bg-blue-500/30">
      
      <ServiceCoreHero 
        title={hero.title}
        highlightedWord="Kütüphanesi"
        subtitle={hero.subtitle}
        badge={hero.stats}
      />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        
        {/* FILTERS & SEARCH */}
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-12">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-white/5 p-1.5 rounded-4xl border border-white/10 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeTab === cat.id 
                    ? "bg-(--color-accent-blue-base) text-white shadow-lg shadow-blue-500/20" 
                    : "text-(--color-text-secondary) hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-muted) group-focus-within:text-(--color-accent-blue-light) transition-colors" />
            <input 
              type="text"
              placeholder="Video ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium text-sm"
            />
          </div>
        </div>

        {/* ADMIN SUB-TABS */}
        <AnimatePresence mode="wait">
          {activeTab === "admin" && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-12 pb-6 border-bottom border-white/5"
            >
              {categories.find(c => c.id === "admin")?.subcategories?.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubTab(sub.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                    activeSubTab === sub.id 
                      ? "bg-blue-500/10 border-blue-500/50 text-(--color-accent-blue-light)" 
                      : "bg-transparent border-white/5 text-(--color-text-muted) hover:border-white/20 hover:text-(--color-text-overline)"
                  }`}
                >
                  {sub.title}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* VIDEOS GRID */}
        <motion.div 
          key={`${activeTab}-${activeSubTab}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, idx) => (
              <motion.a
                key={`${video.id}-${idx}`}
                variants={itemVariants}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-(--color-surface-elevated-solid)/50 border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 hover:bg-(--color-surface-elevated-solid) transition-all duration-500 flex flex-col"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    width={480}
                    height={360}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-(--color-accent-blue-base) flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500 shadow-2xl shadow-blue-500/50">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                    <Video size={12} className="text-(--color-accent-blue-light)" />
                    Video
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-base font-bold text-slate-200 group-hover:text-(--color-accent-blue-light) transition-colors line-clamp-2 leading-snug mb-4">
                    {video.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <En className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted)">ServiceCore Academy</En>
                    <ChevronRight size={16} className="text-(--color-text-dim) group-hover:text-(--color-accent-blue-light) group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.a>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-(--color-text-dim)" />
              </div>
              <h3 className="text-xl font-bold mb-2">Video Bulunamadı</h3>
              <p className="text-(--color-text-secondary) font-light">Arama kriterlerinize uygun video mevcut değil.</p>
            </div>
          )}
        </motion.div>
      </main>

      {/* FOOTER DECORATION */}
      <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <PrivacyContact />
    </div>
  );
}
