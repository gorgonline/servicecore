"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, HelpCircle, RefreshCw, FileText, MousePointerClick, CheckCircle2, Box, Settings, BookOpen, Activity, Terminal, LineChart, Store, MessageSquare, Briefcase, TrendingUp, GitMerge, FileSignature, GitBranch, Users, Code, Link, Smartphone, Sliders } from "lucide-react";
import { useState } from "react";
import { tokens as runtimeTokens } from "@/lib/tokens";

// Types for our modules
interface ModuleProps {
  title: string;
  description: string;
  delay?: number;
}

// 1. Olay Yönetimi (Incident Management) - Pulsing Alert to Check
const IncidentModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "20px" }}
      transition={{ duration: 0.4, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) hover:bg-white/4 hover:shadow-(--shadow-glow-primary-hover) hover:border-white/10 [transform:translateZ(0)]"
    >
      {/* Background Gradient */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-500/10 blur-[50px] transition-all duration-500 group-hover:bg-(--color-brand-primary)/20" />

      {/* Icon Area */}
      <div className="mb-6 h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative shadow-inner overflow-hidden">
        <motion.div
           animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            color: isHovered ? runtimeTokens.colors.accent.emeraldBase : runtimeTokens.colors.accent.redBase, // Red to Green
           }}
           transition={{ duration: 0.5 }}
           className="relative z-10"
        >
          {isHovered ? (
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </motion.svg>
          ) : (
             <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             >
                <AlertCircle className="w-7 h-7" />
             </motion.div>
          )}
        </motion.div>
        
        {/* Pulsing rings on hover */}
        <AnimatePresence>
            {isHovered && (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-(--color-brand-secondary)/30"
                />
            )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 2. Problem Yönetimi (Problem Management) - Connecting nodes to root cause
const ProblemModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(234,179,8,0.1)] hover:border-white/10 lg:col-span-2"
    >
      {/* Background Gradient */}
      <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-yellow-500/5 blur-[60px] transition-all duration-500 group-hover:bg-yellow-500/15" />

      {/* Animated Visual Area */}
      <div className="mb-8 flex h-24 items-center gap-6 relative">
          
          {/* Nodes */}
          <div className="flex flex-col gap-3 justify-center z-10 w-8">
            <motion.div 
               animate={{ x: isHovered ? 10 : 0, backgroundColor: isHovered ? "rgba(234,179,8,0.2)" : "rgba(255,255,255,0.1)" }}
               className="w-3 h-3 rounded-full border border-white/20" 
            />
            <motion.div 
               animate={{ x: isHovered ? 15 : 0, backgroundColor: isHovered ? "rgba(234,179,8,0.2)" : "rgba(255,255,255,0.1)" }}
               transition={{ delay: 0.1 }}
               className="w-3 h-3 rounded-full border border-white/20" 
            />
            <motion.div 
               animate={{ x: isHovered ? 5 : 0, backgroundColor: isHovered ? "rgba(234,179,8,0.2)" : "rgba(255,255,255,0.1)" }}
               transition={{ delay: 0.2 }}
               className="w-3 h-3 rounded-full border border-white/20" 
            />
          </div>

          {/* SVG Connecting Lines */}
          <div className="absolute left-6 w-16 h-full z-0 pointer-events-none stroke-white/10 group-hover:stroke-yellow-500/40 transition-colors">
              <svg width="100%" height="100%" className="fill-none stroke-2">
                 <motion.path 
                    d="M 12 24 C 30 24, 40 48, 64 48" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isHovered ? 1 : 0 }}
                 />
                 <motion.path 
                    d="M 12 48 L 64 48" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isHovered ? 1 : 0 }}
                    transition={{ delay: 0.1 }}
                 />
                 <motion.path 
                    d="M 12 72 C 30 72, 40 48, 64 48" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isHovered ? 1 : 0 }}
                    transition={{ delay: 0.2 }}
                 />
              </svg>
          </div>

          {/* Root Cause Node */}
          <motion.div 
             animate={{ 
                scale: isHovered ? [1, 1.1, 1] : 1,
                borderColor: isHovered ? "rgba(234,179,8,0.5)" : "rgba(255,255,255,0.1)"
             }}
             className="ml-auto w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center z-10 shadow-inner"
          >
             <HelpCircle className={`w-6 h-6 transition-colors ${isHovered ? 'text-yellow-500' : 'text-(--color-text-secondary)'}`} />
          </motion.div>

      </div>

      <div className="relative z-10 max-w-sm">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 3. Değişiklik Yönetimi (Change Management) - Approval Pipeline
const ChangeModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(168,85,247,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/10 blur-[50px] transition-all duration-500 group-hover:bg-purple-500/20" />

      {/* Animation Area */}
      <div className="mb-8 w-full h-12 relative flex items-center">
         {/* Baseline track */}
         <div className="absolute left-0 right-0 h-px bg-white/5" />
         
         {/* Progress line */}
         <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-0 h-[2px] bg-linear-to-r from-transparent via-purple-500/50 to-purple-400"
         />

         {/* Checkpoints */}
         <div className="relative z-10 flex w-full justify-between px-2">
            {[0, 1, 2].map((i) => (
                <motion.div 
                   key={i}
                   initial={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
                   animate={{ 
                       backgroundColor: isHovered ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)",
                       borderColor: isHovered ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)" 
                   }}
                   transition={{ delay: isHovered ? i * 0.25 : 0 }}
                   className="h-4 w-4 rounded-full border bg-white shadow-inner flex items-center justify-center"
                />
            ))}
         </div>
         
         {/* Moving Icon */}
         <motion.div
            initial={{ x: 0, opacity: 0.5 }}
            animate={{ 
                x: isHovered ? "calc(100% - 24px)" : 0,
                opacity: isHovered ? 1 : 0.5,
                rotate: isHovered ? 180 : 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-0 w-6 h-6 rounded bg-(--color-surface-elevated-solid) border border-purple-500/40 z-20 flex items-center justify-center text-(--color-accent-purple-light)"
         >
             <RefreshCw className="w-3 h-3" />
         </motion.div>
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 4. Bilgi Yönetimi (Knowledge Management) - Documents grouping
const KnowledgeModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(14,165,233,0.15)] hover:border-white/10"
    >
      <div className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-sky-500/10 blur-[50px] transition-all duration-500 group-hover:bg-sky-500/20" />

      {/* Animation Area */}
      <div className="mb-8 w-16 h-16 relative flex items-center justify-center mx-auto lg:mx-0">
          
          {/* Central Repo */}
          <motion.div 
             animate={{ 
                 scale: isHovered ? 1.1 : 1,
                 borderColor: isHovered ? "rgba(14,165,233,0.5)" : "rgba(255,255,255,0.1)"
              }}
             className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 z-10 flex items-center justify-center text-(--color-text-secondary) group-hover:text-sky-400 shadow-inner "
          >
              <FileText className="w-5 h-5" />
          </motion.div>

          {/* Flying Docs */}
          {[...Array(3)].map((_, i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                animate={{ 
                    opacity: isHovered ? [0, 1, 0] : 0,
                    scale: isHovered ? [0.5, 1, 0.5] : 0.5,
                    x: isHovered ? [(i===0 ? -30 : i===1 ? 30 : 0), 0] : (i===0 ? -30 : i===1 ? 30 : 0),
                    y: isHovered ? [(i===2 ? -30 : i===0 ? 20 : 20), 0] : (i===2 ? -30 : i===0 ? 20 : 20),
                }}
                transition={{ duration: 0.8, ease: "easeIn", delay: isHovered ? i * 0.15 : 0, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                className="absolute w-4 h-4 rounded-sm border border-sky-500/30 bg-sky-500/10 z-0"
             />
          ))}
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// Phase 2 Modules
// -------------------------------------------------------------

// 5. İstek Yönetimi (Request Management) - Cursor clicking a request card
const RequestModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(244,63,94,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-rose-500/10 blur-[50px] transition-all duration-500 group-hover:bg-rose-500/20" />

      {/* Animation Area */}
      <div className="mb-8 w-full h-16 relative flex items-center justify-center">
         {/* Request Button/Card */}
         <motion.div 
            animate={{ 
                backgroundColor: isHovered ? "rgba(244,63,94,0.2)" : "rgba(255,255,255,0.05)",
                borderColor: isHovered ? "rgba(244,63,94,0.5)" : "rgba(255,255,255,0.1)",
                scale: isHovered ? [1, 0.95, 1] : 1
            }}
            transition={{ duration: 0.4 }}
            className="w-24 h-8 rounded border flex items-center justify-center relative z-10"
         >
            <div className="w-12 h-1.5 rounded-full bg-white/20" />
         </motion.div>

         {/* Animated Cursor */}
         <motion.div
            initial={{ x: 30, y: 20, opacity: 0 }}
            animate={{ 
                x: isHovered ? [30, 0, 0] : 30,
                y: isHovered ? [20, 0, 0] : 20,
                opacity: isHovered ? [0, 1, 0] : 0,
                scale: isHovered ? [1, 1, 0.8] : 1
            }}
            transition={{ duration: 1.2, ease: "easeOut", repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
            className="absolute z-20 text-white"
         >
            <MousePointerClick className="w-6 h-6 fill-white stroke-black stroke-2" />
         </motion.div>
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 6. Görev Yönetimi (Task Management) - Checkmarks appearing sequentially
const TaskModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(16,185,129,0.15)] hover:border-white/10 lg:col-span-2"
    >
      <div className="absolute right-20 top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-[50px] transition-all duration-500 group-hover:bg-emerald-500/20" />

      {/* Animation Area */}
      <div className="mb-8 w-full max-w-xs relative flex flex-col justify-center gap-3">
          {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                  <motion.div 
                     animate={{ 
                         borderColor: isHovered ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.1)",
                         backgroundColor: isHovered ? "rgba(16,185,129,0.2)" : "transparent"
                     }}
                     transition={{ delay: isHovered ? i * 0.2 : 0 }}
                     className="w-5 h-5 rounded border border-white/10 flex items-center justify-center shrink-0"
                  >
                      <motion.div
                         initial={{ scale: 0 }}
                         animate={{ scale: isHovered ? 1 : 0 }}
                         transition={{ delay: isHovered ? i * 0.2 : 0, type: "spring" }}
                      >
                         <CheckCircle2 className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      </motion.div>
                  </motion.div>
                  
                  <motion.div 
                     animate={{ opacity: isHovered ? 0.3 : 1 }}
                     transition={{ delay: isHovered ? i * 0.2 : 0 }}
                     className="h-2 rounded-full bg-white/10 w-full relative overflow-hidden"
                  >
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? "100%" : 0 }}
                        transition={{ delay: isHovered ? i * 0.2 : 0, duration: 0.3 }}
                        className="absolute inset-0 bg-white/20"
                     />
                  </motion.div>
              </div>
          ))}
      </div>

      <div className="relative z-10 max-w-sm">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 7. Varlık Yönetimi (Asset Management) - Servers stacking
const AssetModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(249,115,22,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 -bottom-10 h-40 w-40 rounded-full bg-orange-500/10 blur-[50px] transition-all duration-500 group-hover:bg-orange-500/20" />

      {/* Animation Area */}
      <div className="mb-8 w-16 h-20 relative flex flex-col-reverse justify-end gap-1 mx-auto lg:mx-0">
          {[0, 1, 2].map((i) => (
             <motion.div
                key={i}
                initial={{ opacity: 1, y: 0 }}
                animate={{ 
                    y: isHovered ? -(i * 2) : 0,
                    borderColor: isHovered ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.1)",
                    backgroundColor: isHovered ? "rgba(249,115,22,0.05)" : "transparent"
                }}
                transition={{ duration: 0.3, delay: isHovered ? i * 0.1 : 0 }}
                className="w-12 h-4 rounded border border-white/10 bg-white/5 shadow-inner flex items-center justify-between px-1.5 z-10 mx-auto"
             >
                 <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
                 <div className="flex gap-0.5">
                    <div className="w-2 h-1 rounded flex-shrink-0 bg-white/10" />
                    <div className="w-2 h-1 rounded flex-shrink-0 bg-white/10" />
                 </div>
             </motion.div>
          ))}
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: isHovered ? [0, 1, 1, 0] : 0, y: isHovered ? [-20, 0, 0, -20] : -20 }}
             transition={{ duration: 2, ease: "easeInOut", repeat: isHovered ? Infinity : 0 }}
             className="absolute top-0 right-1 text-(--color-accent-orange-light) z-0"
          >
             <Box className="w-3 h-3" />
          </motion.div>
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 8. Servis Konfigürasyon Yönetimi (Service Configuration) - Spinning gear with nodes
const ConfigModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(59,130,246,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-[50px] transition-all duration-500 group-hover:bg-blue-500/20" />

      {/* Animation Area */}
      <div className="mb-8 w-16 h-16 relative flex items-center justify-center mx-auto lg:mx-0">
          
          {/* Central Gear */}
          <motion.div 
             animate={{ rotate: isHovered ? 180 : 0 }}
             transition={{ duration: 1, ease: "easeInOut" }}
             className="z-10 relative bg-(--color-surface-elevated-solid) rounded-full"
          >
             <Settings className="w-8 h-8 text-(--color-accent-blue-light)" />
          </motion.div>

          {/* Orbiting Nodes Lines */}
          <motion.div
             initial={{ rotate: 0 }}
             animate={{ rotate: isHovered ? 90 : 0 }}
             transition={{ duration: 1, ease: "easeInOut" }}
             className="absolute inset-0 pointer-events-none"
          >
             {/* Node 1 */}
             <div className="absolute left-1/2 top-0 w-px h-full bg-blue-500/20" />
             <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rounded-full border border-blue-400/50 bg-(--color-surface-elevated-solid)" />
             <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rounded-full border border-blue-400/50 bg-(--color-surface-elevated-solid)" />

             {/* Node 2 */}
             <div className="absolute top-1/2 left-0 w-full h-px bg-blue-500/20" />
             <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full border border-blue-400/50 bg-(--color-surface-elevated-solid)" />
             <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full border border-blue-400/50 bg-(--color-surface-elevated-solid)" />
          </motion.div>
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// Phase 3 Modules
// -------------------------------------------------------------

// 9. Servis Katalog Yönetimi (Service Catalog) - List of services opening up
const CatalogModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(236,72,153,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-pink-500/10 blur-[50px] transition-all duration-500 group-hover:bg-pink-500/20" />

      {/* Animation Area */}
      <div className="mb-8 w-full h-24 relative flex items-center justify-center">
         {/* Main Book Icon */}
         <motion.div 
            animate={{ 
                y: isHovered ? -15 : 0,
                color: isHovered ? runtimeTokens.colors.accent.pinkLight : runtimeTokens.colors.text.secondary
            }}
            transition={{ duration: 0.4 }}
            className="absolute z-20 bg-(--color-surface-elevated-solid) p-2 rounded-full border border-white/10"
         >
            <BookOpen className="w-8 h-8" />
         </motion.div>

         {/* Menu Items sliding out */}
         {[0, 1].map((i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    y: isHovered ? (i === 0 ? 15 : 35) : 10,
                    scale: isHovered ? 1 : 0.8
                }}
                transition={{ duration: 0.4, delay: isHovered ? (i * 0.1) + 0.1 : 0 }}
                className="absolute z-10 w-32 h-6 rounded bg-white/5 border border-white/10 flex items-center px-2 gap-2 "
             >
                 <div className="w-3 h-3 rounded-full bg-pink-500/30" />
                 <div className="h-1.5 rounded-full bg-white/20 flex-1" />
             </motion.div>
         ))}
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 10. Servis Seviye Yönetimi (Service Level - SLA) - Activity heartbeat staying in bounds
const SLAModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(34,211,238,0.15)] hover:border-white/10 lg:col-span-2"
    >
      <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-[50px] transition-all duration-500 group-hover:bg-cyan-500/20" />

      {/* Animation Area */}
      <div className="mb-8 w-full max-w-sm h-16 relative flex items-center justify-center">
         
         {/* Limits Zones */}
         <div className="absolute top-0 w-full h-[1px] bg-red-500/30 border-t border-dashed border-red-500/50" />
         <div className="absolute bottom-0 w-full h-[1px] bg-red-500/30 border-t border-dashed border-red-500/50" />
         
         {/* Target Zone */}
         <div className="absolute inset-y-2 inset-x-0 bg-cyan-500/5 border-y border-cyan-500/20" />

         {/* Heartbeat Line */}
         <div className="absolute left-0 w-full h-full flex items-center overflow-hidden">
             <motion.svg 
                width="200%" 
                height="100%" 
                viewBox="0 0 200 40" 
                preserveAspectRatio="none" 
                className="fill-none stroke-cyan-400 stroke-2"
                initial={{ x: "0%" }}
                animate={{ x: "-50%" }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
             >
                 <path d="M0,20 L20,20 L25,5 L35,35 L40,20 L60,20 L65,10 L75,30 L80,20 L100,20 L120,20 L125,5 L135,35 L140,20 L160,20 L165,10 L175,30 L180,20 L200,20" />
             </motion.svg>
         </div>
         
         {/* Green SLA Badge */}
         <motion.div 
            animate={{ scale: isHovered ? 1.1 : 1, y: isHovered ? -5 : 0 }}
            className="absolute -top-4 right-0 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-(--color-accent-cyan-light) border border-cyan-500/30 "
         >
            %99.9 UPTIME
         </motion.div>

         {/* Icon */}
         <div className="absolute left-0 z-10 w-8 h-8 rounded-full bg-(--color-surface-elevated-solid) border border-white/10 flex items-center justify-center">
             <Activity className="w-4 h-4 text-(--color-accent-cyan-light)" />
         </div>

      </div>

      <div className="relative z-10 max-w-sm">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 11. Servis Otomasyonu (Service Automation) - Terminal typing commands
const AutomationModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-(--color-surface-elevated-solid)/80 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) hover:bg-(--color-surface-elevated-solid) hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] hover:border-white/10"
    >
      <div className="absolute left-0 bottom-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-[60px] transition-all duration-500 group-hover:bg-emerald-500/20" />

      {/* Animation Area: Terminal Window */}
      <div className="mb-8 w-full max-w-[200px] h-24 rounded-lg bg-(--color-surface-base-dark) border border-white/10 overflow-hidden relative mx-auto lg:mx-0 shadow-inner">
          {/* Mac window dots */}
          <div className="w-full h-5 bg-white/5 flex items-center gap-1.5 px-2">
             <div className="w-2 h-2 rounded-full bg-red-500/50" />
             <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
             <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
          </div>
          
          <div className="p-3 font-mono text-[10px] text-emerald-400/80 leading-relaxed flex flex-col gap-1 items-start">
             <div className="flex items-center gap-2">
                 <span className="text-(--color-text-muted)">$</span>
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? "100%" : 0 }}
                    transition={{ duration: 1, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap"
                 >
                    <span>run automation.sh</span>
                 </motion.div>
             </div>
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ delay: isHovered ? 1.2 : 0, duration: 0.1 }}
                className="text-(--color-text-secondary)"
             >
                 [OK] Process automated
             </motion.div>
             
             {/* Cursor blinking */}
             {isHovered && (
                 <motion.div 
                     animate={{ opacity: [1, 0, 1] }} 
                     transition={{ repeat: Infinity, duration: 0.8 }}
                     className="w-2 h-3 bg-emerald-400/80 mt-1" 
                 />
             )}
          </div>
          <div className="absolute top-1 right-2 text-(--color-text-muted) opacity-50"><Terminal className="w-3 h-3" /></div>
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 12. Ölçüm ve Raporlama (Measurement & Reporting) - Animated Bar Chart
const ReportingModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const bars = [40, 70, 45, 90, 60]; // Initial heights

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(139,92,246,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/10 blur-[50px] transition-all duration-500 group-hover:bg-violet-500/20" />

      {/* Animation Area: Bar Chart */}
      <div className="mb-8 w-24 h-16 relative flex items-end justify-between mx-auto lg:mx-0 border-b border-l border-white/10 px-1 pb-[-1px]">
          
          <div className="absolute -left-6 top-0 w-full h-full flex items-center justify-center pointer-events-none opacity-20">
             <LineChart className="w-16 h-16 text-violet-400" />
          </div>

          {bars.map((height, i) => (
             <motion.div
                key={i}
                initial={{ height: "10%" }}
                animate={{ 
                    height: isHovered 
                        ? `${height + 10}%` // Stable jiggle on hover
                        : `${height}%`,
                    backgroundColor: isHovered && i === 3 ? "rgba(139,92,246,0.8)" : "rgba(139,92,246,0.3)"
                }} 

                transition={{ duration: isHovered ? 0.4 : 0.8, delay: i * 0.1, type: "spring" }}
                className="w-3 rounded-t-sm"
             />
          ))}
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// Phase 4 Modules
// -------------------------------------------------------------

// 13. Self Servis Portal (Self-Service Portal) - Cart/Store interaction
const PortalModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(245,158,11,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-500/10 blur-[50px] transition-all duration-500 group-hover:bg-amber-500/20" />

      {/* Animation Area */}
      <div className="mb-8 w-full h-24 relative flex items-center justify-center">
         <motion.div 
            animate={{ 
                scale: isHovered ? 1.05 : 1,
                rotate: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute z-20 bg-(--color-surface-elevated-solid) p-4 rounded-2xl border border-white/10 shadow-lg"
         >
            <Store className="w-8 h-8 text-amber-500/80" />
         </motion.div>

         {/* Items flying into portal */}
         {[0, 1, 2].map((i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, x: -30, y: 20, scale: 0.5 }}
                animate={{ 
                    opacity: isHovered ? [0, 1, 0] : 0, 
                    x: isHovered ? [ -30, 0 ] : -30,
                    y: isHovered ? [ 20, 0 ] : 20,
                    scale: isHovered ? [0.5, 1, 0.5] : 0.5,
                }}
                transition={{ 
                    duration: 0.8, 
                    delay: isHovered ? (i * 0.3) : 0,
                    repeat: isHovered ? Infinity : 0,
                    repeatType: "loop" 
                }}
                className="absolute z-30 flex items-center justify-center"
             >
                 <div className="w-4 h-4 rounded-sm bg-white border border-white/20 shadow-md" />
             </motion.div>
         ))}
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 14. Etkileşim Yönetimi (Interaction Management) - Chat bubbles
const InteractionModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(59,130,246,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-blue-500/10 blur-[50px] transition-all duration-500 group-hover:bg-blue-500/20" />

      {/* Animation Area: Chat Bubbles */}
      <div className="mb-8 w-full max-w-[150px] mx-auto lg:mx-0 h-24 relative flex flex-col justify-center gap-2">
         
         {/* Bubble 1 (User) */}
         <motion.div 
             animate={{ 
                 x: isHovered ? 5 : 0,
                 scale: isHovered ? 1.05 : 1
             }}
             className="w-3/4 self-end bg-blue-500/20 border border-blue-500/30 rounded-2xl rounded-tr-sm p-3 "
         >
             <div className="w-full h-1.5 bg-blue-400/50 rounded-full mb-2" />
             <div className="w-2/3 h-1.5 bg-blue-400/30 rounded-full" />
         </motion.div>

         {/* Bubble 2 (Agent) */}
         <motion.div 
             initial={{ opacity: 0.5, y: 5 }}
             animate={{ 
                 opacity: isHovered ? 1 : 0.5,
                 y: isHovered ? 0 : 5,
                 x: isHovered ? -5 : 0
             }}
             transition={{ delay: 0.1 }}
             className="w-3/4 self-start bg-slate-800/80 border border-white/10 rounded-2xl rounded-tl-sm p-3  flex gap-2 items-center"
         >
             <MessageSquare className="w-3 h-3 text-(--color-text-secondary) shrink-0" />
             <div className="w-full">
                <div className="w-full h-1.5 bg-slate-500/50 rounded-full mb-2" />
                <div className="w-1/2 h-1.5 bg-slate-500/30 rounded-full" />
             </div>
         </motion.div>

      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 15. Proje Yönetimi (Project Management) - Gantt Chart / Timeline
const ProjectModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(249,115,22,0.15)] hover:border-white/10 lg:col-span-2"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-500/10 blur-[50px] transition-all duration-500 group-hover:bg-orange-500/20" />

      {/* Animation Area: Timeline */}
      <div className="mb-6 w-full max-w-sm h-16 relative flex flex-col justify-center gap-2">
         
         <div className="flex gap-4 items-center">
             <Briefcase className="w-5 h-5 text-(--color-accent-orange-light) opacity-80" />
             <div className="flex-1 space-y-2">
                 {/* Track 1 */}
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div 
                        initial={{ width: "30%" }}
                        animate={{ width: isHovered ? "100%" : "30%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-orange-500/50 rounded-full"
                    />
                 </div>
                 {/* Track 2 */}
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div 
                        initial={{ width: "10%", x: "20%" }}
                        animate={{ width: isHovered ? "60%" : "10%", x: isHovered ? "40%" : "20%" }}
                        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-rose-500/50 rounded-full"
                    />
                 </div>
                 {/* Track 3 */}
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div 
                        initial={{ width: "0%", x: "80%" }}
                        animate={{ width: isHovered ? "20%" : "0%", x: "80%" }}
                        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-yellow-500/50 rounded-full"
                    />
                 </div>
             </div>
         </div>

      </div>

      <div className="relative z-10 max-w-sm">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 16. Sürekli İyileştirme (Continuous Improvement) - Upward trending loop
const ImprovementModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-(--color-surface-elevated-solid) to-(--color-surface-base-dark) border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) hover:bg-white/4 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] hover:border-white/10"
    >
      <div className="absolute left-0 bottom-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-[50px] transition-all duration-500 group-hover:bg-emerald-500/20" />

      {/* Animation Area: Trending Loop */}
      <div className="mb-8 w-24 h-24 relative flex items-center justify-center mx-auto lg:mx-0">
          
          <motion.div 
              animate={{ rotate: isHovered ? 180 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute w-full h-full rounded-full border-2 border-dashed border-white/10" 
          />
          
          <motion.div
             animate={{ 
                 scale: isHovered ? 1.1 : 1,
                 color: isHovered ? runtimeTokens.colors.accent.emeraldLight : runtimeTokens.colors.text.secondary
             }}
             className="relative z-10 bg-(--color-surface-base-dark) p-3 rounded-xl border border-white/10 shadow-lg"
          >
              <TrendingUp className="w-8 h-8" />
          </motion.div>

          {/* Particle dots moving up */}
          {[0, 1, 2].map((i) => (
              <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 10, x: (i - 1) * 15 }}
                 animate={{ 
                     opacity: isHovered ? [0, 1, 0] : 0, 
                     y: isHovered ? -30 : 10,
                 }}
                 transition={{ 
                     duration: 1, 
                     delay: isHovered ? (i * 0.2) : 0,
                     repeat: isHovered ? Infinity : 0
                 }}
                 className="absolute z-20 w-1.5 h-1.5 rounded-full bg-emerald-400"
              />
          ))}
          
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// Phase 5 Modules
// -------------------------------------------------------------

// 17. Sürüm Yönetimi (Release Management) - Merging branches / deployment
const ReleaseModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(168,85,247,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/10 blur-[50px] transition-all duration-500 group-hover:bg-purple-500/20" />

      {/* Animation Area */}
      <div className="mb-8 w-full h-24 relative flex flex-col items-center justify-center">
         <motion.div 
            animate={{ 
                scale: isHovered ? 1.05 : 1,
                y: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute z-20 bg-(--color-surface-elevated-solid) p-3 rounded-full border border-white/10 shadow-lg"
         >
            <GitMerge className="w-6 h-6 text-(--color-accent-purple-light)" />
         </motion.div>

         {/* Deployment packets */}
         {[0, 1].map((i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, x: i === 0 ? -20 : 20 }}
                animate={{ 
                    opacity: isHovered ? [0, 1, 0] : 0, 
                    y: isHovered ? -10 : 30,
                    x: i === 0 ? -5 : 5
                }}
                transition={{ 
                    duration: 1, 
                    delay: isHovered ? (i * 0.4) : 0,
                    repeat: isHovered ? Infinity : 0,
                }}
                className="absolute z-10 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_2px_rgba(168,85,247,0.5)]"
             />
         ))}
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 18. Sözleşme Yönetimi (Contract Management) - Signing document
const ContractModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(20,184,166,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-teal-500/10 blur-[50px] transition-all duration-500 group-hover:bg-teal-500/20" />

      {/* Animation Area: Document and Pen */}
      <div className="mb-8 w-full max-w-[150px] mx-auto lg:mx-0 h-24 relative flex items-center justify-center">
         
         {/* Document */}
         <motion.div 
             animate={{ 
                 rotate: isHovered ? -2 : 0,
                 scale: isHovered ? 1.05 : 1
             }}
             className="w-16 h-20 bg-(--color-surface-elevated-solid) border border-white/10 rounded-sm p-2 flex flex-col gap-1.5 shadow-xl relative z-10"
         >
             <div className="w-full h-1 bg-teal-500/30 rounded-full" />
             <div className="w-3/4 h-1 bg-teal-500/30 rounded-full" />
             <div className="w-full h-1 bg-teal-500/30 rounded-full mt-2" />
             
             {/* Signature Line */}
             <div className="mt-auto flex justify-end">
                <div className="w-1/2 h-[1px] bg-slate-500/50" />
             </div>
             
             {/* Animated Signature */}
             {isHovered && (
                 <motion.svg 
                    className="absolute bottom-2 right-2 w-8 h-4 stroke-teal-400 stroke-[1.5] fill-none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                 >
                    <path d="M2,10 Q5,0 8,8 T15,5 Q20,12 25,2" />
                 </motion.svg>
             )}
         </motion.div>

         <div className="absolute -right-4 bottom-2 z-20"><FileSignature className="w-5 h-5 text-teal-500" /></div>
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 19. İş Akış Yönetimi (Workflow Management) - Connecting nodes
const WorkflowModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(239,68,68,0.15)] hover:border-white/10 lg:col-span-2"
    >
      <div className="absolute left-0 bottom-0 h-40 w-40 rounded-full bg-red-500/10 blur-[50px] transition-all duration-500 group-hover:bg-red-500/20" />

      {/* Animation Area: Workflow Nodes */}
      <div className="mb-6 w-full max-w-sm h-20 relative flex items-center justify-between px-4">
         
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
             <GitBranch className="w-16 h-16 text-red-500" />
         </div>

         {/* Node 1 */}
         <div className="z-10 w-10 h-10 rounded-xl bg-(--color-surface-elevated-solid) border border-red-500/30 flex items-center justify-center relative">
            <div className="w-4 h-4 rounded-sm bg-red-400/50" />
            <motion.div 
               animate={{ scale: isHovered ? [1, 1.5, 1] : 1, opacity: isHovered ? [0.5, 0, 0.5] : 0 }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="absolute inset-0 rounded-xl bg-red-400/20"
            />
         </div>

         {/* Connecting Line 1 */}
         <div className="flex-1 h-[2px] bg-slate-800 relative mx-2">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "100%" : 0 }}
                transition={{ duration: 0.5, ease: "linear" }}
                className="absolute left-0 top-0 h-full bg-red-500"
            />
         </div>

         {/* Node 2 */}
         <div className="z-10 w-10 h-10 rounded-xl bg-(--color-surface-elevated-solid) border border-orange-500/30 flex items-center justify-center relative">
            <div className="w-4 h-4 rounded-full bg-orange-400/50" />
            <motion.div 
               animate={{ scale: isHovered ? [1, 1.5, 1] : 1, opacity: isHovered ? [0.5, 0, 0.5] : 0 }}
               transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
               className="absolute inset-0 rounded-xl bg-orange-400/20"
            />
         </div>

         {/* Connecting Line 2 */}
         <div className="flex-1 h-[2px] bg-slate-800 relative mx-2">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "100%" : 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "linear" }}
                className="absolute left-0 top-0 h-full bg-orange-500"
            />
         </div>

         {/* Node 3 */}
         <div className="z-10 w-10 h-10 rounded-xl bg-(--color-surface-elevated-solid) border border-green-500/30 flex items-center justify-center relative">
            <div className="w-4 h-4 rotate-45 bg-green-400/50" />
            <motion.div 
               animate={{ scale: isHovered ? [1, 1.5, 1] : 1, opacity: isHovered ? [0.5, 0, 0.5] : 0 }}
               transition={{ duration: 1.5, delay: 1, repeat: Infinity }}
               className="absolute inset-0 rounded-xl bg-green-400/20"
            />
         </div>

      </div>

      <div className="relative z-10 max-w-sm">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 20. Müşteri Talep Portalı (Customer Portal) - User community
const CustomerPortalModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(56,189,248,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-500/10 blur-[50px] transition-all duration-500 group-hover:bg-sky-500/20" />

      {/* Animation Area: Users */}
      <div className="mb-8 w-24 h-24 relative flex items-center justify-center mx-auto lg:mx-0">
          
          <motion.div
             animate={{ 
                 scale: isHovered ? 1.05 : 1,
                 y: isHovered ? -5 : 0
             }}
             className="relative z-10 bg-(--color-surface-elevated-solid) p-4 rounded-full border border-sky-500/20 shadow-lg"
          >
              <Users className="w-8 h-8 text-sky-400" />
          </motion.div>

          {/* User network nodes */}
          {[0, 1, 2].map((i) => {
             const angle = (i * 120 * Math.PI) / 180;
             const x = Math.cos(angle) * 35;
             const y = Math.sin(angle) * 35;

             return (
                 <motion.div
                    key={i}
                    animate={{ 
                        opacity: isHovered ? 1 : 0.3, 
                        x: isHovered ? x : 0,
                        y: isHovered ? y : 0,
                        scale: isHovered ? 1 : 0.5
                    }}
                    transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                    className="absolute z-0 w-3 h-3 rounded-full bg-sky-300"
                 />
             );
          })}
          
      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// Phase 6 Modules (Final)
// -------------------------------------------------------------

// 21. Low Code Geliştirme (Low Code Development) - Building blocks
const LowCodeModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(234,179,8,0.15)] hover:border-white/10"
    >
      <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-yellow-500/10 blur-[50px] transition-all duration-500 group-hover:bg-yellow-500/20" />

      {/* Animation Area: Building Blocks Drop */}
      <div className="mb-8 w-full h-24 relative flex items-end justify-center pb-4">
          
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-0 opacity-20 pointer-events-none">
             <Code className="w-8 h-8 text-yellow-500" />
          </div>

          <div className="flex gap-1.5 relative z-10">
              {/* Block 1 */}
              <motion.div
                 animate={{ 
                     y: isHovered ? [0, -10, 0] : 0,
                     rotate: isHovered ? [0, -10, 0] : 0
                 }}
                 transition={{ duration: 0.6, ease: "easeInOut" }}
                 className="w-5 h-5 rounded-sm bg-yellow-400 border border-yellow-300 shadow-sm"
              />
              {/* Block 2 */}
              <motion.div
                 animate={{ 
                     y: isHovered ? [0, -15, 0] : 0,
                     rotate: isHovered ? [0, 10, 0] : 0
                 }}
                 transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
                 className="w-8 h-5 rounded-sm bg-amber-500 border border-amber-400 shadow-sm"
              />
              {/* Block 3 */}
              <motion.div
                 animate={{ 
                     y: isHovered ? [0, -8, 0] : 0,
                     rotate: isHovered ? [0, 5, 0] : 0
                 }}
                 transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                 className="w-4 h-5 rounded-sm bg-orange-500 border border-orange-400 shadow-sm"
              />
          </div>
          
          {/* Base Platform */}
          <div className="absolute bottom-2 w-24 h-1.5 rounded-full bg-white/10" />

      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 22. Entegrasyon Modülü (Integration Module) - API handshake
const IntegrationModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(236,72,153,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-pink-500/10 blur-[50px] transition-all duration-500 group-hover:bg-pink-500/20" />

      {/* Animation Area: API Connection */}
      <div className="mb-8 w-full h-24 relative flex items-center justify-between px-6">
          
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
             <Link className="w-16 h-16 text-pink-500" />
          </div>

          {/* System A */}
          <div className="w-12 h-12 rounded-2xl bg-(--color-surface-elevated-solid) border border-pink-500/30 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
             <span className="text-xs font-bold text-pink-400">API</span>
          </div>

          {/* Connection Lines & Data Transfer */}
          <div className="flex-1 px-2 relative h-[2px]">
              <div className="w-full h-[1px] bg-slate-800 border-t border-dashed border-slate-700 absolute top-1/2 -translate-y-1/2 left-0" />
              
              {/* Moving Payload */}
              <motion.div
                 animate={{ 
                     x: isHovered ? ["0%", "100%", "0%"] : "0%",
                     opacity: isHovered ? [0, 1, 0, 1, 0] : 0
                 }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)] z-20"
              />
          </div>

          {/* System B */}
          <div className="w-12 h-12 rounded-2xl bg-(--color-surface-elevated-solid) border border-fuchsia-500/30 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
             <Box className="w-5 h-5 text-fuchsia-400" />
          </div>

      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 23. Mobil Servis Yönetimi (Mobile Service) - Phone scanning/swiping
const MobileModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(59,130,246,0.15)] hover:border-white/10"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-[50px] transition-all duration-500 group-hover:bg-blue-500/20" />

      {/* Animation Area: Mobile Device */}
      <div className="mb-8 w-full h-24 relative flex items-center justify-center">

          {/* Phone Body */}
          <motion.div
             animate={{ 
                 y: isHovered ? -5 : 0,
                 rotate: isHovered ? [0, -5, 5, 0] : 0
             }}
             transition={{ duration: 0.4 }}
             className="w-12 h-20 bg-(--color-surface-elevated-solid) rounded-lg border-2 border-slate-700/80 p-1 flex flex-col items-center shadow-lg relative z-10 overflow-hidden"
          >
              <div className="w-3 h-1 bg-slate-700 rounded-full mt-0.5" />
              
              {/* Screen Content moving */}
              <div className="w-full flex-1 mt-1 rounded bg-slate-800/50 flex flex-col gap-1 p-1 overflow-hidden relative">
                  <motion.div
                     initial={{ y: 0 }}
                     animate={{ y: isHovered ? -20 : 0 }}
                     transition={{ duration: 1, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
                  >
                     <div className="w-full h-2 bg-blue-500/30 rounded-sm mb-1" />
                     <div className="w-3/4 h-2 bg-slate-600/50 rounded-sm mb-1" />
                     <div className="w-full h-4 bg-slate-600/30 rounded-sm mb-1" />
                     <div className="w-1/2 h-2 bg-slate-600/50 rounded-sm mb-1" />
                     <div className="w-full h-8 bg-blue-500/20 rounded-sm" />
                  </motion.div>

                  {/* Notification dot */}
                  {isHovered && (
                     <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,1)]" />
                  )}
              </div>
          </motion.div>

          <div className="absolute z-0 opacity-40 -ml-8 mt-4">
             <Smartphone className="w-8 h-8 text-blue-500" />
          </div>

      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 24. Yönetici Paneli (Admin Panel) - Sliders / Switches
const AdminModule = ({ title, description, delay = 0 }: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      tabIndex={0}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8  transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-brand-primary) cursor-pointer hover:bg-white/4 hover:shadow-[0_0_30px_-5px_...a(71,85,105,0.3)] hover:border-white/10 lg:col-span-2 md:col-span-2 xl:col-span-1"
    >
      <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-slate-500/10 blur-[50px] transition-all duration-500 group-hover:bg-slate-500/20" />

      {/* Animation Area: Settings Toggles */}
      <div className="mb-8 w-full max-w-[100px] mx-auto lg:mx-0 h-24 relative flex flex-col justify-center gap-2">
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0 opacity-10 pointer-events-none">
              <Sliders className="w-8 h-8 text-(--color-text-secondary)" />
          </div>

          {/* Toggle 1 */}
          <div className="flex items-center justify-between bg-(--color-surface-base-dark)/50 p-1 rounded-full border border-white/5 relative z-10 w-full max-w-[80px]">
             <div className="w-8 h-1 rounded-full bg-slate-700 ml-1.5" />
             <div className="w-6 h-3 rounded-full bg-slate-600 relative overflow-hidden transition-colors duration-300">
                <motion.div 
                   animate={{ 
                       x: isHovered ? 14 : 2,
                       backgroundColor: isHovered ? runtimeTokens.colors.accent.emeraldLight : runtimeTokens.colors.text.secondary
                   }}
                   transition={{ duration: 0.3 }}
                   className="absolute top-[1px] left-0 w-2.5 h-2.5 rounded-full bg-slate-400"
                />
             </div>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between bg-(--color-surface-base-dark)/50 p-1 rounded-full border border-white/5 relative z-10 w-full max-w-[80px] ml-2">
             <div className="w-6 h-1 rounded-full bg-slate-700 ml-1.5" />
             <div className="w-6 h-3 rounded-full bg-slate-600 relative overflow-hidden">
                <motion.div 
                   animate={{ 
                       x: isHovered ? 2 : 14,
                       backgroundColor: isHovered ? runtimeTokens.colors.accent.redBase : runtimeTokens.colors.accent.skyBase
                   }}
                   transition={{ duration: 0.4, delay: 0.1 }}
                   className="absolute top-[1px] left-0 w-2.5 h-2.5 rounded-full bg-sky-400"
                />
             </div>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between bg-(--color-surface-base-dark)/50 p-1 rounded-full border border-white/5 relative z-10 w-full max-w-[80px]">
             <div className="w-10 h-1 rounded-full bg-slate-700 ml-1.5" />
             <div className="w-6 h-3 rounded-full bg-slate-600 relative overflow-hidden">
                <motion.div 
                   animate={{ 
                       x: isHovered ? 14 : 2,
                       backgroundColor: isHovered ? runtimeTokens.colors.accent.purpleBase : runtimeTokens.colors.text.secondary
                   }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                   className="absolute top-[1px] left-0 w-2.5 h-2.5 rounded-full bg-slate-400"
                />
             </div>
          </div>

      </div>

      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// Main Component
// -------------------------------------------------------------
export function ModulesGrid() {
  return (
    <section className="relative w-full py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 text-center">
        
        {/* Header Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10  mb-4">
            <span className="w-2 h-2 rounded-full bg-(--color-brand-primary) animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">İşinizi Kolaylaştıran Modüller</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
            Karmaşık süreçleri <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light) font-bold">otomatikleştirin.</span>
          </h2>
          
          <p className="text-base md:text-lg text-(--color-text-secondary) max-w-2xl mx-auto font-light leading-relaxed">
            Servicecore, karmaşık iş problemlerini çözmek için en iyi yönetim pratiklerini temel alan bir platformdur. Entegre modüllerden oluşan çözümlerimiz, iş modellerinizi optimize etmenize ve daha iyi sonuçlar elde etmenize yardımcı olur.
          </p>
        </motion.div>

        {/* Bento Grid - 24 Modules Packed Densely */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left place-content-center grid-flow-row-dense">
             
             {/* 1. Core ITSM */}
             <IncidentModule 
                title="Olay Yönetimi" 
                description="Tüm olayların kaydedildiği, kategorize edildiği, önceliklendirildiği bu katmanda hızlıca çözüm otomatize edilir." 
                delay={0.1}
             />
             <RequestModule 
                title="İstek Yönetimi" 
                description="Modern ve sezgisel kullanıcı arayüzü ile BT ve BT dışı ihtiyaçlara göre özelleştirilebilir talep yönetimi." 
                delay={0.2}
             />
             <ProblemModule 
                title="Problem Yönetimi" 
                description="Kullanımı kolay yönetim panellerimiz ile Problem Yönetimi sizin için çok kolay olacaktır." 
                delay={0.3}
             />
             <ChangeModule 
                title="Değişiklik Yönetimi" 
                description="Talepler farklı modüllerden entegre edilerek alınmakta ve geriye dönük ilişkiler takip edilebilmektedir." 
                delay={0.4}
             />

             {/* 2. ITOM & Configuration */}
             <AssetModule 
                title="Varlık Yönetimi" 
                description="Tüm süreçlerle entegre bir şekilde kurum içi donanım ve yazılım varlıklarının yaşam döngüsünü modernleştirin." 
                delay={0.5}
             />
             <ConfigModule 
                title="Servis Konfigürasyon" 
                description="Hizmetlerin hangi varlıklardan oluşturulduğu ve hangi konfigürasyonda çalıştığını anlık olarak izleyin." 
                delay={0.6}
             />
             <ReleaseModule 
                title="Sürüm Yönetimi" 
                description="Sürüm ve dağıtımların planlanmasını, test edilmesini destekleyerek hizmet değişikliklerini başarıyla yönetin." 
                delay={0.7}
             />
             <KnowledgeModule 
                title="Bilgi Yönetimi" 
                description="Hem aracılar hem de kullanıcılar için çözümleri ve makaleleri bulmayı ve ilişkilendirmeyi kolaylaştırır." 
                delay={0.8}
             />

             {/* 3. Service Delivery & Quality */}
             <CatalogModule 
                title="Servis Katalog Yönetimi" 
                description="Kullanıcılarınıza birleştirilmiş bir hizmet menüsü sunarak BT tüketimini basitleştirin." 
                delay={0.9}
             />
             <SLAModule 
                title="Servis Seviye Yönetimi" 
                description="SLA taahhütlerinizi güvence altına alın, iş kesintilerini ve sözleşme ihlallerini önleyin." 
                delay={1.0}
             />
             <ContractModule 
                title="Sözleşme Yönetimi" 
                description="Ekipmanlara ait destek sürelerini, SLA'leri, müşteri ve tedarikçi sözleşmelerini yönetin." 
                delay={1.1}
             />
             <TaskModule 
                title="Görev Yönetimi" 
                description="Farklı ekipler arası görev aktarımlarını ve iş takibini şeffaf bir şekilde yönetin." 
                delay={1.2}
             />

             {/* 4. Advanced Governance */}
             <WorkflowModule 
                title="İş Akış Yönetimi" 
                description="Sürükle bırak mantığı ile kurgulanan diyagramlarla tüm işletme süreçlerinizi modelleyin." 
                delay={1.3}
             />
             <ProjectModule 
                title="Proje Yönetimi" 
                description="Portföyler ve programların da izlenebildiği eksiksiz bir proje yönetimi deneyimi yaşayın." 
                delay={1.4}
             />
             <ReportingModule 
                title="Ölçüm ve Raporlama" 
                description="Gerçek zamanlı gösterge tabloları ve özel raporlar ile veriye dayalı kararlar alın." 
                delay={1.5}
             />
             <ImprovementModule 
                title="Sürekli İyileştirme (CSI)" 
                description="Tüm modüllerden gelen verileri kullanarak BT süreçlerinizi sürekli olarak iyileştirin." 
                delay={1.6}
             />
             
             {/* 5. Portals & Communication */}
             <PortalModule 
                title="Self Servis Portal" 
                description="Hizmetlerin bir menüden seçilerek talep edilmesini sağlayıp, ilk temas maliyetini düşürün." 
                delay={1.7}
             />
             <CustomerPortalModule 
                title="Müşteri Talep Portalı" 
                description="Müşterilerin portal üzerinden talep iletebildiği ve memnuniyetlerinin ölçülebildiği platform." 
                delay={1.8}
             />
             <InteractionModule 
                title="Etkileşim Yönetimi" 
                description="Çözüm merkezine gelen bütün çağrıları, sohbetleri ve e-postaları tek ekrandan yönetin." 
                delay={1.9}
             />
             <MobileModule 
                title="Mobil Servis Yönetimi" 
                description="Tüm süreçleri saha ekiplerine sunabilen mobil ITOM uygulaması deneyimi." 
                delay={2.0}
             />

             {/* 6. Automation & Platform Tools */}
             <AutomationModule 
                title="Servis Otomasyonu" 
                description="Kritik öneme sahip olmayan, operasyonel ve tekrarlayan işleri makinelere devredin." 
                delay={2.1}
             />
             <IntegrationModule 
                title="Entegrasyon Modülü" 
                description="Tüm veriler API aracılığıyla dışarı veri aktarabilir ve dışarıdan içeri veri alabilir yapıdadır." 
                delay={2.2}
             />
             <LowCodeModule 
                title="Low Code Geliştirme" 
                description="Form/Süreç Tasarım Aracı sayesinde organizasyon ihtiyaçlarına özel form tasarımları oluşturun." 
                delay={2.3}
             />
             <AdminModule 
                title="Yönetici Paneli" 
                description="Sistemin genel işleyişini optimize eden parametrik yapıya sahip merkezi kontrol paneli." 
                delay={2.4}
             />
        </div>

      </div>
    </section>
  );
}
