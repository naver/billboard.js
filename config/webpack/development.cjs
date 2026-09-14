const {merge, mergeWithCustomize, customizeObject} = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");
const plugin = require("./plugin.cjs")({});
const path = require("path");

const config = {
	devServer: {
		static: {
			directory: path.join(__dirname, "../../"),
			serveIndex: true,
			// watching the project root means watching node_modules too, which
			// exhausts the file descriptor limit (EMFILE) under chokidar 5.
			// Only the files the demo pages actually load need a watch.
			watch: {
				ignored: /[\\/](?:node_modules|\.git|coverage|dist|dist-esm|storybook-static)[\\/]/
			}
		},
		compress: true,
		hot: true,
		host: "127.0.0.1",
		liveReload: true
	},
	devtool: "cheap-module-source-map",
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
	} else {
		config.entry = {
			billboard: "./src/index.ts"
		};
	}

	return env.PLUGIN ? mergeWithCustomize({
		customizeObject: customizeObject({
			entry: "replace",
			output: "append"
		})
	})(common, config) : merge(common, config);
};
