# Bayi / Alt Bayi Destek ve Ticket Paylaşım Sistemi – Analiz ve Çalışma Notları

---

# 1. Mevcut Notların Düzenlenmiş Hali

## 1.1 Ticket Paylaşım ve Yetkilendirme Yapısı

- Kaydın paylaşıldığı teknisyen:
    
    - Sadece kendi adına task ekleyebilmeli.
        
    - Sadece kendi adına worklog ekleyebilmeli.
        
    - Sadece kendisinin oluşturduğu task/worklog/not kayıtlarını:
        
        - Güncelleyebilmeli
            
        - Silebilmeli
            
- Bu kısıtlar aşağıdaki alanlarda da geçerli olmalı:
    
    - Task
        
    - Worklog
        
    - Notlar
        
    - Açıklamalar
        
    - İç yorumlar
        

---

## 1.2 Bayiler Arası Destek Mekanizması

- Ana bayi, alt bayilerin müşterilere ne kadar kaliteli hizmet verdiğini takip etmek istiyor.
    
- Bir bayi, çözüm üretemediği durumda başka bir bayiden destek talep edebilmeli.
    
- Ticket paylaşımı sayesinde başka bayideki teknisyenlerden destek alınabilmeli.
    

### Ticket paylaşım akışı

- Bir bayi:
    
    - Başka bir bayiyle ticket paylaşabilmeli.
        
    - Direkt teknisyen seçmemeli.
        
    - Teknik uzmanlık ve müsaitlik bilinmediği için:
        
        - “Teknisyen Grubu” seçmeli.
            
- Ticket paylaşımı sonrasında:
    
    - İlgili bayiye bildirim gitmeli.
        
    - Ana bayi / ilgili bayi:
        
        - O gruptan uygun teknisyeni atayabilmeli.
            

---

## 1.3 Destek Talebi Onay Süreci

Paylaşılan teknisyenin:

- Destek talebini:
    
    - Onaylaması
        
    - Reddetmesi gerekir.
        

Bu süreç için ayrı bir kayıt yapısı gereklidir.

Örnek kayıt:

| Alan               | Açıklama                      |
| ------------------ | ----------------------------- |
| SourceTenantId     | Talebi gönderen bayi          |
| TargetTenantId     | Talebin gönderildiği bayi     |
| TicketId           | Paylaşılan kayıt              |
| SharedTechnicianId | Hedef teknisyen               |
| Status             | Pending / Approved / Rejected |
| RequestedDate      | Talep tarihi                  |
| ResponseDate       | Cevap tarihi                  |

---

## 1.4 Destek Talepleri Panosu

Teknisyen:

- Başka tenant’a geçmeden
    
- Kendi ekranından
    

şunları görebilmeli:

- Kendisiyle paylaşılan kayıtlar
    
- Bekleyen destek talepleri
    
- Onay bekleyen işler
    
- Kabul ettiği işler
    
- Reddettiği işler
    

---

## 1.5 Bayi Yönetim ve İzleme Panosu

Ana bayi için merkezi yönetim ekranı olmalı.

### Bu panoda:

- Bayi performansları
    
- Hizmet kalite metrikleri
    
- SLA başarı oranları
    
- Ticket çözüm süreleri
    
- Ticket cevap süreleri
    
- Açık ticket sayıları
    
- Ortalama çözüm süreleri
    
- Müşteri memnuniyeti skorları
    
- Bayi bazlı yoğunluk analizleri
    

izlenebilmeli.

---

## 1.6 Çoklu Bayi Yönetimi

Ana bayi:

- Tek bir panelden
    
- Birden fazla alt bayiyi
    
- Aynı anda görüntüleyebilmeli.
    

---

## 1.7 Veri Mahremiyeti ve Gizlilik

Alt bayiler:

- Bazı bilgileri ana bayiden gizlemek isteyebilir.
    

Örneğin:

- Müşteri sözleşmeleri
    
- Fiyatlandırma
    
- İç notlar
    
- Ticari bilgiler
    

Bu nedenle:

- Rol bazlı yetkilendirme
    
- Alan bazlı yetkilendirme
    
- Tenant bazlı veri filtreleme
    

gereklidir.

---

## 1.8 Yetki ve Lisans Yapısı

Alt bayi:

- Ana bayiden bir teknisyeni
    
- Kendi tenant’ında yetkilendirebilmeli.
    

Yetkilendirme sırasında:

- Lisans atanmalı
    
- Role atanmalı
    
- Sadece izin verilen alanlar görünmeli
    

Bu yapı sayesinde:

- Mahremiyet korunur
    
- Kontrollü erişim sağlanır
    

---

## 1.9 Süper Tenant Yapısı

Bazı tenant’lar:

- “Ana bayi”
    
- “Merkez bayi”
    
- “Super Tenant”
    

olarak işaretlenebilmeli.

Öneri:

```text
IsMasterTenant
IsSuperTenant
TenantType
```

gibi alanlar kullanılabilir.

---

## 1.10 Raporlama İhtiyaçları

### Bayi bazlı raporlar

- Worklog dökümü
    
- Ticket bazlı çalışma süreleri
    
- Teknisyen bazlı çalışma süreleri
    
- SLA performans raporları
    

### Maliyet raporları

Sistem:

```text
Çalışılan Saat x Teknisyen Saatlik Ücret
```

hesabını yapabilmeli.

Örnek:

|Teknisyen|Süre|Saatlik Ücret|Toplam|
|---|---|---|---|
|Ahmet|5 saat|800 TL|4000 TL|

---

## 1.11 Kurulum ve Demo Ortamı

Kurulum:

- `micro.servicecore.app`  
    üzerindeki son sürüm üzerinden yapılmalı.
    

Kurulum içeriği:

- Yeni proje modülü
    
- KB modülü
    
- Demo data
    

---

# 2. Sistem Analizi

---

# 2.1 Bu Yapının Asıl Amacı

Bu sistemin temel amacı:

> Çok tenant’lı bayi organizasyonunda kontrollü destek paylaşımı sağlamak.

Bu yapı klasik ITSM’den daha gelişmiş bir yapı.

Aslında bu yapı:

- Multi-tenant ITSM
    
- Federated Support Architecture
    
- Cross Tenant Collaboration
    

mantığına yaklaşıyor.

---

# 2.2 En Kritik Nokta: Veri İzolasyonu

Bu projenin en kritik konusu:

# Veri izolasyonu

Çünkü:

- Bayiler birbirinden bağımsız
    
- Ticari sırlar mevcut
    
- Müşteri verileri hassas
    

Bu yüzden:

## Asla yapılmaması gerekenler

- Full tenant erişimi
    
- Shared DB’de filtresiz sorgular
    
- Tenant bypass işlemleri
    

---

# 2.3 Önerilen Mimari

## Öneri: Hybrid Tenant Access Model

### Normal kullanıcılar

Sadece kendi tenant verisini görür.

### Cross tenant destek kullanıcıları

Sadece:

- Paylaşılan kayıt
    
- Yetki verilen alan
    
- İzin verilen modül
    

kadar erişebilir.

---

# 2.4 Önerilen Yetki Sistemi

Klasik role sistemi burada yeterli olmayabilir.

Öneri:

# ABAC + RBAC Hybrid

## RBAC

Rol bazlı yetki

Örn:

- Admin
    
- Technician
    
- Supervisor
    

## ABAC

Attribute bazlı kontrol

Örn:

- Bu alanı görebilir mi?
    
- Bu müşteriyi görebilir mi?
    
- Bu ticket’ı görebilir mi?
    
- Bu tenant’ın hangi modüllerine erişebilir?
    

Bu yapı ileride çok işinizi kolaylaştırır.

---

# 2.5 Önerilen Modüller

## Yeni Modüller

### Cross Tenant Share Module

Ticket paylaşımı yönetimi

### Support Request Module

Destek talepleri yönetimi

### Tenant Visibility Module

Alan bazlı görünürlük

### Dealer Performance Module

Bayi KPI sistemi

### Technician Cost Tracking Module

Maliyet sistemi

---

# 2.6 Önerilen Database Yapısı

## Kritik tablolar

### TicketShare

```text
Id
TicketId
SourceTenantId
TargetTenantId
TargetGroupId
Status
CreatedDate
ApprovedDate
ApprovedBy
```

---

### TicketShareAssignment

```text
Id
TicketShareId
TechnicianId
AssignedDate
Status
```

---

### TenantFieldPermission

```text
Id
TenantId
RoleId
FieldCode
CanView
CanEdit
```

---

### TechnicianCost

```text
TechnicianId
HourlyRate
Currency
EffectiveDate
```

---

# 2.7 Avantajlar

## İş Avantajları

- Bayiler arası koordinasyon artar
    
- SLA başarı oranı yükselir
    
- Bilgi paylaşımı hızlanır
    
- Ana bayi kaliteyi ölçebilir
    
- Teknik uzmanlık merkezi hale gelir
    

---

## Teknik Avantajlar

- Ölçeklenebilir yapı
    
- Modüler mimari
    
- Yetki sistemi genişletilebilir
    
- SaaS modeline uygun
    
- Büyük organizasyonlara satılabilir
    

---

# 2.8 Riskler ve Zorluklar

## 1. Yetki karmaşıklığı

En büyük risk budur.

Yanlış tasarım:

- Veri sızıntısına
    
- Güvenlik açığına
    
- Tenant bypass’a
    

neden olabilir.

---

## 2. Performans

Çok büyük yapılarda:

- Cross tenant sorgular
    
- Dashboard raporları
    
- SLA analizleri
    

yük oluşturabilir.

Öneri:

- Read replica
    
- Cache
    
- Materialized report tables
    

---

## 3. Audit ihtiyacı

Her işlem loglanmalı.

Özellikle:

- Kim hangi ticket’ı gördü
    
- Kim hangi alanı görüntüledi
    
- Kim paylaşım yaptı
    
- Kim onayladı
    

---

# 2.9 Önerilen Teknik Yaklaşım

Senin mevcut yapına göre:

- .NET 7+
    
- MSSQL
    
- Multi tenant architecture
    
- AngularJS / ReactJS frontend
    

için uygun yaklaşım:

## Backend

- CQRS düşünülebilir
    
- MediatR kullanılabilir
    
- Permission middleware şart
    

---

## Frontend

Özellikle:

- Dynamic menu authorization
    
- Dynamic field authorization
    

önemli.

---

# 2.10 Gelecekte Eklenebilecek Özellikler

## AI destekli teknisyen önerisi

Sistem:

- Ticket kategorisine
    
- Geçmiş çözümlere
    
- Müsaitlik durumuna
    

göre teknisyen önerebilir.

---

## Smart workload balancing

Teknisyen yoğunluk dağıtımı

---

## SLA risk prediction

SLA ihlali olacak ticket’ların önceden tahmini

---

## Bayi skor sistemi

Bayi puanlama algoritması

---

# 2.11 Kritik Öneri

Direkt teknisyen paylaşımı yerine:

# Grup bazlı paylaşım

kararı çok doğru.

Çünkü:

- Operasyonel olarak daha gerçekçi
    
- Ölçeklenebilir
    
- Teknik uzmanlık dağılımına uygun
    
- Vardiya sistemine uygun
    
- İş yükü yönetimine uygun
    

Bu yaklaşım enterprise seviyede doğru yaklaşımdır.

---

# 3. Önerilen Fazlandırma

## Faz 1

- Ticket paylaşımı
    
- Grup bazlı atama
    
- Destek talebi onay sistemi
    

---

## Faz 2

- Bayi dashboard
    
- SLA raporları
    
- Worklog raporları
    

---

## Faz 3

- Alan bazlı yetki
    
- Gizlilik sistemi
    
- Cross tenant erişim kontrolü
    

---

## Faz 4

- AI önerileri
    
- Akıllı yönlendirme
    
- Performans optimizasyonları
    

---

# 4. Genel Değerlendirme

Bu yapı standart bir helpdesk sisteminden daha ileri seviye bir yapı.

Aslında ortaya çıkan şey:

- Federated ITSM
    
- Multi-organization support platform
    
- Cross-tenant collaboration architecture
    

seviyesine yaklaşıyor.

Doğru kurgulanırsa:

- Büyük bayi ağları
    
- Distribütör yapıları
    
- Holding organizasyonları
    
- Franchise destek yapıları
    

için ciddi bir ürün haline gelebilir.