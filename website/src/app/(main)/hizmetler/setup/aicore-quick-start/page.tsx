import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  GraduationCap,
  Plug,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import PrivacyContact from "@/components/ui/privacy-contact";
import {
  KurulumTimeline,
  TeslimatPanosu,
} from "@/components/hizmetler/AicoreSetupVisuals";

const ACCENT = "emerald";

const ASAMALAR = [
  {
    icon: ClipboardCheck,
    title: "1. Hazırlık Kontrolü",
    desc: "Mevcut AICore altyapısının sağlık kontrolü yapılır; yeni eklentinin ihtiyaç duyduğu ek erişimler bağlanır (örn. DocCore için doküman kaynakları, StormCore için alarm akışı, VoiceCore için santral). ServiceCore servis hesabına yalnızca yeni eklentinin gerektirdiği yetki eklenir.",
  },
  {
    icon: Plug,
    title: "2. Eklenti Kurulumu",
    desc: "Yeni eklenti, mevcut yapay zekâ katmanına konteyner olarak eklenir. Sunucu, modeller, onay paneli ve yetkilendirme zaten hazır olduğu için bu adım saatler mertebesindedir — altyapı işi tekrarlanmaz.",
  },
  {
    icon: Zap,
    title: "3. Eklentiye Özel Kalibrasyon",
    desc: "Yeni eklentinin karar ayarları kurumun verisiyle ölçülür; kuruma özel doğrulama seti yeni eklentinin vakalarıyla genişletilir. Böylece sonraki güncellemelerde yeni eklentinin davranışı da otomatik denetlenir.",
  },
  {
    icon: GraduationCap,
    title: "4. Odaklı Eğitim ve Gözetimli Açılış",
    desc: "Tam eğitim programı tekrarlanmaz; yalnızca yeni eklentiye odaklı kısa bir oturum yapılır. Eklenti kademeli açılır, ilk günler yakından izlenir ve başarı metrikleri panoya eklenir.",
  },
];

const GUNLER = [
  { donem: "Gün 1", baslik: "Hazırlık + eklenti kurulumu", detay: "Altyapı sağlık kontrolü, ek erişimler, konteyner kurulum" },
  { donem: "Gün 2-3", baslik: "Eklentiye özel kalibrasyon", detay: "Karar ayarları ölçülür, doğrulama seti genişletilir", current: true },
  { donem: "Gün 4", baslik: "Odaklı eğitim", detay: "Yeni eklentiye özel kısa oturum — ilgili ekip" },
  { donem: "Gün 5", baslik: "Gözetimli açılış", detay: "Kademeli açılış + yakın takip + metrik panosu" },
];

const PANO = [
  { text: "Altyapı sağlık kontrolü tamamlandı — mevcut eklentiler etkilenmedi", durum: "tamam" as const },
  { text: "DocCoreAI kuruldu — doküman kaynakları (dosya sunucusu) bağlandı", durum: "tamam" as const },
  { text: "Eklentiye özel kalibrasyon tamamlandı — doğrulama seti genişletildi", durum: "tamam" as const },
  { text: "Odaklı eğitim verildi — bilgi bankası ekibi (6 kişi)", durum: "tamam" as const },
  { text: "Gözetimli açılış — ilk günler yakın takipte", durum: "aktif" as const },
];

const FARKLAR = [
  { k: "Ne zaman alınır", lr: "İlk kurulumda — müşteri başına bir kez", qs: "Sonraki HER eklentide — eklenti başına" },
  { k: "Altyapı işi", lr: "Var: sunucu, modeller, panel, SSO", qs: "Yok: mevcut altyapı kullanılır" },
  { k: "Tipik süre", lr: "2-4 hafta (Cloud Ready: 1-2 hafta)", qs: "2-5 gün" },
  { k: "Kalibrasyon", lr: "Tam kurulum + doğrulama seti oluşturma", qs: "Eklentiye özel ölçüm + setin genişletilmesi" },
  { k: "Eğitim", lr: "Tam program: teknisyen + onaycı + yönetici", qs: "Yeni eklentiye odaklı tek oturum" },
];

export default function AicoreQuickStartDetailPage() {
  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.16), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32">
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/8">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-emerald-300">
              SETUP · AICORE QUICK START
            </span>
          </div>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/3 text-[10px] font-mono font-semibold tracking-[0.18em] text-white/70">
            SCAIQSCP
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/3 text-[10px] font-mono font-semibold tracking-[0.18em] text-white/70">
            EKLENTİ BAŞINA · TEK SEFERLİK
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          Yeni eklenti,{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-(--color-brand-accent)">
            günler içinde
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          AICore altyapınız zaten kurulu; Quick Start, kataloğa eklediğiniz her
          yeni eklentiyi eklentiye özel kalibrasyon ve odaklı eğitimle günler
          içinde devreye alır.
        </p>

        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
          Model basittir: ilk kurulumda AICORE Launch Ready (yerinde) veya AICORE
          Cloud Ready (Maskeli Bulut) paketlerinden biri alınır — altyapı bir kez
          kurulur. Sonraki her eklenti için AICORE Quick Start alınır: altyapı
          işi tekrarlanmaz, yalnızca yeni eklentinin kurulumu, kuruma özel ayarı
          ve ekibin hazırlanması yapılır. Böylece yapay zekâ kabiliyetiniz
          büyürken devreye alma maliyeti ve süresi küçülür.
        </p>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
          {[
            { v: "2-5 gün", l: "tipik devreye alma" },
            { v: "0 altyapı işi", l: "mevcut kurulum kullanılır" },
            { v: "4 aşama", l: "kontrol → açılış" },
            { v: "Her eklentide", l: "bir Quick Start" },
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
            title="Devreye Alma Planı"
            meta="tipik 5 günlük plan"
            items={GUNLER}
          />
          <p className="mt-3 text-[11px] font-mono text-(--color-text-muted)">
            Sahnede sentetik plan verisi kullanılmıştır; süre eklentinin kapsamına göre değişir.
          </p>
        </section>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            DÖRT AŞAMA
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASAMALAR.map((a) => (
              <div key={a.title} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
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
            LAUNCH READY İLE FARKI
          </div>
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-175">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted)"></th>
                    <th className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted)">
                      Launch Ready / Cloud Ready
                    </th>
                    <th className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-emerald-300">
                      Quick Start
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FARKLAR.map((f) => (
                    <tr key={f.k} className="border-b border-white/6 last:border-b-0">
                      <td className="px-5 py-4 text-sm font-medium text-white/85 whitespace-nowrap">{f.k}</td>
                      <td className="px-5 py-4 text-sm font-light text-(--color-text-secondary)">{f.lr}</td>
                      <td className="px-5 py-4 text-sm font-light text-white/85">{f.qs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            TESLİM GÜNÜ NASIL GÖRÜNÜR
          </div>
          <TeslimatPanosu
            accent={ACCENT}
            title="Devreye Alma Panosu"
            meta="örnek: DocCoreAI ekleme · 5. gün"
            items={PANO}
            kpis={[
              { label: "Süre", value: "5 gün", trend: "plan dahilinde" },
              { label: "Kesinti", value: "0", trend: "mevcut eklentilerde" },
              { label: "Doğrulama Seti", value: "+6", trend: "vaka eklendi" },
            ]}
          />
          <p className="mt-3 text-[11px] font-mono text-(--color-text-muted)">
            Sahnede sentetik kurum verisi kullanılmıştır.
          </p>
        </section>

        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <Rocket className="w-4 h-4 text-emerald-300" />
              <h3 className="text-sm font-semibold text-white tracking-tight">Ön koşul: kurulu AICore altyapısı</h3>
            </div>
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              Quick Start, AICORE Launch Ready (yerinde) veya AICORE Cloud Ready
              (Maskeli Bulut) kurulumu tamamlanmış kurumlar içindir. İlk
              kurulumunuz henüz yoksa oradan başlanır — altyapı bir kez kurulur,
              sonrası hep Quick Start&apos;tır.
            </p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <h3 className="text-sm font-semibold text-white tracking-tight">Mevcut sisteme dokunmadan</h3>
            </div>
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              Yeni eklenti devreye alınırken çalışan eklentileriniz etkilenmez;
              açılış kademelidir ve doğrulama seti sayesinde mevcut davranışın
              değişmediği testle gösterilir — tahminle değil.
            </p>
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
            İlk kurulum: Launch Ready
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/aicore"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Tüm AICore Ailesi
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <PrivacyContact />
    </main>
  );
}
