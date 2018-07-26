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

// set version for nightly
const version = pkg.version.replace(/snapshot/, `nightly-${getDatetime()}`);
let cmd = `cross-env NIGHTLY=${version} npm run build:`;

// build command
const build = {
	production: `${cmd}production`,
	packaged: `${cmd}packaged`,
	theme: `${cmd}theme`
};

cmd = Object.values(build);

console.log(`***** Starting build v${version} *****\r\n> ${cmd.join("\r\n> ")}`);

exec(cmd.join(" && "), () => {
	console.log(`***** Finished successfully! *****`);
});
