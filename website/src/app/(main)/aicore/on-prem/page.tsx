import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Gauge,
  Lock,
  ServerCog,
  ShieldCheck,
  Sparkles,
  WifiOff,
} from "lucide-react";
import PrivacyContact from "@/components/ui/privacy-contact";

export const metadata: Metadata = {
  title: "On-Prem Yapay Zekâ — Üstünlükleri | AICore | ServiceCore",
  description:
    "AICore eklentileri kurumunuzun kendi sunucusunda, yerel dil modelleriyle çalışır: veri dışarı çıkmaz, kapalı ağda çalışır, kullanım başına maliyet yoktur.",
};

const USTUNLUKLER = [
  {
    icon: ShieldCheck,
    title: "Veri kurumdan çıkmaz",
    desc: "Kayıtlar, bilgi bankası ve AICore eklentilerinin ürettiği tüm veriler kurumunuzun kendi sunucusunda işlenir ve saklanır. KVKK ve sektör regülasyonlarıyla (bankacılık, sağlık, savunma) doğal uyum. Kurumun kendi bağladığı dış yazılımlar bu kapsamın dışındadır — onların denetimi GateCoreAI ile yapılır.",
  },
  {
    icon: WifiOff,
    title: "Kapalı ağda çalışır",
    desc: "Kurulum tamamlandıktan sonra internet bağlantısı gerekmez. İzole ağ (air-gap) ortamlarında dahi tam işlevle çalışır — dış servise bağımlılık sıfır.",
  },
  {
    icon: Banknote,
    title: "Kullanım başına maliyet yok",
    desc: "Bulut yapay zekâ API'lerindeki token/istek başına faturalama burada yoktur; sözleşilen kapsam içinde kullanım sıklığı bedeli değiştirmez. Lisans bedelleri yıllık ve sabittir — bütçe öngörülebilir kalır.",
  },
  {
    icon: Gauge,
    title: "Öngörülebilir performans",
    desc: "Dış API kotası, hız limiti veya servis kesintisi riski yok. Yanıt süreleri kurumunuzun kendi donanımında, kendi kontrolünüzde.",
  },
  {
    icon: Lock,
    title: "Kontrol ve sürüm sizde",
    desc: "Dil modeli kurumunuzda durur; hangi sürümün ne zaman devreye gireceğine siz karar verirsiniz. Dış sağlayıcının habersiz model değişikliği diye bir risk yoktur.",
  },
  {
    icon: ServerCog,
    title: "Kuruma özel ayar",
    desc: "Sistem kurumunuzun kendi kayıtlarıyla kalibre edilir ve teknisyen geri bildirimleriyle kurum içinde öğrenmeye devam eder — birikim de kurumda kalır.",
  },
];

const KIYAS: { baslik: string; onprem: string; cloud: string }[] = [
  { baslik: "Veri konumu", onprem: "Tamamı kurum içinde", cloud: "Kişisel veriler maskelenir, kalan içerik bulut modeline gider" },
  { baslik: "Dil modeli", onprem: "Kurum sunucusunda yerel model (çift model mimarisi)", cloud: "Bulut sağlayıcının modeli (OpenAI vb.)" },
  { baslik: "İnternet ihtiyacı", onprem: "Gerekmez — kapalı ağ desteklenir", cloud: "Tek denetimli çıkış gerekir" },
  { baslik: "GPU / donanım", onprem: "GPU'lu sunucu (kademeye göre)", cloud: "GPU gerekmez — hafif uygulama sunucusu" },
  { baslik: "Maliyet modeli", onprem: "Yıllık sabit lisans — token/istek başına ücret yok", cloud: "Yıllık sabit lisans + bulut API kullanım (token) maliyeti kuruma aittir" },
  { baslik: "Devreye alma", onprem: "AICORE Launch Ready · tipik 2-4 hafta", cloud: "AICORE Cloud Ready · tipik 1-2 hafta" },
  { baslik: "Kimin için", onprem: "KVKK katı sektörler, yüksek hacim, uzun vade", cloud: "Hızlı başlangıç isteyen, veri hassasiyeti esnek kurumlar" },
];

export default function OnPremPage() {
  return (
    <div className="relative min-h-screen bg-(--color-surface-base) overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.20), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8 mb-10">
          <Sparkles className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-accent-purple-light)">
            AICORE · DAĞITIM MODELİ
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          Yapay zekânız{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-accent-purple-light) to-(--color-brand-accent)">
            kurum içinde
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          AICore eklentileri, kurumunuzun kendi sunucusunda çalışan yerel dil
          modelleriyle gelir. Veriniz dışarı çıkmaz, maliyetiniz kullanımla
          artmaz, kontrol her zaman sizde kalır.
        </p>

        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
          Piyasadaki yapay zekâ eklentilerinin çoğu SaaS&apos;tır: veriniz sağlayıcının
          bulutuna gider, maliyet kullandıkça artar, model sağlayıcının takvimiyle
          değişir. AICore bunun tersini seçti — kurumsal servis yönetiminde
          yapay zekânın da kurumun malı olması gerektiğine inanıyoruz.
        </p>

        <section className="mt-20">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            NEDEN ON-PREM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {USTUNLUKLER.map((u) => (
              <div key={u.title} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) mb-4">
                  <u.icon className="w-4 h-4" />
                </span>
                <h3 className="text-base font-semibold text-white tracking-tight mb-2">{u.title}</h3>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{u.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            İKİ SEÇENEK · TEK AİLE
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            On-Prem önerimizdir; Maskeli Bulut seçeneğimizdir.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Bulut modelleriyle (OpenAI vb.) çalışmak isteyen kurumlar için AICore,
            Maskeli Bulut modunda da kurulabilir: kişisel veriler denetlenebilir
            şekilde maskelendikten sonra bulut modeline gönderilir. Eklentiler her
            iki modda da aynı eklentilerdir — dilediğinizde buluttan yerinde
            kuruluma geçebilirsiniz.
          </p>

          <div className="mt-10 rounded-2xl border border-white/8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-175">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted)"></th>
                    <th className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-accent-purple-light)">
                      On-Prem Yapay Zekâ (önerilen)
                    </th>
                    <th className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted)">
                      Maskeli Bulut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {KIYAS.map((k) => (
                    <tr key={k.baslik} className="border-b border-white/6 last:border-b-0">
                      <td className="px-5 py-4 text-sm font-medium text-white/85 whitespace-nowrap">{k.baslik}</td>
                      <td className="px-5 py-4 text-sm font-light text-white/85">{k.onprem}</td>
                      <td className="px-5 py-4 text-sm font-light text-(--color-text-secondary)">{k.cloud}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            KURULUMUN İKİNCİ YARISI
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Yapay zekâ kurum içinde çalışır; kapı da kurum içinde durur.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Yukarıdaki üstünlükler <span className="text-white">AICore eklentileri</span>{" "}
            içindir: onlar sizin sunucunuzda çalışır, veriniz dışarı çıkmaz.
            Ama bir kurumda yapay zekâya bağlanan tek yazılım bunlar değildir —
            kurumun kendi geliştirdiği ajanlar, dışarıdan alınan asistanlar ve
            mevcut entegrasyonlar da sisteme bağlanır. Onların denetimi ayrı bir
            katmanın işidir.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) mb-4">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                Kapalı ağda da gereklidir
              </h3>
              <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                İnternete kapalı bir kurulumda dışarıdan ajan bağlanmaz; ama
                kurum içindeki eklentiler, mevcut entegrasyonlar ve kendi
                yazdığınız yazılımlar yine kayıtlarınıza dokunur. Kapı, kimin ne
                yaptığını kayıt altına alan yerdir.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) mb-4">
                <Lock className="w-4 h-4" />
              </span>
              <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                Her kurulumun bileşenidir
              </h3>
              <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                GateCoreAI isteğe bağlı bir eklenti değil, AICore kurulumlarının
                zorunlu güvenlik katmanıdır ve ayrı lisanslanır. Beta ve yol
                haritası aşamasındadır; devreye alma takvimi teklifte yazılır.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/2 p-6">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) mb-4">
                <Banknote className="w-4 h-4" />
              </span>
              <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                Bedeli nasıl belirlenir
              </h3>
              <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                Kurum başına yıllık sabit. Dışarıdan ajan bağlamıyorsanız en
                küçük bandıyla alınır; bağlıyorsanız o ajanların insansız
                bitirdiği iş bandı belirler. Kullanım başına fatura yoktur.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/8 bg-white/2 px-6 py-5 max-w-4xl">
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              <span className="text-white font-medium">Kısaca:</span> Bu sayfa
              yapay zekânın nerede çalıştığını anlatır. Neyin ne kadara
              lisanslandığı ve kapının bedelinin nasıl belirlendiği ayrı
              sayfadadır.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href="/aicore/gatecore"
                className="inline-flex items-center gap-2 text-sm font-medium text-(--color-accent-purple-light) hover:text-white transition-colors cursor-pointer"
              >
                GateCoreAI — kapı neye karşı korur
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/aicore/lisanslama"
                className="inline-flex items-center gap-2 text-sm font-medium text-(--color-accent-purple-light) hover:text-white transition-colors cursor-pointer"
              >
                AICore Lisanslama — ne için ödersiniz
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
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
            AICORE Launch Ready
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
    </div>
  );
}
