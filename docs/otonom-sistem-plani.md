# ServiceCore — Otonom Geliştirme Sistemi (Plan)

> Durum: **planlama**. Mac Mini M4 Pro bekleniyor, geldiğinde kurulacak.
> Bu doküman, sohbette konuşulanların kalıcı notu.

---

## Tek cümle

Panelden (veya telefondan) Türkçe görev yazılır → buluttaki listeye düşer → Mac Mini'deki Claude sayfaları **tek tek** yeni UI'a geçirir → her sayfayı **ayrı bir Claude** kontrol eder → bir developer onaylar → yayına çıkar. **Onaysız hiçbir şey yayınlanmaz.**

---

## 1. Ne kuruyoruz (sade)

```
SEN ──Türkçe görev──► PANEL (Vercel) ──► BULUT LİSTE ──► MAC MINI (Claude çalışır)
                                                              │
                                                       PR (Pull Request)
                                                              ▼
                                                   DEVELOPER ONAYLAR ──► YAYIN
```

- **Panel (Vercel):** görev yazma kutusu + sıra listesi (bekliyor / yapılıyor / bitti) + bildirim. Her yerden açılır.
- **Bulut liste:** panel ile Mac Mini'nin buluşma noktası. Panele yazılan görev buraya düşer.
- **Mac Mini (7/24 açık):** listeye bakar, sıradaki görevi alır, yapar, test eder, "bitti" yazar, sıradakine geçer.
- **Onay kapısı:** developer bakmadan yayın yok.

---

## 2. Asıl iş: Migrasyon (öncelik, 3-4 ay)

- **Backend zaten yazılmış — ona DOKUNMUYORUZ.**
- Sayfaları **tek tek** alıyoruz: eski sayfanın çalışan mantığı → yeni UI'a (`@servicecoreui/ui`) bağlanır → test → PR.
- **Bir sayfa = bir görev = bir Claude oturumu = bir PR.** Big-bang yok.
- Levent'in tek işi: "şu sayfayı geçir" demek.

**Kural:** Yeni UI, backend'in desteklediği tüm durumları taşımalı (yükleniyor / boş / hata / yetki-yok / doğrulama). Eksik kalırsa Claude haber verir.

---

## 3. Dynamic Workflow ile "fabrika" (yazıdaki kalıp)

Yazının birinci kullanım alanı **migrasyon**. Bizim işe birebir uyuyor. Kullanacağımız kalıplar:

1. **Fan-out** — her sayfaya bir ajan (paralel, tek tek).
2. **Adversarial verification** — yapan ajanın işini **ayrı bir ajan** kontrol eder (kendi işini kendi onaylamaz; yazının en kritik kuralı).
3. **Loop until done** — tüm sayfalar bitene kadar döngü.

- Tetikleme: prompt'ta **"workflow"** veya **"ultracode"** demek.
- **Sadece büyük/tekrar eden iş için** kullanılır (migrasyon gibi). Küçük iş = normal Claude. Workflow pahalıdır (çok token).
- **Token bütçesi koy** ("şu kadar token kullan") — yoksa 5-10 kat şişebilir.

---

## 4. Önemli gerçekler (bunlar atlanırsa sistem çalışmaz)

1. **Mac Mini'ye ayrı Claude hesabı al.** Developer'ların hesabıyla paylaşma → paylaşım hesabı kilitletir, tüm sistem durur.
2. **Gerçek repoyu bul.** Bu klasördeki `servicecore-app-web` backend'siz tanıtım sitesi. Migrasyonun hedefi olan **çalışan backend'li repoyu** tespit et; testi yoksa **önce test ekle** (yoksa "otomatik test" şartı boş kalır).
3. **Onay kapısı için GitHub Team gerekiyor.** Ücretsiz private repoda zorunlu insan-onayı kurulamıyor. Repoyu org'a taşı + Team al (~$4/kişi/ay).
4. **Maliyet gerçeği:** Bir migrasyon sayfası ~1M token yer. Tek $200 kredi ayda kabaca 30-60 sayfa. 3-4 aylık iş için Mac Mini'yi **ölçümlü API anahtarına + sabit harcama tavanına** bağlamak en sağlıklısı.

---

## 5. Güvenlik (7/24 gözetimsiz çalışacak)

- **Onaysız yayın YOK** — developer PR'a bakmadan merge olmaz.
- **Harcama tavanı koy** — kaçak döngü gece binlerce dolar yakabilir (belgelenmiş kazalar var). İş başına + günlük dolar tavanı + süre sınırı.
- **"Yeşil = bitti değil."** Test geçti demek "iş doğru" demek değil; kontrolcü ajan + developer şart.
- **Mac Mini'ye prod şifre/credential verme.** İş izole klasörde koşar.
- **Tek 12 saatlik dev oturumu kurma** — bir sayfa = bir taze oturum (uzun oturum kuralları unutur).

---

## 6. İlk adımlar (Mac Mini gelmeden YAPILABİLİR)

1. **Gerçek ITSM reposunu bul.** Bir developer 30 dk'da baksın: çalışan backend hangi repoda, `test` komutu var mı? Yoksa → test ekleme ikinci görev.
2. **GitHub org + Team kararını ver.** Repoyu taşıyıp $4/kişi'yi onaylıyor muyuz?
3. **Tek kolay sayfayı ELLE geçir.** Mac Mini'siz, bir developer kendi makinesinde normal Claude ile bir sayfayı `@servicecoreui` ile yeni UI'a bağlasın. **Akışı kanıtlar + sayfa başına gerçek maliyeti ölçeriz.** Sonra otomasyona/fabrikaya geçilir.

---

## Developer notları (teknik)

- **Görev paneli:** Özel panel yerine **GitHub Issues** da yeter (sıra + denetim + PR bağı hazır). Levent için önüne ince bir Vercel paneli / Telegram botu (Haiku ile Türkçe metni Issue'ya çevirir) konabilir.
- **Motor:** Mac Mini'de **self-hosted GitHub Actions runner** + `anthropics/claude-code-action@v1`, sadece `claude` etiketinde tetik. Tek runner = FIFO sıra.
- **İzolasyon:** her iş tek-kullanımlık konteynerde; egress allowlist (`api.anthropic.com` + `github.com` + registry).
- **Kalite kapıları:** TaskCompleted hook (`lint + typecheck + test + build`), ESLint deterministik kapı (ham `antd`/hex/Tailwind/dark-token yasak), Playwright görsel test (baseline'lar Mac Mini'de üretilir), `@servicecoreui/mcp` katalog drift kapısı.
- **Kontrolcü:** ayrı PR job'ı (taze bağlam, Sonnet) — authoring oturumundaki subagent değil. Mevcut `reviewer`/`verifier` ajanları bağlanır; `reviewer.md`'den `Bash` kaldırılmalı (gerçek read-only).
- **Model:** varsayılan **Sonnet**; Opus sadece gerçekten takılan wiring için, açık escalation arkasında.
- **Onay kapısı:** GitHub ruleset (PR şart + test yeşil + insan CODEOWNER onayı + "Actions PR onaylayabilir" KAPALI).
- **Rollback:** `git revert + redeploy`, sahibi belli bir developer.

İlgili dosyalar: `panel/packages/mcp/` (servicecoreui MCP), `.claude/rules/` (kod+tasarım kuralları), `.claude/agents/reviewer.md`, `CLAUDE.md` (mevcut designer→builder→reviewer→verifier).

---

*Not: Bu plan, 6 ajanlık bir araştırma + 3 düşman-gözle eleştiri turundan damıtıldı. Detaylı maliyet/güvenlik analizi gerekirse genişletilebilir.*
