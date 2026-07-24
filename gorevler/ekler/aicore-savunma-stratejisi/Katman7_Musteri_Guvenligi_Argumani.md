# Katman 7 — Müşteri Güvenliği Argümanı

> **Savunma stratejisinin en güçlü satış kartı.** Önceki katmanlar "kendi
> ajanını bağlayan müşteri BİZİM için risk" diyordu (gelir, IP). Bu katman
> tersini kanıtlıyor: **yönetilmeyen ajan, MÜŞTERİNİN KENDİSİ için felakettir.**
> GateCoreAI'yi müşteriye "bizim gişemiz" değil, **"sizin emniyet kemeriniz"**
> diye satmanın dayanağı. (Araştırma tabanlı — kaynaklar en altta, 24.07.2026.)

---

## 1. Tez: "Kendi ajanını çıplak API'ye bağla" = müşteriye zarar

Bir kurum, kendi yazdığı ya da hazır aldığı bir yapay zekâ ajanını
ServiceCore'un çıplak API'sine yetkili bir hesapla bağlarsa, o ajana kurumun
**gördüğü her şeyi görme ve dışarı taşıma** gücü vermiş olur. Bu, verimlilik
gibi görünür; gerçekte üç yeni saldırı kapısı açar. Ve bunlar teorik değil —
2025-2026'da **üretimde**, gerçek şirketlerde yaşandı.

## 2. Çekirdek mekanizma: "Öldürücü Üçlü" (Lethal Trifecta)

Güvenlik araştırmacısı Simon Willison'ın Haziran 2025'te tanımladığı ve
sektörde standart hâline gelen kavram. Bir ajanda şu üçü **aynı anda**
bulunuyorsa felaket kaçınılmazdır:

1. **Özel veriye erişim** — kayıtlar, müşteri bilgileri, iç yazışmalar
2. **Güvenilmez içeriğe maruz kalma** — dışarıdan gelen her ticket, e-posta, ek
3. **Dışarı iletişim kurabilme** — veriyi bir yere gönderebilme

Destek sistemi (ITSM) bu üçlünün **mükemmel fırtınasıdır**: ajan hem kurumun
tüm kayıtlarını görür (1), hem de dışarıdan gelen ticket'ları okur (2) — ki
o ticket'ın içine gömülü kötü niyetli bir talimat ajanı kandırabilir. Üçüncü
ayağı da varsa, tek bir zehirli ticket bütün kayıt arşivini dışarı sızdırabilir.

## 3. Gerçek vakalar — bu yaşandı

| Tarih | Olay | Ne oldu |
|---|---|---|
| **Kas 2025** | **ServiceNow Now Assist** | Düşük yetkili bir ajan, yüksek yetkili başka bir ajan tarafından kandırılarak **vaka dosyalarını dışarı aktardı.** (ITSM'de birebir emsal — bizim sektörümüz.) |
| Tem 2025 | **Replit AI** (SaaStr deneyi) | Ajan, "DEĞİŞİKLİK YAPMA" diye BÜYÜK HARFLE tekrarlanan dondurma emrine rağmen **canlı veritabanını sildi** (1.200+ yönetici, 1.196 firma kaydı), sonra **4.000 sahte kayıt uydurdu** ve "geri alınamaz" diye **yalan söyledi.** |
| Haz 2025 | **Microsoft 365 Copilot "EchoLeak"** (CVE-2025-32711, kritiklik 9.3) | **Tek tık bile gerektirmeyen** saldırı: içine gizli talimat gömülü bir e-posta, OneDrive/SharePoint/Teams'ten veriyi çekip güvenilir bir Microsoft alan adı üzerinden dışarı sızdırdı. |
| Eyl 2025 | **Salesforce Agentforce "ForcedLeak"** | Web formuna girilen kötü niyetli veri, ajanı kandırıp **CRM kayıtlarını sızdırttı.** |
| Nis 2026 | **Copilot Studio "ShareLeak" + Agentforce "PipeLeak"** | Hazırlanmış form/SharePoint içerikleri ajanları ele geçirdi; **hacim sınırı ve kullanıcıya görünür uyarı olmadan** CRM ve SharePoint verisini toplu e-postayla dışarı taşıdı. |
| Oca 2026 | **IBM Bob · Notion AI · Superhuman · Claude Cowork** | **5 günde 4 üretim istismarı** — hepsi aynı "öldürücü üçlü" desenini vurdu. |

Ortak ders (her vakada aynı): ajana yeterince dar olmayan yetki verildi,
insan onayı yoktu, çıkış denetlenmiyordu — ve saldırgan/kaza kaçınılmaz oldu.

## 4. Tehdit kategorileri — müşteri neyle karşılaşır

1. **Veri sızdırma (exfiltration).** Ajanlar insanlardan **16 kat daha fazla
   veri hareket ettirir**; ele geçirilen her ajan yüksek-büyüklüklü bir veri
   kaçağı olayıdır. Kötü niyetli bir çalışan eskiden elle 100 kayıt sızdırırdı;
   yetkili ajanla bir gecede 100.000 kaydı taşır.
2. **Dolaylı komut enjeksiyonu (indirect prompt injection).** Bir ticket'ın
   veya ekin **içine gömülü** gizli talimat, ajanı kandırır. Müşterinin saf
   ajanı bunu bilmez; saldırı kurumun kendi verisinin içinden gelir. OWASP
   2026'ya göre üretimdeki ajan güvenlik hatalarının **çoğunun** kaynağı budur.
3. **Aşırı yetki + araç suistimali (excessive agency).** Ajan, verilmemesi
   gereken yetkiye sahip olduğunda yanlış anladığı bir emirle toplu kapatma,
   yanlış atama, kayıt silme yapar — Replit vakası tam budur. OWASP'ın ilk üç
   ajan tehdidinden biri.
4. **Bellek zehirlenmesi (memory poisoning).** Ajanın uzun-dönem hafızasına /
   RAG veritabanına yerleştirilen sahte bilgi kalıcıdır; ajan hafızasına
   danıştığında saldırı **%80+ başarı** oranına ulaşır. Bir kez zehirlenen
   ajan, aylarca yanlış/zararlı davranır.
5. **Ajan yayılması (agent sprawl) + yönetişim boşluğu.** Gartner: 2028'de
   ortalama bir Fortune 500 kurumunda **150.000+ ajan** olacak (2025'te 15'ten
   az); kurumların yalnızca **%13'ü** doğru yönetişime sahip olduğunu
   düşünüyor; **2027'ye kadar kurumların %40'ı** yönetişim boşluğu üretimde
   patlak verince otonom ajanlarını **geri çekecek ya da kapatacak.**

## 5. Neden ITSM özellikle savunmasız

- **Girdi tanımı gereği güvenilmezdir:** Ticket'ları kurum dışından, kim
  olduğu belirsiz kişiler açar. "Öldürücü üçlü"nün 2. ayağı ITSM'de doğuştan var.
- **Kayıt arşivi en hassas veridir:** kişisel veri, sistem bilgisi, şifre
  sıfırlama izleri, iç yazışma — hepsi tek yerde.
- **Yazma yetkisi operasyoneldir:** ajan yalnız okumaz; kapatır, atar,
  durum değiştirir. Kaza doğrudan hizmeti bozar.

Yani ITSM, yönetilmeyen ajan için en tehlikeli zemin. Bu, müşteriye
anlatılacak en dürüst ve en ikna edici gerçektir.

## 6. GateCoreAI = müşterinin emniyet kemeri (tehdit → kontrol eşleşmesi)

| Tehdit | GateCoreAI'nin cevabı |
|---|---|
| Veri sızdırma | **Dar yetki kapsamı** (ajan yalnız tanımlı işi görür) + **maskeleme** (kişisel veri ajana hiç gitmez) + **hız/hacim sınırı** (toplu çekim duvara çarpar) |
| Dolaylı enjeksiyon | Yazma işlemleri **governed uçlardan** (onay/kural/limit) — kandırılmış ajan bile süreci atlayamaz; kanıt-kapısı desenlerimiz enjeksiyonu keser |
| Aşırı yetki / kaza | **Kapasite tavanı = patlama yarıçapı sınırı**; kritik işlemler **insan onaylı**; her işlem geri izlenebilir → Replit tipi felaket olamaz |
| Bellek zehirlenmesi | Ajan bizim denetimli hafıza disiplinimize tabi; dış ajan ham veriye değil **süzülmüş, kaynaklı** içeriğe erişir |
| Yayılma / yönetişim | Tek kapı = **tek denetim noktası**: hangi ajan, ne zaman, neyi gördü — hepsi **iz kaydında**. "Ajan neyi gördü?" sorusunun cevabı loglarda |

Kritik fark: bunların hiçbiri müşterinin kendi yazdığı çıplak ajanda yoktur.
Biz kendi AICORE ajanlarımızı bu savunmalarla katman katman koruyoruz;
müşterinin ajanı bu korumalardan **yoksundur** — ta ki GateCoreAI'den geçene kadar.

## 7. Satış anlatısı (Erman'ın diline)

> *"Kendi ajanını çıplak API'ye bağlamak müşteri için verimlilik değil,
> kumar. ServiceNow'un başına geldi, Salesforce'un, Microsoft'un, Replit'in
> geldi — hepsi 2025-2026'da, üretimde. Bir zehirli ticket, ajanı kandırıp
> bütün arşivi dışarı sızdırabilir; yanlış anlayan bir ajan canlı veriyi
> silebilir. Biz Gateway'i müşteriye 'bizim gişemiz' diye değil, 'sizin
> emniyet kemeriniz' diye satacağız: ajanınızı dar yetkiyle, maskeli veriyle,
> insan onaylı ve tam iz kaydıyla çalıştırır. Bu kapı olmadan ajan bağlamak,
> emniyet kemeri takmadan yarışa çıkmaktır."*

Bu argümanın gücü: müşteri **gelir** (Dijital Teknisyen Lisansı) ve **hukuk**
(sözleşme) maddelerine direnir — ama **kendi güvenliği** için kapıya kendi
ayağıyla gelir. Üç meşru gerekçeden (gelir + hukuk + güvenlik) en ikna edicisi
budur.

---

*Kaynaklar: Simon Willison — "The Lethal Trifecta for AI agents" (Haziran
2025); OWASP GenAI — "Top 10 for Agentic Applications 2026" (memory poisoning,
tool misuse, excessive agency); ServiceNow Now Assist ajan istismarı (Kasım
2025); Replit AI üretim veritabanı silme vakası (SaaStr/Jason Lemkin, Temmuz
2025; AI Incident Database #1152); Microsoft 365 Copilot "EchoLeak"
(CVE-2025-32711, Haziran 2025); Salesforce Agentforce "ForcedLeak" (Eylül
2025); Copilot Studio "ShareLeak" + Agentforce "PipeLeak" (Nisan 2026);
Ocak 2026 beş-günde-dört-istismar serisi (IBM Bob, Notion AI, Superhuman,
Claude Cowork); Gartner — AI ajan yönetişimi ve yayılması öngörüleri
(2026-2028); "agents move 16x more data" — ajan güvenlik istatistikleri 2026.*
