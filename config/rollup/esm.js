import {readdirSync} from "fs";
import babel from '@rollup/plugin-babel';
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import del from "rollup-plugin-delete";
import {getBanner, readJson, resolvePath} from "../util.js";

const pkg = readJson("package.json");
const distPath = "dist-esm";

const {plugin, production} = getBanner();
const version = process.env.VERSION || pkg.version;

function getBannerStr(isPlugin) {
   
	return `/*!
* ${(production.replace(/(@version ).*$/, `$1${version}`) + (isPlugin ? plugin : "")).replace(/\r\n/gm, "\r\n * ")}
*/`;
}

const plugins = [
    del({
        targets: `${distPath}/*`,
        runOnce: true
    }),
    resolve(),
    babel({
        babelHelpers: "runtime"
    }),
    typescript(),
    replace({
        "__VERSION__": version,
        preventAssignment: true
    })
];
const external = id => /^d3-/.test(id);

// billboard.js plugin setting
const bbPlugins = readdirSync(resolvePath("../../src/Plugin/"), {
	withFileTypes: true
})
.filter(dirent => dirent.isDirectory())
.map(({name}) => ({
    input: `src/Plugin/${name}/index.ts`,
    output: {
        file: `${distPath}/plugin/billboardjs-plugin-${name}.js`,
        format: "es",
        banner: getBannerStr(true)
    },
    plugins,
    external
}));

export default [
    {
        input: "src/index.esm.ts",
        output: {
            file: `${distPath}/billboard.js`,
            format: "es",
            banner: getBannerStr()
        },
        plugins,
        external
    },
    ...bbPlugins
];
