"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Share2, 
  Filter, 
  Zap, 
  History, 
  Headphones,
  Mail,
  PhoneCall,
  LayoutGrid
} from "lucide-react";

export default function EtkilesimYonetimiPage() {
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-cyan-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <MessageSquare size={14} />
              Etkileşim Yönetimi
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              Müşteri deneyiminin başladığı yer: <br/><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-(--color-accent-cyan-light)">Tek Noktadan Etkileşim.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl"
            >
              Omnichannel iletişim, akıllı sınıflandırma ve ITIL 4 &ldquo;Engagement&rdquo; standartlarıyla; henüz sınıflandırılmamış çağrılarınızı yakalayın, kaydedin ve doğru sürece hızla yönlendirin.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden group w-full max-h-125"
          >
             <Image
               src="/images/etkilesim-modulu/hero.avif"
               alt="Etkileşim Yönetimi Dashboard"
               width={1869}
               height={838}
               className="block max-w-none rounded-2xl group-hover:scale-[1.01] transition-transform duration-700 origin-top-left"
               priority
             />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS (Full Width Sections) */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-350 flex flex-col gap-32">
          
          {/* Feature 1: Omnichannel / SPOC */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full bg-linear-to-br from-(--color-surface-elevated-solid) to-(--color-surface-base) flex items-center justify-center p-8">
                     <div className="grid grid-cols-2 gap-4 w-full max-w-sm shrink-0 mix-blend-screen opacity-80">
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-3">
                            <Mail className="w-8 h-8 text-(--color-accent-blue-light)" />
                            <span className="text-sm font-medium">E-Posta</span>
                         </div>
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-3">
                            <PhoneCall className="w-8 h-8 text-(--color-accent-emerald-light)" />
                            <span className="text-sm font-medium">Telefon</span>
                         </div>
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-3">
                            <Share2 className="w-8 h-8 text-(--color-accent-purple-light)" />
                            <span className="text-sm font-medium">Sosyal Medya</span>
                         </div>
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-3">
                            <LayoutGrid className="w-8 h-8 text-(--color-accent-cyan-light)" />
                            <span className="text-sm font-medium">Web Portal</span>
                         </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Share2 size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Tekil İletişim Noktası<br/><span className="text-(--color-accent-blue-light)">(Omnichannel SPOC)</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Email, telefon, chat, sosyal medya, web arayüzü ve doğrudan fiziksel başvuru... Tüm kanallardan gelen talepleri merkezi ve tekilleştirilmiş bir alanda karşılayın. Hiçbir mesaj kaybolmasın.
              </p>
              <ul className="space-y-4">
                {["Farklı kanallardan gelen taleplerin tek ekranda toplanması", "Otomatik log ve tarihçe tutulması", "Kullanıcıya tek bir pencereden profesyonel yanıt dönülmesi"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-blue-light) shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Filtreleme & Sınıflandırma */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                    <div className="w-full h-full bg-linear-to-br from-(--color-surface-elevated-solid) to-(--color-surface-base) flex flex-col px-8 py-10">
                        <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 mb-auto">
                            <div className="h-6 w-1/3 bg-slate-400/20 rounded mb-3"></div>
                            <div className="h-4 w-2/3 bg-slate-400/10 rounded"></div>
                        </div>
                        <div className="flex justify-center my-6">
                            <Filter className="w-12 h-12 text-emerald-400/50" />
                        </div>
                        <div className="grid grid-cols-3 gap-3 w-full">
                             <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center text-xs font-semibold text-red-500">Olay (Incident)</div>
                             <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center text-xs font-semibold text-blue-500">İstek (Request)</div>
                             <div className="bg-slate-500/10 border border-slate-500/20 rounded-lg p-3 text-center text-xs font-semibold text-(--color-text-muted)">Reddedildi</div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Filter size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Akıllı Ayıklama ve<br/><span className="text-(--color-accent-emerald-light)">Sınıflandırma</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Gelen her mesaj işleme alınmak zorunda değildir. Etkileşim Yönetimi; ilgisiz talepleri elerken, ilgili çağrıların Olay, İstek, Şikayet, Öneri veya Bilgi İsteği olarak doğru kanala yönlendirilmesini sağlar.
              </p>
              <ul className="space-y-4">
                {["Gereksiz çağrıların elenerek ana süreçlerin (Incident/Request) korunması", "Çağrı içeriğine göre doğru modüle yönlendirme", "Ön analiz yapılarak doğru şablonların seçilmesi"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-emerald-light) shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 3: Olaylara Hızlı Aktarım */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl flex items-center justify-center">
                   <div className="w-full h-full bg-linear-to-br from-(--color-surface-elevated-solid) to-(--color-surface-base) flex flex-col items-center justify-center gap-6 p-8 relative">
                       <Zap className="w-16 h-16 text-(--color-accent-purple-light)" />
                       <div className="w-full space-y-3 max-w-sm">
                           <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                              <span className="text-sm text-(--color-text-secondary)">Öncelik:</span>
                              <span className="text-sm font-semibold text-(--color-accent-red-light) bg-red-400/10 px-2 py-0.5 rounded">P1 - Kritik</span>
                           </div>
                           <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                              <span className="text-sm text-(--color-text-secondary)">Etki:</span>
                              <span className="text-sm font-semibold text-(--color-accent-orange-light) bg-orange-400/10 px-2 py-0.5 rounded">Yüksek</span>
                           </div>
                       </div>
                   </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Zap size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Kritik Olaylar İçin<br/><span className="text-(--color-accent-purple-light)">Hızlı Müdahale Hazırlığı</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Olaya (Incident) dönüşecek çağrılar; aciliyet, etki ve servis kataloğu bağlantıları kurularak önceliklendirilir. Bu sayede Problem ve Olay yöneticileri, önemsiz detaylarla uğraşmak yerine doğrudan çözüme odaklanır.
              </p>
              <ul className="space-y-4">
                {["Aciliyet ve etki (Impact & Urgency) belirleme", "Olay yöneticisine (Incident Manager) yüksek kaliteli veri aktarımı", "Hedeflenen çözüm metriklerinin anında başlatılması"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-purple-light) shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. BENTO GRID: Operasyonel & Yönetimsel Alt Detaylar */}
      <section className="py-24 border-y border-white/5 bg-(--color-surface-base-dark) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-350 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">Operasyonel Derinlik</h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              ITIL 4 standartlarında tanımlanan &ldquo;Engagement&rdquo; vizyonunun IT dünyasında vücut bulmuş en saf hali.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]"
          >
             {/* Bento Item 1 - ITIL 4 */}
             <motion.div variants={fadeUp} className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center">
               <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                 <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6"><Layers /></div>
                 <h3 className="text-xl font-bold text-white mb-2">ITIL 4 &ldquo;Engagement&rdquo; Uyumu</h3>
                 <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                   Kullanıcı ile iletişimin, sürecin geri kalanından bağımsız şekilde kusursuz yürütülmesi için ServiceCore, ITIL 4 ile tam uyumlu Engagement prensiplerini sisteme nativ olarak dahil eder.
                 </p>
               </div>
               <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) flex items-center justify-center p-6">
                 <div className="text-center">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-(--color-accent-cyan-light) opacity-90 block mb-2">ITIL 4</span>
                    <span className="text-lg font-medium text-(--color-text-overline) tracking-wider uppercase">Engagement Phase</span>
                 </div>
               </div>
             </motion.div>

             {/* Bento Item 2 - Tarihçe */}
             <motion.div variants={fadeUp} className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col">
               <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6 shrink-0"><History /></div>
               <h3 className="text-lg font-bold text-white mb-2 shrink-0">Tüm İletişim Tarihçesi</h3>
               <p className="text-sm text-(--color-text-secondary) shrink-0 font-light">
                 Kullanıcının etkileşime geçtiği ilk andan, isteğin karşılandığı son ana kadar yapılan giden ve gelen yazışmalar sistemde görünür.
               </p>
               <div className="relative w-full flex-1 rounded-xl mt-4 border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) flex items-center justify-center flex-col gap-2 p-4">
                  <div className="h-8 bg-blue-500/10 rounded border border-blue-500/20 self-start w-3/4"></div>
                  <div className="h-12 bg-white/5 rounded border border-white/10 self-end w-3/4"></div>
                  <div className="h-8 bg-blue-500/10 rounded border border-blue-500/20 self-start w-3/4"></div>
               </div>
             </motion.div>

             {/* Bento Item 3 - Yük Dağılımı */}
             <motion.div variants={fadeUp} className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col justify-between">
                <div>
                   <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0"><Headphones /></div>
                   <h3 className="text-lg font-bold text-white mb-2 shrink-0">Ana Süreçleri Koruma</h3>
                   <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                     Olay, Problem veya Değişiklik yönetimi gibi kritik süreçler, kullanıcıları bilgilendirme veya döküman toplama gibi angaryalardan arındırılır.
                   </p>
                </div>
                <div className="h-1 bg-white/10 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-indigo-400 w-3/4"></div>
                </div>
             </motion.div>

             {/* Bento Item 4 - Email to Ticket */}
             <motion.div variants={fadeUp} className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center">
               <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                 <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6"><Mail /></div>
                 <h3 className="text-xl font-bold text-white mb-2">Otomatik E-Posta Entegrasyonu</h3>
                 <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                   Ortak bir destek adresine gönderilen mailler otomatik olarak sistemde etkileşim kaydına dönüşür. Thread bozulmadan e-posta zinciri takip edilir, cevaplar sistem üzerinden gönderilir.
                 </p>
               </div>
               <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) flex items-center justify-center">
                   <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                   <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md relative z-10 w-3/4 flex items-center gap-4">
                       <Mail className="w-6 h-6 text-(--color-accent-orange-light)" />
                       <div className="flex-1">
                          <div className="text-sm font-semibold text-white">destek@sirket.com</div>
                          <div className="text-xs text-(--color-text-secondary) mt-1">Gelen Kutusunu Dinliyor...</div>
                       </div>
                   </div>
               </div>
             </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-200 h-full bg-cyan-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center relative z-10 w-full max-w-350">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] border border-white/10 bg-(--color-surface-elevated-solid)/80 backdrop-blur-3xl p-12 lg:p-20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">Etkileşimlerinizi Değere Dönüştürün</h2>
              <p className="text-(--color-text-secondary) text-lg mb-10 font-light leading-relaxed">
                Tüm kanallardaki dağınıklığı tek bir platformda birleştirin; sürtünmeleri azaltıp müşteri memnuniyetini zirveye taşıyın.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo">
                  <button className="h-14 px-8 rounded-full bg-(--color-accent-cyan-base) text-white font-semibold text-lg hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all cursor-pointer flex items-center gap-2">
                    Hemen Demo Alın
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/iletisim">
                  <button className="h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-colors cursor-pointer">
                    Bize Ulaşın
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
