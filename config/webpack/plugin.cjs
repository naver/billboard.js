const {mergeWithCustomize, customizeObject} = require("webpack-merge");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const banner = require("../template/banner.cjs");
const {EsbuildPlugin} = require("esbuild-loader");

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
	]
};

module.exports = (common, env) => {
	const mode = env?.MODE;

	if (env && /^pkgd/.test(mode)) {
		delete common.externals;

		config.output.path = `${distPath}/pkgd`;

		for (const key in config.entry) {
			config.entry[`${key}.pkgd`] = ["core-js/stable", config.entry[key]];
			delete config.entry[key];
		}
	} else if (!mode) {
		config.plugins.push(new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [distPath],
			verbose: true,
			dry: false,
			beforeEmit: true
		}));
	}

	// minify for plugin & plugin pkgd
	if (/min$/.test(mode)) {
		config.mode = "production";
		config.output.filename = config.output.filename.replace(".js", ".min.js");

		config.optimization = {
			usedExports: true,
			minimize: true,
			minimizer: [
				new EsbuildPlugin({
					target: "es2015",
					format: undefined
				})
			]
		};
	}

	return mergeWithCustomize({
		customizeObject: customizeObject({
			entry: "replace",
			output: "append"
		})
	})(common, config);
};
