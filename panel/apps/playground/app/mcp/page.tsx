"use client";

import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui";
import { Alert } from "@servicecoreui/ui";
import styles from "./mcp.module.css";

const MCP_JSON = `{
  "mcpServers": {
    "servicecoreui": {
      "command": "npx",
      "args": ["-y", "@servicecoreui/mcp"]
    }
  }
}`;

export default function McpPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Başlarken</Eyebrow>
        <Display size="md">MCP — AI Kurulumu</Display>
        <Text size="lg" color="secondary">
          <code>@servicecoreui/mcp</code>, AI araçlarına (Claude Code, Cursor) bu
          kütüphanenin kataloğunu açar. Kurunca AI, doğrudan AntD önermek yerine{" "}
          <strong>ServiceCore wrap bileşenlerini</strong> ve token'ları görür,
          onları kullanır. Ön kurulum yok — <code>npx</code> npm'den çeker.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Claude Code (VS Code) — önerilen</Heading>
        <Text color="secondary">Tek komut:</Text>
        <Code block>{`claude mcp add servicecoreui npx -y @servicecoreui/mcp`}</Code>
        <Text color="secondary">
          Ya da repo köküne <code>.mcp.json</code> ekle:
        </Text>
        <Code block>{MCP_JSON}</Code>
        <Alert
          type="info"
          showIcon
          message="İlk açılışta Claude Code onay ister — “Allow” de."
          description="Sonra sohbette “ServiceCore UI ile kayıt listesi yap” deyince tool'ları kullanır."
        />
      </section>

      <section className={styles.section}>
        <Heading level={2}>Cursor</Heading>
        <Text color="secondary">
          Proje için <code>.cursor/mcp.json</code> veya global{" "}
          <code>~/.cursor/mcp.json</code> — aynı blok:
        </Text>
        <Code block>{MCP_JSON}</Code>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Diğer araçlar</Heading>
        <Text color="secondary">
          Continue, Claude Desktop ve daha fazlası için detaylı adımlar paket
          README'sinde: <code>@servicecoreui/mcp</code> (npm sayfası) ·{" "}
          <code>panel/packages/mcp/README.md</code>.
        </Text>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Tool'lar</Heading>
        <Text color="secondary">
          Kurulduktan sonra AI şu tool'ları görür:
        </Text>
        <table className={styles.props}>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Ne yapar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>list_components</code></td>
              <td>Tüm bileşenleri listeler (wrap'ler + custom + charts).</td>
            </tr>
            <tr>
              <td><code>find_component</code></td>
              <td>Doğal dille bileşen arar (ör. "data tablo" → DataTable).</td>
            </tr>
            <tr>
              <td><code>get_component_spec</code></td>
              <td>Bir bileşenin spec'i — source + types + CSS.</td>
            </tr>
            <tr>
              <td><code>get_tokens</code></td>
              <td>Tasarım token'ları (renk/spacing/type + <code>--sc-chart-*</code>).</td>
            </tr>
            <tr>
              <td><code>get_design_rules</code></td>
              <td>Tasarım kuralları (tek accent, wrap stratejisi, yapma listesi).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Doğrula</Heading>
        <Text color="secondary">
          IDE'yi yeniden başlat → MCP sunucusu "servicecoreui" bağlı görünmeli.
          Sohbette bileşen isteyince AI <code>get_component_spec</code> çağırıp
          ServiceCore bileşenini üretir.
        </Text>
      </section>
    </main>
  );
}
