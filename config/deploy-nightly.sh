#!/usr/bin/env bash
# Credit: https://www.vinaygopinath.me/blog/tech/commit-to-master-branch-on-github-using-travis-ci/

# set nightly version
VERSION="$(node -pe "require('./package.json').version.replace('snapshot', 'nightly')")-`date '+%Y%m%d%H%M%S'`"

setup_git() {
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"

    # Remove existing "origin"
    git remote rm origin

    # Add new "origin" with access token in the git URL for authentication
    git remote add origin https://netil:${GH_TOKEN}@github.com/naver/billboard.js.git > /dev/null 2>&1

    git fetch origin
    git checkout nightly
    git merge --strategy-option theirs origin/master
}

build_nightly() {
    ./node_modules/.bin/cross-env NIGHTLY=$VERSION npm run build:production
    ./node_modules/.bin/cross-env NIGHTLY=$VERSION npm run build:packaged
    ./node_modules/.bin/cross-env NIGHTLY=$VERSION npm run build:theme
    ./node_modules/.bin/cross-env NIGHTLY=$VERSION npm run build:plugin
}

build_and_commit() {
    build_nightly
    git add ./dist
    git commit -a -m "skip: $VERSION build [skip ci]"
}

push() {
    git push origin nightly
}

if [ "$1" = "setup" ]; then
    setup_git
elif [ "$1" = "build" ]; then
    # Avoid unnecessary build
    if [[ `git log -1 --pretty=%B` != *"[skip ci]" ]]; then
        build_and_commit
        push
    fi
fi
