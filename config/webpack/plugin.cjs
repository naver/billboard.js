const {mergeWithCustomize, customizeObject} = require("webpack-merge");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const terserConfig = require("../terserConfig.cjs");
const banner = require("../template/banner.cjs");

const srcPath = "./src/Plugin/";
const distPath = path.resolve(__dirname, "../../dist/plugin/");
const prefix = require("../const.json").pluginPrefix;

// construct entry point
const entry = {};

fs.readdirSync(path.resolve(__dirname, `../../${srcPath}`), {
	withFileTypes: true
})
	.filter(dirent => dirent.isDirectory())
	.forEach(({name}) => {
		entry[name] = `${srcPath}${name}/index.ts`;
	});

const config = {
	entry,
	output: {
		path: distPath,
		filename: `${prefix}-[name].js`,
		library: ["bb", "plugin", "[name]"],
		libraryExport: "default",
		publicPath: "/dist/plugin"
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: banner.production + banner.plugin,
			entryOnly: true
		})
	],
};

module.exports = (common, env) => {
	const MODE = env?.MODE;

	if (env && MODE === "min") {
		config.output.filename = config.output.filename.replace(".js", ".min.js");

		config.optimization = {
			usedExports: true,
			minimize: true,
			minimizer: [new TerserPlugin(terserConfig)]
		};
	} else if (env && MODE === "pkgd") {
		delete common.externals;

		config.output.path = `${distPath}/pkgd`;

		for (const key in config.entry) {
			config.entry[key] = ["core-js/stable", config.entry[key]];
		}
	} else {
		config.plugins.push(new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [distPath],
			verbose: true,
			dry: false,
			beforeEmit: true
		}));
	}

	return mergeWithCustomize({
		customizeObject: customizeObject({
			entry: "replace",
			output: "append"
		})
	})(common, config);
};
