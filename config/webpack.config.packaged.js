const merge = require("webpack-merge");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const uglifyConfig = require("./uglify");
const banner = require("./banner");

const config = {
	entry: {
		"billboard.pkgd": ["core-js/stable", "regenerator-runtime/runtime", "./src/core.js"],
		"billboard.pkgd.min": ["core-js/stable", "./src/core.js"]
	},
	devtool: false,
	plugins: [
		new UglifyJSPlugin(uglifyConfig),
		new webpack.BannerPlugin({
			banner: banner.production + banner.packaged,
			entryOnly: true
		})
	]
};

module.exports = common => {
	// reset base entry
	common.entry = {};

	return merge.smart(common, config);
};
