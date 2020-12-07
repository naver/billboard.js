const pkg = require("./package.json");
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackBar = require("webpackbar");

const config = {
	entry: {
		billboard: [
			"./src/scss/billboard.scss",
			"./src/index.ts"
		]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		chunkFilename: "[name].bundle.js",
		filename: "[name].js",
		libraryTarget: "umd",
		umdNamedDefine: true,
		globalObject: "this"
	},
	externals: ({context, request}, callback) => {
		// every 'd3-*' import, will be externally required as their name except root as 'd3'
		if (/^d3-/.test(request)) {
			return callback(null, {
				commonjs: request,
				commonjs2: request,
				amd: request,
				root: "d3"
			});
		}

		callback();
	},
	devtool: "cheap-module-source-map",
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{
				test: /(\.[jt]s)$/,
				loader: "babel-loader",
				exclude: {
					and: [/node_modules/],
					not: [/(d3\-.*)$/]
				}
			},
			{
				test: /(\.[jt]s)$/,
				loader: "string-replace-loader",
				options: {
					search: /__VERSION__/ig,
					replace: pkg.version
				}
			}
		]
	},
	optimization: {
		usedExports: true
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new WebpackBar()
	],
	node: false,
	stats: "minimal",
	mode: "none",
	devServer: {
		// https://github.com/webpack/webpack-dev-server/issues/1604
		disableHostCheck: true
	}
};

module.exports = () => {
	const env = process.env;
	let mode = "development";

	if (env.NODE_ENV) {
		mode = env.NODE_ENV;
	}

	env.ANALYZER && config.plugins.push(
		new BundleAnalyzerPlugin()
	);

	if (env.NIGHTLY) {
		pkg.version = env.NIGHTLY;
	}

	if (env.VERSION) {
		pkg.version = env.VERSION;
	}

	mode === "packaged" && delete config.externals;

	return require(`./config/webpack/${mode}.js`)(config, env);
};
