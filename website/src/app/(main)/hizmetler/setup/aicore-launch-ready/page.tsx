import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Boxes,
  ClipboardCheck,
  Database,
  GraduationCap,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react";
import PrivacyContact from "@/components/ui/privacy-contact";
import {
  KalibrasyonMock,
  KurulumTimeline,
  TeslimatPanosu,
} from "@/components/hizmetler/AicoreSetupVisuals";

const ACCENT = "purple";

const ASAMALAR = [
  {
    icon: ClipboardCheck,
    title: "1. Keşif ve Hazırlık",
    desc: "Altyapı gereksinimleri doğrulanır: sunucu/GPU kademesi, işletim sistemi, ağ erişimleri. ServiceCore tarafında eklenti bazlı yetkilendirilmiş servis hesabı tanımlanır; seçilen eklentilere göre ek erişimler (doküman kaynakları, izleme sistemleri, çağrı altyapısı) planlanır. Veri ve gizlilik modu netleştirilir.",
  },
  {
    icon: ServerCog,
    title: "2. Yapay Zekâ Sunucusunun Kurulumu",
    desc: "Yapay zekâ katmanı konteyner tabanlı olarak müşteri sunucusuna kurulur; yerel dil modelleri (çift model mimarisi: canlı işlemler + derin analiz) devreye alınır. Kurulum tamamlandığında sistem internetsiz — kapalı ağda — çalışabilir; veri kurum dışına çıkmaz.",
  },
  {
    icon: Database,
    title: "3. Veri Bağlantısı ve Dizinleme",
    desc: "Kayıt arşivi ve bilgi bankası yapay zekâ katmanına bağlanır; arama dizinleri oluşturulur. Bu adımın sonunda sistem kurumunuzun geçmiş bilgisini görmeye başlar — her önerinin dayanağı bu arşivden gelir.",
  },
  {
    icon: Zap,
    title: "4. Kalibrasyon — kuruma özel ayar",
    desc: "Her kurumun kayıt dili ve veri dağılımı farklıdır; karar ayarları hazır değerlerle değil, kurumunuzun kendi kayıtları ölçülerek yapılır. Kalibrasyon sonunda kuruma özel bir doğrulama seti oluşturulur ve dondurulur: sonraki her güncellemede sistem davranışı bu setle otomatik denetlenir.",
  },
  {
    icon: UserCheck,
    title: "5. Onay Paneli ve Yetkilendirme",
    desc: "İnsan onayı gerektiren akışlar (bilgi kartı yayını, kural onayı, birleştirme kararları) için onay paneli kurulur; kurumunuzun kimlik sistemine (SSO) bağlanır ve roller tanımlanır. Yapay zekânın hangi adımda insana danıştığı bu panelden izlenir.",
  },
  {
    icon: GraduationCap,
    title: "6. Eğitim",
    desc: "Üç ayrı eğitim oturumu: teknisyenler için günlük kullanım ve geri bildirim akışı; onaycılar (uzmanlar) için panel ve kart/kural inceleme pratiği; yöneticiler için sağlık ve değer raporlarının okunması. Eğitim materyali kurumda kalır.",
  },
  {
    icon: Rocket,
    title: "7. Gözetimli Canlıya Alış",
    desc: "Kademeli açılış: önce seçili ekip veya kategori, ardından tüm kapsam. İlk hafta davranış yakından izlenir, ince ayar yapılır; kullanım, isabet ve zaman kazancı metrikleri devreye alınır. Sayfa kapanırken elinizde ölçülebilir bir sistem olur.",
  },
];

const TESLIMATLAR = [
  { icon: ServerCog, title: "Kurulu yapay zekâ katmanı", desc: "Konteyner tabanlı, yedeklenebilir, ServiceCore'dan bağımsız ölçeklenen kurulum." },
  { icon: Zap, title: "Kalibrasyon raporu", desc: "Ölçülen karar eşikleri, skor dağılımı ve seçim gerekçeleri — denetlenebilir." },
  { icon: ShieldCheck, title: "Doğrulama seti", desc: "Kuruma özel dondurulmuş test seti; her güncellemede otomatik koşulur." },
  { icon: UserCheck, title: "Onay paneli", desc: "SSO'ya bağlı, rolleri tanımlı insan onay ekranı." },
  { icon: BookOpenCheck, title: "Eğitim materyali", desc: "Teknisyen, onaycı ve yönetici oturumlarının dokümanları." },
  { icon: Boxes, title: "Canlıya alış raporu", desc: "İlk hafta gözlem sonuçları + başarı metrikleri panosu." },
];

const HAFTALAR = [
  { donem: "Hafta 1", baslik: "Keşif + yapay zekâ sunucusunun kurulumu", detay: "Altyapı doğrulama, servis hesabı, konteyner kurulum, yerel modeller devrede" },
  { donem: "Hafta 2", baslik: "Veri bağlantısı + dizinleme", detay: "Kayıt arşivi ve bilgi bankası bağlanır, arama dizinleri oluşur" },
  { donem: "Hafta 2-3", baslik: "Kalibrasyon + onay paneli", detay: "Karar eşikleri kurumun verisiyle ölçülür, doğrulama seti dondurulur, panel SSO'ya bağlanır", current: true },
  { donem: "Hafta 4", baslik: "Eğitim + gözetimli canlıya alış", detay: "Üç eğitim oturumu, kademeli açılış, ilk hafta yakın takip" },
];

const PANO = [
  { text: "Yapay zekâ sunucusu kuruldu — çift model devrede, kapalı ağ doğrulandı", durum: "tamam" as const },
  { text: "Kayıt arşivi ve bilgi bankası dizinlendi (48.200 kayıt · 1.150 makale)", durum: "tamam" as const },
  { text: "Kalibrasyon tamamlandı — karar eşikleri ölçüldü, doğrulama seti donduruldu", durum: "tamam" as const },
  { text: "Onay paneli SSO ile açıldı — 4 onaycı, 2 yönetici tanımlı", durum: "tamam" as const },
  { text: "Eğitimler verildi — 22 teknisyen, 4 onaycı, 3 yönetici", durum: "tamam" as const },
  { text: "Gözetimli canlıya alış — 1. hafta yakın takip sürüyor", durum: "aktif" as const },
];

export default function AicoreLaunchReadyDetailPage() {
  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.20), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32">
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8">
            <Sparkles className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-accent-purple-light)">
              SETUP · AICORE LAUNCH READY
            </span>
          </div>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/3 text-[10px] font-mono font-semibold tracking-[0.18em] text-white/70">
            SCAILRCP
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/3 text-[10px] font-mono font-semibold tracking-[0.18em] text-white/70">
            TEK SEFERLİK
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          AICore için{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-accent-purple-light) to-(--color-brand-accent)">
            anahtar teslim kurulum
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          Yapay zekâ sunucusunun kurulumundan kurumunuzun kendi verisiyle
          kalibrasyona; onay paneli, ekip eğitimi ve gözetimli canlıya alışa
          kadar uçtan uca devreye alma hizmeti.
        </p>

        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
          Yapay zekâ eklentisi kurmak, klasik yazılım kurulumundan bir adım
          fazlasını ister: sistemin kurulması yetmez, kurumunuzun diline ve
          verisine göre ayarlanması, ekibinizin ona güvenmeyi öğrenmesi gerekir.
          Launch Ready bu işlerin tamamını tek pakette birleştirir. ServiceCore
          uygulama ve veritabanı sunucularına dokunulmaz; yapay zekâ katmanı
          ayrı bir sunucuda kurulur, ServiceCore ile güvenli iç ağ üzerinden konuşur.
        </p>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
          {[
            { v: "2-4 hafta", l: "tipik devreye alma" },
            { v: "7 aşama", l: "keşiften canlıya" },
            { v: "1 altyapı", l: "tüm AICore eklentileri" },
            { v: "Kapalı ağ", l: "internetsiz çalışma" },
          ].map((k) => (
            <div key={k.l} className="rounded-2xl border border-white/8 bg-white/2 px-5 py-4">
              <div className="text-xl font-semibold text-white tracking-tight">{k.v}</div>
              <div className="mt-1 text-[11px] font-mono text-(--color-text-muted)">{k.l}</div>
            </div>
          ))}
        </div>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            NASIL İLERLER
          </div>
          <KurulumTimeline
            accent={ACCENT}
            title="Kurulum Zaman Çizelgesi"
            meta="tipik 4 haftalık plan"
            items={HAFTALAR}
          />
          <p className="mt-3 text-[11px] font-mono text-(--color-text-muted)">
            Sahnede sentetik plan verisi kullanılmıştır; gerçek takvim keşif sonunda netleşir.
          </p>
        </section>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            YEDİ AŞAMA
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASAMALAR.map((a) => (
              <div key={a.title} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light)">
                    <a.icon className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-semibold text-white tracking-tight">{a.title}</h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            KALİBRASYON · İŞİN KALBİ
          </div>
          <p className="mb-6 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Launch Ready&apos;yi sıradan bir kurulumdan ayıran adım budur: yapay
            zekânın &quot;önereyim mi, uzmana mı devredeyim, dürüstçe susayım mı?&quot;
            kararını veren eşikler, kurumunuzun kendi kayıtları ölçülerek ayarlanır.
          </p>
          <KalibrasyonMock accent={ACCENT} />
        </section>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            TESLİMATLAR
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESLIMATLAR.map((t) => (
              <div key={t.title} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) mb-4">
                  <t.icon className="w-4 h-4" />
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">{t.title}</h3>
                <p className="text-[13px] font-light leading-relaxed text-(--color-text-secondary)">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            TESLİM GÜNÜ NASIL GÖRÜNÜR
          </div>
          <TeslimatPanosu
            accent={ACCENT}
            title="Canlıya Alış Panosu"
            meta="örnek kurulum · 4. hafta"
            items={PANO}
            kpis={[
              { label: "Eklenti", value: "3", trend: "devrede" },
              { label: "Eğitilen Kişi", value: "29", trend: "3 rol" },
              { label: "Doğrulama Seti", value: "✓", trend: "donduruldu" },
            ]}
          />
          <p className="mt-3 text-[11px] font-mono text-(--color-text-muted)">
            Sahnede sentetik kurum verisi kullanılmıştır.
          </p>
        </section>

        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
            <h3 className="text-sm font-semibold text-white tracking-tight mb-3">Sonraki eklentiler: AICORE Quick Start</h3>
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              Launch Ready müşteri başına bir kez alınır — altyapı kurulur.
              Sonraki her eklenti, AICORE Quick Start Konfigürasyon Paketi ile
              devreye alınır: altyapı işi tekrarlanmaz, eklentiye özel
              kalibrasyon ve odaklı eğitimle tipik 2-5 gün sürer.
            </p>
            <Link
              href="/hizmetler/setup/aicore-quick-start"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-accent-purple-light) hover:text-white transition-colors cursor-pointer"
            >
              Quick Start paketini incele
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
            <h3 className="text-sm font-semibold text-white tracking-tight mb-3">Kurulumdan sonrası: AICORE Destek</h3>
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              Canlıya alıştan sonra sistemin sağlıklı ve isabetli kalması AICORE
              Destek Paketleri&apos;nin işidir: sürüm güncellemeleri, her güncelleme
              sonrası otomatik doğrulama ve periyodik yeniden kalibrasyon —
              Silver&apos;dan Mission Critical&apos;a dört kademe.
            </p>
            <Link
              href="/hizmetler/support/aicore-destek"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-accent-purple-light) hover:text-white transition-colors cursor-pointer"
            >
              Destek paketlerini incele
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <div className="mt-20 flex flex-wrap items-center gap-3">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
          >
            Demo İste
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/hizmetler/setup/aicore-cloud-ready"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/15 text-white/85 hover:text-white hover:border-white/30 font-medium text-sm transition-colors cursor-pointer"
          >
            Bulut seçeneği: Cloud Ready
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/aicore/on-prem"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Neden On-Prem?
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <PrivacyContact />
    </main>
  );
}
