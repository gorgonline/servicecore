# @servicecoreui/ui

ServiceCore UI library — AntD 5.7 wrapped components with CSS Modules.

## Kurulum

```bash
npm install @servicecoreui/ui
```

## Kullanım

```tsx
import { Button } from '@servicecoreui/ui/wraps';
import '@servicecoreui/ui/styles.css'; // app entry'de bir kez

export default function App() {
  return <Button variant="primary">Tıkla</Button>;
}
```

Tüm AntD'yi ServiceCore diline çevirmek için (opsiyonel):

```tsx
import { ConfigProvider } from 'antd';
import { servicecoreTheme } from '@servicecoreui/ui/theme';

<ConfigProvider theme={servicecoreTheme}>
  <App />
</ConfigProvider>;
```

## Peer Dependencies

- `antd >= 5.7.0`
- `react >= 18`
- `react-dom >= 18`
- `@carbon/icons-react >= 11`
- `dayjs ^1.11`

## Lisans

UNLICENSED — sadece ServiceCore ekipleri için.
