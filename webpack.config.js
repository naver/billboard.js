const pkg = require("./package.json");
const path = require("path");
const webpack = require("webpack");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const Stylish = require("webpack-stylish");
const WebpackMonitor = require("webpack-monitor");
const WebpackBar = require("webpackbar");

// get datetime as string
function getDatetime() {
	// convert to 2 digit
	const get2digit = val => (String(val).length === 1 ? `0${val}` : val);

	// get 'YYYY-MM-DD' formatted value
	const date = new Date();

	return [
		date.getFullYear(),
		get2digit(date.getMonth() + 1),
		get2digit(date.getDate()),
		get2digit(date.getHours()),
		get2digit(date.getMinutes()),
		get2digit(date.getSeconds())
	].join("");
}

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
	let mode = "development";

	if (env) {
		if (env.mode) {
			mode = env.mode;
		}

		env.monitor && config.plugins.push(
			new WebpackMonitor({
				launch: true
			})
		);

		if (env.nightly) {
			pkg.version = pkg.version.replace(/snapshot/, `nightly-${getDatetime()}`);
		}
	}

	mode === "packaged" && delete config.externals;

	return require(`./config/webpack.config.${mode}.js`)(config);
};
