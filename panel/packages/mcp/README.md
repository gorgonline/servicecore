# @servicecoreui/mcp

MCP (Model Context Protocol) server — AI ajanlarına [@servicecoreui/ui](https://www.npmjs.com/package/@servicecoreui/ui) kataloğunu açar.

VS Code'da Claude Code, Cursor, Continue gibi araçlar bu server'a bağlanır. AI doğrudan AntD önermek yerine ServiceCore wrap kütüphanesini görür ve kullanır.

## Kurulum

### Claude Code (VS Code uzantısı) — önerilen

Repo köküne `.mcp.json` ekle (varsa zaten doğru yerde). Claude Code başlangıçta okur.

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

İlk açılışta Claude Code güvenlik için onay ister — "Allow" de. Sohbette "ServiceCore UI ile ticket listesi yap" deyince tool'ları görür.

Alternatif: CLI ile ekle.

```bash
claude mcp add servicecoreui npx -y @servicecoreui/mcp
```

### Cursor

Cursor Settings → MCP → **Add new MCP server**.

Veya `~/.cursor/mcp.json` (global) ya da `.cursor/mcp.json` (proje):

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

### Continue (VS Code uzantısı)

Continue config dosyasına ekle (`~/.continue/config.json` veya VS Code settings):

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

### Claude Desktop (sohbet uygulaması)

`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

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

Claude Desktop'ı yeniden başlat.

## Tool'lar

| Tool                    | Ne yapar                                                         |
| ----------------------- | ---------------------------------------------------------------- |
| `list_components`       | Tüm component'leri + kısa açıklamayı listeler                    |
| `get_component_spec`    | Bir component'in tam spec'i (types, source, css)                |
| `find_component`        | Amaç metniyle arama ("data tablo", "modal")                     |
| `get_design_rules`      | Tasarım sistemi kuralları (`design-rules.md`)                    |
| `get_tokens`            | CSS değişkenleri (renk/spacing/type)                             |

## Geliştirme

```bash
pnpm install
pnpm build      # catalog.json + dist/index.js üretir
pnpm dev        # stdin'den MCP protokol mesajı bekler
```

`catalog.json` build-time'da `../ui/src/` taranarak üretilir. UI paketi güncellenince MCP paketini de yeniden build'leyip yayınlamak gerekir.

## Lisans

UNLICENSED — sadece ServiceCore ekipleri için.
