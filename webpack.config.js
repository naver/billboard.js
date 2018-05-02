const pkg = require("./package.json");
const path = require("path");
const webpack = require("webpack");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const Stylish = require("webpack-stylish");
const WebpackMonitor = require("webpack-monitor");
const WebpackBar = require("webpackbar");

const config = {
	entry: {
		billboard: "./src/core.js",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		libraryTarget: "umd",
		umdNamedDefine: true,
	},
	externals: (context, request, callback) => {
		// every 'd3-*' import, will be externally required as 'd3'
		if (/^d3-/.test(request)) {
			return callback(null, "d3");
		}

		callback();
	},
	devtool: "cheap-module-source-map",
	module: {
		rules: [
			{
				test: /(\.js)$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
			},
			{
				test: /(\.js)$/,
				loader: StringReplacePlugin.replace({
					replacements: [{
						pattern: /#__VERSION__#/ig,
						replacement: (match, p1, offset, string) => pkg.version
					}]
				})
			}
		]
	},
	plugins: [
		new StringReplacePlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new Stylish(),
		new WebpackBar()
	],
	stats: "minimal",
	mode: "none"
};

module.exports = env => {
	const mode = (env && env.mode) || "development";

	mode === "packaged" && delete config.externals;

	env && env.monitor && config.plugins.push(
		new WebpackMonitor({
			launch: true
		})
	);

	return require(`./config/webpack.config.${mode}.js`)(config);
};
