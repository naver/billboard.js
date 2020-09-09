#!/bin/bash

setup() {
  # version
  VERSION=$(node -pe "require('./package.json').version")

  # Current branch
  CUR_BRANCH=$(git rev-parse --abbrev-ref HEAD)

  # folder to be pushed
  DIST_FOLDER=release

  # destination folder
  DEST_FOLDER=release

  # destination remote name
  if [[ $TRAVIS == "true" ]]; then
    DEST_REMOTE=origin
  else
    DEST_REMOTE=upstream
  fi

  if [[ $CUR_BRANCH == "next" ]]; then
    # if this is the @next release channel, do not deploy doc & build files to gh-pages
    exit 1
  else
    DIST_TAG=latest
  fi

  echo $DIST_TAG
}

build() {
  # commit message string
  COMMIT_MESSAGE="skip:$VERSION-release"

  echo "*** Releasing docs for ${VERSION} on ${CUR_BRANCH} --> ${DEST_REMOTE} ***"

  # create release directory
  rm -rf release && mkdir -p release/$VERSION

  # build & copy to release path
  npm run build && npm run jsdoc
  cp -r doc dist release/$VERSION/

  # copy built files to dist_tag folder
  mkdir release/$DIST_TAG
  cp -r doc dist release/$DIST_TAG
}

push() {
  git config --global user.email "alberto.park@gmail.com"
  git config --global user.name "Jae Sung Park"

  # Remove existing remote
  git remote rm ${DEST_REMOTE}

  # Add new remote with access token in the git URL for authentication
  git remote add ${DEST_REMOTE} https://netil:${GH_TOKEN}@github.com/naver/billboard.js.git > /dev/null 2>&1

  # push to github pages
  # Use fixed gh-pages version, due to the bug from the latest 2.1.0
  # https://travis-ci.org/naver/billboard.js/jobs/568700732#L1172
  # https://github.com/tschaub/gh-pages/issues/308
  npx gh-pages@2.0.1 --dist $DIST_FOLDER --dest $DEST_FOLDER --add --remote $DEST_REMOTE --message $COMMIT_MESSAGE --silent
}

setup
build
push
