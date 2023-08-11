/* eslint-disable */
// @ts-nocheck
// import {webpack} from "webpack";
// import {platform} from "os";

const webpack = require("webpack");
const isWin = require("os").platform() === "win32";

// file extension to be tested
const fileExtensions = /(\.[jt]s)$/;

module.exports = function(config) {
	const {TEST_TYPE: type = false} = process.env;
	const isCoverage = type === "coverage";
	const isChrome = type === "chrome";

	const karmaConfig = {
		frameworks: ["mocha", "chai", "sinon", "webpack"],
		files: [
			"./node_modules/lite-fixture/index.js",
			"./node_modules/hammer-simulator/index.js",
			"./test/assets/hammer-simulator.run.js",
			"./src/scss/billboard.scss",
			"./test/assets/common.css",
			"./test/**/*-spec.ts",
			{
				pattern: "./test/assets/data/*",
				watched: false,
				included: false,
				served: true
			}
		],

		client: {
			mocha: {
				opts: "./mocha.opts"
			}
		},

		webpack: {
			devtool: "cheap-module-source-map",
			mode: "development",
			stats: "none",
			resolve: {
				extensions: [".ts", ".js"]
			},
			target: ["web", "es5"],
			module: {
				rules: [
					{
						test: /(\.[jt]s)$/,
						loader: "babel-loader",
						exclude: {
							and: [/node_modules/],
							not: [/(d3\-.*)$/, /internmap/]
						}
					}
				]
			},
			optimization: {
				usedExports: true
			},
			plugins: isWin ? [
				new webpack.NormalModuleReplacementPlugin(
					/module\/util/i, function(resource) {
						resource.request = resource.request.replace("module/util", "../test/assets/module/util");
					}
				),
				new webpack.NormalModuleReplacementPlugin(
					/fake/i, function(resource) {
						if (/test\\assets\\module/i.test(resource.context)) {
							resource.request = "../../../src/module/util";
						}
					}
				)
			] : [
				new webpack.NormalModuleReplacementPlugin(
					/module\/util\.ts/i, "../../test/assets/module/util.ts"
				),
				new webpack.NormalModuleReplacementPlugin(
					/fake\.ts/i, "../../../src/module/util.ts"
				)
			]
		},

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"./src/scss/billboard.scss": ["scss"],
			"./test/**/*-spec.ts": isCoverage ? ["webpack"] : ["webpack", "sourcemap"],
		},

		scssPreprocessor: {
			options: {
				sourceMap: true,
				outputStyle: "expanded",
			}
		},

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [],

		reporters: ["mocha"],
		colors: true,
		webpackMiddleware: {
			logLevel: "error"
		},

		// https://github.com/karma-runner/karma/blob/master/docs/config/01-configuration-file.md#browsernoactivitytimeout
		browserNoActivityTimeout: 50000
	};

	karmaConfig.browsers.push(isChrome ? "Chrome" : "ChromeHeadless");

	if (isCoverage) {
		karmaConfig.reporters.push("coverage-istanbul");

		karmaConfig.coverageIstanbulReporter = {
			reports: ["text-summary", "html", "lcovonly"],
			dir: "./coverage"
		};

		karmaConfig.webpack.module.rules.unshift({
			test: fileExtensions,
			exclude: /(node_modules|test)/,
			use: {
				loader: "istanbul-instrumenter-loader",
				options: {
					esModules: true
				}
			}
		});

		karmaConfig.singleRun = true;
	}

	config.set(karmaConfig);
};
