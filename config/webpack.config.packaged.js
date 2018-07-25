const merge = require("webpack-merge");
const webpack = require("webpack");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const uglifyConfig = require("./uglify");
const banner = require("./banner");

const config = {
	entry: {
		"billboard.pkgd": "./src/core.js",
		"billboard.pkgd.min": "./src/core.js",
	},
	devtool: false,
	module: {
		rules: [
			{
				test: /(core\.js)$/,
				loader: StringReplacePlugin.replace({
					replacements: [{
						pattern: /import \"\.\/scss\/\w+\.scss\";/ig,
						replacement: () => ""
					}]
				})
			}
		],
	},
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
