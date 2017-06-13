module.exports = function(config) {
	const karmaConfig = {
		frameworks: ["mocha", "chai", "sinon"],

		files: [
			"./node_modules/phantomjs-polyfill/bind-polyfill.js",
			"./node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js",
			"./node_modules/lite-fixture/index.js",
			"./node_modules/d3/build/d3.min.js",
			"./dist/billboard.css",
			"./spec/*-spec.js"
		],

		exclude: [
			// "./spec/[a-b]*-spec.js"
		],

		client: {
			mocha: {
				opts: "./mocha.opts"
			}
		},

		webpack: {
			devtool: "inline-source-map",
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: "babel-loader",
						options: {
							presets: [
								[
									"es2015",
									{
										"loose": true,
										"modules": false
									}
								]
							],
							plugins: ["add-module-exports"]
						}
					},
					{
						test: /\.scss$/,
						loaders: ["style-loader", "css-loader", "sass-loader"]
					}
				]
			}
		},

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"./spec/*-spec.js": config.coverage ? ["webpack"] : ["webpack", "sourcemap"]
		},

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [],

		reporters: ["mocha"],
		webpackMiddleware: {
			noInfo: true
		},

		// https://github.com/karma-runner/karma/blob/master/docs/config/01-configuration-file.md#browsernoactivitytimeout
		browserNoActivityTimeout: 15000
	};

	karmaConfig.browsers.push(config.chrome ? "Chrome" : "PhantomJS");

	if (config.coverage) {
		karmaConfig.reporters.push("coverage-istanbul");

		karmaConfig.coverageIstanbulReporter = {
			reports: ["text-summary", "html", "lcovonly"],
			dir: "./coverage"
		};

		karmaConfig.webpack.module.rules.unshift({
			test: /\.js$/,
			exclude: /(node_modules|test)/,
			loader: "istanbul-instrumenter-loader"
		});

		karmaConfig.singleRun = true;
	}

	config.set(karmaConfig);
};
