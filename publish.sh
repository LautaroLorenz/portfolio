#!/usr/bin/env bash

# generate publish version
echo "generando... docs"
ng build --prod=true --outputPath=docs --baseHref=/portfolio/

# upload publish version
echo "subiendo a git... docs"
git add ./docs
git commit --no-verify -m "build docs"
git push --no-verify

# merge develop into main
echo "publicando... docs"
git checkout main
git merge develop
git push --no-verify
git checkout develop

echo "publicado."

