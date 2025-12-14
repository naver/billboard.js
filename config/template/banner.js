import {readJson} from "../util.js";

const pkg = readJson("package.json");

const banner = {
	production: [
		`Copyright (c) 2017 ~ present ${pkg.author}`,
		`${pkg.name} project is licensed under the ${pkg.license} license`,
		"",
		`${pkg.name}, JavaScript chart library`,
		pkg.homepage,
		"",
		`@version ${process.env?.VERSION || pkg.version}`
	].join("\r\n"),
	packaged: [
		"",
		"",
		`All-in-one packaged file for ease use of '${pkg.name}' with dependant d3.js modules & polyfills.`,
		`- ${
			Object.entries(pkg.dependencies).map(v => v.join(" "))
				.join("\r\n- ")
		}`
	].join("\r\n"),
	plugin: [
		"",
		"@requires billboard.js",
		"@summary billboard.js plugin"
	].join("\r\n")
};

console.log(JSON.stringify(banner));
