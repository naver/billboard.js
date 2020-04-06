// file extension to be tested
const fileExtensions = /(\.[jt]s)$/;

module.exports = function(config) {
	const karmaConfig = {
		frameworks: ["mocha", "chai", "sinon"],
		files: [
			"./node_modules/lite-fixture/index.js",
			"./node_modules/hammer-simulator/index.js",
			"./spec/assets/hammer-simulator.run.ts",
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
			devtool: "inline-source-map",
			mode: "development",
			stats: "none",
			resolve: {
				extensions: [".ts", ".js"]
			},
			module: {
				rules: [
					{
						test: fileExtensions,
						exclude: /node_modules/,
						use: {
							loader: "babel-loader",
							options: {
								presets: [
									"@babel/typescript",
									"@babel/env"
								],
								plugins: [
									"add-module-exports"
								]
							}
						}
					}
				]
			},
		},

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"./src/scss/billboard.scss": ["scss"],
			"./test/**/*-spec.ts": config.coverage ? ["webpack"] : ["webpack", "sourcemap"],
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

	karmaConfig.browsers.push(config.chrome ? "Chrome" : "ChromeHeadless");

	if (config.coverage) {
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
				query: {
					esModules: true
				}
			}
		});

		karmaConfig.singleRun = true;
	}

	config.set(karmaConfig);
};
