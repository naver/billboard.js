const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const uglifyConfig = require("./uglify");
const banner = require("./banner");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
	entry: {
		"billboard.min": ["./src/scss/billboard.scss", "./src/core.js"]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "eslint-loader",
				include: path.resolve(process.cwd(), "src"),
				exclude: /(node_modules)/,
				enforce: "pre"
			},
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
		usedExports: true
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
		new UglifyJSPlugin(uglifyConfig),
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

module.exports = common => merge.smart(common, config);
