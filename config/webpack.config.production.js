var merge = require("webpack-merge");
var webpack = require("webpack");
var path = require("path");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var uglifyConfig = require("./uglify");
var banner = require("./banner");
var pkg = require("../package.json");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
	entry: {
		"billboard": "./src/core.js",
		"billboard.min": "./src/core.js",
	},
	externals: [{
		"d3": "d3"
	}],
	module: {
		rules: [{
				test: /(\.js)$/,
				loader: "eslint-loader",
				include: path.resolve(process.cwd(), "src"),
				exclude: /(node_modules)/,
				enforce: "pre"
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: "css-loader",
					}, {
						loader: "sass-loader",
					}],
					fallback: "style-loader",
				}),
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin([path.resolve(__dirname, "../dist")], {
			root: path.resolve(__dirname, "../"),
			verbose: true,
			dry: false
		}),
		new ExtractTextPlugin("[name].css"),
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

module.exports = function(common) {
	return merge.smart(common, config);
};
