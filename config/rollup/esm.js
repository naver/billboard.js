import pkg from '../../package.json';
import babel from '@rollup/plugin-babel';
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

import path from "path";
import fs from "fs";

const {plugin, production} = require("../banner.js");
const version = process.env.VERSION || pkg.version;

function getBanner(isPlugin) {
   
	return `/*!
* ${(production.replace(/(@version ).*$/, `$1${version}`) + (isPlugin ? plugin : "")).replace(/\r\n/gm, "\r\n * ")}
*/`;
}

const plugins = [
    resolve(),
    babel({
        babelHelpers: "runtime"
    }),
    typescript(),
    replace({
        "__VERSION__": version
    })
];
const external = id => /^d3-/.test(id);

// billboard.js plugin setting
const bbPlugins = fs.readdirSync(path.resolve(__dirname, "../../src/Plugin/"), {
	withFileTypes: true
})
.filter(dirent => dirent.isDirectory())
.map(({name}) => ({
    input: `src/Plugin/${name}/index.ts`,
    output: {
        file: `dist/plugin/billboardjs-plugin-${name}.esm.js`,
        format: "es",
        banner: getBanner(true)
    },
    plugins,
    external
}));

export default [
    {
        input: "src/index.esm.ts",
        output: {
            file: "dist/billboard.esm.js",
            format: "es",
            banner: getBanner()
        },
        plugins,
        external
    },
    ...bbPlugins
];
