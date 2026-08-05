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
  Network,
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
    "AICore lisanslaması üç kalemden oluşur: eklentiler (kişi başına ya da sabit), zorunlu GateCoreAI ve kurulum-destek paketleri. Eklentinin insansız çalışması fiyatına dahildir; iş başına ayrı ücret yoktur.",
};

const KALEMLER = [
  {
    icon: Layers,
    etiket: "1 · EKLENTİLER",
    baslik: "AICore eklentileri",
    ozet:
      "Aldığınız her eklenti iki fiyat modelinden biriyle lisanslanır. Ayrım, eklentinin bir kişinin ekranında mı yoksa kurumun verisi üzerinde mi çalıştığına göre yapılır.",
    satirlar: [
      "Kişi başına (7 eklenti): teknisyen lisansının üstüne yıllık sabit ek bedel.",
      "Sabit (diğer tüm eklentiler): kurum başına yıllık sabit bedel, hacim bandına göre.",
    ],
    fiyat: "Yıllık sabit — her iki modelde de",
  },
  {
    icon: Network,
    etiket: "2 · KAPI",
    baslik: "GateCoreAI",
    ozet:
      "Sisteme bağlanan her yazılımın geçtiği denetlenebilir kapı. Her AICore kurulumunda alınır; güvenlik katmanı olduğu için zorunludur.",
    satirlar: [
      "Kurum başına yıllık sabit bedel; teknisyen sayısıyla ölçeklenmez.",
      "Bandı, kurumun dışarıdan bağladığı ajanların yaptığı işe göre belirlenir.",
      "Beta ve yol haritası aşamasındadır; devreye alma takvimi teklifte yazılır.",
    ],
    fiyat: "Yıllık sabit — kurum başına",
  },
  {
    icon: ShieldCheck,
    etiket: "3 · HİZMET",
    baslik: "Kurulum ve destek",
    ozet:
      "Devreye alma bir kez, bakım-destek yıllık. Bunlar bugünkü ServiceCore hizmet paketleriyle aynı mantıkta çalışır.",
    satirlar: [
      "Kurulum paketi: ilk kurulumda bir kez, sonraki eklentiler daha kısa sürede eklenir.",
      "Destek paketi: yıllık, kademeli (kapsam ve müdahale süresine göre).",
    ],
    fiyat: "Kurulum bir kez · destek yıllık",
  },
];

const DAHIL = [
  "Eklentinin gece çalışması, toplu çalışması, insansız çalışması — hepsi eklentinin fiyatına dahildir.",
  "Sözleşilen hacim bandı içinde kullanım sıklığı bedeli değiştirmez; bir teknisyen günde 5 kez de kullansa 200 kez de kullansa fiyat aynıdır. Kurumun hacim bandı yalnız yenilemede ya da tanımlı bant geçiş koşullarında değişir.",
  "Eklentinin bitirdiği iş için ayrıca fatura kesilmez. Aynı iş iki kez ücretlendirilmez.",
  "Bulut yapay zekâ hizmetlerindeki gibi istek ya da kelime başına ücret yoktur; yerinde kurulumda dil modeli kendi sunucunuzda çalışır.",
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
      "İki sistem arasında bilgi kopyalayan, senkronize eden bağlantılar normal entegrasyondur; hiçbir yapay zekâ bedeline girmez.",
  },
  {
    icon: Eye,
    baslik: "Okuma ve raporlama",
    desc:
      "Kayıtları görmek, aramak, listelemek ve mevcut raporları almak her zaman serbesttir.",
  },
  {
    icon: Receipt,
    baslik: "Kendi kullanım ekranınız",
    desc:
      "Hangi yazılım ne yaptı, bandınızın neresindesiniz — bu ekran ücretsizdir. Ödediğinizin karşılığını görmek hakkınızdır.",
  },
  {
    icon: ShieldCheck,
    baslik: "Yazılım kimliği tanımlamak",
    desc:
      "Sisteme bağlanan her yazılım kayıtlı bir kimlik alır. Kimlik tanımlamak ücretsizdir — bedel kimliğe değil, lisansa bağlıdır.",
  },
  {
    icon: Eye,
    baslik: "Maskeleme ve denetim kaydı",
    desc:
      "Kişisel verilerin ajana gitmeden maskelenmesi ve her işlemin kayda geçmesi güvenlik katmanının parçasıdır; ayrıca ücretlendirilmez.",
  },
  {
    icon: Ban,
    baslik: "Başarısız denemeler",
    desc:
      "Yarıda kalan, tekrarlanan ya da teknisyene devredilen işler hiçbir sayıma girmez.",
  },
];

const SAYAC_NE_DEGIL = [
  "Fatura kalemi değildir — hiçbir işin karşılığında ayrıca ücret çıkmaz.",
  "AICore eklentilerinizin yaptığı işi saymaz; onlar zaten lisanslıdır.",
  "Sürpriz aşım faturası üretmez.",
];

const SAYAC_NE = [
  "Kurumunuzun dışarıdan bağladığı ajanların hangi bantta olduğunu belirler — koltuk sayar gibi.",
  "Kimliğini bildirmeden çalışan otomasyonu yakalar; bu bir güvenlik işlevidir.",
  "Yönetici raporlarını besler: işin ne kadarı yazılım eliyle yapılıyor.",
];

const BANT = [
  {
    baslik: "Dışarıdan ajan bağlamıyorsanız",
    desc: "Bant devreye girmez. GateCoreAI yine alınır — çünkü kapı, kendi eklentilerimiz ve mevcut entegrasyonlarınız için de çalışır — ama en küçük bandıyla.",
    tone: "sade",
  },
  {
    baslik: "Kendi ajanınızı bağlıyorsanız",
    desc: "Ajanın insan olmadan bitirdiği iş, kapının bandını belirler. Küçük / orta / büyük bant; faturası yıllık ve sabit. İş arttıkça bir üst banda geçilir, ay sonunda sürpriz çıkmaz.",
    tone: "vurgu",
  },
];

const BANT_KURALLARI = [
  {
    baslik: "İş kime yazılır",
    desc:
      "Çözümü kim ürettiyse iş ona yazılır. Sona konan bir onay tıklaması işi insan işi yapmaz. Teknisyen kaydı gerçekten inceleyip düzeltiyor ya da çözümü kendisi tamamlıyorsa iş insan işidir — bu ayrım kayıtta görünür.",
  },
  {
    baslik: "Bir sonuç, bir iş",
    desc:
      "Aynı sonucu üretmek için kaç yazılım sırayla çalışırsa çalışsın, iş bir kez sayılır. Zincirin adımları ayrı ayrı yazılmaz.",
  },
  {
    baslik: "İlk üç ay ölçüm dönemidir",
    desc:
      "Sözleşme bir başlangıç bandıyla açılır ama ilk üç ay sınır uygulanmaz. Dördüncü ayda bandınız ölçülen gerçek kullanıma göre sabitlenir — gerekirse aşağı da iner.",
  },
  {
    baslik: "Sınıra gelince ne olur",
    desc:
      "Eşiklerde haber verilir. Sınır aşılırsa çalışma hemen kesilmez: bir süre tanınır. O sürede üst banda geçilirse yeni bedel aşım tarihinden itibaren işler — geçmişe dönük değil. Geçilmezse dış ajanların yazma işlemleri durur, işler teknisyen kuyruğuna düşer.",
  },
  {
    baslik: "İmzasız fatura yok",
    desc:
      "Üst banda geçiş imzalı ek siparişle olur. Habersiz ek ücret, otomatik aşım faturası ya da geçmişe dönük borç çıkarılmaz.",
  },
  {
    baslik: "Aşağı inmek de var",
    desc:
      "İş azalırsa yenilemede bir alt banda inersiniz. Şartı: iki dönem üst üste düşük kalmak; bir seferde tek kademe. Bant tek yönlü bir bilet değildir.",
  },
  {
    baslik: "En üst bandın da sınırı var",
    desc:
      "Büyük bandın üst sınırını aşan kullanım kurumsal seviyeye girer ve ayrıca fiyatlanır. Sebep maliyet değil ölçek: bir kurumun elli bin işi ile beş milyon işi aynı bedele girmemelidir.",
  },
  {
    baslik: "Kimliksiz otomasyonun sonucu",
    desc:
      "Kimliğini bildirmeden çalışan yazılım tespit edilirse erişimi askıya alınır ve doğru band sözleşmeye geçirilene kadar açılmaz. Geçmiş döneme ceza faturası çıkarılmaz.",
  },
];

const OLCUM = [
  {
    baslik: "Faturaya esas dönem",
    desc: "Sözleşme yılı. Bandınız bu dönem içinde geçerlidir ve dönem başında sıfırlanır.",
  },
  {
    baslik: "İzlemeye esas pencere",
    desc: "Kayan son on iki ay. Bandın doğru seçilmesi ve olağandışı hareketin görülmesi bu pencereden yapılır.",
  },
  {
    baslik: "Sayılan sonuçlar",
    desc: "Hangi sonuçların iş sayıldığı sözleşmede tek tek listelenir: kaydın çözülmesi, kapatılması, yönlendirilmesi gibi. Liste dönem içinde değişmez.",
  },
];

const SEFFAFLIK = [
  {
    icon: Receipt,
    baslik: "Her işin dökümü açık",
    desc: "Hangi iş ne zaman, hangi yazılım tarafından, kimin sorumluluğunda yapıldı — hepsi kayıtlıdır ve dışa aktarılabilir.",
  },
  {
    icon: Scale,
    baslik: "Tanımlar sözleşmede sabit",
    desc: "Bant sınırları ve neyin sayılacağı sözleşmenizde yazılıdır; sözleşme dönemi içinde tek taraflı değiştirilmez.",
  },
  {
    icon: Bell,
    baslik: "Önceden haber verilir",
    desc: "Bandınızın sonuna yaklaştığınızda bilgilendirilirsiniz. Ne yapılacağına siz karar verirsiniz; otomatik ek ücret işlemez.",
  },
  {
    icon: Gauge,
    baslik: "Geriye dönük fatura yok",
    desc: "Yeni bir kural ya da sayım devreye girerse yalnız ileriye dönük uygulanır. Geçmiş kullanım için sonradan bedel çıkarılmaz.",
  },
];

const SSS = [
  {
    s: "Aldığımız eklentinin yaptığı iş için ayrıca ödeme yapacak mıyız?",
    c: "Hayır. Eklentinin bedeli yıllıktır ve insansız çalışması da bu bedele dahildir. Gece çalışsın, toplu çalışsın, günde binlerce kayıt işlesin — fatura değişmez. Aynı iş için hem eklenti bedeli hem ayrı bir ücret alınmaz.",
  },
  {
    s: "O hâlde iş sayacı neden var?",
    c: "İki iş için: kurumunuzun dışarıdan bağladığı ajanların hangi bantta olduğunu belirlemek ve kimliğini bildirmeden çalışan otomasyonu yakalamak. Koltuk saymak gibi düşünün — kimse her girişte fatura kesmiyor, sadece kaç koltuk gerektiğini belirliyor.",
  },
  {
    s: "GateCoreAI'yi almasak olmaz mı?",
    c: "Olmaz. Bir güvenlik katmanıdır; sisteme bağlanan yazılımların kimlikli ve denetlenebilir olması buna bağlıdır. Bizim kendi eklentilerimiz de aynı kapıdan geçer. Bu yüzden her AICore kurulumunda alınır.",
  },
  {
    s: "Sona onay düğmesi koysak iş insan işi sayılır mı?",
    c: "Hayır. İş, çözümü kim ürettiyse ona yazılır; onay tıklaması bunu değiştirmez. Teknisyen kaydı gerçekten inceleyip düzelttiğinde ya da çözümü kendisi tamamladığında iş insan işidir — bu fark kayıtta görünür ve ölçülür.",
  },
  {
    s: "Bandımız dolarsa çalışma birden kesilir mi?",
    c: "Hayır. Eşiklerde önceden haber verilir, sınır aşıldığında bir süre tanınır. O sürede üst banda geçerseniz yeni bedel aşım tarihinden itibaren işler; geçmişe dönük ücret çıkmaz. Geçmezseniz yalnız dış ajanların yazma işlemleri durur — teknisyenleriniz ve AICore eklentileriniz çalışmaya devam eder.",
  },
  {
    s: "İşimiz azalırsa aşağı inebilir miyiz?",
    c: "Evet. İki dönem üst üste bandın altında kalırsanız yenilemede bir alt kademeye inersiniz. Bant tek yönlü değildir.",
  },
  {
    s: "Kendi geliştirdiğimiz yazılım da banda girer mi?",
    c: "Yalnızca insan olmadan iş bitiriyorsa girer — kaydı çözüyor, kapatıyor, karar veriyorsa. Sadece kayıt açıyor ya da veri taşıyorsa girmez. Yazılımın kim tarafından yazıldığına değil, ne yaptığına bakılır.",
  },
  {
    s: "İstek ya da kelime başına ücret var mı?",
    c: "Hayır. Yerinde kurulumda dil modeli kendi sunucunuzda çalışır; dışarıya giden kullanım faturası oluşmaz. Maskeli Bulut modunda bulut kullanım bedeli kurumun kendi hesabına aittir, biz araya bir ücret koymayız.",
  },
  {
    s: "Teknisyen sayımızı azaltırsak ne olur?",
    c: "Teknisyen lisansı ve ona bağlı kişi başına eklentiler azalır, ödemeniz de azalır. AICore tarafında zorunlu asgari teknisyen sayısı yoktur; ServiceCore ana platformunun kendi asgari lisans kuralları ise geçerliliğini korur.",
  },
  {
    s: "Havuzdan ortak kullanılan lisans mümkün mü?",
    c: "Hayır. ServiceCore lisansları isme yazılıdır; bu AICore tarafında da geçerlidir. Aynı hesabın birden çok kişi ya da yazılım tarafından paylaşılması lisans şartlarına aykırıdır.",
  },
];

export default function AICoreLisanslamaPage() {
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
            AICORE · LİSANSLAMA
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          Ne için{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-accent-purple-light) to-(--color-brand-accent)">
            ödersiniz?
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          AICore lisanslaması üç gruptan oluşur: yıllık ürün lisansları, zorunlu
          GateCoreAI lisansı ve tek seferlik kurulum ile yıllık destek. Bunların
          dışında bir yapay zekâ kalemi yoktur.
        </p>

        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
          Bu kalemler mevcut ServiceCore platform ve teknisyen lisanslarınızın
          üzerine eklenir; onların yerine geçmez. Yapay zekâ lisanslamasının çoğu
          yerde muğlak bırakıldığını biliyoruz — bu sayfa ne için ödediğinizi,
          neyin ücretsiz olduğunu ve sayacın ne işe yaradığını tek tek yazar.
        </p>

        {/* ÜÇ KALEM */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            TEKLİFTEKİ ÜÇ KALEM
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {KALEMLER.map((k) => (
              <div
                key={k.baslik}
                className="rounded-2xl border border-white/8 bg-white/2 p-7 flex flex-col"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) mb-5">
                  <k.icon className="w-4.5 h-4.5" />
                </span>
                <div className="text-[10px] font-mono font-semibold tracking-[0.18em] text-(--color-text-muted) mb-2">
                  {k.etiket}
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-3">{k.baslik}</h3>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                  {k.ozet}
                </p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {k.satirlar.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm font-light leading-relaxed text-(--color-text-secondary)">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-(--color-accent-purple-light)" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-white/8 text-[13px] font-medium text-white">
                  {k.fiyat}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DAHİL OLAN */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            EN ÖNEMLİ MADDE
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Eklentinin yaptığı iş, eklentinin fiyatına dahildir.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Bir eklentiyi aldıysanız, o eklentinin bitirdiği iş için ikinci bir
            ücret ödemezsiniz. Yapay zekâ lisanslamasında en sık karşılaşılan
            sürpriz budur; biz baştan kapatıyoruz.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {DAHIL.map((d) => (
              <div
                key={d}
                className="rounded-2xl border border-(--color-accent-purple-base)/25 bg-(--color-accent-purple-base)/6 p-6 flex gap-3"
              >
                <CircleCheck className="w-5 h-5 mt-0.5 shrink-0 text-(--color-accent-purple-light)" />
                <p className="text-sm font-light leading-relaxed text-white/85">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SAYAÇ NEDİR / NE DEĞİLDİR */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            PEKİ SAYAÇ NE İŞE YARAR
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Koltuk saymak gibi — her girişte fatura kesmek gibi değil.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Sistemde insansız biten işler sayılır. Ama bu sayı bir fatura satırı
            değildir; hangi bandın gerektiğini belirler ve kimliğini bildirmeyen
            otomasyonu yakalar.
          </p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-white/8 bg-white/2 p-7">
              <div className="flex items-center gap-2 mb-5">
                <CircleX className="w-4.5 h-4.5 text-(--color-text-muted)" />
                <span className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted)">
                  Ne değildir
                </span>
              </div>
              <ul className="space-y-3">
                {SAYAC_NE_DEGIL.map((s) => (
                  <li key={s} className="flex gap-2.5 text-sm font-light leading-relaxed text-(--color-text-secondary)">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-(--color-text-muted) shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-(--color-accent-purple-base)/25 bg-(--color-accent-purple-base)/6 p-7">
              <div className="flex items-center gap-2 mb-5">
                <CircleCheck className="w-4.5 h-4.5 text-(--color-accent-purple-light)" />
                <span className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-accent-purple-light)">
                  Ne işe yarar
                </span>
              </div>
              <ul className="space-y-3">
                {SAYAC_NE.map((s) => (
                  <li key={s} className="flex gap-2.5 text-sm font-light leading-relaxed text-white/85">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-(--color-accent-purple-light)" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* BANT */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            KAPININ BANDI
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Bant yalnız dışarıdan bağlanan ajanlar için işler.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Kurumunuzun kendi geliştirdiği ya da dışarıdan aldığı bir ajan,
            AICore eklentisi değildir — arkasında bir eklenti lisansı yoktur.
            Bu durumda ölçü kapının bandıdır.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {BANT.map((b) => (
              <div
                key={b.baslik}
                className={`rounded-2xl border p-7 ${
                  b.tone === "vurgu"
                    ? "border-(--color-accent-purple-base)/25 bg-(--color-accent-purple-base)/6"
                    : "border-white/8 bg-white/2"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) shrink-0">
                    {b.tone === "vurgu" ? <Bot className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                  </span>
                  <h3 className="text-lg font-semibold text-white tracking-tight">{b.baslik}</h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/8 bg-white/2 px-6 py-5 max-w-4xl">
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              <span className="text-white font-medium">Neden böyle?</span> Bir
              eklenti aldığınızda bedelini zaten ödüyorsunuz; ikinci kez saymak
              haksızlık olur. Kendi ajanınız ise hiçbir eklenti lisansı
              tüketmeden aynı işi yapıyor — ölçünün oraya konması gerekiyor.
              Kural tek cümle: <span className="text-white">lisansı olan iş sayılmaz, lisansı olmayan iş banda girer.</span>
            </p>
          </div>
        </section>

        {/* BANDIN KURALLARI */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            BANDIN KURALLARI
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Sekiz kural, sözleşmede aynen yazılı.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Bandın nasıl belirlendiği, nasıl değiştiği ve sınıra gelindiğinde ne
            olduğu baştan bellidir. Yoruma bırakılan hiçbir yer kalmasın diye
            hepsi tek tek yazıldı.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {BANT_KURALLARI.map((k, i) => (
              <div key={k.baslik} className="rounded-2xl border border-white/8 bg-white/2 p-6 flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-lg border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) font-mono text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight mb-1.5">{k.baslik}</h3>
                  <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{k.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-white tracking-tight mt-12 mb-4">
            Ölçüm nasıl yapılır
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OLCUM.map((o) => (
              <div key={o.baslik} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <div className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted) mb-2">
                  {o.baslik}
                </div>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{o.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ÜCRETSİZ OLANLAR */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            ÜCRETLENDİRİLMEYENLER
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Sisteme iş getiren hiçbir şeyden bedel almıyoruz.
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

        {/* ŞEFFAFLIK */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            ŞEFFAFLIK
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Sayaç bizde değil, sizinle birlikte.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Bandınızı doğrulayabilmeniz için gereken her şey ürünün içindedir ve
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
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            SIKÇA SORULAN SORULAR
          </h2>
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
            href="/aicore/gatecore"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/15 text-white/85 hover:text-white hover:border-white/30 font-medium text-sm transition-colors cursor-pointer"
          >
            GateCoreAI
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/planlar/lisanslama-rehberi"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Lisanslama Rehberi
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <PrivacyContact />
    </div>
  );
}
