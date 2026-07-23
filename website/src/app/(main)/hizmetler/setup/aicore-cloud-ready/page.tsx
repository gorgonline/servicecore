import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  ClipboardCheck,
  CloudCog,
  Database,
  GraduationCap,
  Rocket,
  ScanEye,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import PrivacyContact from "@/components/ui/privacy-contact";
import {
  KalibrasyonMock,
  KurulumTimeline,
  MaskelemeMock,
  TeslimatPanosu,
} from "@/components/hizmetler/AicoreSetupVisuals";

const ACCENT = "cyan";

const ASAMALAR = [
  {
    icon: ClipboardCheck,
    title: "1. Keşif ve Hazırlık",
    desc: "Bulut sağlayıcı ve model seçimi kurumun tercih ettiği API hesabı üzerinden yapılır. Maskeleme kapsamı birlikte belirlenir: hangi alanlar kişisel veri sayılır, nasıl maskelenir. Tek denetimli internet çıkışı tanımlanır — yalnızca bulut yapay zekâ API'sine.",
  },
  {
    icon: CloudCog,
    title: "2. Uygulama Sunucusunun Kurulumu",
    desc: "GPU gerekmez: yapay zekâ katmanı hafif bir uygulama sunucusuna (8-16 çekirdek, 32-64 GB RAM) konteyner tabanlı kurulur. Mevcut sanallaştırma ortamında dakikalar içinde ayağa kalkar; donanım yatırımı beklenmez.",
  },
  {
    icon: ScanEye,
    title: "3. Maskeleme Katmanının Devreye Alınması",
    desc: "Kişisel veriler (ad, e-posta, telefon, kimlik bilgileri) buluta gitmeden önce maskeleme katmanında ayıklanır. Ne maskelendiği, ne zaman ve hangi kayıt için maskelendiği denetlenebilir şekilde kayıt altına alınır — KVKK denetiminde 'ne dışarı çıktı?' sorusunun cevabı kayıtlardadır. Maskeleme eşlemesi kurumda kalır.",
  },
  {
    icon: Database,
    title: "4. Veri Bağlantısı ve Dizinleme",
    desc: "Kayıt arşivi ve bilgi bankası bağlanır, arama dizinleri oluşturulur. Dizinler ve tüm yapay zekâ verileri kurum sunucusunda kalır; buluta yalnızca maskelenmiş sorgu içerikleri gider.",
  },
  {
    icon: Zap,
    title: "5. Kalibrasyon — bulutta da zorunlu",
    desc: "Sık yapılan yanılgı: 'bulut modeli hazır gelir, ayar gerekmez.' Oysa karar ayarları modelin nerede çalıştığına değil, kurumunuzun verisine bağlıdır. Cloud Ready'de de karar eşikleri kurumun kendi kayıtlarıyla ölçülür ve kuruma özel doğrulama seti dondurulur.",
  },
  {
    icon: GraduationCap,
    title: "6. Panel, Eğitim ve Canlıya Alış",
    desc: "Onay paneli SSO ile kurulur, roller tanımlanır. Teknisyen, onaycı ve yönetici eğitimleri verilir. Gözetimli canlıya alış: kademeli açılış, ilk hafta yakın takip ve başarı metriklerinin devreye alınması.",
  },
];

const HAFTALAR = [
  { donem: "Gün 1-2", baslik: "Keşif + uygulama sunucusu", detay: "Sağlayıcı/model seçimi, maskeleme kapsamı, GPU'suz kurulum" },
  { donem: "Gün 3-5", baslik: "Maskeleme katmanı + veri bağlantısı", detay: "Maskeleme kuralları, denetim kaydı, arşiv dizinleme", current: true },
  { donem: "Hafta 2", baslik: "Kalibrasyon + panel + eğitim", detay: "Eşik ölçümü, doğrulama seti, SSO, üç eğitim oturumu" },
  { donem: "Hafta 2 sonu", baslik: "Gözetimli canlıya alış", detay: "Kademeli açılış + ilk hafta yakın takip" },
];

const TESLIMATLAR = [
  { icon: CloudCog, title: "Kurulu yapay zekâ katmanı", desc: "GPU'suz hafif sunucuda konteyner tabanlı kurulum; bulut modeline güvenli bağlantı." },
  { icon: ScanEye, title: "Maskeleme yapılandırması", desc: "Kurumla birlikte tanımlanmış maskeleme kuralları + denetlenebilir kayıt düzeni." },
  { icon: Zap, title: "Kalibrasyon raporu", desc: "Ölçülen karar eşikleri ve gerekçeleri — bulutta da kuruma özel." },
  { icon: ShieldCheck, title: "Doğrulama seti", desc: "Dondurulmuş test seti; her güncellemede otomatik koşulur." },
  { icon: GraduationCap, title: "Eğitim materyali", desc: "Teknisyen, onaycı ve yönetici oturumlarının dokümanları." },
  { icon: Rocket, title: "Canlıya alış raporu", desc: "İlk hafta gözlemi + başarı metrikleri panosu." },
];

const PANO = [
  { text: "Uygulama sunucusu kuruldu — GPU'suz, mevcut sanallaştırmada", durum: "tamam" as const },
  { text: "Maskeleme katmanı devrede — 6 kişisel veri türü tanımlı, kayıt düzeni açık", durum: "tamam" as const },
  { text: "Kayıt arşivi ve bilgi bankası dizinlendi (dizinler kurumda)", durum: "tamam" as const },
  { text: "Kalibrasyon tamamlandı — eşikler ölçüldü, doğrulama seti donduruldu", durum: "tamam" as const },
  { text: "Onay paneli SSO ile açıldı, eğitimler verildi", durum: "tamam" as const },
  { text: "Gözetimli canlıya alış — 1. hafta yakın takip sürüyor", durum: "aktif" as const },
];

export default function AicoreCloudReadyDetailPage() {
  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.16), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32">
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/8">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-cyan-300">
              SETUP · AICORE CLOUD READY
            </span>
          </div>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/3 text-[10px] font-mono font-semibold tracking-[0.18em] text-white/70">
            SCAICRCP
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/3 text-[10px] font-mono font-semibold tracking-[0.18em] text-white/70">
            TEK SEFERLİK
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          Maskeli Bulut ile{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-(--color-brand-accent)">
            hızlı başlangıç
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          Bulut yapay zekâ modelleriyle (OpenAI vb.) çalışmak isteyen kurumlar
          için AICore kurulumu: GPU yatırımı yok, denetlenebilir veri maskeleme
          var, tipik devreye alma 1-2 hafta.
        </p>

        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
          AICore eklentileri iki dağıtım modunda çalışır: yerinde kurulum
          (On-Prem) ve Maskeli Bulut. Cloud Ready, Maskeli Bulut modunun kurulum
          paketidir: kurum ortamına dil modeli kurulmaz; kişisel veriler
          denetlenebilir bir maskeleme katmanından geçtikten sonra tercih edilen
          bulut modeline gönderilir. Eklentiler her iki modda da aynıdır —
          Cloud Ready ile başlayıp dilediğinizde yerinde kuruluma geçebilirsiniz.
        </p>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
          {[
            { v: "1-2 hafta", l: "tipik devreye alma" },
            { v: "GPU yok", l: "hafif uygulama sunucusu" },
            { v: "Maskeli", l: "kişisel veri buluta gitmez" },
            { v: "Geçiş yolu", l: "On-Prem'e taşınabilir" },
          ].map((k) => (
            <div key={k.l} className="rounded-2xl border border-white/8 bg-white/2 px-5 py-4">
              <div className="text-xl font-semibold text-white tracking-tight">{k.v}</div>
              <div className="mt-1 text-[11px] font-mono text-(--color-text-muted)">{k.l}</div>
            </div>
          ))}
        </div>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            MASKELEME · İŞİN GÜVENCESİ
          </div>
          <p className="mb-6 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Cloud Ready&apos;nin kalbi maskeleme katmanıdır: kişisel veriler buluta
            gitmeden ayıklanır, yerine takma etiketler geçer. Eşleme kurumda kalır,
            her işlem kayıt altındadır.
          </p>
          <MaskelemeMock accent={ACCENT} />
          <p className="mt-3 text-[11px] font-mono text-(--color-text-muted)">
            Sahnede sentetik kayıt verisi kullanılmıştır.
          </p>
        </section>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            NASIL İLERLER
          </div>
          <KurulumTimeline
            accent={ACCENT}
            title="Kurulum Zaman Çizelgesi"
            meta="tipik 2 haftalık plan"
            items={HAFTALAR}
          />
        </section>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            ALTI AŞAMA
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASAMALAR.map((a) => (
              <div key={a.title} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
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
            KALİBRASYON · BULUTTA DA ZORUNLU
          </div>
          <KalibrasyonMock accent={ACCENT} />
        </section>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            TESLİMATLAR
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESLIMATLAR.map((t) => (
              <div key={t.title} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 mb-4">
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
            meta="örnek kurulum · 2. hafta"
            items={PANO}
            kpis={[
              { label: "Eklenti", value: "2", trend: "devrede" },
              { label: "Maskeleme", value: "6 tür", trend: "kayıtlı" },
              { label: "Doğrulama Seti", value: "✓", trend: "donduruldu" },
            ]}
          />
          <p className="mt-3 text-[11px] font-mono text-(--color-text-muted)">
            Sahnede sentetik kurum verisi kullanılmıştır.
          </p>
        </section>

        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <Banknote className="w-4 h-4 text-cyan-300" />
              <h3 className="text-sm font-semibold text-white tracking-tight">Kullanım maliyeti hakkında</h3>
            </div>
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              Bulut modelinin kullanım (token) ücreti, kurumun kendi API hesabına
              aittir ve sağlayıcıya ödenir — ServiceCore aracılık etmez; kullanım
              şeffaf biçimde kurumun kontrolündedir. Öngörülebilir sabit maliyet
              tercih eden kurumlar için On-Prem model önerilir.
            </p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <ArrowRight className="w-4 h-4 text-cyan-300" />
              <h3 className="text-sm font-semibold text-white tracking-tight">Geçiş yolu: buluttan içeri</h3>
            </div>
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              Eklentiler her iki dağıtım modunda da aynı olduğundan, Maskeli Bulut
              ile başlayan bir kurum dilediğinde yerinde kuruluma (On-Prem) geçer;
              kalibrasyon ve birikim taşınır. Modül lisansları geçişte değişmez.
            </p>
            <Link
              href="/aicore/on-prem"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-white transition-colors cursor-pointer"
            >
              On-Prem üstünlüklerini incele
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
            href="/hizmetler/setup/aicore-launch-ready"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/15 text-white/85 hover:text-white hover:border-white/30 font-medium text-sm transition-colors cursor-pointer"
          >
            On-Prem kurulum: Launch Ready
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/hizmetler/support/aicore-destek"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Destek Paketleri
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <PrivacyContact />
    </main>
  );
}
