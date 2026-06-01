#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════════════
# panel/  →  gorgonline/servicecore-panel  senkron + push
#
# DEPLOY BU REPODAN OLUR. Monorepo'daki (gorgonline/servicecore) panel/ sadece
# çalışma kopyasıdır; oraya push DEPLOY ETMEZ. Panel'i yayına almak için bu.
#
# Kullanım (panel/ içinden):
#   bash scripts/sync-deploy.sh "commit mesajı"
#   # veya: pnpm sync-deploy "commit mesajı"
# ════════════════════════════════════════════════════════════════════════
set -euo pipefail

MSG="${1:?Kullanım: pnpm sync-deploy \"commit mesajı\"}"
PANEL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
REPO="$TMP/servicecore-panel"

echo "→ servicecore-panel klonlanıyor…"
gh repo clone gorgonline/servicecore-panel "$REPO" >/dev/null 2>&1

echo "→ panel/ senkronlanıyor…"
rsync -a --delete \
  --exclude=.git --exclude=node_modules --exclude=.next \
  --exclude=dist --exclude=.turbo \
  "$PANEL_DIR/" "$REPO/"

cd "$REPO"
git add -A
if git diff --cached --quiet; then
  echo "✓ Değişiklik yok — servicecore-panel zaten güncel."
  exit 0
fi
git commit -m "$MSG" >/dev/null
git push origin main
echo "✓ servicecore-panel güncellendi → Vercel deploy tetiklenir."
