#!/bin/sh

set -e

VERSION=$(git describe --tags --abbrev=0 | cut -c 2-)

npm version $VERSION --no-git-tag-version --workspaces
npm publish --workspaces
