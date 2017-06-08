var pkg = require("../package.json");

module.exports = {
	"production": [
			"Copyright (c) 2017 " + pkg.author,
			pkg.name + " project is licensed under the " + pkg.license + " license",
			"",
			pkg.name + ", JavaScript chart library",
			pkg.homepage,
			"",
			"@version " + pkg.version
		].join("\r\n"),
	"packaged": [
			"",
			"",
			"All-in-one packaged file for ease use of '" + pkg.name + "' with below dependency.",
			"- " + Object.keys(pkg.dependencies).join(", ")
		].join("\r\n")
};
