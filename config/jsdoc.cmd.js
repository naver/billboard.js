/**
 * Generate JSDoc output from a clean destination.
 */
import {existsSync, readdirSync, readFileSync, rmSync, writeFileSync} from "fs";
import {spawnSync} from "child_process";
import {join} from "path";
import {resolvePath} from "./util.js";

const docDir = resolvePath("../doc", false);
const pluginNav = '<li><a href="Plugin.html">Plugin</a>';
const reactComponentHeading = '<h2><a href="billboard.module_js_react.html" target="_self" >React Component</a></h2>';
const reactComponentNav = '<li><a href="billboard.module_js_react.html">React Component</a></li>';

function updateReactComponentNav(file) {
	let content = readFileSync(file, "utf8");

	if (!content.includes("</nav>")) {
		return;
	}

	content = content
		.replace(reactComponentHeading, "")
		.replace(reactComponentNav, "");

	if (!content.includes(pluginNav)) {
		return;
	}

	writeFileSync(file, content.replace(pluginNav, `${reactComponentNav}${pluginNav}`), "utf8");
}

function updateGeneratedNav(dir) {
	readdirSync(dir, {withFileTypes: true}).forEach(entry => {
		const path = join(dir, entry.name);

		if (entry.isDirectory()) {
			updateGeneratedNav(path);
		} else if (entry.name.endsWith(".html")) {
			updateReactComponentNav(path);
		}
	});
}

rmSync(docDir, {recursive: true, force: true});

const {status} = spawnSync("jsdoc", ["-c", "jsdoc.json"], {
	stdio: "inherit",
	shell: process.platform === "win32"
});

if (existsSync(docDir)) {
	updateGeneratedNav(docDir);
}

process.exit(status ?? 1);
