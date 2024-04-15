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
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new WebpackBar()
	],
	node: false,
	stats: "minimal",
	mode: "none"
};

module.exports = () => {
	let mode = "development";

	if (env.NODE_ENV) {
		mode = env.NODE_ENV;
	}

	env.ANALYZER && config.plugins.push(
		new BundleAnalyzerPlugin()
	);

	mode === "packaged" && delete config.externals;

	return require(`./config/webpack/${mode}.cjs`)(config, env);
};
