const {merge} = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const banner = require("../template/banner.cjs");
const {EsbuildPlugin} = require("esbuild-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
	entry: {
		"billboard.min": [
			"./src/scss/billboard.scss",
			"./src/index.ts"
		]
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		],
	},
	optimization: {
		usedExports: true,
		minimize: true,
		minimizer: [
			new EsbuildPlugin({
				include: /\.min\.(js|css)$/,
				target: "es2015",
				css: true,
				format: undefined
			})
		]
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "../dist")],
			verbose: true,
			dry: false
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		}),
		new webpack.BannerPlugin({
			banner: banner.production,
			entryOnly: true
		})
	]
};

module.exports = common => merge(common, config);
