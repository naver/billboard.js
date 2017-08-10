/**
 * Generate changelog file from commit log
 *
 * - USAGE:
 *   // will get logs from: a month ago from today ~ today
 *   npm run changelog
 *
 *   // will get logs from: 2017-06-08 ~ 2017-07-09
 *   npm run changelog -- 2017-06-08:2017-07-09
 */
const pkg = require("../package.json");
const exec = require("child_process").exec;
const fs = require("fs");
const xml2js = require("xml2js");

// retrieve parameter
const period = process.argv[2] ? process.argv[2].split(":") : [,];

const changelog = {
	// Commit log tag filtering types for changelog
	filterType: {
		feat: "Features",
		fix: "Bug Fixes",
		docs: "Documents",
		style: "Code Styles",
		refactor: "Refactorings",
		test: "Test Codes",
		chore: "Chore tasks"
	},

	// git info holder
	gitinfo: {},

	// convert to 2 digit
	get2digit(val) {
		return String(val).length === 1 ? `0${val}` : val;
	},

	// get 'YYYY-MM-DD' formatted value
	getFormattedDate(dateValue) {
		const delimiter = "-";
		const date = (dateValue && new Date(dateValue)) || new Date();

		return [
			date.getFullYear(),
			this.get2digit(date.getMonth() + 1),
			this.get2digit(date.getDate())
		].join(delimiter);
	},

	// get git log command string
	getLogCmd(afterValue, beforeValue) {
		const date = new Date();

		const after = afterValue || this.getFormattedDate(date.setMonth(date.getMonth() - 1));  // default: a month ago
		const before = beforeValue || this.getFormattedDate();  // default: today

		console.log("---------------------------------------------------------------");
		console.log(" [CHANGELOG] Creating for period of =>", after, "~", before);
		console.log("---------------------------------------------------------------");

		return [
			"git log",
			[,].concat(Object.keys(this.filterType)).join(" --grep="),
			"-i",
			`--after={${after}}`,
			`--before={${before}`,
			"--pretty=\"<item><hash>%h</hash><subject><![CDATA[%s]]></subject><body><![CDATA[%b]]></body></item>\"",
			"--no-merges"
		].join(" ");
	},

	// get git info cmd string
	getGitInfo() {
		return "git rev-parse --abbrev-ref HEAD && git log -1 --pretty=\"format:%h %ci\" --no-merges";
	},

	// generate changelog from the git log result
	generate(error, stdout, stderr) {
		const parser = new xml2js.Parser();

		// define log data structure
		const logdata = {};

		Object.keys(this.filterType).forEach(v => {
			logdata[v] = {};
		});

		// check for duplication
		const isDuplicated = (data, value) => {
			const val = value.toLowerCase();

			for (let i = 0, el; (el = data[i]); i++) {
				if (el.subject.toLowerCase() === val) {
					return true;
				}
			}

			return false;
		};

		// capitalize
		const capitalize = val => val.charAt(0).toUpperCase() + val.substr(1);

		// get sorted module name
		const getModuleName = function(value) {
			let val = value;

			if (val.indexOf(",") === -1) {
				return capitalize(val);
			}

			val = val.trim()
				.replace(/\s*,\s*/g, ",")
				.split(",");

			val.forEach((v, i) => {
				val[i] = capitalize(v);
			});

			return val.sort().join(", ");
		};

		parser.parseString(`<logs>${stdout}</logs>`, (function(err, result) {
			if (!result || !result.logs) {
				return;
			}

			const rxNewline = /\r?\n/g;
			const rxBody = /(?:ref|fix|close)\s([g#]|gh)-?([0-9]+)/i;
			const rxSubject = new RegExp(`^(${Object.keys(this.filterType).join("|")})\\s?\\(([\\w-_,\\.\\s]+)\\)\\s*:\\s*(.*)`, "i");
			let issue;
			let subject;
			let category;
			let module;

			for (let i = 0, el; (el = result.logs.item[i]); i++) {
				// filter logs which has issue reference on commit body message.
				issue = el.body[0].replace(rxNewline, "").match(rxBody);

				if (issue) {
					subject = el.subject[0].match(rxSubject);

					// filter subject which matches with fix or feat format
					if (subject) {
						category = logdata[subject[1]];
						module = getModuleName(subject[2]);

						if (!category[module]) {
							category[module] = [];
						}

						// filter duplicated subject
						if (!isDuplicated(category[module], subject[3])) {
							category[module].push({
								subject: capitalize(subject[3]),
								issueType: issue[1],
								issueNo: issue[2],
								hash: el.hash[0]
							});
						}
					}
				}
			}
		}).bind(this));

		// template for content of CHANGELOG.md
		const template = {
			header: "# {=VERSION} release ({=DATE})\r\n",
			category: "\r\n## {=CATEGORY} :\r\n",
			module: "\r\n- **{=MODULE}**\r\n",
			item: "\t- {=SUBJECT} ([#{=ISSUE-NO}]({=URL}/{=ISSUE-NO}))\r\n"
		};

		let markdown = template.header
			.replace(/{=VERSION}/g, pkg.version)
			.replace(/{=DATE}/g, this.gitinfo.lastCommitTime);

		for (const x in logdata) {
			if (Object.keys(logdata[x]).length === 0) {
				continue;
			}

			markdown += template.category
				.replace(/{=CATEGORY}/g, this.filterType[x] || "");

			for (const z in logdata[x]) {
				markdown += template.module
					.replace(/{=MODULE}/g, z);

				for (let i = 0, el; (el = logdata[x][z][i]); i++) {
					markdown += template.item
						.replace(/{=SUBJECT}/g, el.subject)
						.replace(/{=ISSUE-NO}/g, el.issueNo)
						.replace(/{=URL}/g, pkg.bugs.url)
						.replace(/{=SUBJECT}/g, el.subject);
				}
			}
		}

		fs.writeFile("CHANGELOG.md", markdown, err => {
			err ?
				console.log(err) :
				console.log("Done, check out 'CHANGELOG.md' file.");
		});
	},

	// initialization
	init() {
		const cmd = this.getLogCmd(period[0], period[1]);

		exec(this.getGitInfo(), (function(error, stdout, stderr) {
			const info = stdout.replace(/\r?\n/," ").split(" ");

			this.gitinfo = {
				branchName: info[0],
				shortSHA: info[1],
				lastCommitTime: info[2]
			};

			exec(cmd, this.generate.bind(this));
		}).bind(this));
	}
};

changelog.init();
