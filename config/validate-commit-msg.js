#!/usr/bin/env node

/**
 * Original Code
 * https://github.com/angular/angular.js/blob/v1.5.9/validate-commit-msg.js
 * Git COMMIT-MSG hook for validating commit message
 * See https://github.com/naver/egjs/wiki/Commit-Log-Guidelines
 * modified by egjs
 */

'use strict';

var fs = require('fs');
var util = require('util');


var MAX_TITLE_LENGTH = 50;
var MAX_LENGTH = 100;
var PATTERN = /^(?:fixup!\s*)?(\w*)(\(([\w\$\,\.\*/-]*)\))?\: (.*)$/;
var IGNORED = /^skip\:/i;
var TYPES = {
  feat: true,
  fix: true,
  docs: true,
  style: true,
  refactor: true,
  test: true,
  chore: true
};

var error = function() {
  // gitx does not display it
  // http://gitx.lighthouseapp.com/projects/17830/tickets/294-feature-display-hook-error-message-when-hook-fails
  // https://groups.google.com/group/gitx/browse_thread/thread/a03bcab60844b812
  console.error('INVALID COMMIT MSG: ' + util.format.apply(null, arguments));
};


var validateMessage = function(message, fullMessage) {
  var isValid = true;

  if (IGNORED.test(message)) {
    console.log('Commit message validation ignored.');
    return true;
  }

  if (message.length > MAX_LENGTH) {
    error('is longer than %d characters !', MAX_LENGTH);
    isValid = false;
  }

  var match = PATTERN.exec(message);

  if (!match) {
    var data = fs.readFileSync(__dirname+'/commit.template', 'utf8');
    error('\n\r======= Your commit message =======\n\r' + fullMessage + '\n\r' + data);
    return false;
  }

  var type = match[1];
  var module = match[3];
  var subject = match[4];

  if (subject.length > MAX_TITLE_LENGTH) {

    error('The maximum length for PR subject is %d characters !', MAX_TITLE_LENGTH);
    isValid = false;
  }

  if (!TYPES.hasOwnProperty(type)) {
    error('"%s" is not allowed type !', type);
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


var firstLineFromBuffer = function(buffer) {
  return buffer.toString().split('\n').shift();
};

var removeInfo = function(buffer) {
  return buffer.toString().replace(/\n(#\s(?:.*?)$)/gm,"");
};



// publish for testing
exports.validateMessage = validateMessage;

// hacky start if not run by jasmine :-D
if (process.argv.join('').indexOf('jasmine-node') === -1) {
  var commitMsgFile = '.git/COMMIT_EDITMSG';
  var incorrectLogFile = commitMsgFile.replace('COMMIT_EDITMSG', 'logs/incorrect-commit-msgs');

  fs.readFile(commitMsgFile, function(err, buffer) {
    var msg = firstLineFromBuffer(buffer);

    if (!validateMessage(msg, removeInfo(buffer))) {
      fs.appendFile(incorrectLogFile, msg + '\n', function() {
        process.exit(1);
      });
    } else {
      process.exit(0);
    }
  });
}
