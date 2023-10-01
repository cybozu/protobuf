#!/bin/sh

set -e

# GITHUB_REF is in the form of refs/tags/v1.0.0
# take the last part of the string and remove the v
REF=$GITHUB_REF
TAG=${REF##*/}
VERSION=${TAG#v}

npm version $VERSION --no-git-tag-version --workspaces
npm publish --workspaces --access=public

git add .
git commit -m "Release $VERSION"
git push origin main
