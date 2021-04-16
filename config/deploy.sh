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
	# use GH environment variable "CI" to determine the run
	# https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables
	if [[ "$CI" == "true" ]]; then
		DEST_REMOTE=origin
	else
		DEST_REMOTE=upstream
	fi

	# if this is the @next release channel, do not deploy doc & build files to gh-pages
	if [[ $VERSION == *"next"* ]]; then
		exit 1
		# DIST_TAG=next
	else
		DIST_TAG=latest
	fi

	echo $VERSION
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
	# Add new remote with access token in the git URL for authentication
	if [[ "$CI" == "true" ]]; then
		git config --global user.email "alberto.park@gmail.com"
		git config --global user.name "netil"

		git remote set-url ${DEST_REMOTE} https://netil:${1}@github.com/naver/billboard.js.git > /dev/null 2>&1
	fi

	# push to github pages
	npx gh-pages --dist $DIST_FOLDER --dest $DEST_FOLDER --add --remote $DEST_REMOTE --message $COMMIT_MESSAGE
}

setup
build
push
