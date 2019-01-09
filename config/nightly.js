// for nightly build
const pkg = require("../package.json");
const exec = require("child_process").exec;

// get datetime as string
function getDatetime() {
	// convert to 2 digit
	const get2digit = val => (String(val).length === 1 ? `0${val}` : val);

	// get 'YYYY-MM-DD' formatted value
	const date = new Date();

	return [
		date.getFullYear(),
		get2digit(date.getMonth() + 1),
		get2digit(date.getDate()),
		get2digit(date.getHours()),
		get2digit(date.getMinutes()),
		get2digit(date.getSeconds())
	].join("");
}

// is deploy build? (The deploy is intended to be ran from Travis CI)
const deploy = process.env.DEPLOY_NIGHTLY;

// set version for nightly
const version = pkg.version.replace(/snapshot/, `nightly-${getDatetime()}`);
let cmd = `cross-env NIGHTLY=${version} npm run build:`;

// build command
const build = {
	merge_master: deploy ? "git fetch origin && git merge origin/master --no-verify" : "",
	production: `${cmd}production`,
	packaged: `${cmd}packaged`,
	theme: `${cmd}theme`,
	push: deploy ? `git commit -a -m "skip: ${version} build" && git push origin nightly` : ""
};

cmd = Object.values(build);

console.log(`***** Starting build v${version} *****\r\n> ${cmd.join("\r\n> ")}`);

exec(cmd.join(" && "), () => {
	console.log(`***** Finished successfully! *****`);
});
