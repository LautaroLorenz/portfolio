#!/usr/bin/env bash

# generate publish version
ng build --prod=true --outputPath=docs --baseHref=/portfolio/
git add ./docs
git commit --no-verify -m "build docs"
git push --no-verify

# merge develop into main
git checkout main
git merge develop
git push --no-verify

# return to develop
git checkout develop
