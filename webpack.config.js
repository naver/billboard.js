const pkg = require("./package.json");
const path = require("path");
const webpack = require("webpack");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackBar = require("webpackbar");

const config = {
	entry: {
		billboard: [
			"./src/scss/billboard.scss",
			"./src/index.ts"
		],
		// arc: "./src/resolver.arc.ts",
		// axis: "./src/resolver.axis.ts"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		chunkFilename: "[name].bundle.js",
		filename: "[name].js",
		libraryTarget: "umd",
		umdNamedDefine: true,
		globalObject: "this"
	},
	externals: (context, request, callback) => {
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
					test: /node_modules/,
					not: [/(d3\-.*)$/]
				}
			},
			{
				test: /(\.[jt]s)$/,
				loader: StringReplacePlugin.replace({
					replacements: [
						{
							pattern: /#__VERSION__#/ig,
							replacement: () => pkg.version
						}
					]
				})
			}
		]
	},
	optimization: {
		usedExports: true
	},
	plugins: [
		new StringReplacePlugin(),
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

	return require(`./config/webpack.config.${mode}.js`)(config, env);
};
