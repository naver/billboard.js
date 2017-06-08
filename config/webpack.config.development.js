var merge = require("webpack-merge");
var WriteFilePlugin = require("write-file-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
	devtool: "inline-source-map",
	devServer: {
		publicPath: "/dist/"
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

module.exports = function(common) {
	return merge(common, config);
};
