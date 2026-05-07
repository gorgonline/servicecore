"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import {
  ChevronDown,
  ArrowRight,
  ScrollText,
  ShieldCheck,
  FileText,
  Hammer,
  MousePointerClick,
  Activity,
  Box,
  Settings,
  Terminal,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  FileSignature,
  GitBranch,
  Users,
  Smartphone,
  Link as LinkIcon,
  Code,
  Sliders,
  BookOpen,
  LineChart,
  UserCircle,
  TrendingUp,
  Presentation,
  Video,
  GraduationCap,
  BellRing,
  Menu,
  X,
  Layers,
  Target,
  Building2,
  Sparkles,
  Headphones,
  Boxes,
  Truck,
  Search,
  Mic,
  Languages,
  Radar,
  Filter,
  BarChart3,
  Network,
  Merge,
  CalendarClock,
  Eye,
  Heart,
  FileCheck,
  ShieldAlert,
  Clock,
  Package
} from "lucide-react";

// Sıralama ve isimler canli siteyle birebir. Href'ler korundu.
const modules = [
  { name: "Hizmet Masası ve Etkileşim Yönetimi", icon: MessageSquare, desc: "Tüm iletişim kanallarını birleştirin.", href: "/etkilesim-yonetimi" },
  { name: "Olay Yönetimi", icon: AlertCircle, desc: "Hizmet kesintilerini hızla çözün.", href: "/olay-yonetimi" },
  { name: "Problem Yönetimi", icon: HelpCircle, desc: "Kök nedenleri analiz edin.", href: "/problem-yonetimi" },
  { name: "İstek Yönetimi", icon: MousePointerClick, desc: "Kullanıcı taleplerini standartlaştırın.", href: "/istek-yonetimi" },
  { name: "Bilgi ve Doküman Yönetimi", icon: FileText, desc: "Kurumsal hafızayı merkezileştirin.", href: "/bilgi-bankasi" },
  { name: "Değişiklik Yönetimi", icon: RefreshCw, desc: "Riskleri minimize ederek yenilik yapın.", href: "/degisiklik-yonetimi" },
  { name: "Varlık Yönetimi", icon: Box, desc: "Donanım ve yazılım envanterini takip edin.", href: "/varlik-yonetimi" },
  { name: "Discovery", icon: Radar, desc: "Ağ ve varlık keşfi ile envanteri otomatik güncelleyin.", href: "/discovery" },
  { name: "Servis Konfigürasyon Yönetimi", icon: Settings, desc: "Sistem bileşenlerinin haritasını çıkarın.", href: "/servis-konfigurasyon-yonetimi" },
  { name: "Sürekli İyileştirme", icon: TrendingUp, desc: "Hizmet kalitesini her adımda artırın.", href: "/surekli-iyilestirme" },
  { name: "Servis Katalog Yönetimi", icon: BookOpen, desc: "Kullanıcılara hizmet menüsü sunun.", href: "/servis-katalog-yonetimi" },
  { name: "Servis Seviye Yönetimi", icon: Activity, desc: "SLA taahhütlerinizi güvenceye alın.", href: "/servis-seviye-yonetimi" },
  { name: "Servis Otomasyonu", icon: Terminal, desc: "Tekrarlayan işleri makinelere devredin.", href: "/servis-otomasyonu" },
  { name: "Raporlama Yönetimi", icon: LineChart, desc: "Veriye dayalı kararlar alın.", href: "/raporlama-yonetimi" },
  { name: "Görev Yönetimi", icon: CheckCircle2, desc: "Ekipler arası iş atamalarını izleyin.", href: "/gorev-yonetimi" },
  { name: "Servis İlişkileri Yönetimi", icon: Users, desc: "Müşteri ve servis ilişkilerini uçtan uca yönetin.", href: "/servis-iliskileri-yonetimi" },
  { name: "Agile Proje ve SDLC Yönetimi", icon: Layers, desc: "Agile, Scrum ve stratejik planlama.", href: "/proje-yonetimi" },
  { name: "ESM Kurumsal Servis Yönetimi", icon: Building2, desc: "Departmanlar arası hizmet süreçlerini yönetin.", href: "/esm" },
  { name: "Self Servis Portal", icon: UserCircle, desc: "Kullanıcıların kendi çözümünü bulmasını sağlayın.", href: "/self-servis-portal" },
  { name: "Yönetim Paneli", icon: Sliders, desc: "Sistemin genel işleyişini optimize eden kontrol paneli.", href: "/yonetim-paneli" },
  { name: "Mobil Servis Yönetimi", icon: Smartphone, desc: "Mobil ITOM uygulaması deneyimi.", href: "/mobil-servis-yonetimi" },
  { name: "İş Akışı Yönetimi", icon: GitBranch, desc: "Süreçlerinizi sürükle bırak diyagramlarla modelleyin.", href: "/is-akisi-yonetimi" },
  { name: "Entegrasyon Modülü", icon: LinkIcon, desc: "API aracılığıyla veri alışverişi yapın.", href: "/entegrasyon-yonetimi" },
  { name: "Low Code Geliştirme Modülü", icon: Code, desc: "Özel formlar ve süreç tasarımları oluşturun.", href: "/low-code-gelistirme" },
  { name: "Sözleşme Yönetimi", icon: FileSignature, desc: "SLA'leri ve sözleşmeleri yönetin.", href: "/sozlesme-yonetimi" },
  { name: "AI Yol Haritası", icon: Sparkles, desc: "Yapay zeka destekli otomasyon ve asistanlar.", href: "/ai-yol-haritasi" },
];

const solutionsSubmenu = [
  { name: "ESM", title: "Enterprise Service Management", icon: Building2, desc: "Tüm departmanları aynı servis disiplinine taşıyın.", href: "/cozumler/esm" },
  { name: "ITSM", title: "IT Service Management", icon: Settings, desc: "ITIL4 uyumlu BT operasyon yönetimi.", href: "/cozumler/itsm" },
  { name: "CSS", title: "Customer Service Support", icon: Headphones, desc: "Müşteri taleplerini ve etkileşimi tek panelde.", href: "/cozumler/css" },
  { name: "APM", title: "Agile Project Management", icon: Layers, desc: "Backlog, sprint, kanban ve roadmap yönetimi.", href: "/cozumler/apm" },
  { name: "SDLC", title: "Software Development Lifecycle", icon: Code, desc: "Yazılım yaşam döngüsünün uçtan uca yönetimi.", href: "/cozumler/sdlc" },
  { name: "ITAM", title: "IT Asset Management", icon: Box, desc: "BT varlık ve lisanslarının yaşam döngüsü.", href: "/cozumler/itam" },
  { name: "EAM", title: "Enterprise Asset Management", icon: Boxes, desc: "BT dışı fiziksel varlıkların merkezi yönetimi.", href: "/cozumler/eam" },
  { name: "FSM", title: "Field Service Management", icon: Truck, desc: "Saha ekiplerine mobil iş emri ve rota.", href: "/cozumler/fsm" },
];

const aicoreSubmenu = [
  { name: "Replycore SolveAI", icon: FileText, desc: "Karmaşık ticket konuşmalarını saniyeler içinde özetler.", href: "/aicore/replycore-solve" },
  { name: "Chatcore-SelfAI", icon: MessageSquare, desc: "Doğal dilde son kullanıcı asistanı.", href: "/aicore/chatcore-self" },
  { name: "Classificore ManageAI", icon: Filter, desc: "Otomatik ticket sınıflandırma ve yönlendirme.", href: "/aicore/classificore-manage" },
  { name: "PrioritycoreAI", icon: Target, desc: "Önceliklendiren akıllı karar motoru.", href: "/aicore/prioritycore" },
  { name: "RootCoreAI", icon: Search, desc: "Kayıt ve alarmları akıllıca gruplar.", href: "/aicore/rootcore" },
  { name: "PredicticoreAI", icon: TrendingUp, desc: "SLA ihlallerini önceden tahmin eder.", href: "/aicore/predicticore" },
  { name: "ScoreAI", icon: BarChart3, desc: "Doğal dil ile rapor ve dashboard.", href: "/aicore/score" },
  { name: "KnowCoreAI", icon: BookOpen, desc: "Bilgi bankası içeriği otomatik üretimi.", href: "/aicore/knowcore" },
  { name: "FlowCoreAI", icon: GitBranch, desc: "Metin komutlarıyla iş akışı şeması.", href: "/aicore/flowcore" },
  { name: "DiscoreAI", icon: Network, desc: "Akıllı keşif ve CMDB haritaları.", href: "/aicore/discore" },
  { name: "TranslateAI", icon: Languages, desc: "Anlık çoklu dil çevirisi.", href: "/aicore/translate" },
  { name: "MergeAI", icon: Merge, desc: "Benzer ticket'ları birleştirir.", href: "/aicore/merge" },
  { name: "ProjectplanpredictAI", icon: CalendarClock, desc: "Proje gecikme tahmini.", href: "/aicore/projectplanpredict" },
  { name: "VisicoreAI", icon: Eye, desc: "Ekran görüntülerinden hata tespiti.", href: "/aicore/visicore" },
  { name: "SentimentAI", icon: Heart, desc: "Mesajlardan duygu analizi.", href: "/aicore/sentiment" },
  { name: "KnowcoreAI (Şablon)", icon: FileCheck, desc: "Bilgi bankası içeriklerini şablona uyarlar.", href: "/aicore/knowcore-template" },
  { name: "ToneAI", icon: Mic, desc: "Kurumsal dil standardı denetimi.", href: "/aicore/tone" },
  { name: "ImpacticoreAI", icon: ShieldAlert, desc: "Değişiklik risk seviyesi analizi.", href: "/aicore/impacticore" },
  { name: "ShiftAI", icon: Clock, desc: "Otomatik vardiya planlama.", href: "/aicore/shift" },
  { name: "AuditAI", icon: ShieldCheck, desc: "ITIL ve ISO uyumluluk denetimi.", href: "/aicore/audit" },
  { name: "AssetLifecycleAI", icon: Package, desc: "Cihaz yaşam döngüsü yönetimi.", href: "/aicore/asset-lifecycle" },
];

const plansSubmenu = [
  { name: "ITSM Lisans Seçenekleri", icon: ShieldCheck, desc: "Service Desk, ITIL4 ve ESM için lisans ve modül seçenekleri.", href: "/planlar" },
  { name: "ESM Lisans Seçenekleri", icon: Building2, desc: "Enterprise Service Management lisans ve modül seçenekleri.", href: "/planlar-esm" },
  { name: "CSS Lisans Seçenekleri", icon: Headphones, desc: "Customer Service Support lisans ve modül seçenekleri.", href: "/planlar-css" },
  { name: "FSM Lisans Seçenekleri", icon: Truck, desc: "Field Service Management lisans ve modül seçenekleri.", href: "/planlar-fsm" },
  { name: "Proje Yönetimi Lisans Seçenekleri", icon: Target, desc: "Agile, hibrit ve stratejik proje yönetimi lisans seçenekleri.", href: "/planlar-pm" },
  { name: "Abonelik ve Lisanslama Rehberi", icon: ScrollText, desc: "Roller, edition kuralları, ESM ve add-on lisanslama detayları.", href: "/planlar/lisanslama-rehberi" },
];

const resourcesSubmenu = [
  { name: "Sunumlar", icon: Presentation, desc: "Görsel anlatılar ve ürün demoları.", href: "/sunumlar" },
  { name: "Videolar", icon: Video, desc: "Eğitici ve tanıtıcı video içerikler.", href: "/videolar" },
  { name: "Dökümanlar", icon: FileText, desc: "Teknik dökümanlar ve kılavuzlar.", href: "/dokumanlar" },
  { name: "Blog", icon: Sparkles, desc: "ITIL4, ITSM ve servis yönetimi üzerine yazılar.", href: "/blog" },
  { name: "Kurslar", icon: BookOpen, desc: "Kısa süreli uzmanlık kursları.", href: "/kurslar" },
  { name: "Güncellemeler", icon: BellRing, desc: "Sürüm notları ve inovasyon duyuruları.", href: "/guncellemeler" },
  { name: "Eğitimler", icon: GraduationCap, desc: "Sertifika ve eğitim programları.", href: "/egitimler" },
  { name: "ITIL4 Pratikleri", icon: ScrollText, desc: "ITIL4 yaşam döngüsü ve pratik uygulamaları.", href: "/itil4-pratikleri" },
  { name: "Workshoplar", icon: Hammer, desc: "Uygulamalı atölye çalışmaları ve süreç workshopları.", href: "/workshoplar" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle mobile menu scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // Handle scroll detection for sticky glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-(--color-surface-base) md:bg-(--color-surface-base)/80 backdrop-blur-xl shadow-lg" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg flex items-center justify-center group-hover:drop-shadow-[0_0_15px_rgba(0,112,243,0.5)] transition-all">
            <Image 
              src="/logo-v1.png" 
              alt="ServiceCore" 
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-normal text-white tracking-tight">Service<span className="font-bold text-(--color-brand-primary)">Core</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/ozellikler" className="text-sm font-medium text-(--color-text-overline) hover:text-white transition-colors cursor-pointer">
            Özellikler
          </Link>

          {/* Mega Menu Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveMenu("modules")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-(--color-text-overline) hover:text-white transition-colors py-2 cursor-pointer">
              Modüller
              <motion.div
                animate={{ rotate: activeMenu === "modules" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeMenu === "modules" && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`fixed left-0 right-0 w-screen bg-(--color-surface-elevated-solid)/95 backdrop-blur-2xl border-y border-white/10 px-6 lg:px-12 py-8 shadow-2xl origin-top ${isScrolled ? "top-14" : "top-20"}`}
                >
                  <div className="mx-auto max-w-7xl grid grid-cols-4 gap-x-6 gap-y-4">
                    {modules.map((mod, idx) => {
                      const Icon = mod.icon;
                      return (
                        <Link
                          key={idx}
                          href={mod.href || "#"}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                        >
                          <div className="mt-0.5 p-2 rounded-lg bg-white/5 text-(--color-accent-blue-light) group-hover:bg-(--color-brand-primary) group-hover:text-white transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-0.5 group-hover:text-(--color-brand-primary) transition-colors">{mod.name}</h4>
                            <p className="text-xs text-(--color-text-secondary) leading-snug">{mod.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                     <p className="text-sm text-(--color-text-secondary)">Tüm ekosistemi tek bir platformda yönetin.</p>
                     <Link href="/moduller" className="text-sm font-medium text-(--color-brand-primary) hover:text-(--color-accent-blue-light) flex items-center gap-1 group cursor-pointer">
                        Tüm Modülleri İncele
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Solutions Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("solutions")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-(--color-text-overline) hover:text-white transition-colors py-2 cursor-pointer">
              Çözümler
              <motion.div
                animate={{ rotate: activeMenu === "solutions" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeMenu === "solutions" && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`fixed left-0 right-0 w-screen bg-(--color-surface-elevated-solid)/95 backdrop-blur-2xl border-y border-white/10 px-6 lg:px-12 py-8 shadow-2xl origin-top ${isScrolled ? "top-14" : "top-20"}`}
                  onMouseEnter={() => setActiveMenu("solutions")}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                    {solutionsSubmenu.map((sol, idx) => {
                      const Icon = sol.icon;
                      return (
                        <Link
                          key={idx}
                          href={sol.href}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                        >
                          <div className="mt-0.5 p-2 rounded-lg bg-white/5 text-(--color-accent-purple-light) group-hover:bg-(--color-brand-primary) group-hover:text-white transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-2 mb-0.5">
                              <h4 className="text-sm font-semibold text-white group-hover:text-(--color-brand-primary) transition-colors">{sol.name}</h4>
                              <span className="text-[10px] font-mono text-(--color-text-muted) tracking-wider uppercase truncate">{sol.title}</span>
                            </div>
                            <p className="text-xs text-(--color-text-secondary) leading-snug">{sol.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AICORE Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("aicore")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-(--color-text-overline) hover:text-white transition-colors py-2 cursor-pointer">
              AICORE
              <motion.div
                animate={{ rotate: activeMenu === "aicore" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeMenu === "aicore" && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`fixed left-0 right-0 w-screen bg-(--color-surface-elevated-solid)/95 backdrop-blur-2xl border-y border-white/10 px-6 lg:px-12 py-8 shadow-2xl origin-top ${isScrolled ? "top-14" : "top-20"}`}
                  onMouseEnter={() => setActiveMenu("aicore")}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="mx-auto max-w-7xl">
                    <div className="mb-6 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-accent-purple-light) mb-1">
                          AICORE
                        </div>
                        <h3 className="text-lg font-semibold text-white">Servicecore Yapay Zeka Araç Ailesi</h3>
                      </div>
                      <Link href="/aicore" onClick={() => setActiveMenu(null)} className="text-xs font-medium text-(--color-brand-accent) hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                        Tümünü gör
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                      {aicoreSubmenu.map((tool, idx) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={idx}
                            href={tool.href}
                            onClick={() => setActiveMenu(null)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                          >
                            <div className="mt-0.5 p-2 rounded-lg bg-white/5 text-(--color-accent-purple-light) group-hover:bg-(--color-accent-purple-base) group-hover:text-white transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-semibold text-white mb-0.5 group-hover:text-(--color-accent-purple-light) transition-colors">{tool.name}</h4>
                              <p className="text-xs text-(--color-text-secondary) leading-snug">{tool.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Plans Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("plans")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link
              href="/planlar"
              className="flex items-center gap-1 text-sm font-medium text-(--color-text-overline) hover:text-white transition-colors py-2 cursor-pointer"
            >
              Planlar
              <motion.div
                animate={{ rotate: activeMenu === "plans" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </Link>

            {/* Plans Dropdown */}
            <AnimatePresence>
              {activeMenu === "plans" && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-120 bg-(--color-surface-elevated-solid)/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl origin-top"
                  onMouseEnter={() => setActiveMenu("plans")}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="flex flex-col gap-2">
                    {plansSubmenu.map((plan, idx) => {
                      const Icon = plan.icon;
                      return (
                        <Link
                          key={idx}
                          href={plan.href}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                        >
                          <div className="mt-0.5 p-2 rounded-lg bg-white/5 text-(--color-brand-primary) group-hover:bg-(--color-brand-primary) group-hover:text-white transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-0.5 group-hover:text-(--color-accent-blue-light) transition-colors">{plan.name}</h4>
                            <p className="text-xs text-(--color-text-secondary) leading-snug">{plan.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resources Mega Menu Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveMenu("resources")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-(--color-text-overline) hover:text-white transition-colors py-2 cursor-pointer">
              Kaynaklar
              <motion.div
                animate={{ rotate: activeMenu === "resources" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            {/* Resources Mega Menu Dropdown */}
            <AnimatePresence>
              {activeMenu === "resources" && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-137.5 bg-(--color-surface-elevated-solid)/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl origin-top"
                  onMouseEnter={() => setActiveMenu("resources")}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {resourcesSubmenu.map((resource, idx) => {
                      const Icon = resource.icon;
                      return (
                        <Link
                          key={idx}
                          href={resource.href}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                        >
                          <div className="mt-0.5 p-2 rounded-lg bg-white/5 text-(--color-accent-emerald-light) group-hover:bg-(--color-accent-emerald-base) group-hover:text-white transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-0.5 group-hover:text-(--color-accent-emerald-light) transition-colors">{resource.name}</h4>
                            <p className="text-xs text-(--color-text-secondary) leading-snug">{resource.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/iletisim" className="text-sm font-medium text-(--color-text-overline) hover:text-white transition-colors cursor-pointer">
            İletişim
          </Link>
        </nav>

        {/* CTA Area */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/demo">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-10 px-6 rounded-full bg-(--color-brand-primary) text-sm font-medium text-white flex items-center gap-2 shadow-(--shadow-glow-primary-subtle) cursor-pointer"
            >
              Demo İste
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-(--color-text-overline) hover:text-white transition-colors cursor-pointer z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-dvh w-[85vw] max-w-sm bg-(--color-surface-elevated-solid)/95 backdrop-blur-2xl border-r border-white/10 z-50 lg:hidden flex flex-col overflow-y-auto"
            >
              <div className="flex flex-col pt-8 pb-8 px-6 h-full">
                
                {/* Mobile Drawer Logo */}
                <Link href="/" className="flex items-center gap-3 mb-10 w-fit cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-10 h-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                    <Image src="/logo-v1.png" alt="ServiceCore" width={24} height={24} className="w-6 h-6 object-contain" />
                  </div>
                  <span className="text-xl font-normal text-white tracking-tight">Service<span className="font-bold text-(--color-brand-primary)">Core</span></span>
                </Link>

                <div className="flex flex-col gap-6">
                  
                  <Link href="/ozellikler" className="text-lg font-medium text-white hover:text-(--color-brand-primary) transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Özellikler
                  </Link>

                  {/* Modüller Accordion */}
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === "modules" ? null : "modules")}
                    className="flex items-center justify-between text-lg font-medium text-white hover:text-(--color-brand-primary) transition-colors w-full cursor-pointer"
                  >
                    Modüller
                    <motion.div animate={{ rotate: activeMenu === "modules" ? 180 : 0 }}>
                      <ChevronDown className="w-5 h-5 text-(--color-text-secondary)" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeMenu === "modules" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden grid grid-cols-2 gap-x-2 gap-y-2 pt-3"
                      >
                        {modules.map((mod, idx) => (
                          <Link 
                            key={idx} 
                            href="#" 
                            className="flex items-center gap-3 text-(--color-text-overline) hover:text-white py-2 group cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <mod.icon className="w-5 h-5 text-(--color-brand-primary) group-hover:text-(--color-accent-blue-light) transition-colors shrink-0" />
                            <span className="text-sm font-medium transition-colors">{mod.name}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Çözümler Accordion */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setActiveMenu(activeMenu === "solutions" ? null : "solutions")}
                    className="flex items-center justify-between text-lg font-medium text-white hover:text-(--color-brand-primary) transition-colors w-full cursor-pointer"
                  >
                    Çözümler
                    <motion.div animate={{ rotate: activeMenu === "solutions" ? 180 : 0 }}>
                      <ChevronDown className="w-5 h-5 text-(--color-text-secondary)" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeMenu === "solutions" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-2 pt-3"
                      >
                        {solutionsSubmenu.map((sol, idx) => (
                          <Link
                            key={idx}
                            href={sol.href}
                            className="flex items-center gap-3 text-(--color-text-overline) hover:text-white py-2 group cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <sol.icon className="w-5 h-5 text-(--color-accent-purple-light) group-hover:text-(--color-accent-blue-light) transition-colors shrink-0" />
                            <span className="text-sm font-medium transition-colors">
                              {sol.name} <span className="text-xs text-(--color-text-muted) ml-1 font-normal">— {sol.title}</span>
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* AICORE Accordion */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setActiveMenu(activeMenu === "aicore" ? null : "aicore")}
                    className="flex items-center justify-between text-lg font-medium text-white hover:text-(--color-brand-primary) transition-colors w-full cursor-pointer"
                  >
                    AICORE
                    <motion.div animate={{ rotate: activeMenu === "aicore" ? 180 : 0 }}>
                      <ChevronDown className="w-5 h-5 text-(--color-text-secondary)" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeMenu === "aicore" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-2 pt-3"
                      >
                        {aicoreSubmenu.map((tool, idx) => (
                          <Link
                            key={idx}
                            href={tool.href}
                            className="flex items-center gap-3 text-(--color-text-overline) hover:text-white py-2 group cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <tool.icon className="w-5 h-5 text-(--color-accent-purple-light) group-hover:text-(--color-accent-blue-light) transition-colors shrink-0" />
                            <span className="text-sm font-medium transition-colors">{tool.name}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Planlar Accordion */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setActiveMenu(activeMenu === "plans" ? null : "plans")}
                    className="flex items-center justify-between text-lg font-medium text-white hover:text-(--color-brand-primary) transition-colors w-full cursor-pointer"
                  >
                    Planlar
                    <motion.div animate={{ rotate: activeMenu === "plans" ? 180 : 0 }}>
                      <ChevronDown className="w-5 h-5 text-(--color-text-secondary)" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeMenu === "plans" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-2 pt-3"
                      >
                        {plansSubmenu.map((plan, idx) => (
                          <Link
                            key={idx}
                            href={plan.href}
                            className="flex items-center gap-3 text-(--color-text-overline) hover:text-white py-2 group cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <plan.icon className="w-5 h-5 text-(--color-brand-primary) group-hover:text-(--color-accent-blue-light) transition-colors shrink-0" />
                            <span className="text-sm font-medium transition-colors">{plan.name}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Kaynaklar Accordion */}
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setActiveMenu(activeMenu === "resources" ? null : "resources")}
                    className="flex items-center justify-between text-lg font-medium text-white hover:text-(--color-accent-emerald-light) transition-colors w-full cursor-pointer"
                  >
                    Kaynaklar
                    <motion.div animate={{ rotate: activeMenu === "resources" ? 180 : 0 }}>
                      <ChevronDown className="w-5 h-5 text-(--color-text-secondary)" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeMenu === "resources" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden grid grid-cols-2 gap-x-2 gap-y-2 pt-3"
                      >
                        {resourcesSubmenu.map((resource, idx) => (
                          <Link 
                            key={idx} 
                            href={resource.href} 
                            className="flex items-center gap-3 text-(--color-text-overline) hover:text-white py-2 group cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <resource.icon className="w-5 h-5 text-(--color-accent-emerald-light) group-hover:text-emerald-300 transition-colors shrink-0" />
                            <span className="text-sm font-medium transition-colors">{resource.name}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/iletisim" className="text-lg font-medium text-white hover:text-(--color-brand-primary) transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  İletişim
                </Link>

                  <div className="mt-auto pt-8">
                    <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full h-14 rounded-xl bg-(--color-brand-primary) text-sm font-medium text-white flex items-center justify-center gap-2 shadow-(--shadow-glow-primary-subtle) cursor-pointer"
                      >
                        Demo İste
                      </motion.button>
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
