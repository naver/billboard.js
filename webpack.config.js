var pkg = require("./package.json");
var path = require("path");
var webpack = require("webpack");
var StringReplacePlugin = require("string-replace-webpack-plugin");
var config = {
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
		rules: [{
				test: /(\.js)$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
			},
			{
				test: /(\.js)$/,
				loader: StringReplacePlugin.replace({
					replacements: [{
						pattern: /#__VERSION__#/ig,
						replacement: function (match, p1, offset, string) {
							return pkg.version;
						}
					}]
				})
			}
		]
	},
	plugins: [
		new StringReplacePlugin(),
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};

module.exports = function(env) {
	env = env || "development";
	return require("./config/webpack.config." + env + ".js")(config);
};
