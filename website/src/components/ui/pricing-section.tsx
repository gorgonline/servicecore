"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, Plus, Infinity as InfinityIcon, Sparkles, Building2, Blocks, MessageSquare, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";

// --- Data Models ---
interface PricingFeature {
  title: string;
  description: string;
}

const standardFeatures: PricingFeature[] = [
  { title: "Interaction / Çağrı Yönetimi Modülü", description: "Sisteme entegre ettiğiniz mail adresleri üzerinden gelen kayıtların ayrıştırılması çağrı modülünde yapılabilir." },
  { title: "Olay / Ticket Yönetimi Modülü", description: "Olay Yönetimi,hizmetlerinin kesintiye uğradığı ya da performansının düştüğü durumları ele alır ve bu olayların en kısa sürede çözülmesini hedefler. Kullanıcılar veya sistemler tarafından bildirilen olaylar kaydedilir, sınıflandırılır, önceliklendirilir ve çözüm süreci başlatılır. Amaç, hizmetlerin normale döndürülerek iş üzerindeki olumsuz etkilerin en aza indirilmesidir." },
  { title: "SLA / Servis Seviye Yönetim Modülü", description: "Geliştiricilerimiz tarafından icat edilen önceliklendirme kural motoru tarafından sağlanan yüksek düzeyde özelleştirilebilir ve gelişmiş SLA otomasyon yetenekleri." },
  { title: "Görev Yönetim Modülü", description: "Kaynakları proaktif olarak yönetmek için tüm görevlerin süreçler aracılığıyla birleştirilmiş görev yönetimi ve merkezi koordinasyonu." },
  { title: "Görev Ajanda Modülü", description: "Görevlerinizi aylık ve günlük görünümlerde saat aralıkları ile takip edebilirsiniz." },
  { title: "Görev Kanban Panoları", description: "Görevlerinizi sürekle bırak ile kanban pano seçeneği ile yönetebilirsiniz." },
  { title: "İş Kayıtları / Time Sheet Yönetimi", description: "Karşılanan kayıtlar içerisinde iş kayıtlarınızı tutabilir ve o kayıt için toplam efor sürelerini hesaplayabilirsiniz." },
  { title: "Bilgi Yönetimi Modülü", description: "Servis Bilgi Yönetim Sistemi, hem teknik ekip hem de kullanıcılar için çözümleri ve makaleleri bulmayı ve ilişkilendirmeyi kolaylaştırır." },
  { title: "Self Servis Portal", description: "Kullanıcıların olaylarını, isteklerini, değişikliklerini, varlıklarını ve destek ekiplerinizle olan tüm etkileşimlerini izleyebilmeleri için portal." },
  { title: "Sınırsız E-mail Yakalayıcı", description: "Servicecore, sınırsız e-posta tanımlama özelliği sayesinde, gelen e-postalar üzerinden otomatik kayıt oluşturulmasını sağlar. Bu sayede kayıt oluşturma süreçleri hızlanır, müdahale süreleri kısalır ve operasyonel verimlilik artar." },
  { title: "E-Posta ile Otomatik Kayıt Açma", description: "Servicecore, gelen e-postalardan otomatik kayıt açma özelliği ile kayıt oluşturma süreçlerini hızlandırır, müdahale sürelerini kısaltır ve operasyonel verimliliği artırır." },
  { title: "E-Posta,SMS,Web Bildirim Şablonları", description: "Servicecore, açılan kayıtlar için kullanıcılara ve teknisyenlere anlık e-posta bildirimleri göndererek hızlı bilgilendirme sağlar. Bu sayede süreçler kesintisiz ilerler ve müdahale süreleri minimuma iner." },
  { title: "Olay, Görev, İş Günlüğü Şablonları", description: "Servicecore'un şablon yapısı sayesinde, kayıt oluşturma süreçleri standartlaşır ve hız kazanır. Tekrar eden işlemler için zaman kaybı ortadan kalkar, verimlilik artar." },
  { title: "Çoklu Panolar - Widget Sihirbazları", description: "ServiceCore, ITIL4 uyumlu raporlama modülüyle süreç ve servis verilerini anlamlı bilgilere dönüştürerek performansı ölçer ve iyileştirme alanlarını tespit eder. Hazır raporlar, dinamik panolar ve Service Report Wizard sayesinde stratejik, operasyonel ve analitik raporlamalar kolayca yapılabilir. Sürekli iyileştirme için gereken veri odaklı yönetim bu sayede sağlanır." },
  { title: "Time Engine (Otomatik Süre Yönetimi)", description: "Servicecore'un otomatik süre hesaplama özelliği sayesinde işlemlerin başlangıç ve bitiş süreleri anlık olarak takip edilir, performans ölçümleri kolayca yapılır ve süreç yönetimi daha verimli hale getirilir." },
  { title: "Genel Yönetim Modülü", description: "Servicecore’un esnek ve kapsamlı ayar seçenekleriyle iş süreçlerinizi kolaylaştırın! Genel ayarlardan SLA politikalarına, varlık yönetiminden hizmet kataloglarına kadar her detayı özelleştirerek operasyonlarınızı optimize edin ve üstün kullanıcı deneyimi sunun. Tüm departmanlar için entegre, otomatik ve etkili bir çözümle tanışın!" },
  { title: "Sınırsız AD Senkronizasyonu", description: "Dilediğiniz kadar AD hesabı entegre ederek sınırsız kullanıcıyı Servicecore'da yetkilendir." },
  { title: "Rol Yönetimi", description: "Teknisyenlere farklı yetkiler tanımlanarak uygulama içinde yalnızca ilgili alanlara erişim sağlanır. Bu sayede güvenli ve verimli bir görev dağılımı gerçekleştirilir." },
  { title: "İş Saatleri Yönetimi", description: "İş saatleri ile sistemde SLA'leri yönetebilir. İş saatlerine göre gruplar oluşturabilirsiniz." },
  { title: "Hazır Cevaplar", description: "Hazır cevap özelliği ile gelen maillere hızlı dönüşler sağlayarak verimliliği arttır." },
  { title: "Otomatik Teknisyen Atama", description: "Otomatik atama özelliği ile iş yüküne veya sıralı atama şeklinde gelen kaydı direkt teknisyene yönlendir. Kayıt müdahale süresini azalt." },
  { title: "Zamanlanmış Olaylar", description: "Periyodik olarak oluşan olay kayıtları yaratabilir ve düzenli müdahalede bulunabilirsiniz." },
  { title: "Anket Yönetimi", description: "Servicecore'un anket yönetimi özelliği ile kullanıcı memnuniyeti ve hizmet kalitesi kolayca ölçümlenir. Otomatik gönderilen anketler sayesinde geri bildirim toplanır, analiz edilir ve sürekli iyileştirme sağlanır." },
  { title: "Multitenant Yapı (Sadece ESM)", description: "Servicecore'un içindeki tüm hizmet süreçlerini ve bu süreçlere odaklanan bir yaklaşımı ifade eder. Bu, Servicecore'un sadece IT (Bilgi Teknolojileri) departmanı için değil, aynı zamanda diğer departmanlar ve iş birimleri için de hizmet yönetimi uygulamalarını içerir. Servicecore ESM yaklaşımı, bir şirketin genel hizmet verimliliğini ve müşteri memnuniyetini artırmayı amaçlar." }
];

const proExtraModules: PricingFeature[] = [
  { title: "İstek & Servis Katalog Modülü", description: "Kullanıcı isteklerinin karşılandığı bu modülde ITIL4 en güncel istek yönetimi pratiklerine uyumlu modern bir istek karşılama ve sunum süreci simule edilmiştir." },
  { title: "Problem Yönetimi Modülü", description: "Problem yönetimi uygulamasının amacı, sorunların olasılığını ve etkisini azaltmaktır. Olayların gerçek ve olası nedenlerini belirleyerek, geçici çözümleri ve bilinen hataları yönetmektir." },
  { title: "Değişiklik Yönetimi Modülü", description: "Bu modülde değişiklik talepleri Olay, Problem, İstek gibi farklı modüllerden entegre edilerek alınmakta ve geriye dönük ilişkiler takip edilebilmektedir." },
  { title: "Varlık Yönetimi ve CMDB Modülü", description: "Varlıkların yaşam döngüsü boyunca durumlarının, sahipliklerinin, finansal bilgilerinin takip edildiği bir uygulama modülü ile güncel aktif ve geçerli bilgilere sürekli erişim ile işlerinizi kolaylaştırın." },
  { title: "Sözleşme Yönetimi Modülü", description: "Servicecore, işletmelerin operasyonel süreçlerini yönetmelerine yardımcı olan güçlü bir yazılım platformudur. İçerisinde yer alan Sözleşme Yönetimi Modülü, sözleşme süreçlerini daha etkin ve organize bir şekilde yönetmek için geliştirilmiştir." },
  { title: "Sürekli İyileştirme Modülü (CSI)", description: "ITIL4’e göre servis yönetiminin bitmeyen bir sürekli iyileştirme metodu ile uygulanması gerekir. Sürekli iyileştirme ITIL4’ün ana uygulama metodolojisidir." },
  { title: "Servis Otomasyon Modülü", description: "Kolayca tanımlanabilen kurallar ile koşullara bağlı aksiyonlar otomatik yapılabilmekte ve bu sayede tüm servis kayıtlarının dinamik olarak güncellenmesi ve akışların hızlanması sağlanmaktadır." },
  { title: "Entegrasyonlar için API Modülü", description: "Servicecore API entegrasyonu, farklı yazılım uygulamaları arasında etkin iletişim sağlayan ve veri alışverişini kolaylaştıran restAPI teknolojisini kullanan bir yapıdır. Bu entegrasyonlar, farklı platformlar arasında veri aktarımını hızlandırarak iş süreçlerinin optimize edilmesine ve verimliliğin artırılmasına yardımcı olur." }
];

const proOnlyFeatures: PricingFeature[] = [
  { title: "İş Akışları ve Onay Akışları Yönetimi", description: "Servicecore onay iş akışları, akış şemaları ve diyagramlar aracılığıyla oluşturulur ve görsel olarak temsil edilir. Bu iş akışları, onay süreçlerini otomatikleştirmek ve optimize etmek için sıkça kullanılır. Böylece sistem onaylarını yönetmek ve izlemek daha kolay hale gelir. Onay iş akışları, verimliliği artırmak, hataları azaltmak ve karmaşık süreçleri iyi organize etmek için kullanışlı bir araçtır." },
  { title: "Onay ve Danışma Kurulları Yönetimi", description: "ServiceCore, işletmelerin onay süreçlerini daha düzenli ve hızlı yönetebilmeleri için Onay Grupları özelliğini sunar. Bu yapı, belirli süreçler için onay veren ve danışmanlık sağlayan kişileri tanımlayıp, onay mekanizmalarında kullanmayı kolaylaştırır." },
  { title: "Özel Ek Alanlar ve Custom Formlar", description: "Her işletmenin kendine özgü süreçleri ve ihtiyaçları vardır. ServiceCore, bu ihtiyaçlara tam uyum sağlayabilmeniz için Özel Ek Alanlar özelliğini sunar. Bu özellik sayesinde, standart formları geliştirerek işletmenize özel kayıt formları oluşturabilir ve süreçlerinizi daha verimli hale getirebilirsiniz." },
  { title: "Low Code Form Design ve Yönetimi", description: "ServiceCore, yenilikçi Low-Code Form Oluşturma özelliği ile işletmenizin ihtiyaçlarına uygun özel formlar oluşturmanızı kolaylaştırır. Teknik bilgiye ihtiyaç duymadan, sürükle-bırak yöntemiyle hızlı ve etkili çözümler üretebilirsiniz." },
  { title: "Mobile ITSM Modülü Kullanımı", description: "ServiceCore, mobil native uygulaması ile tüm teknisyen ve end user işlemleri yapılabilmektedir." },
  { title: "Azure AD / SAML / SSO", description: "ServiceCore, modern iş gereksinimlerine uygun olarak geliştirilmiş bir platformdur ve güçlü kimlik doğrulama yöntemlerini destekler. Platform, Azure Active Directory (Azure AD), SAML (Security Assertion Markup Language) ve Single Sign-On (SSO) teknolojileriyle sorunsuz entegrasyon sağlar." },
  { title: "Validasyonlar/Süreç Doğrulama Kontrolleri", description: "ServiceCore, iş süreçlerinizin düzenli ve eksiksiz bir şekilde yürütülmesini sağlamak için güçlü Zorunlu Alan Validasyonu özellikleri sunar. Bu özellik sayesinde, farklı modüllerde (varlık, değişiklik, olay, problem, iyileştirme, görev, işbirlikleri, proje gibi) belirli alanların doldurulmasını zorunlu hale getirebilirsiniz." },
  { title: "Olay, Problem, Değişiklik, Proje, CI, Görev, İş Günlüğü Şablonları", description: "ServiceCore, iş süreçlerinizi daha şeffaf ve verimli hale getirmek için kapsamlı bir Worklog Yönetimi sunar. Bu özellik, kayıtlar içerisine eklenen iş günlüklerini detaylı bir şekilde takip etmenizi ve bu verilerden yola çıkarak efor hesaplamaları yapmanızı sağlar." },
  { title: "Zamanlanmış Raporlar", description: "ServiceCore, kullanıcıların raporları belirli zaman dilimlerinde otomatik olarak almasını sağlayan Zamanlanmış Rapor özelliği sunar. Bu özellik, raporlama sürecini daha verimli hale getirir ve verilerin düzenli aralıklarla toplanmasını sağlar." },
  { title: "Döküm Raporları", description: "ServiceCore, tüm modüller üzerinden kapsamlı raporlar almanızı sağlayan Döküm Raporları özelliği sunar. Bu özellik, her modülde yer alan verileri detaylı bir şekilde döküm formatında çıkararak, işletmenizin analiz ve raporlama ihtiyaçlarını karşılar." },
  { title: "Dinamik Raporlar", description: "ServiceCore, kullanıcıların farklı filtreler ve kolon yapıları kullanarak tamamen özelleştirilmiş raporlar oluşturabilmesini sağlayan Dinamik Raporlar özelliği sunar. Bu özellik, kullanıcıların ihtiyaçlarına göre veri analizini kişiselleştirmelerini ve daha detaylı, anlamlı raporlar elde etmelerini sağlar." },
  { title: "Zimmet Formları ve Onay Sistemi", description: "ServiceCore, zimmetli varlıkları yönetmek ve bu varlıklar üzerinden kabul onaylarını almak için Zimmet Formları oluşturmanıza olanak tanır. Bu özellik, varlıkların doğru bir şekilde izlenmesini sağlar ve işletmeniz içindeki eşyaların kabul ve onay süreçlerini düzenler." },
  { title: "Zamanlanmış İstekler", description: "Periyodik olarak oluşan istek kayıtları yaratabilir ve düzenli müdahalede bulunabilirsiniz." },
  { title: "Çoklu Dil Desteği", description: "ServiceCore, global kullanıcılar için Çoklu Dil Desteği sunarak, farklı dillerde çalışma imkanı sağlar. Bu özellik, kullanıcıların kendi tercihlerine göre platformu farklı dillerde kullanabilmelerini ve daha verimli bir deneyim elde etmelerini mümkün kılar." },
  { title: "Vardiya Yönetimi Modülü", description: "Vardiya Yönetimi Modülü, mevcut olay ve servis talebi kayıtlarının atandığı teknisyen gruplarına bağlı olarak, belirlenen koşullar çerçevesinde santral aramalarının yönetimini sağlayan bir çözümdür. Bu modül sayesinde kritik kayıtlar için teknisyenlerin telefonla otomatik olarak bilgilendirilmesi ve operasyonel süreçlerin aksamadan ilerlemesi hedeflenir." },
  { title: "Multitenant Yapı (ESM versiyon ile)", description: "Servicecore'un içindeki tüm hizmet süreçlerini ve bu süreçlere odaklanan bir yaklaşımı ifade eder. Bu, Servicecore'un sadece IT (Bilgi Teknolojileri) departmanı için değil, aynı zamanda diğer departmanlar ve iş birimleri için de hizmet yönetimi uygulamalarını içerir. Servicecore ESM yaklaşımı, bir şirketin genel hizmet verimliliğini ve müşteri memnuniyetini artırmayı amaçlar. ESM versiyonda alt tenantlarda üye olan her bir teknisyen tenant bazında ayrı lisanslanmaktadır." },
  { title: "Multi Company / Holding Yapısı (ESM versiyon ile)", description: "ServiceCore ESM (Enterprise Service Management), şirket içindeki tüm hizmet süreçlerini yönetmek için entegre bir yaklaşım sunar. Bu, sadece IT (Bilgi Teknolojileri) departmanı ile sınırlı kalmaz, aynı zamanda diğer departmanlar ve iş birimlerinin hizmet yönetimi uygulamalarını da kapsar. ServiceCore'un ESM yaklaşımı, organizasyonun genel verimliliğini artırmayı ve müşteri memnuniyetini yükseltmeyi hedefler. ESM versiyonda alt tenantlarda üye olan her bir teknisyen tenant bazında ayrı lisanslanmaktadır." }
];

type AddonItem = { name: string; desc?: string; link?: string };
type AddonCategory = { title: string; items: AddonItem[] };

const addonCategories: AddonCategory[] = [
  {
    title: "Eklenebilecek Yönetim Modülleri",
    items: [
      { name: "Proje Yönetimi Modülü", desc: "ITIL4 ile birlikte proje yönetimi süreci ITSM’in doğal bir parçası ve zorunlu bir pratiği haline gelmiştir. Projelerin doğuşu her zaman iyileştirme, değişiklik, istek gibi süreçler tarafından tetiklenmektedir." },
      { name: "Servis İlişkileri Yönetimi Modülü", desc: "Gelişmiş otomasyon özellikleri ile servislerinizi standartlaştırın ve müşteri hizmetlerinizi uçtan uca dijitalleştirin." }
    ]
  },
  {
    title: "Eklentiler (Add-ons)",
    items: [
      { name: "Asset Discovery Add-on", desc: "Ağ üzerindeki tüm BT varlıklarını otomatik keşfeder; envanteri ve CMDB'yi sürekli güncel tutar. Detaylı bilgi için Discovery modülü sayfasını inceleyin.", link: "/discovery" },
      { name: "VMware Varlık Keşif Eklentisi", desc: "VMware ortamındaki sanal makineleri ve altyapıyı otomatik keşfetmenize olanak tanır. IT varlık yönetimini verimli hale getirir ve yapılandırma yönetimini güçlendirir." },
      { name: "MS Teams Eklentisi", desc: "Microsoft Teams ile entegre olarak, hizmet yönetimi ve işbirliği süreçlerini daha verimli hale getirir." },
      { name: "Task Calendar Sync Eklentisi", desc: "Kullanıcıların Microsoft Exchange takvimlerini ve e-posta sistemlerini ServiceCore platformu ile entegre ederek verimli hizmet yönetimi yapmalarını sağlar." },
      { name: "Failover / Cluster Sistem Add-on", desc: "Yüksek erişilebilirlik ve kesintisiz hizmet için ServiceCore platformunun yedekli bir yapıda çalışmasına olanak tanır." },
      { name: "Disaster Center Add-on", desc: "Şirketlerin olası felaket durumlarına karşı hazırlıklı olmalarını sağlamak amacıyla, hizmet yönetimi süreçlerini güvence altına alır." },
      { name: "Sandbox / Test Sistem Add-on", desc: "Değişikliklerin ve yeniliklerin gerçek ortamda uygulanmadan önce güvenli bir şekilde test edilmesini sağlar." }
    ]
  },
  {
    title: "Entegrasyonlarla Sunulan Çözümler",
    items: [
      { name: "Servis Analitiği Çözümleri", desc: "PowerBI Entegre Add-on." },
      { name: "Event Yönetimi Çözümleri", desc: "IT Monitoring Entegre Add-on." },
      { name: "Sürüm Yönetimi Çözümleri", desc: "SDLC ve DevOps Entegrasyonları." },
      { name: "GRC Çözümleri", desc: "Risk, Audit, Compliance Add-on." },
      { name: "Migration Çözümleri", desc: "ITSM Veri, Konfig, Flow Taşıma." }
    ]
  }
];

// --- Internal Components ---

const FeatureAccordion = ({ feature, isPro = false, isHighlight = false }: { feature: PricingFeature, isPro?: boolean, isHighlight?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) rounded-sm cursor-pointer z-10 relative"
        tabIndex={0}
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className={`w-4 h-4 shrink-0 transition-colors ${
            isHighlight ? "text-(--color-accent-emerald-light)" : isPro ? "text-(--color-brand-primary)" : "text-(--color-text-secondary)"
          }`} />
          <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
            {feature.title}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-(--color-text-muted) transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-7 text-xs text-(--color-text-secondary) font-light leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export function PricingSection() {
  return (
    <section id="pricing" className="relative w-full py-24 overflow-hidden bg-(--color-surface-base-dark)">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/4 -left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-[20%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-(--color-brand-primary)/10 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          transition={{ duration: 0.7 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-(--color-brand-primary)/10 to-emerald-500/10 border border-white/10  mb-6">
            <Sparkles className="w-4 h-4 text-(--color-brand-primary)" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">Versiyonlar ve Kapsam</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight">
            İhtiyacınıza uygun <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light) font-bold">
              lisans modelini seçin.
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-(--color-text-secondary) font-light leading-relaxed">
            Minimum 10 teknisyen ile başlayın. Single Tenant veya ESM (Multi Tenant) mimarisiyle, ister Onpremises ister Bulut kurulumu tercih edin.
          </p>

          {/* Pricing Model Info Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/2 border border-white/5 text-sm text-(--color-text-overline)">
                <Building2 className="w-4 h-4 text-(--color-brand-primary)" />
                Onpremises veya Bulut Kurulum
             </div>
             <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/2 border border-white/5 text-sm text-(--color-text-overline)">
                <InfinityIcon className="w-4 h-4 text-(--color-accent-emerald-light)" />
                Yıllık Abonelik Modeli
             </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid - 2 Columns Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start">
          
          {/* 1. Standart Versiyon */}
          <motion.div
            transition={{ duration: 0.6 }}
            className="flex flex-col rounded-4xl bg-(--color-surface-elevated-dark) border border-white/10 p-8 md:p-10  relative group transition-colors"
          >
            {/* Header Area */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2.5 rounded-lg bg-slate-800/50 border border-white/5">
                    <ShieldCheck className="w-6 h-6 text-(--color-text-overline)" />
                 </div>
                 <h3 className="text-2xl font-bold text-white">Standart Versiyon</h3>
              </div>
              
              <p className="text-(--color-text-secondary) text-sm leading-relaxed mb-6 h-16">
                Service Desk ve ITIL4 temel süreçlerine ihtiyaç duyan organizasyonlar için en uygun başlangıç paketi.
              </p>
              
              <button className="w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer">
                 <MessageSquare className="w-4 h-4" />
                 Teklif İsteyin
              </button>
            </div>

            <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-8" />

            {/* Features Info Box - Standart (Green Theme) */}
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-100/80 font-light leading-relaxed flex items-start gap-3">
               <div className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent-emerald-base)" />
               <span>Küçük ve orta ölçekli Hizmet Sağlayıcılara uygundur. Olay yönetimi, görev yönetimi ve iş günlükleri gibi temel ITIL4 uygulamalarını kapsar.</span>
            </div>

            {/* Features Accordion List */}
            <div className="flex flex-col gap-1">
               <h4 className="text-xs font-semibold text-(--color-text-secondary) mb-4 px-1 uppercase tracking-wider">Temel Modüller ({standardFeatures.length})</h4>
               <div className="pr-2 max-h-150 overflow-y-auto green-scrollbar pb-4">
                  {standardFeatures.map((feat, idx) => (
                      <FeatureAccordion key={idx} feature={feat} />
                  ))}
               </div>
            </div>

             {/* Footer Info Box */}
            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-(--color-text-muted) leading-relaxed font-light">
               * Standart versiyona, Profesyonel versiyon modüllerinden veya eklentilerden istenilenler tekil olarak eklenebilir. Minimum 10 teknisyen zorunluluğu bulunmaktadır.
            </div>
          </motion.div>


          {/* 2. Profesyonel Versiyon */}
          <motion.div
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col rounded-4xl bg-linear-to-b from-(--color-brand-primary)/8 to-(--color-surface-base-dark) border border-(--color-brand-primary)/30 p-8 md:p-10  relative group shadow-(--shadow-glow-primary-card)"
          >
             {/* Clipping Wrapper for Background Glow */}
            <div className="absolute inset-0 rounded-4xl overflow-hidden pointer-events-none">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-(--color-brand-primary)/15 to-transparent rounded-full pointer-events-none" />
            </div>

            {/* Pro Highlight Label */}
            <div className="absolute -top-4 -right-2 md:right-8 z-20">
                <div className="relative">
                   <div className="absolute inset-0 bg-(--color-brand-primary) blur-md opacity-60 rounded-full" />
                   <div className="relative bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-blue-base) text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-xl ring-1 ring-white/20 whitespace-nowrap">
                      En Çok Tercih Edilen
                   </div>
                </div>
            </div>

            {/* Header Area */}
            <div className="mb-8 relative z-10 pt-2">
               <div className="flex items-center gap-3 mb-4">
                 <div className="p-2.5 rounded-lg bg-(--color-brand-primary)/20 border border-(--color-brand-primary)/30">
                    <Zap className="w-6 h-6 text-(--color-brand-primary)" />
                 </div>
                 <h3 className="text-2xl font-bold text-white">Profesyonel Versiyon</h3>
              </div>
              
              <p className="text-blue-100/90 text-sm leading-relaxed mb-6 h-16 font-medium">
                Enterprise ESM/ITSM özelliklerine ve gelişmiş pratiklere ihtiyaç duyan kuruluşlar için kurumsal paket.
              </p>
              
              <button className="w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full bg-(--color-brand-primary) hover:bg-(--color-brand-primary-hover) text-white font-semibold transition-all duration-300 shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer">
                 <MessageSquare className="w-4 h-4" />
                 Teklif İsteyin
              </button>
            </div>

            <div className="w-full h-px bg-linear-to-r from-(--color-brand-primary)/30 via-(--color-brand-primary)/20 to-transparent mb-8" />

            {/* Features Info Box - Pro (Blue Theme) */}
            <div className="mb-6 flex items-start gap-3 px-4 py-3.5 rounded-xl bg-(--color-brand-primary)/15 border border-(--color-brand-primary)/30 shadow-(--shadow-glow-primary-weak)">
               <Plus className="w-4 h-4 text-(--color-brand-primary) mt-0.5 shrink-0" />
               <span className="text-sm text-blue-100/90 leading-relaxed font-medium">Standart versiyondaki <strong>tüm özellikleri dönemsel sınırlar olmadan</strong> kapsar.</span>
            </div>

            {/* Scrollable Features Area */}
            <div className="flex flex-col gap-6 pr-2 max-h-125 overflow-y-auto blue-scrollbar pb-4 relative z-10">
               
               {/* Ek Modüller */}
               <div>
                  <h4 className="text-xs font-semibold text-(--color-brand-primary) mb-3 px-1 uppercase tracking-wider">Ek Pro Modüller ({proExtraModules.length})</h4>
                  <div className="flex flex-col gap-0.5">
                     {proExtraModules.map((feat, idx) => (
                         <FeatureAccordion key={idx} feature={feat} isPro={true} />
                     ))}
                  </div>
               </div>

               {/* Proya Özgü Modüller */}
               <div>
                  <h4 className="text-xs font-semibold text-(--color-accent-emerald-light) mb-3 px-1 uppercase tracking-wider flex items-center gap-2">
                     <Sparkles className="w-3 h-3" />
                     Pro Versiyona Özgü ({proOnlyFeatures.length})
                  </h4>
                  <div className="flex flex-col gap-0.5">
                     {proOnlyFeatures.map((feat, idx) => (
                         <FeatureAccordion key={idx} feature={feat} isHighlight={true} />
                     ))}
                  </div>
               </div>

            </div>

             {/* Footer Info Box */}
             <div className="mt-8 pt-6 border-t border-(--color-brand-primary)/20 text-xs text-slate-400/80 leading-relaxed font-light relative z-10">
               * Standart lisansın en az %25&apos;i kadar Pro lisans ile hibrit kurulum yapılabilmektedir. ESM versiyonunda tenant başına bağımsız lisanslama mümkündür.
            </div>

          </motion.div>

        </div>

        {/* Add-ons & Solutions Section (Bottom Row) */}
        <motion.div
           transition={{ duration: 0.6, delay: 0.4 }}
           className="w-full rounded-4xl bg-(--color-surface-addon) border border-white/5 p-8 md:p-12 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-fuchsia-500/50 to-transparent opacity-50" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-fuchsia-400 shrink-0">
                  <Blocks className="w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">Eklentiler ve Çözümler</h3>
                  <p className="text-(--color-text-secondary) text-sm md:text-base leading-relaxed max-w-3xl">
                     Standart veya Profesyonel versiyonlara ek olarak (Add-on) seçilip mevcut lisansınıza entegre edilebilecek ileri seviye yönetim modülleri ve dış sistem entegrasyonları.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
               {addonCategories.map((category, idx) => (
                  <div key={idx} className="flex flex-col">
                     <h4 className="text-sm font-semibold text-white mb-6 border-b border-white/10 pb-4 uppercase tracking-wider">{category.title}</h4>
                     <ul className="flex flex-col gap-4">
                        {category.items.map((item, itemIdx) => {
                          const link = "link" in item ? (item as { link?: string }).link : undefined;
                          const inner = (
                            <div className="flex items-start gap-3">
                              <div className="mt-1.5 w-1 h-1 rounded-full bg-fuchsia-500/50 group-hover:bg-fuchsia-400 transition-colors shrink-0" />
                              <div className="flex-1">
                                <span className="text-[13px] font-medium text-(--color-text-overline) group-hover:text-white transition-colors flex items-center gap-1.5">
                                  {item.name}
                                  {link && <ArrowUpRight className="w-3.5 h-3.5 text-fuchsia-400 opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true" />}
                                </span>
                                {item.desc && (
                                  <span className="text-xs text-(--color-text-muted) mt-1.5 block leading-relaxed group-hover:text-(--color-text-secondary) transition-colors">
                                    {item.desc}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                          return (
                            <li key={itemIdx} className="group relative pr-4">
                              {link ? (
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block cursor-pointer"
                                >
                                  {inner}
                                </a>
                              ) : (
                                inner
                              )}
                            </li>
                          );
                        })}
                     </ul>
                  </div>
               ))}
            </div>
        </motion.div>

      </div>
    </section>
  );
}
