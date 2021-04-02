#!/usr/bin/env bash

# generate publish version
echo "generando publish version..."
npm run build-publish-version

# upload publish version
echo "subiendo publish version a git..."
git add ./docs
git commit --no-verify -m "build docs"
git push --no-verify

# merge develop into main
echo "publicando en branch main..."
git checkout main
git merge develop
git push --no-verify
git checkout develop

echo "publish version subida."

