#!/bin/sh

set -e

# GITHUB_REF is in the form of refs/tags/v1.0.0
# take the last part of the string and remove the v
REF=$GITHUB_REF
TAG=${REF##*/}
VERSION=${TAG#v}

npm version $VERSION --no-git-tag-version --workspaces
npm publish --workspaces --access=public

# create a branch and push it to github
BRANCH_NAME=npm-version/$VERSION

git checkout -b $BRANCH_NAME
git add .
git commit -m "Release $VERSION"
git push origin $BRANCH_NAME

# create a PR
gh pr create --title "Update ES packages version to $VERSION" --body "Update version to $VERSION" --base main --head $BRANCH_NAME
