/* eslint-disable */
const pkg = require("./package.json");
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackBar = require("webpackbar");

const {env} = process;
const config = {
	entry: {
		billboard: [
			"./src/scss/billboard.scss",
			"./src/index.ts"
		]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		chunkFilename: "[name].bundle.js",
		filename: "[name].js",
		libraryTarget: "umd",
		umdNamedDefine: true,
		globalObject: "this",
		publicPath: "/dist"
	},
	externals: ({context, request}, callback) => {
		if (/^react(?:\/|$)/.test(request)) {
			return callback(null, {
				commonjs: request,
				commonjs2: request,
				amd: request,
				root: "React"
			});
		}

		// every 'd3-*' import, will be externally required as their name except root as 'd3'
		if (/^d3-/.test(request)) {
			return callback(null, {
				commonjs: request,
				commonjs2: request,
				amd: request,
				root: "d3"
			});
		}

		callback();
	},
	devtool: false,
	resolve: {
		extensions: [".ts", ".js"]
	},
	// https://webpack.js.org/migrate/5/#need-to-support-an-older-browser-like-ie-11
	target: ["web", "es5"],
	module: {
		rules: [
			{
				test: /\.[jt]s$/,
				loader: "esbuild-loader",
				options: {
					target: "es2015"
				},
				exclude: {
					and: [/node_modules/],
					not: [/(d3\-.*)$/, /internmap/]
				}
			},
			{
				test: /(\.[jt]s)$/,
				loader: "string-replace-loader",
				options: {
					search: /__VERSION__/ig,
					replace: env.VERSION || pkg.version
				}
			}
		]
	},
	optimization: {
		usedExports: true
	},
	plugins: [],
	node: false,
	stats: "minimal",
	mode: "none"
};

// modes emitting into `dist/`, where the static worker script sits next to the
// library bundle that references it. The theme and plugin builds write into their
// own subdirectory and have no use for it.
const WORKER_ASSET_MODES = ["development", "production", "packaged"];

// ship the worker source as a static script for strict CSP environments,
// referenced through the `boost.workerUrl` option
const workerAssetPlugin = workerSrc => ({
	apply(compiler) {
		compiler.hooks.thisCompilation.tap("bb-worker-asset", compilation => {
			compilation.hooks.processAssets.tap({
				name: "bb-worker-asset",
				stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
			}, () => {
				// BannerPlugin only reaches chunk assets, and this is emitted
				// standalone: carry the same header every other dist file has
				const banner = `/*!\n * ${
					require("./config/template/banner.cjs").production.split("\r\n").join("\n * ")
				}\n */\n`;

				compilation.emitAsset(
					"billboard.worker.js",
					new webpack.sources.RawSource(banner + workerSrc)
				);
			});
		});
	}
});

module.exports = async () => {
	let mode = "development";

	if (env.NODE_ENV) {
		mode = env.NODE_ENV;
	}

	// worker source is bundled separately (ESM helper), so the worker never depends on
	// Function.prototype.toString() of transformed application code
	const {getWorkerSource} = await import("./config/worker-src.js");
	const workerSrc = await getWorkerSource();

	// assigned, not appended: the factory may run more than once in a process, and
	// pushing onto the shared config would stack up duplicate plugins
	config.plugins = [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new WebpackBar(),
		new webpack.DefinePlugin({
			__WORKER_SRC__: JSON.stringify(workerSrc)
		})
	];

	WORKER_ASSET_MODES.includes(mode) && config.plugins.push(
		workerAssetPlugin(workerSrc)
	);

	env.ANALYZER && config.plugins.push(
		new BundleAnalyzerPlugin()
	);

	mode === "packaged" && delete config.externals;

	return require(`./config/webpack/${mode}.cjs`)(config, env);
};
