const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");

const config = {
	devtool: "inline-source-map",
	devServer: {
		publicPath: "/dist/",
		stats: "minimal"
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				}]
			}
		]
	},
	plugins: [
		new WriteFilePlugin()
	],
};

module.exports = common => merge.smart(common, config);
