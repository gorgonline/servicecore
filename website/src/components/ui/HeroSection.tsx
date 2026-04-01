"use client";

import { motion, Variants, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Workflow, Layers, ShieldCheck } from "lucide-react";
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
          className="flex flex-col gap-6 lg:col-span-7 xl:col-span-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md">
            <span 
              className="flex h-2 w-2 rounded-full animate-ping" 
              style={{ backgroundColor: tokens.colors.brand.primary }}
            />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-(--color-text-overline)">Kurumsal Orkestrasyon Platformu</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 w-full max-w-[900px]">
            ITSM ve Proje Yönetimini tek platformda{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-brand-primary) to-(--color-brand-accent)">
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
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="h-14 px-8 rounded-full bg-white/5 border border-white/10 font-medium cursor-pointer"
            >
              Platformu Keşfet
            </motion.button>
          </motion.div>
        </motion.div>
        {/* Right Visual Area (Glassmorphism Bento Grid) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full hidden lg:flex items-center justify-center lg:justify-end xl:col-span-4 lg:col-span-5 relative mt-10 lg:mt-0"
        >
          <div className="relative w-full max-w-[500px] h-[500px] flex flex-col justify-between">
            
            {/* Background Connection Lines */}
            <motion.svg 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute inset-0 w-full h-full pointer-events-none -z-10" 
              viewBox="0 0 500 500" 
              preserveAspectRatio="none"
            >
              {/* Path from ITSM (top-right) to Center */}
              <path d="M 380 120 L 250 250" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              {/* Animated Flow ITSM -> Center */}
              <motion.path 
                d="M 380 120 L 250 250" 
                stroke={tokens.colors.brand.primary} 
                strokeWidth="4" 
                strokeDasharray="10 10"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />

              {/* Path from PM (bottom-left) to Center */}
              <path d="M 120 380 L 250 250" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              {/* Animated Flow Center -> PM */}
              <motion.path 
                d="M 250 250 L 120 380" 
                stroke={tokens.colors.brand.secondary} 
                strokeWidth="4" 
                strokeDasharray="10 10"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </motion.svg>

            {/* Main Glass Card (ITSM) - Top Right */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.4 },
                x: { duration: 0.8, delay: 0.4 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-80 self-end p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${tokens.colors.brand.primary}33`, color: tokens.colors.brand.primary }}
                >
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">BT Hizmet Yönetimi</h3>
                  <p className="text-xs text-(--color-text-secondary)">Aktif Olaylar: 12</p>
                </div>
              </div>
              
              {/* Skeletal Activity UI (ITSM Service Queue) */}
              <div className="w-full h-24 rounded-lg bg-white/5 border border-white/5 p-3 flex flex-col justify-between overflow-hidden relative">
                <div className="flex items-center gap-2 mb-2">
                   <div 
                     className="w-2 h-2 rounded-full animate-pulse" 
                     style={{ backgroundColor: tokens.colors.brand.primary }}
                   />
                   <div className="h-2 w-16 bg-white/20 rounded-full" />
                </div>
                
                {/* Animated Ticket Queue Flow */}
                <div className="flex flex-col gap-3 relative h-full w-full justify-center">
                  {/* Row 1 - Incoming */}
                  <div className="flex items-center gap-2 w-full">
                    <motion.div 
                      key="incoming-dot"
                      animate={{ scale: [0, 1, 1], opacity: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-1.5 h-1.5 rounded-full shrink-0" 
                      style={{ backgroundColor: tokens.colors.brand.primary }}
                    />
                    <motion.div 
                      key="incoming-line1"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="h-1.5 w-10 bg-white/10 rounded-full" 
                    />
                    <motion.div 
                      key="incoming-line2"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="h-1.5 w-5/6 bg-white/20 rounded-full" 
                    />
                  </div>
                  
                  {/* Row 2 - Processing (Changes color) */}
                   <div className="flex items-center gap-2 w-full">
                    <motion.div 
                      key="processing-dot"
                      animate={{ backgroundColor: [tokens.colors.brand.primary, tokens.colors.brand.secondary, tokens.colors.brand.secondary] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                      className="w-1.5 h-1.5 rounded-full shrink-0" 
                    />
                    <div className="h-1.5 w-8 bg-white/10 rounded-full" />
                    <div className="h-1.5 w-full bg-white/20 rounded-full" />
                  </div>

                  {/* Row 3 - Resolved (Fades out) */}
                  <div className="flex items-center gap-2 w-full">
                    <motion.div 
                      key="resolved-dot"
                      animate={{ scale: [1, 1, 0], opacity: [1, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" 
                    />
                    <motion.div 
                      key="resolved-line1"
                      animate={{ opacity: [1, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
                      className="h-1.5 w-12 bg-white/10 rounded-full" 
                    />
                    <motion.div 
                      key="resolved-line2"
                      animate={{ opacity: [1, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
                      className="h-1.5 w-3/4 bg-white/20 rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Exact Center Node - Absolute Positioned within the Flex Parent */}
            <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ duration: 0.5, delay: 0.8, type: "spring", bounce: 0.5 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full shadow-[0_0_40px_rgba(0,112,243,0.8)] z-20"
               style={{ backgroundColor: tokens.colors.brand.primary }}
            >
              <Workflow className="w-8 h-8 text-white" />
            </motion.div>

            {/* Secondary Glass Card (Project Management) - Bottom Left */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.6 },
                y: { duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-80 self-start p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10"
            >
               <div className="flex items-center gap-4 mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${tokens.colors.brand.secondary}33`, color: tokens.colors.brand.secondary }}
                >
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Proje Yönetimi</h3>
                  <p className="text-xs text-(--color-text-secondary)">Sprint 42 - Yolunda</p>
                </div>
              </div>
              
              {/* Project Management Animated Gantt Chart UI */}
              <div className="w-full flex flex-col gap-3 mt-4">
                <div className="w-full h-4 rounded-full bg-white/10 relative overflow-hidden">
                  <motion.div 
                     initial={{ width: "20%" }}
                     animate={{ width: "80%" }}
                     transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                     className="absolute left-0 top-0 h-full rounded-full"
                     style={{ backgroundColor: tokens.colors.brand.secondary }}
                  />
                </div>
                <div className="w-full h-4 rounded-full bg-white/10 relative overflow-hidden">
                  <motion.div 
                     initial={{ left: "10%", width: "40%" }}
                     animate={{ left: "40%", width: "50%" }}
                     transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                     className="absolute top-0 h-full rounded-full"
                     style={{ backgroundColor: tokens.colors.brand.secondary }}
                  />
                </div>
                <div className="w-full h-4 rounded-full bg-white/10 relative overflow-hidden">
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
