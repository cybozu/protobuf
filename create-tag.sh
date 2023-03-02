#!/bin/sh

set -e

if [ "$(git branch --show-current)" != main ]; then
    echo "not on the main branch."
    exit 1
fi

echo "Running git pull to be up-to-date."
git fetch origin --prune --prune-tags

MAJOR=0
MINOR=$(date '+%Y%m%d')
REV=0

while true; do
    TAG=v${MAJOR}.${MINOR}.${REV}
    if git tag | grep -qF ${TAG}; then
        REV=$((REV + 1))
    else
        break
    fi
done

echo "Creating a new Git tag ${TAG}"
echo -n "Proceed? [y/N]: "
read t
if echo $t | grep -i '^y'; then
    :
else
    echo "Aborted."
    exit 1
fi

git tag -a -m "Release ${TAG}" ${TAG}
git push origin ${TAG}

echo "Tagged and pushed ${TAG}"
