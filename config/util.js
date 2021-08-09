import {dirname, resolve} from "path";
import {fileURLToPath} from "url";
import {execSync} from "child_process";
import {readFileSync, writeFileSync} from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Get banner object
 */
function getBanner() {
    return JSON.parse(
        execSync(`node ${resolvePath("./banner.js")}`, {encoding: "utf-8"})
    );
}

/**
 * Resolve path
 * @param {string} path Path to resolve
 */
function resolvePath(path) {
    return resolve(__dirname, path);
}

/**
 * Read json from the root of the project.
 * @param {string} path Path from the root
 */
function readJson(path) {
    return JSON.parse(readFileSync(resolvePath(`../${path}`), "utf8"));
}

/**
 * Write json to file
 * @param {string} target Path from the root
 * @param {object} json JSON object
 */
function writeJson(target, json) {
    writeFileSync(target, JSON.stringify(json), e => {
        console.error(e);
    });
}

export {
  __dirname,
  getBanner,
  readJson,
  resolvePath,
  writeJson
};
