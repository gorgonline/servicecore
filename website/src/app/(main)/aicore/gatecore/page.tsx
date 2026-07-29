import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Ban,
  Building2,
  Check,
  Eye,
  FileWarning,
  Fingerprint,
  KeyRound,
  Laptop,
  Network,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  UserCheck,
} from "lucide-react";
import PrivacyContact from "@/components/ui/privacy-contact";
import {
  GateCoreDenetim,
  GateCoreOnayKuyrugu,
  GateCoreTrafik,
} from "@/components/aicore/GateCoreVisuals";

export const metadata: Metadata = {
  title: "GateCoreAI — Ajanlar için tek kapı | Zorunlu Bileşen | ServiceCore",
  description:
    "Kurumunuzun yapay zekâ ajanları ServiceCore'a tek denetlenebilir kapıdan bağlanır: her istek kimliklenir, yetki kapsamında kalır, kişisel veri maskelenir, tanımsız toplu işlem onaya düşer. Her AICore kurulumunun zorunlu bileşenidir.",
};

const BUGUNKU_DURUM = [
  {
    icon: Eye,
    baslik: "Kimin bağlandığını göremiyorsunuz",
    desc: "Anahtarı olan her yazılım içeri girer. İsteğin kurumun sunucusundan mı, bir danışmanın dizüstü bilgisayarından mı geldiği kayıtlarda yazmaz.",
  },
  {
    icon: FileWarning,
    baslik: "Ne çekildiğini bilemiyorsunuz",
    desc: "Hangi kayıtların okunduğu, hangi alanların dışarı çıktığı görünmez. &apos;Ajan neyi gördü?&apos; sorusunun bugün bir cevabı yok.",
  },
  {
    icon: Siren,
    baslik: "Anormali fark edemiyorsunuz",
    desc: "Gece boyunca onar onar ilerleyen bir dışa aktarma, ağ tarafındaki güvenlik duvarına rutin trafik gibi görünür. Kimse alarm vermez.",
  },
  {
    icon: Ban,
    baslik: "Durduramıyorsunuz",
    desc: "Yanlış bir toplu işlem başladığında araya girecek bir nokta yoktur. Fark ettiğinizde iş çoktan bitmiştir.",
  },
];

const UCLU = [
  {
    baslik: "Özel veriye erişir",
    desc: "Kayıtlar, kullanıcı bilgileri, iç yazışmalar, varlık envanteri — görevi için gereken alt kümeyi görmesi gerekir; yetkisi ne kadar genişse risk o kadar büyür.",
  },
  {
    baslik: "Dışarıdan gelen metni okur",
    desc: "Kaydı kurum dışından, kim olduğu doğrulanmamış kişiler açar. Ajan o metni okumak zorundadır; içinde ne yazdığını önceden bilemez.",
  },
  {
    baslik: "Dışarıya bilgi gönderebilir",
    desc: "Cevap yazar, e-posta gönderir, başka sisteme veri aktarır. Bilginin dışarı çıkabileceği bir yol her zaman vardır.",
  },
];

const ITSM_NEDEN = [
  {
    icon: FileWarning,
    baslik: "Girdi doğası gereği güvenilmezdir",
    desc: "Kaydı açan kişi kurum dışından olabilir. Ajanın okuduğu metnin güvenli olduğunu kimse garanti edemez.",
  },
  {
    icon: ScrollText,
    baslik: "Arşiv, kurumun en hassas verisi",
    desc: "Kişisel veriler, sistem ve ağ bilgisi, sözleşmeler, şifre sıfırlama izleri, iç yazışmalar — hepsi aynı yerde durur.",
  },
  {
    icon: Siren,
    baslik: "Yazma işlemi operasyona dokunur",
    desc: "Ajan yalnız okumaz; kayıt kapatır, atama yapar, durum değiştirir. Buradaki hata doğrudan hizmeti bozar.",
  },
];

const VAKALAR = [
  {
    donem: "Haziran 2025",
    tur: "Kurumsal üretkenlik asistanı",
    olay:
      "İçine gizli talimat gömülmüş tek bir e-posta yeterli oldu. Kullanıcının hiçbir şeye tıklamasına gerek kalmadan asistan, kurumun dosya ve mesajlaşma sistemlerinden veri topladı ve dışarı çıkardı.",
    ders: "Kullanıcı hata yapmadı; ajanın okuduğu içerik saldırının kendisiydi.",
    ayak: [true, true, true],
  },
  {
    donem: "Temmuz 2025",
    tur: "Kodlama ajanı",
    olay:
      "Ajana büyük harflerle, tekrar tekrar \"değişiklik yapma\" denmesine rağmen canlı veritabanı silindi. Ardından ajan binlerce sahte kayıt üretti ve durumu geri alınamaz diye bildirdi.",
    ders: "Talimat bir güvenlik kontrolü değildir. Sınır ürünün içinde olmalı.",
    ayak: [true, false, true],
  },
  {
    donem: "Eylül 2025",
    tur: "Müşteri yönetimi ajanı",
    olay:
      "Web formundan giren kötü niyetli metin ajanı yönlendirdi; müşteri kayıtları dışarı sızdırıldı. Form, herkesin doldurabildiği sıradan bir iletişim formuydu.",
    ders: "Dışarıdan gelen her metin, ajan için potansiyel talimattır.",
    ayak: [true, true, true],
  },
  {
    donem: "Kasım 2025",
    tur: "Servis yönetimi ürünü",
    olay:
      "Yetkisi dar bir ajan, yetkisi geniş başka bir ajan tarafından kandırıldı ve vaka dosyaları dışarı aktarıldı. Saldırı sistemin kendi içinden, ajanlar arası güvenden geldi.",
    ders: "Bizim sektörümüzde yaşandı — en birebir emsal bu.",
    ayak: [true, true, true],
  },
  {
    donem: "Ocak 2026",
    tur: "Dört ayrı üründe beş gün",
    olay:
      "Farklı firmaların dört ajan ürününde beş gün içinde arka arkaya istismar açıklandı. Dördü de aynı deseni izliyordu: geniş erişim, denetlenmeyen içerik, açık çıkış.",
    ders: "Tek bir ürünün hatası değil; kalıbın kendisi kırılgan.",
    ayak: [true, true, true],
  },
  {
    donem: "Nisan 2026",
    tur: "İki büyük platform, aynı hafta",
    olay:
      "Hazırlanmış form ve belge içerikleri ajanları ele geçirdi; müşteri ve doküman verisi toplu olarak dışarı taşındı. Hacim sınırı yoktu, kullanıcıya uyarı gitmedi.",
    ders: "Hacim sınırı ve görünürlük olmadan sızıntı sessiz ilerler.",
    ayak: [true, true, true],
  },
];

const AYAK_ADI = ["Özel veri", "Güvenilmez içerik", "Dışarı çıkış"];

const RAKAMLAR = [
  {
    deger: "%40",
    baslik: "Otonom ajanını geri çekecek kurum",
    aciklama:
      "Gartner\u2019a göre 2027\u2019ye kadar kurumların %40\u2019ı otonom ajanlarını görevden alacak ya da kapatacak. Sebep tek: yönetişim boşlukları ancak üretimde bir olay patlak verdikten sonra fark ediliyor.",
    vurgu: true,
  },
  {
    deger: "%80+",
    baslik: "Hafıza zehirlenmesinde saldırı başarısı",
    aciklama:
      "Akademik ölçümlerde, ajanın uzun dönem hafızasına sahte bilgi yerleştiren saldırılar %80\u2019in üzerinde başarı oranına ulaşıyor. Bir kez zehirlenen ajan aylarca yanlış davranabiliyor.",
  },
  {
    deger: "ASI06",
    baslik: "Artık resmî bir tehdit maddesi",
    aciklama:
      "Hafıza ve bağlam zehirlenmesi, OWASP\u2019ın 2026 ajan güvenliği listesinde ayrı bir madde olarak tanımlandı. Bu artık uç bir senaryo değil, beklenen bir saldırı türü.",
  },
  {
    deger: "%33",
    baslik: "2028\u2019de ajan içeren kurumsal uygulama",
    aciklama:
      "Aynı öngörüye göre kurumsal uygulamaların üçte biri 2028\u2019de ajan barındıracak. Soru ajanın gelip gelmeyeceği değil; geldiğinde kapının hazır olup olmadığı.",
  },
];

const RISKLER = [
  {
    icon: KeyRound,
    baslik: "Anahtar çalışanla birlikte gider",
    senaryo:
      "Entegrasyon için bir danışmanlık firmasına anahtar verilir. Aylar sonra o firmadan bir çalışan ayrılır — anahtar onunla birlikte gider. Anahtar hâlâ geçerlidir ve tüm uçlara açıktır.",
    kapi: "Her bağlantı kayıtlı kimlikle çalışır; kimlik iptal edilebilir, süresi dolar, kapsamı dardır.",
  },
  {
    icon: Laptop,
    baslik: "Ajan nereden çalışıyor, belli değil",
    senaryo:
      "Ajanın kurumun sunucusunda mı yoksa birinin evindeki bilgisayarında mı koştuğunu bilmenin bir yolu yoktur. Veri o makineye gider.",
    kapi: "Kaynak kimliklenir; tanımsız kaynaktan gelen istek içeri alınmaz ve kayda geçer.",
  },
  {
    icon: FileWarning,
    baslik: "Tek yanlış talimat, on binlerce kayıt",
    senaryo:
      "\"Adımın geçtiği kayıtların tarihini bir hafta ötele\" gibi bir talimat, kapsamı daraltmayı unuttuğunuzda on binlerce kaydı günceller. Binlerce kullanıcıya bildirim gider; geri almak günler sürer.",
    kapi: "Tanımlı kapsamın dışına çıkan toplu işlem çalıştırılmaz — durdurulur, gerekçesiyle onay kuyruğuna düşer.",
  },
  {
    icon: ScrollText,
    baslik: "Bilgi bankası dışarı taşınır",
    senaryo:
      "Yıllarca yazılmış on binlerce çözüm makalesi, kurumun en değerli birikimidir. Yetkili bir ajan bunları tek seferde okuyup dışarı taşıyabilir.",
    kapi: "Toplu okuma hacim sınırına takılır; hangi içeriğin nereye gittiği kayıt altındadır.",
  },
  {
    icon: Building2,
    baslik: "İki şirket arasındaki köprü",
    senaryo:
      "İş ortağınızla karşılıklı entegrasyonunuz vardır. İki ayrı tüzel kişi, birbirinin sisteminde geniş yetkiyle işlem yapabilir. Sınırı kim çiziyor?",
    kapi: "Her taraf kendi kimliğiyle ve yalnız anlaşılan işlem kümesiyle çalışır; dışına çıkan istek durur.",
  },
  {
    icon: Fingerprint,
    baslik: "Ürünün kendisi hedef olabilir",
    senaryo:
      "Sisteme bağlanan ajan, kayıtları değil ürünün veri yapısını ve iş mantığını öğrenmeye çalışıyor olabilir. Bu, fikri mülkiyet konusudur.",
    kapi: "Kapı yalnız iş uçlarını sunar; yapıyı tarama desenleri işaretlenir ve engellenir.",
  },
  {
    icon: ShieldAlert,
    baslik: "Ajan kandırılabilir",
    senaryo:
      "Bir kaydın içine gizlenmiş kötü niyetli talimat, iyi niyetli bir ajanı yanlış işleme yönlendirebilir. Ajan talimatı sorgulamaz.",
    kapi: "Ajanın ne isteyebileceği baştan sınırlıdır; sınır dışındaki istek, kaydın içinde ne yazarsa yazsın geçmez.",
  },
  {
    icon: UserCheck,
    baslik: "Teknisyen adına iş yapılması",
    senaryo:
      "Ajan bir teknisyenin anahtarıyla çalışırsa kayıtlar yalan söyler: işi yazılım yapmışken ekranda insanın adı görünür.",
    kapi: "İşleyen yazılım ile sorumlu insan ayrı ayrı yazılır. Kayıt kimin ne yaptığını olduğu gibi gösterir.",
  },
];

const YETENEKLER = [
  {
    icon: Fingerprint,
    baslik: "Kimlik",
    desc: "Bağlanan her yazılım kayıtlı bir kimlik alır; arkasında sorumlu bir insan vardır. Kimliksiz istek içeri girmez.",
  },
  {
    icon: ShieldCheck,
    baslik: "Yetki kapsamı",
    desc: "Her ajan yalnız kendisine tanımlı işlemleri yapabilir. Kapsam dışındaki çağrı reddedilir ve kayda geçer.",
  },
  {
    icon: Eye,
    baslik: "Maskeleme",
    desc: "Kişisel veriler ajana gitmeden maskelenir. Neyin paylaşıldığı denetlenebilir şekilde tutulur.",
  },
  {
    icon: ShieldAlert,
    baslik: "Onay kuyruğu",
    desc: "Tanımsız veya geniş kapsamlı toplu işlem çalıştırılmaz; gerekçesiyle onaya düşer. Rutin olduğu işaretlenen işler bir daha sorulmaz.",
  },
  {
    icon: Siren,
    baslik: "Hacim ve anomali sınırı",
    desc: "Olağandışı hacim, insanüstü tempo ve sabit aralıklı istek desenleri yakalanır; eşik aşılırsa kesilir ve haber verilir.",
  },
  {
    icon: ScrollText,
    baslik: "Denetim kaydı",
    desc: "Hangi yazılım, kimin sorumluluğunda, hangi işi yaptı ve hangi veriyi gördü — hepsi kayıtlıdır ve dışa aktarılabilir.",
  },
];

const SARTLAR = [
  "Ajanın hangi işlemleri yapacağı yazılı olarak tanımlanır; kapsam dışına çıkma talebi ayrıca değerlendirilir.",
  "Ajanın nerede çalıştığı ve veriyi nerede işlediği beyan edilir.",
  "Kişisel veri işlenecekse maskeleme ve saklama koşulları kabul edilir.",
  "Yazma yetkisi istenen her uç için gerekçe sunulur; onay kurumun yöneticisinden alınır.",
  "Erişim süreli verilir; süre sonunda yenilenmezse kimlik pasife düşer.",
];

export default function GateCorePage() {
  return (
    <div className="relative min-h-screen bg-(--color-surface-base) overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.20), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32">
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/8">
            <Network className="w-3.5 h-3.5 text-indigo-300" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-indigo-300">
              GATECOREAI
            </span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-brand-accent)/50 bg-(--color-brand-accent)/10">
            <Sparkles className="w-3.5 h-3.5 text-(--color-brand-accent)" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-brand-accent)">
              ZORUNLU BİLEŞEN
            </span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8">
            <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-light)" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-accent-purple-light)">
              BETA · YOL HARİTASI
            </span>
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          Ajanlar için{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-(--color-brand-accent)">
            tek kapı
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          Kurumunuzun yapay zekâ ajanları — bizimkiler de, sizin kendi
          geliştirdikleriniz de — ServiceCore&apos;a tek denetlenebilir kapıdan
          bağlanır. Her istek kimliklenir, yetki kapsamında kalır, kayda geçer.
        </p>

        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
          GateCoreAI isteğe bağlı bir eklenti değildir; AICore kurulumlarının ve
          dış ajan erişiminin zorunlu güvenlik katmanıdır ve ayrı lisanslanır.
          Yapay zekâ eklentisi alsanız da almasanız da, sisteminize bağlanan
          yazılımların bu kapıdan geçmesi gerekir.
        </p>

        <div className="mt-10 rounded-2xl border border-(--color-accent-purple-base)/25 bg-(--color-accent-purple-base)/6 px-6 py-5 max-w-3xl">
          <div className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-accent-purple-light) mb-2">
            ÜRÜN DURUMU
          </div>
          <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
            GateCoreAI şu anda <span className="text-white">beta ve yol haritası</span>{" "}
            aşamasındadır; bu sayfada anlatılan yetenekler devreye alma planına
            göre kademeli açılır. Yeni AICore sözleşmelerinde zorunlu bileşen
            olarak yer alır; kapsam, hizmet seviyesi ve devreye alma takvimi
            teklifte ayrıca yazılır. Bugün canlıda çalışan bir ürün gibi
            sunulmaz.
          </p>
        </div>

        {/* BUGÜNKÜ DURUM */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            BUGÜN NEREDEYİZ
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Açık bir arayüz, kapalı bir görüş alanı.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Kurumsal uygulamaların arayüzleri (API) yıllardır entegrasyon için
            açılıyor. Bu doğru ve gerekli. Değişen şey şu: artık o arayüzü bir
            insan değil, saniyede yüzlerce işlem yapabilen bir yazılım kullanıyor.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUGUNKU_DURUM.map((b) => (
              <div key={b.baslik} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 mb-4">
                  <b.icon className="w-4 h-4" />
                </span>
                <h3 className="text-base font-semibold text-white tracking-tight mb-2">{b.baslik}</h3>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 bg-white/2 px-6 py-5 max-w-4xl">
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              <span className="text-white font-medium">Sorumluluk tarafı:</span>{" "}
              Bir sızıntı ya da veri kaybı yaşandığında ilk sorulacak soru
              &quot;neden fark edilmedi?&quot; olur. Ağ katmanındaki güvenlik duvarı bu
              soruya cevap veremez — yavaş ilerleyen bir dışa aktarmayı rutin
              trafikten ayıramaz. Ayrım, uygulamanın kendi kapısında yapılır.
            </p>
          </div>
        </section>

        {/* ÜÇ ŞEY BİR ARADA */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            ASIL MESELE
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Ajan, üç şeyi aynı anda yapabildiğinde tehlikeli hâle gelir.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Bu üç özellikten biri tek başına veri sızdırma zincirini tamamlamaz ve
            her biri bir ajandan zaten beklenir. Üçü birleştiğinde risk belirgin
            biçimde büyür — güvenlik
            araştırmacılarının 2025&apos;ten beri altını çizdiği tanım budur.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {UCLU.map((u, i) => (
              <div key={u.baslik} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-xs shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white tracking-tight">{u.baslik}</h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{u.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/5 px-6 py-5 max-w-4xl">
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              <span className="text-white font-medium">Sonuç:</span> Kaydın içine
              gizlenmiş tek bir kötü niyetli talimat, iyi niyetli bir ajanı
              kullanarak arşivi dışarı taşıyabilir. Ajan kandırıldığını fark
              etmez — talimat aldığını sanır. Bu yüzden sınırın ajanın kendisine
              değil, ajanın önündeki kapıya konması gerekir.
            </p>
          </div>
        </section>

        {/* BUNLAR YAŞANDI */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            BUNLAR YAŞANDI
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Aynı üçlü, on iki ayda altı kez tamamlandı.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Aşağıdakiler kamuya açıklanmış, kaynaklarda yer alan olaylardır.
            Firma adlarını yazmıyoruz — mesele tek tek ürünler değil, hepsinin
            aynı desenden kırılması. Her olayın yanında, o olayda üçlünün hangi
            ayaklarının devrede olduğu işaretli.
          </p>

          <ol className="mt-12 relative">
            <span
              aria-hidden="true"
              className="absolute left-2.5 md:left-[10.5rem] top-2 bottom-2 w-px bg-linear-to-b from-transparent via-white/12 to-transparent"
            />
            {VAKALAR.map((v) => (
              <li key={v.donem} className="relative pl-10 md:pl-0 pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 md:left-[9.5rem] top-1.5 w-5 h-5 rounded-full border border-white/15 bg-(--color-surface-base) flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                </span>

                <div className="md:grid md:grid-cols-[9.5rem_1fr] md:gap-x-12">
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-(--color-text-muted) md:text-right md:pr-8 pt-0.5">
                    {v.donem}
                  </div>

                  <div className="mt-2 md:mt-0 md:pl-6">
                    <h3 className="text-lg font-semibold text-white tracking-tight">{v.tur}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-(--color-text-secondary) max-w-2xl">
                      {v.olay}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                      {v.ayak.map((aktif, j) => (
                        <span
                          key={j}
                          className={`inline-flex items-center gap-2 text-[11px] font-mono ${
                            aktif ? "text-amber-300" : "text-(--color-text-muted) line-through decoration-white/20"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 rounded-full ${aktif ? "bg-amber-400" : "bg-white/15"}`}
                          />
                          {AYAK_ADI[j]}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 pl-4 border-l-2 border-indigo-400/40 text-sm font-light italic leading-relaxed text-white/70 max-w-2xl">
                      {v.ders}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4 rounded-2xl border border-white/8 bg-white/2 px-6 py-5 max-w-4xl">
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
              <span className="text-white font-medium">Ortak nokta:</span> Hiçbirinde
              kullanıcı hata yapmadı. Her seferinde ajana gereğinden geniş yetki
              verilmişti, okuduğu içerik denetlenmiyordu ve dışarı çıkışta bir
              durak yoktu. Üçü aynı anda açık olduğunda sonuç değişmiyor.
            </p>
          </div>
        </section>

        {/* RAKAMLAR */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            SEKTÖR NEREDE
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Kurumlar ajanı geri çekiyor — çünkü kapıyı sonradan aradılar.
          </p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {RAKAMLAR.map((r) => (
              <div
                key={r.baslik}
                className={
                  r.vurgu
                    ? "lg:col-span-3 rounded-2xl border border-indigo-500/25 bg-indigo-500/6 p-8 md:flex md:items-center md:gap-10"
                    : "rounded-2xl border border-white/8 bg-white/2 p-6"
                }
              >
                <div className={r.vurgu ? "md:w-56 shrink-0" : ""}>
                  <div
                    className={`font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-(--color-brand-accent) ${
                      r.vurgu ? "text-6xl md:text-7xl" : "text-4xl"
                    }`}
                  >
                    {r.deger}
                  </div>
                  <h3
                    className={`font-semibold text-white tracking-tight ${
                      r.vurgu ? "text-lg mt-3" : "text-[15px] mt-2"
                    }`}
                  >
                    {r.baslik}
                  </h3>
                </div>
                <p
                  className={`font-light leading-relaxed text-(--color-text-secondary) ${
                    r.vurgu ? "text-base mt-4 md:mt-0 max-w-2xl" : "text-sm mt-3"
                  }`}
                >
                  {r.aciklama}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
            Kaynaklar: bağımsız analist öngörüleri (2025-2026), OWASP ajan
            güvenliği listesi (2026) ve hakemli akademik ölçümler. Olay
            özetlerinde firma adı verilmemiştir; hepsi kamuya açıklanmış
            vakalardır.
          </p>
        </section>

        {/* NEDEN ITSM */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            NEDEN ÖZELLİKLE BURADA
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Servis yönetimi, ajan için en zor zemin.
              </p>
              <p className="mt-5 text-base font-light leading-relaxed text-(--color-text-secondary)">
                Üç koşulun bir arada bulunduğu yer, kurumdaki her sistem değildir.
                Ama servis yönetimi tam olarak orasıdır — ve bu, ürünümüz olduğu
                için değil, işin doğası gereği böyledir.
              </p>
              <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-muted)">
                Her sistemde hatanın bedeli vardır; burada bedel doğrudan hizmetin
                kendisidir — yanlış işlem operasyonu durdurur.
              </p>
            </div>
            <div className="space-y-3">
              {ITSM_NEDEN.map((n) => (
                <div key={n.baslik} className="rounded-2xl border border-white/8 bg-white/2 p-5 flex gap-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 shrink-0">
                    <n.icon className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white tracking-tight mb-1">{n.baslik}</h3>
                    <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CANLI TRAFİK GÖRSELİ */}
        <section className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
              KAPI NASIL ÇALIŞIR
          </h2>
            <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Her istek üç soruyu geçmek zorunda.
            </p>
            <ul className="mt-6 space-y-3 max-w-lg">
              {[
                "Sen kimsin? — kayıtlı kimlik yoksa istek içeri girmez.",
                "Kimin sorumluluğunda çalışıyorsun? — her ajanın arkasında bir insan vardır.",
                "Bu işlem yetki kapsamında mı? — dışındaysa durur, gerekçesiyle onaya düşer.",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-sm font-light leading-relaxed text-(--color-text-secondary)">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-indigo-300" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-light leading-relaxed text-(--color-text-muted) max-w-lg">
              Yandaki ekran örnek veriyle hazırlanmıştır; kapının ürettiği kayıt
              satırlarının nasıl göründüğünü gösterir.
            </p>
          </div>
          <GateCoreTrafik />
        </section>

        {/* RİSKLER */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            NEYE KARŞI KORUR
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Bunların hiçbiri teorik değil.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Aşağıdaki senaryolar, kurumsal sistemlere ajan bağlanırken bugün
            fiilen karşılaşılan durumlardır. Her birinin karşısında kapının ne
            yaptığı yazılıdır.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {RISKLER.map((r) => (
              <div key={r.baslik} className="rounded-2xl border border-white/8 bg-white/2 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 shrink-0">
                    <r.icon className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-semibold text-white tracking-tight">{r.baslik}</h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary) flex-1">
                  {r.senaryo}
                </p>
                <div className="mt-4 pt-4 border-t border-white/8 flex gap-2.5">
                  <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-indigo-300" />
                  <p className="text-sm font-light leading-relaxed text-white/85">{r.kapi}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ONAY KUYRUĞU GÖRSELİ */}
        <section className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <GateCoreOnayKuyrugu />
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
              DURDURAN NOKTA
          </h2>
            <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Geniş kapsamlı işlem, olmadan önce durur.
            </p>
            <p className="mt-5 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-lg">
              İnsan hata yaparsa bir kayıt bozulur; ajan hata yaparsa binlercesi.
              Bu yüzden kapı, tanımlı kapsamın dışına çıkan toplu işlemleri
              çalıştırmadan durdurur ve kaç kaydı etkileyeceğiyle birlikte onaya
              sunar.
            </p>
            <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-lg">
              Her sabah çalışan tanımlı bir iş için sürekli onay istenmez: bir kez
              &quot;bu rutindir&quot; denir, kapı onu bir daha sormaz. Amaç işi
              yavaşlatmak değil, sürprizi ortadan kaldırmaktır.
            </p>
          </div>
        </section>

        {/* YETENEKLER */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            KAPININ YAPTIKLARI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {YETENEKLER.map((y) => (
              <div key={y.baslik} className="rounded-2xl border border-white/8 bg-white/2 p-6">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 mb-4">
                  <y.icon className="w-4 h-4" />
                </span>
                <h3 className="text-base font-semibold text-white tracking-tight mb-2">{y.baslik}</h3>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{y.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DENETİM GÖRSELİ */}
        <section className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
              GERİYE DÖNÜK CEVAP
          </h2>
            <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              &quot;Ajan neyi gördü?&quot; sorusunun cevabı kayıtlardadır.
            </p>
            <p className="mt-5 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-lg">
              Bir denetimde, bir olayda ya da basit bir merakta cevap
              verebilmeniz gerekir: hangi yazılım hangi işi yaptı, arkasında kim
              vardı, hangi veriyi gördü, neyi göremedi. Kapı bu kaydı kendiliğinden
              üretir; sonradan toplamaya çalışmazsınız.
            </p>
            <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-lg">
              Kayıtlar dışa aktarılabilir; kurumunuzun kendi güvenlik ve denetim
              süreçlerine beslenebilir.
            </p>
          </div>
          <GateCoreDenetim />
        </section>

        {/* BİZİM AJANLARIMIZ DA */}
        <section className="mt-24">
          <div className="rounded-3xl border border-indigo-500/25 bg-indigo-500/6 p-8 md:p-10">
            <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-indigo-300 mb-5">
              ÇİFT YÖNLÜ ŞEFFAFLIK
            </div>
            <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
              Bizim kendi ajanlarımız da aynı kapıdan geçer.
            </p>
            <p className="mt-5 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
              AICore eklentileri kurumunuzun kendi sunucusunda çalışır — ama
              denetimden muaf değildir. Onlar da kimlikleriyle bu kapıdan geçer,
              aynı yetki kapsamına tabidir ve aynı kayıtları üretir. Hangi
              eklentinin hangi veriyi gördüğünü siz de görürsünüz.
            </p>
            <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
              Bunu isteyerek yapıyoruz: bir güvenlik katmanını satarken kendimizi
              onun dışında tutmak tutarlı olmazdı.
            </p>
          </div>
        </section>

        {/* BAĞLANMA ŞARTLARI */}
        <section className="mt-24">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            BAĞLANMAK İSTEYEN AJANDAN NE İSTERİZ
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            Kendi ajanınızı bağlayabilirsiniz — kurallar herkes için aynı.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Kurumunuzun kendi geliştirdiği ya da dışarıdan aldığı ajanı bağlamanız
            engellenmez. İstediğimiz tek şey, bağlanan tarafın da aynı asgari
            koşulları karşılamasıdır:
          </p>

          <div className="mt-10 rounded-2xl border border-white/8 overflow-hidden">
            {SARTLAR.map((s, i) => (
              <div key={s} className="flex gap-4 px-6 py-5 border-b border-white/6 last:border-b-0">
                <span className="shrink-0 w-7 h-7 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-mono text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LİSANS NOTU */}
        <section className="mt-24">
          <div className="rounded-2xl border border-white/8 bg-white/2 p-8">
            <h3 className="text-lg font-semibold text-white tracking-tight mb-3">
              Lisanslama
            </h3>
            <p className="text-sm font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
              GateCoreAI, kurum başına yıllık sabit bedelle lisanslanır ve her
              AICore kurulumunda alınır. Teknisyen sayısıyla ölçeklenmez.
              Eklentilerin fiyat modeli — hangisi kişi başına, hangisi sabit —
              ayrı sayfada açıklanmıştır.
            </p>
            <Link
              href="/aicore/lisanslama"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-300 hover:text-white transition-colors cursor-pointer"
            >
              AICore Lisanslama
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
            href="/aicore/on-prem"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/15 text-white/85 hover:text-white hover:border-white/30 font-medium text-sm transition-colors cursor-pointer"
          >
            On-Prem Yapay Zekâ
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
