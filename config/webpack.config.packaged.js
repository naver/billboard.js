var merge = require("webpack-merge");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var uglifyConfig = require("./uglify");
var banner = require("./banner");

var config = {
	entry: {
		"billboard.pkgd": "./src/core.js",
		"billboard.pkgd.min": "./src/core.js",
	},
	devtool: false,
	module: {
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: "css-loader"
			}, {
				loader: "sass-loader"
			}]
		}],
	},
	plugins: [
		new UglifyJSPlugin(uglifyConfig),
		new webpack.BannerPlugin({
			banner: banner.production + banner.packaged,
			entryOnly: true
		})
	]
};

module.exports = function(common) {
	// reset base entry
	common.entry = {};

	return merge.smart(common, config);
};
