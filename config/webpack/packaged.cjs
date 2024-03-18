const {merge} = require("webpack-merge");
const webpack = require("webpack");
const banner = require("../template/banner.cjs");
const {EsbuildPlugin} = require("esbuild-loader");

const config = {
	entry: {
		"billboard.pkgd": ["core-js/stable", "./src/index.ts"],
		"billboard.pkgd.min": ["core-js/stable", "./src/index.ts"]
	},
	optimization: {
		usedExports: true,
		minimize: true,
		minimizer: [
			new EsbuildPlugin({
				include: /\.min\.js$/,
				target: "es2015",
				format: undefined
			})
		]
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
