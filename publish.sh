#!/usr/bin/env bash

# merge develop into main
git checkout main
git merge --squash develop
git push --no-verify

# return to develop
git checkout develop
