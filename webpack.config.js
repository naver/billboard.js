const pkg = require("./package.json");
const path = require("path");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const ShakePlugin = require("webpack-common-shake").Plugin;

const config = {
	entry: {
		"billboard": "./src/core.js",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		libraryTarget: "umd",
		umdNamedDefine: true,
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
		new ShakePlugin()
	]
};

module.exports = env =>
	require(`./config/webpack.config.${env || "development"}.js`)(config);
