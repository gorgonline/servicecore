"use client";

import { motion, Variants, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Workflow, Layers, ShieldCheck, Server } from "lucide-react";
import { MeshGradient } from "@paper-design/shaders-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import tokens from "@/data/design-tokens.json";
import { tokens as runtimeTokens } from "@/lib/tokens";

export default function HeroSection() {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  // Use intersection observer to pause the heavy webgl shader when out of view
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { margin: "200px 0px 200px 0px" });

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  useEffect(() => {
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Container variants for staggered entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
  };

  return (
    <section 
      ref={sectionRef} 
      style={{ backgroundColor: tokens.colors.surface.base }}
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden text-white"
    >
      {/* Viewport Shader Background - Absolute instead of fixed to prevent continuous repaint on scroll */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {mounted && isSectionInView && dimensions && !shouldReduceMotion && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              maxPixelCount={1280 * 720}
              minPixelRatio={1}
              colors={runtimeTokens.meshGradient.hero}
              distortion={0.8}
              swirl={0.6}
              speed={0.4}
              grainMixer={0.4}
              grainOverlay={0.1}
              offsetX={0.1}
            />
            {/* Dark Corporate Veil */}
            <div 
              className="absolute inset-0 mix-blend-multiply pointer-events-none" 
              style={{ backgroundColor: `${tokens.colors.surface.base}66` }} // 40% opacity
            />
          </>
        )}
      </div>

      <div className="relative z-10 w-full container mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left Content Area (Text & CTA) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 lg:col-span-6 xl:col-span-7"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md">
            <span 
              className="flex h-2 w-2 rounded-full animate-ping" 
              style={{ backgroundColor: tokens.colors.brand.primary }}
            />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-(--color-text-overline)">Kurumsal Orkestrasyon Platformu</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 w-full max-w-200">
            Servis, Proje ve Varlık Yönetimini tek platformda{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-brand-accent)">
              kusursuzca birleştirin.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg lg:text-xl text-(--color-text-secondary) font-light max-w-xl leading-relaxed">
            ServiceCore, günlük hizmet operasyonları ile uzun vadeli proje teslim süreçlerini tek ve birleşik bir ekosistemde buluşturur.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-6">
            <Link href="/demo">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="h-14 px-8 rounded-full font-medium flex items-center gap-2 group shadow-[0_0_30px_-5px_rgba(0,112,243,0.5)] cursor-pointer"
                style={{ backgroundColor: tokens.colors.brand.primary }}
              >
                Demo Talep Et
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>
            <Link href="/cozumler/itsm">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="h-14 px-8 rounded-full bg-white/5 border border-white/10 font-medium cursor-pointer"
              >
                Platformu Keşfet
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        {/* Right Visual Area (Glassmorphism Bento Grid) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full hidden lg:flex items-center justify-center lg:justify-end xl:col-span-5 lg:col-span-6 relative mt-10 lg:mt-0"
        >
          <div className="relative w-full max-w-125 h-128">

            {/* Background Connection Lines — Triangle: top-left, top-right, bottom-center */}
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute inset-0 w-full h-full pointer-events-none -z-10"
              viewBox="0 0 500 500"
              preserveAspectRatio="none"
            >
              {/* Path from ITSM (top-left) to Center */}
              <path d="M 110 110 L 250 250" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <motion.path
                d="M 110 110 L 250 250"
                stroke={tokens.colors.brand.primary}
                strokeWidth="4"
                strokeDasharray="10 10"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />

              {/* Path from Asset (top-right) to Center */}
              <path d="M 390 110 L 250 250" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <motion.path
                d="M 250 250 L 390 110"
                stroke={tokens.colors.brand.accent}
                strokeWidth="4"
                strokeDasharray="10 10"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />

              {/* Path from PM (bottom-center) to Center */}
              <path d="M 250 400 L 250 250" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <motion.path
                d="M 250 250 L 250 400"
                stroke={tokens.colors.brand.secondary}
                strokeWidth="4"
                strokeDasharray="10 10"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </motion.svg>

            {/* Card 1: Hizmet Yönetimi (ITSM) — Top Left */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.4 },
                x: { duration: 0.8, delay: 0.4 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-0 left-0 w-56 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl z-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: `${tokens.colors.brand.primary}33`, color: tokens.colors.brand.primary }}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Hizmet Yönetimi</h3>
                  <p className="text-[10px] text-(--color-text-secondary)">Aktif Olaylar: 12</p>
                </div>
              </div>

              {/* Compact Ticket Queue */}
              <div className="w-full rounded-lg bg-white/5 border border-white/5 p-2.5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [0, 1, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: tokens.colors.brand.primary }}
                  />
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-1.5 flex-1 bg-white/20 rounded-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ backgroundColor: [tokens.colors.brand.primary, tokens.colors.brand.secondary, tokens.colors.brand.secondary] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                  />
                  <div className="h-1.5 flex-1 bg-white/20 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1, 0], opacity: [1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                  />
                  <motion.div
                    animate={{ opacity: [1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="h-1.5 flex-1 bg-white/20 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 2: Varlık Yönetimi — Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.5 },
                x: { duration: 0.8, delay: 0.5 },
                y: { duration: 6.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-0 right-0 w-56 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl z-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: `${tokens.colors.brand.accent}33`, color: tokens.colors.brand.accent }}
                >
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Varlık Yönetimi</h3>
                  <p className="text-[10px] text-(--color-text-secondary)">Aktif: 248</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/5">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: tokens.colors.brand.accent }}
                    />
                    <div className="h-1.5 flex-1 bg-white/15 rounded-full" />
                    <div className="h-1.5 w-4 bg-white/10 rounded-full" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Center Node — geometric apex of the triangle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring", bounce: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full shadow-[0_0_40px_rgba(0,112,243,0.8)] z-20"
              style={{ backgroundColor: tokens.colors.brand.primary }}
            >
              <Workflow className="w-8 h-8 text-white" />
            </motion.div>

            {/* Card 3: Proje Yönetimi — Bottom Center (triangle apex) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.6 },
                y: { duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl z-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: `${tokens.colors.brand.secondary}33`, color: tokens.colors.brand.secondary }}
                >
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Proje Yönetimi</h3>
                  <p className="text-[10px] text-(--color-text-secondary)">Sprint 42 - Yolunda</p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <div className="w-full h-3 rounded-full bg-white/10 relative overflow-hidden">
                  <motion.div
                    initial={{ width: "20%" }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ backgroundColor: tokens.colors.brand.secondary }}
                  />
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 relative overflow-hidden">
                  <motion.div
                    initial={{ left: "10%", width: "40%" }}
                    animate={{ left: "40%", width: "50%" }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="absolute top-0 h-full rounded-full"
                    style={{ backgroundColor: tokens.colors.brand.secondary }}
                  />
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 relative overflow-hidden">
                  <motion.div
                    initial={{ width: "10%" }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ backgroundColor: tokens.colors.brand.secondary }}
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
