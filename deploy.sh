#!/bin/bash
# yasas.io — build + commit + push helper
# Usage: ./deploy.sh "your commit message"

set -e

MSG=${1:-"update: yasas.io landing page"}

echo "→ Building..."
npm run build

echo "→ Staging changes..."
git add -A

echo "→ Committing: $MSG"
git commit -m "$MSG" || echo "Nothing to commit."

echo "→ Pushing to GitHub..."
git push origin main

echo "✓ Done. Dist is also ready to upload to Hostinger public_html/"
