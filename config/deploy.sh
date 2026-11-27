#!/bin/bash

setup() {
	# version
	VERSION=$(node -pe "require('./package.json').version")

	# Current branch
	CUR_BRANCH=$(git rev-parse --abbrev-ref HEAD)

	# folder to be pushed (copied to the root of gh-pages: release/, demo/)
	DIST_FOLDER=deploy

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
	rm -rf $DIST_FOLDER && mkdir -p $DIST_FOLDER/release/$VERSION

	# build & copy to release path
	pnpm run build && pnpm run jsdoc
	cp -r doc dist* $DIST_FOLDER/release/$VERSION/

	# copy built files to dist_tag folder
	mkdir $DIST_FOLDER/release/$DIST_TAG
	cp -r doc dist* $DIST_FOLDER/release/$DIST_TAG

	# copy the demo files (demo.js, chart.js, ...)
	cp -r demo $DIST_FOLDER/demo && rm -rf $DIST_FOLDER/demo/work

	# demo/index.html loads the build from the local gh-pages checkout (for the local dev),
	# on gh-pages it has to load the release build next to it
	sed -i.bak 's#\.\./\.\./gh-pages/release/latest/dist/#../release/latest/dist/#' $DIST_FOLDER/demo/index.html
	rm $DIST_FOLDER/demo/index.html.bak
	grep -q '"../release/latest/dist/"' $DIST_FOLDER/demo/index.html || {
		echo "demo/index.html: the build path was not replaced"
		exit 1
	}
}

push() {
	# Add new remote with access token in the git URL for authentication
	if [[ "$CI" == "true" ]]; then
		git config --global user.email "alberto.park@gmail.com"
		git config --global user.name "netil"

		# git remote set-url ${DEST_REMOTE} https://netil:${{ secrets.GH_TOKEN }}@github.com/naver/billboard.js.git > /dev/null 2>&1
	fi

	# push to github pages
	pnpm dlx gh-pages --dist $DIST_FOLDER --add --remote $DEST_REMOTE --message $COMMIT_MESSAGE
}

setup
build
push
