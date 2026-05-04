'use client';

import { motion, Variants } from 'framer-motion';
import { 
  Zap, 
  LucideIcon,
  Layers, 
  Cpu, 
  Globe, 
  MousePointer2, 
  Sparkles, 
  Command, 
  Activity, 
  Award,
  Maximize2,
  RefreshCw,
  Heart,
  Users,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Eye,
  Minimize2,
  Settings2,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, LucideIcon> = {
  "Sezgisel Sadelik": MousePointer2,
  "İşlevsel Estetik": Sparkles,
  "İnsan + Otomasyon Uyumu": Cpu,
  "Bütünsel ve Entegre Yaklaşım": Layers,
  "Yerel Gerçeklik + Küresel Standart": Globe,
  "Modülerlik ve Esneklik": Maximize2,
  "Hızlı Öğrenme ve Adaptasyon": Zap,
  "Teknisyen Dostu Tasarım": Command,
  "Akışlarda Sadelik": Activity,
  "Onay ve Kural Setlerinde İsrafı Önleme": Minimize2,
  "Sürdürülebilir Konfigürasyon": Settings2,
  "Son Kullanıcıya Empati": Heart,
  "Servis Kataloğunda Çeviklik": RefreshCw,
  "Demokratik Yönetim": Users,
  "Keep it simple": CheckCircle2,
  "Focus on value": TrendingUp,
  "Progress iteratively": RefreshCw,
  "Eliminate waste": Minimize2,
  "KaiZen !": Award,
  "Start where you are": Briefcase,
  "Visibility & Transparency": Eye,
  "Optimize first, then automate": Settings2,
  "Think global, focus on local": Globe,
  "Continual Improvement": Award,
  "Rapid Implementation": Zap,
  "Exclusive Support": Heart,
  "Think Holistically": Layers,
  "Collaboration": Users,
  "Agility": Activity
};

// Premium accent color variations from Features system
const accentColors = [
  "text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/50 group-hover:bg-blue-500/20",
  "text-purple-400 bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/50 group-hover:bg-purple-500/20",
  "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/20",
  "text-orange-400 bg-orange-500/10 border-orange-500/20 group-hover:border-orange-500/50 group-hover:bg-orange-500/20",
  "text-pink-400 bg-pink-500/10 border-pink-500/20 group-hover:border-pink-500/50 group-hover:bg-pink-500/20",
  "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/20",
];

const hoverGradients = [
  "from-blue-500/20 via-transparent to-transparent",
  "from-purple-500/20 via-transparent to-transparent",
  "from-emerald-500/20 via-transparent to-transparent",
  "from-orange-500/20 via-transparent to-transparent",
  "from-pink-500/20 via-transparent to-transparent",
  "from-cyan-500/20 via-transparent to-transparent",
];

const titleColors = [
  "group-hover:text-blue-400",
  "group-hover:text-purple-400",
  "group-hover:text-emerald-400",
  "group-hover:text-orange-400",
  "group-hover:text-pink-400",
  "group-hover:text-cyan-400",
];

interface MottoItem {
  title: string;
  content?: string;
  details?: string[];
}

interface MottoSection {
  id: string;
  title: string;
  subtitle: string;
  items: MottoItem[];
}

interface MottoData {
  title: string;
  sections: MottoSection[];
}

export default function MottoContent({ data }: { data: MottoData }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      } 
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-(--color-brand-primary)/10 to-transparent pointer-events-none -z-10" />

      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-24 relative"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-(--color-brand-primary) animate-pulse" />
          <span className="text-xs font-semibold text-slate-300 tracking-[0.2em] uppercase">Manifestomuz</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 whitespace-pre-line">
          {data.title}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          ServiceCore&apos;un kalbinde yatan mühendislik disiplini ve kullanıcı odaklı tasarım felsefesini keşfedin.
        </p>
      </motion.div>

      {/* Sections */}
      {data.sections.map((section: MottoSection) => (
        <section key={section.id} className="mb-32">
          <motion.div
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 text-white">
              {section.title}
            </h2>
            <p className="text-(--color-brand-accent) font-medium tracking-wide">
              {section.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            animate="show"
            className={`grid gap-6 ${section.id === 'design-principles' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}
          >
            {section.items.map((card: MottoItem, cardIdx: number) => {
              const Icon = iconMap[card.title] || Sparkles;
              const colorSet = accentColors[cardIdx % accentColors.length];
              const hoverGrad = hoverGradients[cardIdx % hoverGradients.length];
              const titleColor = titleColors[cardIdx % titleColors.length];
              
              return (
                <motion.div 
                  key={cardIdx}
                  variants={itemVariants}
                  className="h-full"
                >
                  <div className="group relative flex flex-col justify-between h-full overflow-hidden rounded-3xl bg-white/2 border border-white/5 p-8 transition-all duration-300 hover:bg-white/4 hover:-translate-y-2 hover:shadow-2xl cursor-default">
                    
                    {/* Background Hover Gradient */}
                    <div className={`absolute inset-0 bg-linear-to-br ${hoverGrad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors duration-500" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon Area */}
                      <div className={`mb-6 h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ease-out shadow-inner ${colorSet}`}>
                        <Icon className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      
                      {/* Content Area */}
                      <div className="grow">
                        <h3 className={`mb-4 text-xl font-semibold text-white tracking-tight transition-colors duration-300 ${titleColor}`}>
                          {card.title}
                        </h3>
                        
                        {card.content && (
                          <p className="text-sm text-slate-400 font-light leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                            {card.content}
                          </p>
                        )}
                        
                        {card.details && (
                          <ul className="space-y-3 mt-4">
                            {card.details.map((detail: string, detailIdx: number) => (
                              <li key={detailIdx} className="flex items-start gap-3 text-sm text-slate-400 font-light leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                                <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 transition-transform duration-300 group-hover:scale-125 ${colorSet.split(' ')[0].replace('text-', 'bg-')}`} />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Detail Indicator */}
                      <div className={`mt-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-300 ${titleColor}`}>
                        <span>Detaylar</span>
                        <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      ))}

      {/* Footer CTA */}
      <div className="mt-32 pb-40">
        <motion.div
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="group/cta relative flex flex-col justify-center overflow-hidden rounded-[2.5rem] bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
        >
          <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500" />
          
          <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[39px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 lg:px-16 lg:py-20">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] opacity-20 group-hover/cta:opacity-40 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] opacity-10 group-hover/cta:opacity-30 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
                Hemen Başlayın
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
                Bu Felsefeyi <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Birlikte</span> Uygulayalım
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg font-light leading-relaxed">
                ServiceCore ile ITSM operasyonlarınızı mühendislik disipliniyle yeniden kurgulayın ve dijital dönüşümünüzü hızlandırın.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/demo">
                  <Button variant="cta" size="lg">
                    Ücretsiz Demo İste <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a 
                  href="/iletisim" 
                  className="px-8 h-14 rounded-full bg-white/5 border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
                >
                  Bizimle İletişime Geçin
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
