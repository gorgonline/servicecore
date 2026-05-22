"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Layers,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Link as LinkIcon,
  MessageSquare,
  History,
  Download,
  BellRing,
  TableProperties,
  Command
} from "lucide-react";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function BilgiBankasiPage() {
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
        {/* Absolute Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <FileText size={14} />
              Bilgi Yönetimi
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              Kurumsal bilginin <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">tek merkezi.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl"
            >
              Bilgi Bankası, dokümanlarınızı klasör karmaşasından çıkarır ve düzenli bir yapı içinde toplar. 
              Ekipler aynı yerde yazar, yorum yapar, görev çıkarır ve güncel kalır. Daha hızlı çalışın, daha az kaybolun.
            </motion.p>
          </div>

          {/* Hero Dashboard Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden group w-full"
          >
             <Image
               src="/images/kb/index.png"
               alt="Bilgi Bankası Genel Bakış Dashboard"
               width={1347}
               height={741}
               className="block w-full h-auto rounded-2xl group-hover:scale-[1.01] transition-transform duration-700"
               priority
             />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS (Full Width Sections) */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-350 flex flex-col gap-32">
          
          {/* Feature 1: Sayfa ve Alan Hiyerarşisi */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                  <Image
                    src="/images/kb/spaces.png"
                    alt="Sayfa ve Alan Hiyerarşisi"
                    width={1893}
                    height={836}
                    className="block w-full h-auto group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Layers size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Departmanlara Özel<br/><span className="text-(--color-accent-blue-light)">Alan ve Hiyerarşi</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Bilgiyi klasörlemek yerine ağaç yapısıyla (hiyerarşik) düzenleyin. HR, IT veya Geliştirme gibi her birim 
                kendi &ldquo;Alan&rdquo;ına (Space) sahiptir. Sayfaların altına alt sayfalar ekleyerek bağlamı hiç kaybetmeden devasa projeleri belgeleyin.
              </p>
              <ul className="space-y-4">
                {["Departman bazlı bağımsız alanlar", "Derinlemesine parent-child hiyerarşisi", "Sürükle-bırak ile hızlı yeniden düzenleme"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-blue-light) shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Şablon Kütüphanesi (Reversed) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-blue-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                  <Image
                    src="/images/kb/sablonkutuphane.png"
                    alt="Şablon Kütüphanesi"
                    width={1198}
                    height={881}
                    className="block w-full h-auto group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <FileText size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Standartlar İçin<br/><span className="text-(--color-accent-emerald-light)">Şablon Kütüphanesi</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Her seferinde boş bir sayfadan başlamak yerine kurumsal standartlara uygun şablonları kütüphanenize ekleyin. 
                Toplantı notları, teknik dokümanlar veya gereksinim listeleri tek tıkla otomatik başlık ve formatlarıyla gelir.
              </p>
              <ul className="space-y-4">
                {["Hızlı başlangıç için hazır iskeletler", "Tüm şirkette aynı doküman tutarlılığı", "Günlük işlerde ciddi zaman tasarrufu"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-(--color-text-overline)">
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-emerald-light) shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 3: Çift Yönlü Linkleme (Relational Info) */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl">
                  <Image
                    src="/images/kb/iliskilikay%C4%B1tlar2.png"
                    alt="Çift Yönlü Linkleme"
                    width={1536}
                    height={1024}
                    className="block w-full h-auto group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <LinkIcon size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Kayıttan Dokümana<br/><span className="text-(--color-accent-purple-light)">Çift Yönlü Linkleme</span></h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                Bir olay, talep veya görev ile doküman arasında köprü kurun. Görevi yapan kişi teknik dokümana tek tıkla giderken, 
                dokümanı okuyanlar &ldquo;Bu dokümana bağlı işler&rdquo; paneli üzerinden o bilginin canlı kullanımını görebilir.
              </p>
              <ul className="space-y-4">
                {["Kayıt ekranında doküman (Çözümler) sekmesi", "Sayfada ait olduğu kayıtlar paneli", "Tek kaynak gerçeği (Single Source of Truth)"].map((item, i) => (
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

      {/* 3. BENTO GRID: Diğer Yetenekler */}
      <section className="py-24 border-y border-white/5 bg-(--color-surface-base-dark) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-350 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">Her Detay Düşünüldü</h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              İş birliğini artırmak ve doküman yönetimini profesyonel bir seviyeye çıkarmak için kurumsal özelliklerin tümü elinizin altında.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]"
          >
             {/* Bento Item 1 */}
             <motion.div variants={fadeUp} className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity"><MessageSquare size={120} /></div>
               <div className="relative z-10 h-full flex flex-col justify-end">
                 <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6"><MessageSquare /></div>
                 <h3 className="text-xl font-bold text-white mb-2">Satır İçi (Inline) Yorumlar & Mention</h3>
                 <p className="text-(--color-text-secondary) line-clamp-2 pr-20">Bağlam kopmadan herhangi bir paragrafı seçerek yorum ekleyin ve @kullanıcı etiketi ile anında bildirim gönderin.</p>
               </div>
             </motion.div>

             {/* Bento Item 2 */}
             <motion.div variants={fadeUp} className="col-span-1 row-span-2 rounded-4xl bg-linear-to-b from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative group overflow-hidden flex flex-col">
               <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6 shrink-0"><History /></div>
               <h3 className="text-xl font-bold text-white mb-4 shrink-0">Mükemmel Sürüm Geçmişi</h3>
               <p className="text-(--color-text-secondary) mb-8 font-light shrink-0">
                 Kim, ne zaman, neresini değiştirdi? &ldquo;Bu dokümanı geri al&rdquo; veya sürüm farklılıklarını incele seçenekleriyle kurumsal uyumluluğu ve veri kaybı önlemeyi garantileyin.
               </p>
               <div className="relative w-full aspect-square md:flex-1 rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/10 shadow-inner group-hover:border-purple-500/40 transition-colors mt-auto">
                  <Image src="/images/kb/versioncompare.png" alt="Version Compare" fill className="object-cover object-top" />
               </div>
             </motion.div>

             {/* Bento Item 3 */}
             <motion.div variants={fadeUp} className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col justify-end">
               <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6"><ShieldCheck /></div>
               <h3 className="text-lg font-bold text-white mb-2">Güçlü İzin Yönetimi</h3>
               <p className="text-sm text-(--color-text-secondary)">Alan ve sayfa bazlı görünürlük. İK dokümanlarınızı sadece o departmanla sınırlandırın.</p>
             </motion.div>

             {/* Bento Item 4 */}
             <motion.div variants={fadeUp} className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col justify-end">
               <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-6"><TableProperties /></div>
               <h3 className="text-lg font-bold text-white mb-2">Canlı / Dinamik Listeler</h3>
               <p className="text-sm text-(--color-text-secondary)">Makro gibi çalışan gömülü Grid&apos;ler kullanın. Örn: &ldquo;Açık Görevler&rdquo; sürece bağlandığında dokümanınız otomatik güncellenir.</p>
             </motion.div>

             {/* Bento Item 5 & 6 (Small row) */}
             <motion.div variants={fadeUp} className="col-span-1 lg:col-span-3 row-span-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="rounded-4xl bg-white/2 border border-white/10 p-8 flex items-center gap-6 hover:bg-white/4 transition-colors">
                   <div className="w-12 h-12 rounded-full bg-red-500/10 text-(--color-accent-red-light) flex items-center justify-center shrink-0"><Download /></div>
                   <div>
                     <h4 className="font-bold text-white mb-1">PDF & Word Export</h4>
                     <p className="text-xs text-(--color-text-secondary)">Müşterilere resmi formatta verin.</p>
                   </div>
                </div>

                <div className="rounded-4xl bg-white/2 border border-white/10 p-8 flex items-center gap-6 hover:bg-white/4 transition-colors">
                   <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-(--color-accent-cyan-light) flex items-center justify-center shrink-0"><BellRing /></div>
                   <div>
                     <h4 className="font-bold text-white mb-1">Sayfa Takibi (Follow)</h4>
                     <p className="text-xs text-(--color-text-secondary)">Sayfa güncellendiğinde anında bildirim.</p>
                   </div>
                </div>

                <div className="rounded-4xl bg-white/2 border border-white/10 p-8 flex items-center gap-6 hover:bg-white/4 transition-colors">
                   <div className="w-12 h-12 rounded-full bg-slate-500/10 text-(--color-text-secondary) flex items-center justify-center shrink-0"><Command /></div>
                   <div>
                     <h4 className="font-bold text-white mb-1">Slash / Markdown</h4>
                     <p className="text-xs text-(--color-text-secondary)">Güçlü WYSIWYG düzenleme komutları.</p>
                   </div>
                </div>

             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="container mx-auto pb-20 max-w-7xl mt-32">
          <motion.div
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                  <FileText className="w-4 h-4 text-(--color-accent-blue-light)" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">Bilgi Bankası</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  Kurumsal Dokümantasyonla<br />İşlerinizi Hızlandırın
                </h2>

                <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
                  Dağınık Word dosyalarından, versiyon çatışmalarından ve bilgi silolarından kurtulun. ServiceCore Bilgi Bankası ile bilginiz her zaman güncel ve erişilebilir kalsın.
                </p>

                <div className="flex flex-col items-center gap-8">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/demo">
                      <button className="px-8 py-4 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-(--shadow-glow-primary-weak) cursor-pointer flex items-center gap-2">
                        Hemen Demo İste
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                    <Link href="/iletisim">
                      <button className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                        Bize Ulaşın
                      </button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap justify-center gap-8 text-(--color-text-muted)">
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      Tek Kaynak Gerçeği
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      Sürüm Kontrolü
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                      Canlı İş Birliği
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      <PrivacyContact />
    </div>
  );
}
