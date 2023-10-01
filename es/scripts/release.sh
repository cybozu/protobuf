#!/bin/sh

set -e

# GITHUB_REF is in the form of refs/tags/v1.0.0
# take the last part of the string and remove the v
REF=$GITHUB_REF
TAG=${REF##*/}
VERSION=${TAG#v}

npm version $VERSION --no-git-tag-version --workspaces
npm publish --workspaces --access=public

# print current branch for debugging
git rev-parse --abbrev-ref HEAD
# print diff for debugging
git diff

git add .
git commit -m "Release $VERSION"

# print repository name for debugging
echo $GITHUB_REPOSITORY

git push https://x-access-token:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git
