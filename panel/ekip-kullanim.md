# Ekip Kullanım Notu — @servicecoreui/ui

> Bu doküman ekibe `@servicecoreui/ui` panel kütüphanesini nasıl kullanacaklarını ve standardın nasıl korunacağını anlatır.

## Niyet

Backend ekibi şu an AntD 5.7 ile karışık yazıyor — sayfa sayfa farklı kalıp, farklı renk, farklı boşluk. `@servicecoreui/ui` bu dağınıklığı tek bir tasarım sistemi altında topluyor: AntD bileşenlerinin üstüne ServiceCore imzası giydirilmiş, standartlaştırılmış bir wrap katmanı.

Ekip `npm install @servicecoreui/ui` ile paketi kurar, doğrudan oradan import eder. AntD'yi doğrudan import etmek yasak (aşağıya bakın).

## Ekip Çalışma Düzeni — Git Akışı

> **Tek kaynak: monorepo `gorgonline/servicecore` → `panel/`.** Asıl burasıdır.
> `gorgonline/servicecore-panel` SADECE deploy çıktısıdır — oraya **elle commit YASAK**
> (bir sonraki `pnpm sync-deploy` onu ezer, işin kaybolur).

1. **Clone:** `gorgonline/servicecore` (monorepo). Panel işi `panel/` klasöründe yapılır.
2. **Dal aç:** her iş kendi dalında — `main`'den `git checkout -b feature/<konu>`.
3. **Çalış + push:** küçük ve sık commit → `git push -u origin feature/<konu>`.
4. **PR:** dalı `main`'e Pull Request ile getir. İki göz bakar; merge Levent'te.
5. **`main`'e direkt push YOK** (ikimiz de). Branch protection ile zorlanmalı.
6. **Çalışmaya başlamadan:** `git checkout main && git pull` → sonra yeni dal. Eskimiş dalda çalışma.

### İş bölümü (aynı dosyada çakışmamak için)
- **Levent:** tasarım, `apps/playground/`, `theme/tokens.css`.
- **Bora:** `packages/ui/` bileşen implementasyonu.
- Aynı anda aynı alana girmemek için günlük kısa "şu an şunu tutuyorum" mesajı.

### Sadece Levent yapar
- **Deploy:** temiz `main`'den `pnpm sync-deploy "mesaj"`.
- **npm publish:** `@servicecoreui/ui` + `@servicecoreui/mcp`.
- **Sürüm (version) bump.**

## AI ile Çalışma — MCP Entegrasyonu

Ekip çoğunlukla **VS Code + Claude Code / Cursor / Continue** kullanıyor. AI'ın `@servicecoreui/ui` dışına çıkıp rastgele AntD veya kendi HTML'ini yazmasını engellemek için **`@servicecoreui/mcp` server'ı** yayınlandı.

MCP server şu tool'ları expose ediyor:

- `list_components` — kataloğu listele
- `get_component_spec` — props, varyant, örnek kod
- `find_component` — amaç metniyle arama ("data tablo", "modal")
- `get_design_rules` — ne zaman kullan / kullanma
- `get_tokens` — renk, spacing, type token'ları

### Kurulum (her ekip üyesi kendi makinesinde)

**Claude Code (VS Code uzantısı) — önerilen:** Repo zaten kök `.mcp.json` ile geliyor. VS Code'da Claude Code açılınca onay ister — "Allow" de, hazır.

**Cursor:** Settings → MCP → **Add new MCP server**:

```json
{
  "mcpServers": {
    "servicecoreui": {
      "command": "npx",
      "args": ["-y", "@servicecoreui/mcp"]
    }
  }
}
```

**Continue:** Aynı JSON'ı `~/.continue/config.json`'a ekle.

Detay: `panel/packages/mcp/README.md`.

### Akış

1. Ekipten biri Claude'una/Cursor'ına "ticket listesi UI yap" der
2. AI önce `list_components` veya `find_component` çağırır → mevcut wrap'leri görür
3. `get_component_spec Table` ile tam spec'i alır
4. `get_tokens` ile renk/spacing'i kontrol eder
5. Sadece `@servicecoreui/ui` import ederek kod yazar

**Önemli:** MCP sadece kütüphaneci. Polis değil. Zorlama katmanı ekipte.

## Zorlama Katmanı — Ekibin Sorumluluğu

MCP doğru malzemeyi eline verir, ama kullanmayı garanti etmez. Aşağıdaki katmanlar ekip tarafından kurulup işletilmeli:

### 1. ESLint Kuralı

`antd` paketinden doğrudan import yasak — sadece `@servicecoreui/ui` izinli.

```js
// .eslintrc
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "antd",
    "message": "antd'yi doğrudan import etme. @servicecoreui/ui kullan."
  }]
}]
```

### 2. Hardcoded Değer Yasağı

- Hex renk yasak — `var(--sc-color-*)` veya token kullan
- Hardcoded `px` boşluk yasak — `var(--sc-space-*)` kullan
- Inline `font-family` yasak — token kullan

Stylelint kuralı ile yakalanır.

### 3. PR Review

İki gözle bakılır. AI üretiminin tasarım sistemine uygunluğu insan tarafından doğrulanır.

### 4. CI Zorunluluğu

Lint ve stylelint geçmeyen PR merge edilmez. GitHub branch protection ile zorlanır.

## Dağıtım

- UI paketi: `@servicecoreui/ui` — `npm install @servicecoreui/ui`
- MCP server: `@servicecoreui/mcp` — `npx -y @servicecoreui/mcp` (kurmadan çalışır)
- Registry: npm.js (public)
- Peer deps: `antd >=5.7`, `react >=18`, `react-dom >=18`, `@carbon/icons-react`

## Sıradaki Adımlar

1. Faz 5: gerçek ekran testi (örn. ticket-list)
2. UI paketi güncellenince MCP paketini de yeniden yayınla (`pnpm build && npm publish`)
3. Ekibe sunum + ESLint/CI kuralları kurulumu
