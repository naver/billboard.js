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

// build command
const build = {
	production: `npm run build:production -- --env.nightly=${version}`,
	packaged: `npm run build:packaged -- --env.nightly=${version}`
};

console.log(`${build.production} && ${build.packaged}`);
exec(build.production, () => exec(build.packaged));
