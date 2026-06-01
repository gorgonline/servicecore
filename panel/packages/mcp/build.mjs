import * as esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";

const outDir = "dist";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outfile: "dist/index.js",
  banner: { js: "#!/usr/bin/env node" },
  external: ["@modelcontextprotocol/sdk"],
  logLevel: "info",
});

fs.chmodSync(path.join(outDir, "index.js"), 0o755);
console.log("[mcp] build complete");
