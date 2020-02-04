const merge = require("webpack-merge");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const terserConfig = require("./terserConfig");
const banner = require("./banner");

const config = {
	entry: {
		"billboard.pkgd": ["core-js/stable", "regenerator-runtime/runtime", "./src/index.ts"],
		"billboard.pkgd.min": ["core-js/stable", "./src/index.ts"]
	},
	devtool: false,
	optimization: {
		usedExports: true,
		minimize: true,
		minimizer: [new TerserPlugin(terserConfig)]
	},
	plugins: [
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
