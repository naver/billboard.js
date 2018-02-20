const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = {
	devtool: "inline-source-map",
	devServer: {
		publicPath: "/dist/",
		stats: "minimal"
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: "css-loader",
				}, {
					loader: "sass-loader",
				}],
				fallback: "style-loader",
			}),
		}]
	},
	plugins: [
		new ExtractTextPlugin("[name].css"),
		new WriteFilePlugin(),
	],
};

module.exports = common => merge(common, config);
