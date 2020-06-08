const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");
const plugin = require("./plugin")();

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
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					},
					{
						loader: "css-loader" // translates CSS into CommonJS
					},
					{
						loader: "sass-loader" // compiles Sass to CSS
					}
				]
			}
		]
	},
	plugins: [new WriteFilePlugin()]
};

module.exports = (common, env) => {
	if (env.PLUGIN) {
		config.entry = plugin.entry;
		config.output = plugin.output;
		config.externals = plugin.externals;
	}

	return env.PLUGIN ? merge.strategy({
		entry: "replace",
		output: "replace"
	})(common, config) : merge.smart(common, config);
};
