// for nightly build
const pkg = require("../package.json");
const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path");

exec("npm run jsdoc:cmd", () => {
	// Replace version info
	const file = path.resolve(__dirname, "../doc/bb.html");

	fs.readFile(file, "utf8", (err, data) => {
		if (err) throw err;

		const result = data.replace(/#__VERSION__#/g, pkg.version);

		fs.writeFile(file, result, "utf8", err => {
			if (err) throw err;

			console.log("==> API doc has been generated!");
		});
	});
});
