#!/bin/bash

# version
VERSION=$(node -pe "require('./package.json').version")

# folder to be pushed
DIST_FOLDER=release

# destination folder
DEST_FOLDER=release

# destination branch name
DEST_BRANCH=upstream

# commit message string
COMMIT_MESSAGE="skip:$VERSION-release"

# create release directory
rm -rf release && mkdir release && cd release && mkdir $VERSION latest && cd ..

# build & copy to release path
npm run build && npm run jsdoc && cp -r doc dist release/latest/ && cp -r doc dist release/$VERSION/

# push
npx gh-pages --dist $DIST_FOLDER --dest $DEST_FOLDER --add --remote $DEST_BRANCH --message $COMMIT_MESSAGE
