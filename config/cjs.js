/**
 * Generate a CJS package.json file to dist folder.
 */
import {resolvePath, writeJson} from "./util.js";

const content = {
	"type": "commonjs"
};

writeJson(resolvePath("../dist/package.json", false), content);
