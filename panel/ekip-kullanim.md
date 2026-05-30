# Ekip Kullanım Notu — @servicecore/ui

> Bu doküman ekibe `@servicecore/ui` panel kütüphanesini nasıl kullanacaklarını ve standardın nasıl korunacağını anlatır.

## Niyet

Backend ekibi şu an AntD 5.7 ile karışık yazıyor — sayfa sayfa farklı kalıp, farklı renk, farklı boşluk. `@servicecore/ui` bu dağınıklığı tek bir tasarım sistemi altında topluyor: AntD bileşenlerinin üstüne ServiceCore imzası giydirilmiş, standartlaştırılmış bir wrap katmanı.

Ekip `npm install @servicecore/ui` ile paketi kurar, doğrudan oradan import eder. AntD'yi doğrudan import etmek yasak (aşağıya bakın).

## AI ile Çalışma — MCP Entegrasyonu

Ekip Claude / Cursor / Copilot kullanıyor. AI'ın `@servicecore/ui` dışına çıkıp rastgele AntD veya kendi HTML'ini yazmasını engellemek için MCP server kuracağız.

**Plan:** `@servicecore/ui` MCP server olarak expose edilecek. AI ajanları MCP üzerinden:

- `list_components` — kataloğu listele
- `get_component_spec` — props, varyant, örnek kod
- `get_design_rules` — ne zaman kullan / kullanma
- `get_token` — renk, spacing, type token'ları

Ekipten biri Claude'una "ticket listesi UI yap" dediğinde, Claude MCP'den katalogu çeker, sadece `@servicecore/ui` bileşenlerini kullanarak kod üretir. Yanlış malzeme önerme ihtimali düşer.

**Önemli:** MCP sadece kütüphaneci. Polis değil. Zorlama katmanı ekipte.

## Zorlama Katmanı — Ekibin Sorumluluğu

MCP doğru malzemeyi eline verir, ama kullanmayı garanti etmez. Aşağıdaki katmanlar ekip tarafından kurulup işletilmeli:

### 1. ESLint Kuralı

`antd` paketinden doğrudan import yasak — sadece `@servicecore/ui` izinli.

```js
// .eslintrc
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "antd",
    "message": "antd'yi doğrudan import etme. @servicecore/ui kullan."
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

- Paket adı: `@servicecore/ui`
- Registry: GitHub Packages (private)
- Kurulum: ekip kendi `.npmrc` ile auth olur, `npm install @servicecore/ui`
- Peer deps: `antd >=5.7`, `react >=18`, `react-dom >=18`, `@carbon/icons-react`

## Sıradaki Adımlar

1. Faz 5 tamamlandığında gerçek ekran testi (örn. ticket-list)
2. MCP server iskeleti — hangi component'ler ilk turda yer alacak, hangi kurallar makine-okunabilir olacak
3. Ekibe sunum + ESLint/CI kuralları kurulumu
