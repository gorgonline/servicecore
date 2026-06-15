# ServiceCore UI — Tasarım Sistemi Kuralları

> Bu dosyayı AI ajanı `get_design_rules` tool'u ile okur. Ekibe ne dayatılıyorsa burada yazılı.

## Kategorik Kurallar

### 1. Sadece `@servicecoreui/ui` kullan

```tsx
// YANLIŞ
import { Button } from 'antd';

// DOĞRU
import { Button } from '@servicecoreui/ui';
```

AntD'yi doğrudan import etme. Sebep: standartlaşma. Wrap katmanı kalkarsa tek dosya değişir, tüm panel değil.

**Sub-path YOK** — tüm bileşenler tek entry point'ten gelir: `@servicecoreui/ui`. `/wraps`, `/custom` gibi alt yollar artık kullanılmaz.

### 2. Token kullan, hex/px yazma

```css
/* YANLIŞ */
.card { color: #1677ff; padding: 16px; border-radius: 6px; }

/* DOĞRU */
.card {
  color: var(--sc-color-primary);
  padding: var(--sc-space-md);
  border-radius: var(--sc-radius-md);
}
```

Bütün token listesi için `get_tokens` tool'u çağır.

### 3. Typography component'leri kullan

```tsx
// YANLIŞ
<h1 style={{ fontSize: 32, fontWeight: 600 }}>Başlık</h1>

// DOĞRU
<Heading level={1}>Başlık</Heading>
```

`Heading`, `Display`, `Text`, `Eyebrow`, `Code` — hepsi server-safe (RSC uyumlu), AntD'siz.

**Ağırlık tavanı = medium (500).** Tip sisteminde `semibold`/`bold` KULLANILMAZ; vurgu boyut + renk + `medium` ile yapılır. `Text` ağırlığı yalnız `regular | medium`; `Heading`/`Display` medium. (`--sc-font-weight-semibold/bold` token'ları geriye uyum için durur ama değerleri 500.)

### 4. Icon: Carbon Design System — paketten import et

```tsx
// DOĞRU — ikonlar paketten gelir (Carbon'u ayrı kurma)
import { Add } from '@servicecoreui/ui/icons';
<Button leadingIcon={<Add />}>Ekle</Button>

// YANLIŞ — doğrudan Carbon
import { Add } from '@carbon/icons-react';
```

`@servicecoreui/ui/icons`, Carbon Design System ikonlarını re-export eder; tek
bağımlılık `@servicecoreui/ui`. `@ant-design/icons` kullanma — Carbon kullan.

### 5. Koyu tema yok

Sadece açık tema destekleniyor. Koyu tema desteği eklemek için tokens.css'te değişiklik gerekir, henüz onaylanmadı.

### 6. ConfigProvider opsiyonel

Tek bir component için ConfigProvider gerekmez — wrap'ler kendi stilini taşır. Bütün AntD'yi (Form, Table, custom AntD bileşenleri) ServiceCore diline çevirmek istiyorsan app root'ta:

```tsx
import { ConfigProvider } from 'antd';
import { servicecoreTheme } from '@servicecoreui/ui/theme';

<ConfigProvider theme={servicecoreTheme}>...</ConfigProvider>
```

## Bileşen Seçim Rehberi

- **Liste/koleksiyon** → `Table` (default), kısa ise `List`
- **Form girdileri** → `Input`, `Select`, `DatePicker`, `Form`
- **Onay/karar** → `Modal` (büyük), `Popconfirm` (küçük, inline)
- **Bilgi** → `Alert` (durum bilgisi), `Tooltip` (hover detay)
- **Geri bildirim** → `Message` (toast), `Notification` (köşede kalıcı)
- **Boş durum** → `Empty`
- **Yükleme** → `Skeleton` (içerik şekli), `Spin` (sade)
- **İlerleme** → `Progress` (yüzde), `Steps` (çok adımlı)

## Yapma Listesi

- ❌ Custom HTML bileşenler (kart, modal, dropdown vs.)
- ❌ Tailwind class kullanmak (CSS Modules veya `style` prop)
- ❌ Yeni varyant icat etmek (önce wrap'i genişletmek lazım)
- ❌ AntD legacy class isimleri (`ant-*`) doğrudan hedeflemek
- ❌ 12 renk paleti — tek accent `#0070F3` (UI'da). **İstisna:** grafikler — kategori
  ayrımı için kategorik chart paleti vardır (`var(--sc-chart-1..6)`). Sadece grafik
  serilerinde kullan; genel UI'da yine tek accent.

## 7. Feature-Level Bileşen Kullan, Ham Primitifle UI İcat Etme

Kütüphane iki katman sunar:
- **Primitives** — `Button`, `Input`, `Form`, `Table`, vb. Düşük seviye yapıtaşları.
- **Feature bileşenler** — `LoginForm`, `ForgotPasswordForm`, `ResetPasswordForm`, `ChangePasswordForm`, `TwoFactorForm`, `TwoFactorSetup`, `RegisterForm`, `PanelShell`, `ErrorPage`. Hazır UI blokları; içinde primitive'ler zaten kurulu.

**Anti-pattern (YANLIŞ)** — tüketici ham primitive'lerle elle login formu kurar:

```tsx
// ❌ YANLIŞ: primitiflerle sıfırdan form icat etme
import { Form, Input, Button } from '@servicecoreui/ui';

function LoginPage() {
  return (
    <Form>
      <Form.Item name="email"><Input /></Form.Item>
      <Form.Item name="password"><Input.Password /></Form.Item>
      <Button htmlType="submit">Giriş</Button>
    </Form>
  );
}
```

**Doğru yaklaşım** — hazır feature bileşeni kullan:

```tsx
// ✅ DOĞRU: feature-level bileşen
import { LoginForm } from '@servicecoreui/ui';

function LoginPage() {
  return <LoginForm onSubmit={handleLogin} />;
}
```

Feature bileşenler i18n için `sc-` namespace key'lerini kullanır. Tüketici bu key'leri kendi sözlüğünde tanımlar (tam liste: `get_i18n_contract`):

```ts
// i18n/tr.json
{
  "sc-login": {
    "email": "E-posta",
    "password": "Şifre",
    "submit": "Giriş Yap"
  }
}
```

## Tüketim Akışı

1. Component bul: `find_component "data tablo"`
2. Spec oku: `get_component_spec Table`
3. Token kontrol: `get_tokens`
4. Kuralları doğrula: `get_design_rules`
5. Feature bileşen mi? → `get_i18n_contract` ile key'leri al
6. Kod yaz
