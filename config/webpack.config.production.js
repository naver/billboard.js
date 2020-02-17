const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const terserConfig = require("./terserConfig");
const banner = require("./banner");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
	entry: {
		"billboard.min": [
			"./src/scss/billboard.scss",
			"./src/index.ts"
		],
		// "arc.min": "./src/resolver.arc.ts",
		// "axis.min": "./src/resolver.axis.ts"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(process.cwd(), "src"),
				exclude: /(node_modules)/,
				enforce: "pre",
				use: {
					loader: "eslint-loader",
					options: {
						failOnError: true,
						formatter: require("eslint/lib/cli-engine/formatters/stylish")
					}
				},
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
		usedExports: true,
		minimize: true,
		minimizer: [new TerserPlugin(terserConfig)]
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
