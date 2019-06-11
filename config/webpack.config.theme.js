const merge = require("webpack-merge");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const WebpackCleanPlugin = require("webpack-clean");
const banner = require("./banner");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const srcPath = "./src/scss/theme/";
const distPath = path.resolve(__dirname, "../dist/theme/");
const tmpExt = "tmp";
const rx = /\.scss$/;

// construct entry point
const entry = {};

fs.readdirSync(path.resolve(__dirname, `.${srcPath}`)).forEach(file => {
	if (rx.test(file)) {
		const key = file.replace(rx, "");
		const dist = srcPath + file;

		entry[key] = dist;
		entry[`${key}.min`] = dist;
	}
});

const config = {
	entry,
	output: {
		path: distPath,
		filename: `[name].${tmpExt}`
	},
	module: {
		rules: [
			{
				test: rx,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		],
	},
	devtool: false,
	plugins: [
		// clean before build
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [distPath],
			verbose: true,
			dry: false,
			beforeEmit: true
		}),

		// clean after build
		new WebpackCleanPlugin(Object.keys(entry).map(v => `${v}.${tmpExt}`), {
			basePath: distPath
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.min\.css$/,
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
		}),
		new webpack.BannerPlugin({
			banner: banner.production,
			entryOnly: true
		})
	]
};

module.exports = common => merge.smartStrategy({
	entry: "replace",
	output: "replace",
	module: "replace"
})(common, config);
