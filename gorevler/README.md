# gorevler/ — Görev Paneli veri deposu

> Panel: `dijital-kagit-sistemi/panels/gorev-paneli` (http://levent-mac-mini:3000)
> Spec: [docs/gorev-paneli-spec.md](../docs/gorev-paneli-spec.md)

Her görev bir `.md` dosyasıdır; bulunduğu klasör = durumu. Panel bu klasörü
okur/yazar, Mac Mini'deki Claude (worker) görevleri buradan alıp işler.

## Klasörler (yaşam döngüsü sırasıyla)

| Klasör | Anlamı |
|---|---|
| `geldi/` | Levent'in attığı ham görev |
| `spec/` | Claude spec yazdı — panelden onay bekler |
| `kuyruk/` | Spec onaylandı, işlenmeyi bekliyor |
| `yapiliyor/` | Claude şu an işliyor |
| `inceleme/` | İş bitti, PR/çıktı incelemede |
| `bitti/` | Tamamlandı |
| `hata/` | Takıldı — müdahale gerekli |
| `arsiv/` | Arşiv — biten görevlerin kalıcı kaydı (panoda görünmez, panelde Arşiv görünümünde) |
| `ekler/<id>/` | Görevin ekleri (foto, PDF, doküman) — görev taşınsa da burada kalır |

## Dosya formatı

```markdown
---
id: 2026-06-11-001
baslik: "Görev başlığı"
proje: website | panel | email | brand | genel
grup: null
durum: geldi
oncelik: dusuk | normal | yuksek
pr: null
olusturulma: 2026-06-11T10:00:00.000Z
guncelleme: null
---

Görev metni (Levent'in yazdığı ham açıklama).

## Spec (Claude doldurur)
...

## Alt-tasklar (Claude doldurur)
- [ ] ...

## Rapor (Claude doldurur)
...
```

Kurallar:
- Dosya adı = `<id>.md`. Taşıma = dosyayı hedef klasöre taşı + frontmatter `durum` güncelle.
- Durum geçişleri panel API'si veya Claude tarafından yapılır; elle taşıma da geçerlidir (git-backed, audit'li).
