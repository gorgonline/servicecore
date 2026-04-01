"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  PieChart, 
  Users, 
  KanbanSquare, 
  GitPullRequestDraft, 
  Route, 
  CalendarDays,
  Settings,
  Workflow,
  ListTodo,
  Clock,
  Tags
} from "lucide-react";

export default function ProjeYonetimiPage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-[1400px]">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <Layers size={14} />
              Proje Yönetimi
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              Agile hız kazandırır, stratejik planlama ise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">kontrol sağlar.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl"
            >
              Servicecore Proje Modülü; backlog önceliklendirmesinden sprint kurgusuna, 
              story point analizinden kapasite planlamasına kadar tüm süreci tek bir merkezi yapı altında toplar.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden group max-w-5xl"
          >
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-(--color-surface-base) to-transparent z-10 pointer-events-none" />
             <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-inner bg-(--color-surface-elevated-solid)/50 border border-white/5">
                <Image 
                  src="/images/project/resources-dashboard.png" 
                  alt="Projenizin Kontrol Paneli" 
                  fill 
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700" 
                  priority
                />
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS (Full Width Sections) */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-[1400px] flex flex-col gap-32">
          
          {/* Feature 1: Dashboard / Overview (Reversed because Hero had Dashboard, but let's just make it alternating) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                  <Image src="/images/project/resources-dashboard.png" alt="Dashboard" fill className="object-cover object-left-top group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <PieChart size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Projenizin<br/><span className="text-(--color-accent-blue-light)">Kontrol Paneli</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Overview ekranı ile story point ilerlemesi, sprint performansı, açık görevler, bütçe kullanımı ve risk durumu tek bakışta görünür. 
                Dağınık veriler yerine karar almayı hızlandıran merkezi bir proje yönetimi sunar.
              </p>
              <ul className="space-y-4">
                {["Story point ve sprint ilerlemesi takibi", "Bütçe ve efor KPI’ları tek ekranda", "Backlog detaylarına dashboard'dan doğrudan inme"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-blue-light) shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Scrum Kanban Board */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                  <Image src="/images/project/board2.png" alt="Kanban & Scrum Board" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <KanbanSquare size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Akış Bazlı<br/><span className="text-(--color-accent-emerald-light)">Kanban & Scrum Board</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Görevlerin fikirden canlıya kadar geçtiği tüm adımları kolonlar üzerinde izleyin. Ekipler bugün neye odaklanmaları gerektiğini tek bakışta görür, akış şeffaf hale gelir.
              </p>
              <ul className="space-y-4">
                {["Scrum ve Kanban uyumlu görsel akış", "Board üzerinden risk ve öncelik kontrolü", "Günlük operasyon stand-up'larını kolaylaştırma"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-emerald-light) shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 3: Kapasite ve Yük */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-indigo-500/10 blur-[50px] group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                  <Image src="/images/project/resources-capacity.png" alt="Sprint Kapasitesi" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Users size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Sprint Kapasitesi ve<br/><span className="text-indigo-400">Yük Dengesi</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Her sprint için planlanan kapasiteyi ve iş dağılımını görerek gerçekçi bir yük planı oluşturun.
                Hangi işlerin ertelenebileceğini veya öne çekileceğini net verilerle yönetin.
              </p>
              <ul className="space-y-4">
                {["Story Point bazlı kullanım oranı", "Bütçe, efor ve maliyet dengesi takibi", "Velocity trendleriyle isabetli taahhütler"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 4: Backlog */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-gradient-to-br from-orange-500/5 to-red-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-orange-500/10 blur-[50px] group-hover:bg-orange-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                  <Image src="/images/project/backlog2.png" alt="Backlog ve Planlama" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-(--color-accent-orange-light)">
                <GitPullRequestDraft size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Agile Odaklı<br/><span className="text-(--color-accent-orange-light)">Backlog Yönetimi</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Tüm iş kalemlerinizi önceliklendirin, sprintlere dağıtın ve ölçülebilir hale getirin. Epic&apos;ten göreve uzanan yapı ile ürün yol haritası netleşir.
              </p>
              <ul className="space-y-4">
                {["Sürükle-bırak ile akıllı sprint dağıtımı", "Kritik yol ve bağımlılık farkındalığı", "Fikir havuzu ve eylem planını ayırma"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-orange-light) shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 5: Yoğunluk / Heatmap */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-gradient-to-br from-pink-500/5 to-rose-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-pink-500/10 blur-[50px] group-hover:bg-pink-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                  <Image src="/images/project/resources-heatmap.png" alt="Yoğunluk Haritası" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                <CalendarDays size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Isı Haritası &<br/><span className="text-pink-400">Utilization Takibi</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Ekip kullanım oranlarını (utilization) ısı haritaları üzerinden görerek kimin aşırı yüklendiğini veya kimin boşta kaldığını anında analiz edin.
              </p>
              <ul className="space-y-4">
                {["Ekip ve departman bazlı ısı dağılımı", "Günlük, haftalık, aylık dönem analizleri", "Dengeli ve sürdürülebilir iş gücü koruması"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 6: Ekipler / People */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                  <Image src="/images/project/resources-people2.png" alt="Ekip İş Yükü" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-(--color-accent-cyan-light)">
                <Users size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Gerçek Zamanlı<br/><span className="text-(--color-accent-cyan-light)">Ekip İş Yükü Takibi</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Atanan görevler, planlanan saatler ve gerçekleşen iş kayıtlarıyla ekip yükünü dinamik izleyin. Blokajları erken tespit edin.
              </p>
            </div>
          </motion.div>

          {/* Feature 7: Roadmap */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-gradient-to-br from-violet-500/5 to-purple-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-violet-500/10 blur-[50px] group-hover:bg-violet-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                  <Image src="/images/project/Roadmap.png" alt="Uzun Vadeli Roadmap" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Route size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Gantt Vizyonuyla<br/><span className="text-violet-400">Proje Yol Haritası</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Epik ve görevleri sürükle-bırak Gantt zaman çizelgesiyle (Roadmap) yönetin. Hangi projenin ne aşamada olduğunu tüm bağımlılıklarıyla görün.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. BENTO GRID: Operasyonel & Yönetimsel Alt Detaylar */}
      <section className="py-24 border-y border-white/5 bg-(--color-surface-base-dark) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-[1400px] relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">Operasyonel Derinlik</h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              Özelleştirilebilir altyapı ile kurumunuzun iş yapış şeklini sisteme dayatmayın, sistem sizin mimarinize uyum sağlasın.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]"
          >
             {/* Bento Item 1 - Scheduler */}
             <motion.div variants={fadeUp} className="col-span-1 lg:col-span-2 row-span-1 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center">
               <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                 <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6"><CalendarDays /></div>
                 <h3 className="text-xl font-bold text-white mb-2">Görev Zamanlama (Scheduler)</h3>
                 <p className="text-sm text-(--color-text-secondary) font-light">
                   Görevleri kişi bazında günlere dağıtın. Çakışmaları erken fark edip takvim üzerinde sürükle-bırak organizasyon yapın.
                 </p>
               </div>
               <div className="w-full md:w-1/2 h-[180px] md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 group-hover:border-indigo-500/40 transition-colors">
                  <Image src="/images/project/scheduler.png" alt="Scheduler" fill className="object-cover object-left-top" />
               </div>
             </motion.div>

             {/* Bento Item 2 - Transitions */}
             <motion.div variants={fadeUp} className="col-span-1 rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 hover:bg-white/[0.04] transition-colors flex flex-col">
               <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6 shrink-0"><Workflow /></div>
               <h3 className="text-lg font-bold text-white mb-2 shrink-0">İş Akışı & Geçiş Kontrolü</h3>
               <p className="text-sm text-(--color-text-secondary) shrink-0 font-light">
                 Hangi statüden hangisine geçileceğini zorunlu kurallarla çizin. Rastgele ilerlemeleri önleyerek standartlar koyun.
               </p>
               <div className="relative w-full flex-1 rounded-xl mt-4 border border-white/10 overflow-hidden">
                  <Image src="/images/project/settingsTransitions.png" alt="Transitions" fill className="object-cover" />
               </div>
             </motion.div>

             {/* Bento Item 3 - Task Types */}
             <motion.div variants={fadeUp} className="col-span-1 rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 hover:bg-white/[0.04] transition-colors flex flex-col">
               <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0"><Tags /></div>
               <h3 className="text-lg font-bold text-white mb-2 shrink-0">Görev Türü Tanımı (Task Types)</h3>
               <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                 Epic, Bug, Change veya kendi yapılandırdığınız özel tip iş kalemleriyle devasa projeleri ayrıştırın.
               </p>
               <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden">
                  <Image src="/images/project/settingstasktypes.png" alt="Task Types" fill className="object-cover object-top" />
               </div>
             </motion.div>

             {/* Bento Item 4 - Worklog */}
             <motion.div variants={fadeUp} className="col-span-1 rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 hover:bg-white/[0.04] transition-colors flex flex-col">
               <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0"><Clock /></div>
               <h3 className="text-lg font-bold text-white mb-2 shrink-0">Hassas Zaman Kaydı (Worklog)</h3>
               <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                 Süreç maliyetlerini çıkarma, iç faturalama ve sprint analizleri için dakikası dakikasına şeffaf raporlar edinin.
               </p>
               <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden">
                  <Image src="/images/project/worklog.png" alt="Worklog" fill className="object-cover object-top" />
               </div>
             </motion.div>

             {/* Bento Item 5 & 6 (Thin Row combining Panolar and Listeler) */}
             <motion.div variants={fadeUp} className="col-span-1 lg:col-span-1 grid grid-rows-2 gap-6">
                
                <div className="rounded-[2rem] bg-white/[0.02] border border-white/10 p-6 flex items-start gap-4 hover:bg-white/[0.04] transition-colors h-full">
                   <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-(--color-accent-cyan-light) flex items-center justify-center shrink-0"><Settings size={20} /></div>
                   <div>
                     <h4 className="font-bold text-white text-sm mb-1">Board / Pano Özelleştirme</h4>
                     <p className="text-xs text-(--color-text-secondary)">Takımlara özel sınırsız kolon ve WIP (Wokr In Progress) limitli panolar ayarla.</p>
                   </div>
                </div>

                <div className="rounded-[2rem] bg-white/[0.02] border border-white/10 p-6 flex items-start gap-4 hover:bg-white/[0.04] transition-colors h-full">
                   <div className="w-10 h-10 rounded-full bg-slate-500/10 text-(--color-text-secondary) flex items-center justify-center shrink-0"><ListTodo size={20} /></div>
                   <div>
                     <h4 className="font-bold text-white text-sm mb-1">Table & Inline Kaba Düzen</h4>
                     <p className="text-xs text-(--color-text-secondary)">Tüm görevleri tabloda toplu gör, filtre kurgularını kaydet, excele al.</p>
                   </div>
                </div>

             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-full bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center relative z-10 w-full max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] border border-white/10 bg-(--color-surface-elevated-solid)/80 backdrop-blur-3xl p-12 lg:p-20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">Agile Dönüşümünüzü<br />ServiceCore ile Başlatın</h2>
              <p className="text-(--color-text-secondary) text-lg mb-10 font-light leading-relaxed">
                Dağınık izleme tablolarını, tutarsız taahhütleri ve gizli blokajları unutun. Proje süreçlerinizi profesyonelleştirmek için hemen bir demo planlayın.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo">
                  <button className="h-14 px-8 rounded-full bg-(--color-accent-blue-base) text-white font-semibold text-lg hover:bg-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all cursor-pointer flex items-center gap-2">
                    Kontrolü Ele Al
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/iletisim">
                  <button className="h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-colors cursor-pointer">
                    Uzmanla Görüş
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
