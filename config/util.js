import {dirname, resolve} from "path";
import {fileURLToPath} from "url";
import {execSync} from "child_process";
import {existsSync, readFileSync, writeFileSync} from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get banner object
 */
function getBanner() {
    return JSON.parse(
        execSync(`node ${resolvePath("./template/banner.js")}`, {encoding: "utf-8"})
    );
}

/**
 * Resolve path
 * @param {string} path Path to resolve
 * @param {boolean} checkExists Check if dir exists
 */
 function resolvePath(path, checkExists = true) {
    let resolved = resolve(__dirname, path);

    // if not exists, try to resolve 1 level down
    if (checkExists && !existsSync(resolved)) {
        resolved = resolve(__dirname, path.replace(/^\.\.\//, ""));
    }

    return resolved;
}

/**
 * Read json from the root of the project.
 * @param {string} path Path from the root
 * @param {boolean} isJson If the value is JSON
 */
function readFile(path, isJson = false) {
    const res = readFileSync(resolvePath(`../${path}`), "utf8");

    return isJson ? JSON.parse(res) : res;
}

/**
 * Write json to file
 * @param {string} target Path from the root
 * @param {object} value Value to write
 * @param {boolean} isJson If the value is JSON
 */
function writeFile(target, value, isJson = false) {
    writeFileSync(target, isJson ? JSON.stringify(value) : value, {flag: "w"}, e => {
        console.error(e);
    });
}

function readJson(path) {
    return readFile(path, true);
}

function writeJson(target, value) {
    return writeFile(target, value, true);
}

export {
  __dirname,
  getBanner,
  readFile,
  readJson,
  resolvePath,
  writeFile,
  writeJson
};
