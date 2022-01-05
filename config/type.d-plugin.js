/**
 * Generate plugin type definition file for dist folder.
 * Note: Need to be executed after 'dist', 'dist-esm' folders are generated.
 */
import fs from "fs";
import {resolvePath, readFile, readJson, writeFile} from "./util.js";

const srcPath = resolvePath("../../src/Plugin/");
const distPath = resolvePath("../../dist/plugin/");
const distEsmPath = resolvePath("../../dist-esm/plugin/");

// read plugin type template
const template = readFile("./template/plugin.d.txt");

// read the const to get plugin filename prefix
const prefix = readJson("./const.json").pluginPrefix;

// read the plugin directory
fs.readdirSync(srcPath, {
	withFileTypes: true
})
.filter(dirent => dirent.isDirectory())
.forEach(({name}) => {
	const fileName = `${prefix}-${name}.d.ts`;
	const content = template.replace(/{=PLUGIN-NAME}/, name)

	writeFile(`${distPath}/${fileName}`, content);
	writeFile(`${distEsmPath}/${fileName}`, content);
});
