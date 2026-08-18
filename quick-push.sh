#!/bin/bash

# Quick commit and push script

git add .
git commit -m "Fix: Simplify wrangler.toml for Cloudflare Pages

- Remove Workers-specific configuration
- Keep minimal Pages configuration
- Bindings will be configured in Dashboard

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"

git push

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "Next steps:"
echo "1. Cloudflare will auto-deploy from GitHub"
echo "2. In Dashboard, set Deploy command to: echo 'Build complete'"
echo "3. Configure bindings (D1 + R2) in Functions tab"
echo "4. Add environment variables"
