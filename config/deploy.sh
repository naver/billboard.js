#!/bin/bash

# version
VERSION=$(node -pe "require('./package.json').version")

# Current branch
CUR_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# folder to be pushed
DIST_FOLDER=release

# destination folder
DEST_FOLDER=release

# destination branch name
DEST_BRANCH=upstream

# commit message string
COMMIT_MESSAGE="skip:$VERSION-release"

echo "releasing docs for ${VERSION} on ${CUR_BRANCH}"

# create release directory
rm -rf release && mkdir -p release/$VERSION

# build & copy to release path
npm run jsdoc && cp -r doc dist release/$VERSION/

# if this is the @next release channel, also deploy docs to in latest folder
if [[ $CUR_BRANCH == "next" ]]; then
  DIST_TAG=next
else
  DIST_TAG=latest
fi

mkdir release/$DIST_TAG
cp -r doc dist release/$DIST_TAG

# push to github pages
npx gh-pages --dist $DIST_FOLDER --dest $DEST_FOLDER --add --remote $DEST_BRANCH --message $COMMIT_MESSAGE
