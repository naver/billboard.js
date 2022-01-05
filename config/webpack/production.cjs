const {merge} = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const terserConfig = require("../terserConfig.cjs");
const banner = require("../template/banner.cjs");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

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
			new TerserPlugin(terserConfig),
			new CssMinimizerPlugin({
				test: /\.min\.css$/i,
				minimizerOptions: {
					preset: [
						"default", {
							discardComments: true
						}
					]
				}
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
		}),
		new ESLintPlugin({
			failOnError: true,
			formatter: "stylish"
		})
	]
};

module.exports = common => merge(common, config);
