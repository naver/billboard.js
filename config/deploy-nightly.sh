#!/usr/bin/env bash
# Credit: https://www.vinaygopinath.me/blog/tech/commit-to-master-branch-on-github-using-travis-ci/

# set nightly version
VERSION="$(node -pe "require('./package.json').version")-nightly-`date '+%Y%m%d%H%M%S'`"

setup_git() {
    git config --global user.email "alberto.park@gmail.com"
    git config --global user.name "netil"
    git config --global merge.ours.driver true

    git checkout -t origin/nightly
    git merge --strategy-option theirs master
}

build_nightly() {
    ./node_modules/.bin/cross-env VERSION=$VERSION npm run build:production
    ./node_modules/.bin/cross-env VERSION=$VERSION npm run build:packaged
    ./node_modules/.bin/cross-env VERSION=$VERSION npm run build:theme
    ./node_modules/.bin/cross-env VERSION=$VERSION npm run build:plugin
    ./node_modules/.bin/cross-env VERSION=$VERSION npm run build:esm
    npm run build:plugin:types
}

build_and_commit() {
    build_nightly
    git add ./dist*
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
