#!/bin/sh
# Credit: https://www.vinaygopinath.me/blog/tech/commit-to-master-branch-on-github-using-travis-ci/

# set nightly version
VERSION="$(node -pe "require('./package.json').replace('snapshot', 'nightly')")-`date '+%Y%m%d%H%M%S'`"
echo $VERSION

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

build_nightly() {
  ./node_modules/.bin/cross-env NIGHTLY=$VERSION npm run build:production
  ./node_modules/.bin/cross-env NIGHTLY=$VERSION npm run build:packaged
  ./node_modules/.bin/cross-env NIGHTLY=$VERSION npm run build:theme
}

build_and_commit() {
  git checkout nightly
  git fetch origin
  git merge origin/master --no-verify

  build_nightly
  git commit -a -m "skip: $VERSION build [skip ci]"
}

push() {
  # Remove existing "origin"
  git remote rm origin

  # Add new "origin" with access token in the git URL for authentication
  git remote add origin https://netil:${GH_TOKEN}@github.com/naver/billboard.js.git > /dev/null 2>&1
  git push origin nightly
}

setup_git
build_and_commit
push
