# AICore — On-Prem / Cloud Fiyat Duruşu Notu

> Erman'ın üç sorusuna cevaptır: modül başına kurulum bedeli, modül başına destek,
> ve "Cloud AI seçeneğinde add-on fiyatı farklı olmalı mı?"

## 1. Modül lisansı: iki modda da AYNI fiyat

**Add-on (eklenti) fiyatı On-Prem ve Maskeli Bulut'ta farklılaşmamalı.** Sebep:

- Eklenti iki modda da **aynı ürün** — aynı yetenek, aynı ekran, aynı değer.
  Müşteriye "aynı ürünün iki fiyatı var" anlatmak kafa karıştırır, pazarlığı davet eder.
- İki mod arasındaki gerçek maliyet farkı lisansta değil **kurulumda ve işletimde**
  oluşur; fark orada fiyatlanınca lisansa dokunmaya gerek kalmaz.
- Geçiş serbestliği korunur: müşteri Maskeli Bulut'tan On-Prem'e geçerken lisans
  fiyatı değişmez — geçişin önünde fiyat engeli olmaz.

## 2. Farkın fiyatlandığı yer: KURULUM PAKETİ

| | AICORE Launch Ready (On-Prem) | AICORE Cloud Ready (Maskeli Bulut) |
|---|---|---|
| Kapsam | AI sunucusu + yerel modeller + kalibrasyon + eğitim + gözetimli canlı | Hafif sunucu + maskeleme katmanı + kalibrasyon + eğitim |
| Tipik süre | 2-4 hafta | 1-2 hafta |
| Kurulum bedeli | **Yüksek taban** | **Düşük taban** (yaklaşık yarısı makul) |

**Modül başına kurulum bedeli** (Erman'ın önerisi) ağırlık tablosuyla birleşir:

> Kurulum bedeli = kurulum tabanı (moda göre) × modülün fiyat çarpanı

Örnek: taban 100 birimse → SolveCore kurulumu 3.0X = 300 birim, MergeCore 1.7X = 170
birim, SentimentCore 1.0X = 100 birim. İlk kurulumdan sonra eklenen her modül,
altyapı hazır olduğu için pratikte daha ucuza kurulur — istenirse "ikinci ve
sonraki modüllerde kurulum %40 indirimli" kuralıyla sadeleştirilir.

## 3. Modül başına destek: fiyat modül başına, sözleşme TEK

Destek fiyatı da aynı çarpanla modül başına hesaplanabilir:

> Yıllık destek = destek tabanı (Silver/Gold/Platinum) × modül çarpanlarının toplamı

Ama sözleşme ve operasyon **tek AICORE destek paketi** olarak kalmalı — 5 modül alan
müşteriye 5 ayrı destek sözleşmesi yönetilemez; tek paket, fiyatı modül sayısından
ve ağırlığından hesaplanır. Destek paketleri her iki dağıtım modunda da geçerlidir
(bulutta da güncelleme + doğrulama + kalibrasyon aynı ihtiyaçtır).

## 4. Token maliyeti: bize dokunmaz, ama sahipsiz de kalmasın

Maskeli Bulut'ta bulut modelinin kullanım (token) ücreti **müşterinin kendi API
hesabına** aittir — biz aracılık etmeyiz, faturalamayız. Teklifte tek cümleyle
netleştirilir: *"Bulut yapay zekâ kullanım ücretleri sağlayıcı ile müşteri
arasındadır; ServiceCore'un fiyatlarına dahil değildir."* Bu cümle yazılmazsa
ilk faturada "bu ne?" telefonu bize gelir.

## 5. Unutulmaması gereken teknik gerçek: kalibrasyon bulutta da ZORUNLU

"Bulut modeli hazır gelir, kurulum yok" algısı yanlış. Karar ayarları modelin
nerede çalıştığına değil **müşterinin verisine** bağlıdır; Maskeli Bulut'ta da
kalibrasyon ve doğrulama seti kurulumu yapılır. Cloud Ready'nin kurulum bedeli
bu yüzden düşüktür ama sıfır değildir — sıfırlanırsa bu emek sahipsiz kalır.

## Özet tablo

| Kalem | On-Prem | Maskeli Bulut |
|---|---|---|
| Modül lisansı (yıllık) | Aynı fiyat | Aynı fiyat |
| Kurulum paketi | Launch Ready — yüksek taban × çarpan | Cloud Ready — düşük taban × çarpan |
| Yıllık destek | Silver/Gold/Platinum × modül ağırlıkları | Aynı yapı |
| Altyapı | Müşteri sağlar (GPU'lu sunucu) | Müşteri sağlar (hafif sunucu) |
| Token maliyeti | Yok | Müşterinin API hesabına — bizim fiyata dahil değil |
