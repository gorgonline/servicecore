/**
 * ServiceCore UI MCP server.
 *
 * AI ajanlarına (Claude Desktop, Cursor, Continue, vb.) @servicecoreui/ui
 * kataloğunu açar. AI doğrudan AntD kullanmak yerine bizim wrap'leri görür.
 *
 * Tools:
 *   - list_components       — bütün component'leri listeler
 *   - get_component_spec    — bir component'in source + types + css'i
 *   - find_component        — amaç metniyle arama ("data table", "modal")
 *   - get_design_rules      — design system kuralları
 *   - get_tokens            — CSS değişkenleri (renk/spacing/type)
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.resolve(__dirname, "catalog.json");

interface ComponentSpec {
  name: string;
  source: string;
  types?: string;
  css?: string;
  description: string;
}

interface PageFile {
  path: string;
  content: string;
}

interface PageBundle {
  name: string;
  title: string;
  route: string;
  description: string;
  files: PageFile[];
}

interface Catalog {
  uiPackage: string;
  uiVersion: string;
  components: Record<string, ComponentSpec>;
  pages: Record<string, PageBundle>;
  pageInstall: string;
  tokens: string;
  rules: string;
}

if (!fs.existsSync(CATALOG_PATH)) {
  throw new Error(
    `catalog.json not found at ${CATALOG_PATH}. Run 'pnpm build:catalog' first.`,
  );
}

const catalog = JSON.parse(
  fs.readFileSync(CATALOG_PATH, "utf-8"),
) as Catalog;

const server = new Server(
  {
    name: "@servicecoreui/mcp",
    version: catalog.uiVersion,
  },
  {
    capabilities: { tools: {} },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_components",
      description: `${catalog.uiPackage} kütüphanesindeki tüm component'leri listeler. Her kayıt: isim + kısa açıklama. AI bu listeden seçer.`,
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "get_component_spec",
      description:
        "Belirli bir component'in tam spec'i: TypeScript props, source code, CSS. AI bu spec'e bakarak doğru prop ve varyant kullanır.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Component adı (örn: 'Button', 'Modal', 'Table')",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "find_component",
      description:
        "Amaç/işlev metniyle component arar. Örn: 'data tablosu', 'kullanıcı seçimi', 'modal dialog'. Eşleşen ilk 5 component'i döner.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Aranan amaç ya da işlev" },
        },
        required: ["query"],
      },
    },
    {
      name: "get_design_rules",
      description:
        "ServiceCore UI tasarım sistemi kuralları: hangi component ne zaman kullanılır, neyi YAPMA, token zorunlulukları, ESLint kuralları.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "get_tokens",
      description:
        "CSS design token'ları (renk, spacing, radius, typography, shadow). Hardcoded hex/px yerine bunları kullan.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "list_pages",
      description:
        "Hazır SAYFA şablonlarını listeler (login, ayarlar, genel-ayarlar, 404, 500, vb.). Sayfalar bileşen DEĞİL; get_page ile kaynak kod olarak çekilip repoya kopyalanır.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "get_page",
      description:
        "Bir sayfa şablonunun TÜM kaynak dosyalarını (route page + css + data/şema + yerel yapıtaşları: AuthShell, SettingsForm, PanelShell, …) + kurulum notunu döner. AI dosyaları repoya koyar, mock veriyi gerçek API/DTO'ya bağlar.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Sayfa adı (örn: 'login', 'genel-ayarlar', 'kayit', '404')",
          },
        },
        required: ["name"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args = {} } = req.params;

  if (name === "list_components") {
    const list = Object.values(catalog.components)
      .map((c) => `- **${c.name}** — ${c.description || "(açıklama yok)"}`)
      .join("\n");
    return {
      content: [
        {
          type: "text",
          text: `# ${catalog.uiPackage}@${catalog.uiVersion}\n\n${Object.keys(catalog.components).length} component:\n\n${list}\n\nKullanım: \`import { Button } from "${catalog.uiPackage}/wraps"\``,
        },
      ],
    };
  }

  if (name === "get_component_spec") {
    const componentName = String(args.name ?? "");
    const spec = catalog.components[componentName];
    if (!spec) {
      const available = Object.keys(catalog.components).join(", ");
      return {
        content: [
          {
            type: "text",
            text: `Component '${componentName}' bulunamadı. Mevcut: ${available}`,
          },
        ],
        isError: true,
      };
    }
    let body = `# ${spec.name}\n\n${spec.description}\n\n`;
    body += `## Import\n\`\`\`tsx\nimport { ${spec.name} } from "${catalog.uiPackage}/wraps";\n\`\`\`\n\n`;
    if (spec.types) {
      body += `## Types (${spec.name}.types.ts)\n\`\`\`ts\n${spec.types}\n\`\`\`\n\n`;
    }
    body += `## Implementation (${spec.name}.tsx)\n\`\`\`tsx\n${spec.source}\n\`\`\`\n`;
    if (spec.css) {
      body += `\n## Styles (${spec.name}.module.css)\n\`\`\`css\n${spec.css}\n\`\`\`\n`;
    }
    return { content: [{ type: "text", text: body }] };
  }

  if (name === "find_component") {
    const query = String(args.query ?? "").toLowerCase();
    if (!query) {
      return {
        content: [{ type: "text", text: "Query boş olamaz." }],
        isError: true,
      };
    }
    const matches = Object.values(catalog.components)
      .map((c) => {
        const haystack = `${c.name} ${c.description}`.toLowerCase();
        const score = query
          .split(/\s+/)
          .reduce((s, term) => s + (haystack.includes(term) ? 1 : 0), 0);
        return { c, score };
      })
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (matches.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `'${query}' için eşleşme yok. \`list_components\` ile tümünü gör.`,
          },
        ],
      };
    }
    const text = matches
      .map(
        ({ c }) =>
          `- **${c.name}** — ${c.description || "(açıklama yok)"}`,
      )
      .join("\n");
    return {
      content: [
        { type: "text", text: `'${query}' için ${matches.length} eşleşme:\n\n${text}` },
      ],
    };
  }

  if (name === "get_design_rules") {
    return {
      content: [
        {
          type: "text",
          text: catalog.rules || "Henüz design-rules.md yazılmamış.",
        },
      ],
    };
  }

  if (name === "get_tokens") {
    return {
      content: [
        {
          type: "text",
          text: `# ServiceCore UI Tokens\n\nHardcoded hex/px yerine bu CSS değişkenlerini kullan.\n\n\`\`\`css\n${catalog.tokens}\n\`\`\``,
        },
      ],
    };
  }

  if (name === "list_pages") {
    const list = Object.values(catalog.pages)
      .map((p) => `- **${p.name}** (\`${p.route}\`) — ${p.description}`)
      .join("\n");
    return {
      content: [
        {
          type: "text",
          text: `# ServiceCore Sayfa Şablonları\n\n${Object.keys(catalog.pages).length} sayfa (kaynak-kod şablon; \`get_page <ad>\` ile çek):\n\n${list}`,
        },
      ],
    };
  }

  if (name === "get_page") {
    const pageName = String(args.name ?? "");
    const page = catalog.pages[pageName];
    if (!page) {
      const available = Object.keys(catalog.pages).join(", ");
      return {
        content: [{ type: "text", text: `Sayfa '${pageName}' bulunamadı. Mevcut: ${available}` }],
        isError: true,
      };
    }
    const langOf = (p: string) => {
      const ext = p.split(".").pop() ?? "";
      return ext === "tsx" || ext === "ts" || ext === "css" || ext === "json" ? ext : "";
    };
    let body = `# ${page.title}\n\nRoute: \`${page.route}\`\n\n${page.description}\n\n${catalog.pageInstall}\n\n## Dosyalar (${page.files.length})\n\n`;
    for (const f of page.files) {
      body += `### \`${f.path}\`\n\`\`\`${langOf(f.path)}\n${f.content}\n\`\`\`\n\n`;
    }
    return { content: [{ type: "text", text: body }] };
  }

  throw new Error(`Bilinmeyen tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
