#!/usr/bin/env node

/**
 * Original Code
 * https://github.com/angular/angular.js/blob/v1.5.9/validate-commit-msg.js
 *
 * Git COMMIT-MSG hook for validating commit message
 * - See https://github.com/naver/billboard.js/blob/master/CONTRIBUTING.md#commit-log-guidelines
 * - modified by billboard.js
 */
const fs = require("fs");
const util = require("util");

const MAX_TITLE_LENGTH = 50;
const MAX_LENGTH = 100;
const PATTERN = /^(?:fixup!\s*)?(\w*)(\(([\w\$\,\.\*/-]*)\))?\: (.*)$/;
const IGNORED = /^skip\:/i;
const TYPES = {
	feat: true,
	fix: true,
	docs: true,
	style: true,
	refactor: true,
	test: true,
	chore: true
};

const error = (...args) => {
	// gitx does not display it
	// http://gitx.lighthouseapp.com/projects/17830/tickets/294-feature-display-hook-error-message-when-hook-fails
	// https://groups.google.com/group/gitx/browse_thread/thread/a03bcab60844b812
	console.error(`INVALID COMMIT MSG: ${util.format.apply(null, args)}`);
};

const validateMessage = function(message, fullMessage) {
	let isValid = true;

	if (IGNORED.test(message)) {
		console.log("Commit message validation ignored.");

		return true;
	}

	if (message.length > MAX_LENGTH) {
		error("is longer than %d characters !", MAX_LENGTH);
		isValid = false;
	}

	const match = PATTERN.exec(message);

	if (!match) {
		const data = fs.readFileSync(`${__dirname}/commit.template`, "utf8");

		error(`\n\r======= Your commit message =======\n\r${fullMessage}\n\r${data}`);

		return false;
	}

	const type = match[1];
	const module = match[3];
	const subject = match[4];

	if (subject.length > MAX_TITLE_LENGTH) {
		error("The maximum length for PR subject is %d characters !", MAX_TITLE_LENGTH);
		isValid = false;
	}

	if (!TYPES.hasOwnProperty(type)) {
		error("'%s' is not allowed type !", type);

		return false;
	}

	// Some more ideas, do want anything like this ?
	// - allow only specific scopes (eg. fix(docs) should not be allowed ?
	// - auto correct the type to lower case ?
	// - auto correct first letter of the subject to lower case ?
	// - auto add empty line after subject ?
	// - auto remove empty () ?
	// - auto correct typos in type ?
	// - store incorrect messages, so that we can learn

	return isValid;
};


const firstLineFromBuffer = buffer => buffer.toString()
	.split("\n")
	.shift();

const removeInfo = buffer => buffer.toString()
	.replace(/\n(#\s(?:.*?)$)/gm, "");

// publish for testing
exports.validateMessage = validateMessage;

// hacky start if not run by jasmine :-D
if (process.argv.join("").indexOf("jasmine-node") === -1) {
	const commitMsgFile = ".git/COMMIT_EDITMSG";
	const incorrectLogFile = commitMsgFile.replace("COMMIT_EDITMSG", "logs/incorrect-commit-msgs");

	fs.readFile(commitMsgFile, (err, buffer) => {
		const msg = firstLineFromBuffer(buffer);

		if (!validateMessage(msg, removeInfo(buffer))) {
			fs.appendFile(incorrectLogFile, `${msg}\n`, () => {
				process.exit(1);
			});
		} else {
			process.exit(0);
		}
	});
}
