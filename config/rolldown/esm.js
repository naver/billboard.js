import {readdirSync, rmSync} from "fs";
import {replacePlugin} from "rolldown/plugins";
import {getBanner, readJson, resolvePath} from "../util.js";
import {getWorkerSource} from "../worker-src.js";

const pkg = readJson("package.json");
const prefix = readJson("./const.json").pluginPrefix;
const distPath = "dist-esm";

// Inject the separately bundled worker source (see config/worker-src.js).
// Done with split/join rather than replacePlugin: the minified worker source
// contains `${...}` sequences that regex-based replacement mangles or skips.
const workerSrcPlugin = {
	name: "bb-worker-src",
	async transform(code) {
		if (code.includes("__WORKER_SRC__")) {
			return {
				code: code.split("__WORKER_SRC__").join(JSON.stringify(await getWorkerSource())),
				map: null
			};
		}
	}
};

const {plugin, production} = getBanner();
const version = process.env.VERSION || pkg.version;

// clean output dir once before building (replaces rollup-plugin-delete)
rmSync(resolvePath(`../${distPath}`, false), {recursive: true, force: true});

function getBannerStr(isPlugin) {

	return `/*!
* ${(production.replace(/(@version ).*$/, `$1${version}`) + (isPlugin ? plugin : "")).replace(/\r\n/gm, "\r\n * ")}
*/`;
}

// Prepend the banner in generateBundle so it's written verbatim.
// Rolldown normalizes comment blocks during rendering (CRLF -> LF and strips
// leading whitespace), so `output.banner`/`renderChunk` would diverge from the
// previous Rollup output. generateBundle runs after that pass, keeping the
// banner byte-identical.
function bannerPlugin(isPlugin) {
	const banner = `${getBannerStr(isPlugin)}\n`;

	return {
		name: "bb-banner",
		generateBundle(_options, bundle) {
			for (const file of Object.values(bundle)) {
				if (file.type === "chunk") {
					file.code = banner + file.code;
				}
			}
		}
	};
}

// node module resolution & TypeScript transform are built into Rolldown (Oxc),
// so @rollup/plugin-node-resolve and @rollup/plugin-typescript are not needed.
const plugins = [
	replacePlugin({
		"__VERSION__": version,
		preventAssignment: true
	}),
	workerSrcPlugin
];

const external = id => /^d3-/.test(id) || /^react(?:\/|$)/.test(id);
const hasSideEffects = id => /[/\\]src[/\\]Chart[/\\]api[/\\]stubs\.ts$/.test(id);

const bbPlugins = readdirSync(resolvePath("../src/Plugin/"), {
		withFileTypes: true
	})
	.filter(dirent => dirent.isDirectory())
	.map(({name}) => ({
		input: `src/Plugin/${name}/index.ts`,
		output: {
			file: `${distPath}/plugin/${prefix}-${name}.js`,
			format: "es"
		},
		// rolldown doesn't accept the "smallest" preset string; use the explicit
		// equivalent so unused files/exports are removed as aggressively as possible.
		treeshake: {
			moduleSideEffects: false,
			propertyReadSideEffects: false
		},
		plugins: [...plugins, bannerPlugin(true)],
		external
	}));

export default [
	{
		input: [
			"src/index.esm.ts",
			"src/index.canvas.ts",
			"src/react/index.ts"
		],
		output: {
			dir: distPath,
			format: "es",
			preserveModules: true,
			preserveModulesRoot: "src"
		},
		treeshake: {
			moduleSideEffects: hasSideEffects,
			propertyReadSideEffects: false
		},
		plugins: [...plugins, bannerPlugin(false)],
		external
	},
	...bbPlugins
];
