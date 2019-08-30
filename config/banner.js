const pkg = require("../package.json");

module.exports = {
	production: [
		`Copyright (c) 2017 ~ present ${pkg.author}`,
		`${pkg.name} project is licensed under the ${pkg.license} license`,
		"",
		`${pkg.name}, JavaScript chart library`,
		pkg.homepage,
		"",
		`@version ${pkg.version}`
	].join("\r\n"),
	packaged: [
		"",
		"",
		`All-in-one packaged file for ease use of '${pkg.name}' with dependant d3.js modules & polyfills.`,
		`- ${Object.entries(pkg.dependencies).map(v => v.join(" ")).join("\r\n- ")}`
	].join("\r\n"),
	plugin: [
		"",
		"@requires billboard.js",
		"@summary billboard.js plugin"
	].join("\r\n")
};
