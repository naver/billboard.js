const {merge} = require("webpack-merge");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const terserConfig = require("../terserConfig.cjs");
const banner = require("../template/banner.cjs");


const config = {
	entry: {
		"billboard.pkgd": ["core-js/stable", "./src/index.ts"],
		"billboard.pkgd.min": ["core-js/stable", "./src/index.ts"]
	},
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

	return merge(common, config);
};
