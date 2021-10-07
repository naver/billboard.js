// for nightly build
import {readJson, resolvePath} from "./util.js";
import {exec} from "child_process";
import {readFile, writeFile} from "fs";

const pkg = readJson("package.json");

exec("npm run jsdoc:cmd", () => {
	// Replace version info
	const file = resolvePath("../doc/bb.html");

	readFile(file, "utf8", (err, data) => {
		if (err) throw err;

		const result = data.replace(/__VERSION__/g, pkg.version);

		writeFile(file, result, "utf8", err => {
			if (err) throw err;

			console.log("==> API doc has been generated!");
		});
	});
});
