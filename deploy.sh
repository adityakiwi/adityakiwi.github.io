#!/usr/bin/env sh
# Push to GitHub to publish this site to GitHub Pages.
# Usage: ./deploy.sh [commit message]

set -e
MSG="${1:-Update site}"

git add -A
git status
git commit -m "$MSG"
git push origin main

echo "\n✓ Pushed to main. Site will update at https://adityakiwi.github.io"
