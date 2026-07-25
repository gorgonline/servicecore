import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Ban,
  Bell,
  Bot,
  Check,
  CircleCheck,
  CircleX,
  Eye,
  FileText,
  Gauge,
  Layers,
  Receipt,
  Scale,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import PrivacyContact from "@/components/ui/privacy-contact";

export const metadata: Metadata = {
  title: "AICore Lisanslama — Ne için ödersiniz? | ServiceCore",
  description:
    "AICore'da yapay zekâ iki şekilde çalışır: teknisyene yardım eder ya da işi kendi bitirir. Ne için ödediğiniz, neyin ücretsiz olduğu ve sayacın neyi saydığı açık yazılıdır — sürpriz fatura yoktur.",
};

const KULLANIM = [
  {
    icon: UserCheck,
    etiket: "1 · YARDIMCI KULLANIM",
    baslik: "Teknisyeninize yardım eder",
    ozet:
      "Teknisyen ekranın başındadır. Yapay zekâ kaydı özetler, benzer çözümleri bulur, yanıt taslağı hazırlar. Son kararı ve gönderme işini her zaman insan yapar.",
    fiyat: "Teknisyen lisansının üstüne yıllık sabit ek bedel",
    detay: [
      "İsme yazılıdır — havuzdan ortak kullanılan lisans yoktur.",
      "Yalnız yapay zekâ desteği açılan teknisyenler için alınır; tüm ekip için almak zorunda değilsiniz.",
      "Kullanım yoğunluğuna göre artmaz: teknisyen günde 5 kez de kullansa 200 kez de kullansa bedel aynıdır.",
    ],
    ornek: "SolveCoreAI · ReplyCoreAI · ToneCoreAI gibi teknisyen yanında çalışan eklentiler",
  },
  {
    icon: Bot,
    etiket: "2 · KENDİ BAŞINA KULLANIM",
    baslik: "İşi kendisi bitirir",
    ozet:
      "Ortada insan yoktur. Gece gelen kaydı yapay zekâ kendisi cevaplar, sınıflar, çözer ya da kapatır. Her işin arkasında kayıtlı bir sorumlu yönetici vardır.",
    fiyat: "Yıllık iş paketi — küçük, orta, büyük",
    detay: [
      "Paketiniz yılda kaç işi insansız bitirebileceğinizi belirler; faturası yıllık ve sabittir.",
      "Kullandıkça artan fatura değildir. Ay sonunda sürpriz ek ücret çıkmaz.",
      "Daha çok iş yaptırmak isterseniz bir üst pakete geçersiniz — yine sabit bedelle.",
    ],
    ornek: "ClassifyCoreAI · KnowCoreAI · StormCoreAI gibi arka planda çalışan eklentiler",
  },
];

const UCRETSIZ = [
  {
    icon: FileText,
    baslik: "Kayıt açan her şey",
    desc:
      "E-postadan açılan kayıt, izleme sisteminizin gönderdiği arıza bildirimi, çalışan portalından gelen talep. Bunlar sisteme iş getirir — ücretlendirilmez.",
  },
  {
    icon: Layers,
    baslik: "Veri taşıyan entegrasyonlar",
    desc:
      "İki sistem arasında bilgi kopyalayan, senkronize eden bağlantılar normal entegrasyondur. Yapay zekâ paketinden düşmez.",
  },
  {
    icon: Eye,
    baslik: "Okuma ve raporlama",
    desc:
      "Kayıtları görmek, aramak, listelemek ve mevcut raporları almak her zaman serbesttir. Paketiniz dolsa bile okuma tarafı çalışmaya devam eder.",
  },
  {
    icon: Receipt,
    baslik: "Kendi sayaç ekranınız",
    desc:
      "Ne kadar hakkınız var, ne kadarı kullanıldı, hangi iş neden sayıldı — bu ekran ücretsizdir. Ödediğinizin nereye gittiğini görmek hakkınızdır.",
  },
  {
    icon: ShieldCheck,
    baslik: "Yazılım kimliği tanımlamak",
    desc:
      "Sisteme bağlanan her yazılım kayıtlı bir kimlik alır. Kimlik tanımlamak ücretsizdir — bedel kimliğe değil, yapılan işe bağlanır.",
  },
  {
    icon: Ban,
    baslik: "Başarısız denemeler",
    desc:
      "Yapay zekâ bir işi bitiremediyse, yarıda bırakıp teknisyene devrettiyse ya da tekrar denediyse bunların hiçbiri hakkınızdan düşmez.",
  },
];

const SAYILIR = [
  "İnsansız başlayıp tanımlı sonucu başarıyla tamamlanan iş",
  "Kaydın çözülmesi, kapatılması, yönlendirilmesi gibi somut sonuçlar",
  "Sözleşmede baştan yazılı, değişmeyen tanımlar",
];

const SAYILMAZ = [
  "Başarısız denemeler ve tekrarlar",
  "Yapay zekânın kendi içindeki teknik adımlar — bir iş için 15 adım attıysa yine 1 sayılır",
  "Yarım kalıp teknisyene devredilen işler",
  "Geri alınan işlemler ve yinelenen çağrılar",
  "Test ortamındaki makul kullanım",
  "Kapatıldıktan sonra aynı sebeple yeniden açılan kayıt — sayaçtan geri düşülür",
];

const AGIRLIK = [
  { is: "Standart cevap veya doğrulanmış çözüm", carpan: "1" },
  { is: "Tek sistem üzerinde işlem — randevu değişikliği, alan güncelleme", carpan: "2" },
  { is: "Birkaç sistemi dolaşan iş emrinin tamamlanması", carpan: "5" },
];

const FATURA_AKISI = [
  {
    esik: "%70",
    baslik: "İlk bilgilendirme",
    desc: "Paketinizin dörtte üçüne yaklaştığınızda yöneticinize bildirim gider. Yılın neresinde olduğunuzu erkenden görürsünüz.",
  },
  {
    esik: "%85",
    baslik: "İkinci uyarı",
    desc: "Kalan hakkınız ve gidişata göre tahmini bitiş tarihi paylaşılır. Karar vermek için zamanınız olur.",
  },
  {
    esik: "%95",
    baslik: "Son uyarı",
    desc: "Yükseltme mi, bu yıl bu kadarla mı devam edileceği konuşulur. Karar tamamen sizindir.",
  },
  {
    esik: "%100",
    baslik: "Durur, faturalanmaz",
    desc: "Paket dolduğunda yapay zekânın insansız işlemleri durur ve işler teknisyen kuyruğuna düşer. Habersiz ek fatura çıkmaz.",
  },
];

const SEFFAFLIK = [
  {
    icon: Receipt,
    baslik: "Her işin dökümü açık",
    desc: "Hangi iş ne zaman, hangi yazılım tarafından, kimin sorumluluğunda yapıldı ve neden sayıldı — hepsi kayıtlıdır ve dışa aktarılabilir.",
  },
  {
    icon: Scale,
    baslik: "Tanımlar sözleşmede sabit",
    desc: "Neyin sayılacağı ve ağırlık çarpanları sözleşmenizde yazılıdır; sözleşme dönemi içinde tek taraflı değiştirilmez.",
  },
  {
    icon: Bell,
    baslik: "İtiraz süresi tanınır",
    desc: "Sayacın bir kaydı yanlış saydığını düşünüyorsanız itiraz edebilir, ilgili işlemin dökümünü isteyebilirsiniz.",
  },
  {
    icon: Gauge,
    baslik: "Geriye dönük fatura yok",
    desc: "Yeni bir sayaç veya kural devreye girerse yalnız ileriye dönük uygulanır. Geçmiş kullanım için sonradan bedel çıkarılmaz.",
  },
];

const SSS = [
  {
    s: "Yapay zekâ token veya istek başına ücretlendiriliyor mu?",
    c: "Hayır. Yerinde kurulumda dil modeli kendi sunucunuzda çalışır; kullanım başına dış fatura oluşmaz. Ödediğiniz şey lisans bedelidir: teknisyen başına yıllık ek bedel ya da yıllık iş paketi. İkisi de sabittir.",
  },
  {
    s: "Teknisyen sayımızı azaltırsak ne olur?",
    c: "Teknisyen lisansı ve ona bağlı yapay zekâ desteği azalır; ödemeniz de azalır. İşi yapay zekâya kaydırmak istiyorsanız yıllık iş paketiyle devam edersiniz. Zorunlu asgari teknisyen sayısı diye bir şart koymuyoruz.",
  },
  {
    s: "Kendi geliştirdiğimiz yazılım da paketten düşer mi?",
    c: "Yalnızca insan yerine iş bitiriyorsa düşer — kaydı çözüyor, kapatıyor, karar veriyorsa. Sadece kayıt açıyor ya da veri taşıyorsa düşmez. Yazılımın kim tarafından yazıldığına değil, ne yaptığına bakılır.",
  },
  {
    s: "Aynı iş iki kez ücretlendirilir mi?",
    c: "Hayır. Her iş kayıtta tek tip taşır: insanın yaptığı iş, insana yardım edilen iş ya da insansız biten iş. Bir iş hem teknisyen ek bedeline hem iş paketine sayılmaz.",
  },
  {
    s: "Paketimiz dolarsa sistem tamamen durur mu?",
    c: "Hayır. Yalnız yapay zekânın insansız işlemleri durur; teknisyenleriniz çalışmaya, kayıtlar açılmaya ve raporlar alınmaya devam eder. İşler teknisyen kuyruğuna düşer.",
  },
  {
    s: "Havuzdan ortak kullanılan lisans mümkün mü?",
    c: "Hayır. ServiceCore lisansları isme yazılıdır ve bu AICore tarafında da geçerlidir. Aynı hesabın birden çok kişi ya da yazılım tarafından paylaşılması lisans şartlarına aykırıdır.",
  },
];

export default function AICoreLisanslamaPage() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8 mb-10">
          <Sparkles className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-accent-purple-light)">
            AICORE · LİSANSLAMA
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          Yapay zekâ için{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-accent-purple-light) to-(--color-brand-accent)">
            ne ödersiniz?
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          AICore'da yapay zekâ iki şekilde çalışır: ya teknisyeninize yardım eder,
          ya da işi kendisi bitirir. İkisinin bedeli ayrıdır ve ikisi de yıllık
          sabittir.
        </p>

        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
          Bu sayfa, ne için ödediğinizi ve neyin ücretsiz olduğunu tek tek yazar.
          Yapay zekâ lisanslamasının çoğu yerde muğlak bırakıldığını biliyoruz;
          biz sayacın neyi saydığını ve neyi saymadığını baştan açık yazmayı
          tercih ediyoruz.
        </p>

        {/* İKİ KULLANIM ŞEKLİ */}
        <section className="mt-24">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            İKİ KULLANIM ŞEKLİ
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {KULLANIM.map((k) => (
              <div
                key={k.baslik}
                className="rounded-2xl border border-white/8 bg-white/2 p-8 flex flex-col"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) mb-5">
                  <k.icon className="w-4.5 h-4.5" />
                </span>
                <div className="text-[10px] font-mono font-semibold tracking-[0.18em] text-(--color-text-muted) mb-2">
                  {k.etiket}
                </div>
                <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">
                  {k.baslik}
                </h3>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                  {k.ozet}
                </p>

                <div className="mt-6 rounded-xl border border-(--color-accent-purple-base)/25 bg-(--color-accent-purple-base)/8 px-4 py-3">
                  <div className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted) mb-1">
                    Bedel
                  </div>
                  <div className="text-sm font-medium text-white">{k.fiyat}</div>
                </div>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {k.detay.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm font-light leading-relaxed text-(--color-text-secondary)">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-(--color-accent-purple-light)" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-white/8 text-xs font-light text-(--color-text-muted)">
                  {k.ornek}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/8 bg-white/2 px-6 py-5">
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              <span className="text-white font-medium">Aynı iş iki kez ücretlendirilmez.</span>{" "}
              Her iş kayıtta tek tip taşır — insanın yaptığı iş, insana yardım
              edilen iş ya da insansız biten iş. Bir işlem hem teknisyen ek
              bedeline hem iş paketine sayılamaz.
            </p>
          </div>
        </section>

        {/* ÜCRETSİZ OLANLAR */}
        <section className="mt-24">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            ÜCRETLENDİRİLMEYENLER
          </div>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Sisteme iş getiren hiçbir şeyden bedel almıyoruz.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Yapay zekâ bedeli yalnızca insansız <span className="text-white">çözülen, kapatılan,
            karar verilen</span> işten alınır. Aşağıdakiler paketinizden düşmez.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {UCRETSIZ.map((u) => (
              <div key={u.baslik} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) mb-4">
                  <u.icon className="w-4 h-4" />
                </span>
                <h3 className="text-base font-semibold text-white tracking-tight mb-2">{u.baslik}</h3>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{u.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SAYAÇ */}
        <section className="mt-24">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            SAYAÇ NEYİ SAYAR
          </div>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Yalnız bitmiş iş sayılır — arka plandaki adımlar değil.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Yapay zekânın bir kaydı çözmek için içeride kaç adım attığını siz
            göremezsiniz; göremediğiniz bir şeyin faturasını da ödememelisiniz.
            Bu yüzden sayacın birimi tek şeydir: başarıyla tamamlanmış iş.
          </p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-(--color-accent-purple-base)/25 bg-(--color-accent-purple-base)/6 p-7">
              <div className="flex items-center gap-2 mb-5">
                <CircleCheck className="w-4.5 h-4.5 text-(--color-accent-purple-light)" />
                <span className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-accent-purple-light)">
                  Sayılır
                </span>
              </div>
              <ul className="space-y-3">
                {SAYILIR.map((s) => (
                  <li key={s} className="flex gap-2.5 text-sm font-light leading-relaxed text-white/85">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-(--color-accent-purple-light)" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/2 p-7">
              <div className="flex items-center gap-2 mb-5">
                <CircleX className="w-4.5 h-4.5 text-(--color-text-muted)" />
                <span className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted)">
                  Sayılmaz
                </span>
              </div>
              <ul className="space-y-3">
                {SAYILMAZ.map((s) => (
                  <li key={s} className="flex gap-2.5 text-sm font-light leading-relaxed text-(--color-text-secondary)">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-(--color-text-muted) shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8 bg-white/3">
              <div className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted)">
                Ağırlıklar sözleşmede sabittir
              </div>
            </div>
            <table className="w-full text-left">
              <tbody>
                {AGIRLIK.map((a) => (
                  <tr key={a.is} className="border-b border-white/6 last:border-b-0">
                    <td className="px-5 py-4 text-sm font-light text-white/85">{a.is}</td>
                    <td className="px-5 py-4 text-sm font-mono font-semibold text-(--color-accent-purple-light) text-right whitespace-nowrap">
                      {a.carpan} iş
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs font-light text-(--color-text-muted) max-w-2xl">
            Bir işin kaç sayılacağı baştan bellidir ve sözleşme süresince
            değiştirilmez. Yapay zekânın o işi kaç adımda yaptığı bu sayıyı
            etkilemez.
          </p>
        </section>

        {/* SÜRPRİZ FATURA YOK */}
        <section className="mt-24">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            SÜRPRİZ FATURA YOK
          </div>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Paketiniz dolarsa fatura değil, bildirim gelir.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Bir yıl boyunca ne ödeyeceğinizi baştan bilirsiniz. Hak biterse
            otomatik ek ücret işlemez; ne olacağına siz karar verirsiniz.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FATURA_AKISI.map((f) => (
              <div key={f.esik} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <div className="text-3xl font-bold tracking-tight text-(--color-accent-purple-light) mb-3">
                  {f.esik}
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight mb-2">{f.baslik}</h3>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/8 bg-white/2 px-6 py-5">
              <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                <span className="text-white font-medium">Kesinti istemiyorsanız</span> — yıl
                içinde yedek kapasiteyi önceden alabilir ya da bir üst pakete
                geçebilirsiniz. Her ikisi de imzalı, sabit bedelli ek siparişle olur.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/2 px-6 py-5">
              <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                <span className="text-white font-medium">Paket dolduğunda</span> — teknisyen
                çalışması, kayıt açılması, arama ve raporlama etkilenmez. Yalnız
                insansız işlemler durur, işler kuyruğa düşer.
              </p>
            </div>
          </div>
        </section>

        {/* ŞEFFAFLIK */}
        <section className="mt-24">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            ŞEFFAFLIK
          </div>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Sayaç bizde değil, sizinle birlikte.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Faturanızı doğrulayabilmeniz için gereken her şey ürünün içindedir ve
            ayrıca satılmaz.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {SEFFAFLIK.map((s) => (
              <div key={s.baslik} className="rounded-2xl border border-white/8 bg-white/2 p-6 flex gap-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) shrink-0">
                  <s.icon className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight mb-1.5">{s.baslik}</h3>
                  <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SSS */}
        <section className="mt-24">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            SIKÇA SORULAN SORULAR
          </div>
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            {SSS.map((q) => (
              <div key={q.s} className="border-b border-white/6 last:border-b-0 px-6 py-6">
                <h3 className="text-base font-semibold text-white tracking-tight mb-2">{q.s}</h3>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary) max-w-4xl">{q.c}</p>
              </div>
            ))}
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
            href="/planlar/lisanslama-rehberi"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/15 text-white/85 hover:text-white hover:border-white/30 font-medium text-sm transition-colors cursor-pointer"
          >
            ServiceCore Lisanslama Rehberi
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
