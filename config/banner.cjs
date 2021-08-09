const {resolve} = require("path");
const {execSync} = require("child_process");

module.exports = JSON.parse(
	execSync(`node ${resolve(__dirname, "./banner.js")}`, {encoding: "utf-8"})
);
