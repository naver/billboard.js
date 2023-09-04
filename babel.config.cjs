module.exports = function(api) {
	api.cache(true);

	const presets = [
		"@babel/typescript",
		[
			"@babel/preset-env", {
				"targets": {
					"browsers": [
						"last 2 versions",
						"ie >= 9",
						"iOS >= 8"
					]
				},
				"modules": false,
				"loose": true,
				"useBuiltIns": false,
				exclude: ["@babel/plugin-transform-block-scoping"]
			}
		]
	];

	const plugins = [
		["@babel/plugin-transform-runtime"],
		[
			"@babel/plugin-proposal-class-properties", {
				"loose": true
			}
		], [
			"@babel/plugin-transform-arrow-functions", {
				"spec": true
			}
		],
		"@babel/proposal-object-rest-spread",
		"add-module-exports",
		"transform-inline-consecutive-adds",
		"transform-merge-sibling-variables",
		"transform-minify-booleans",
		"minify-constant-folding",
		"minify-dead-code-elimination",
		"minify-guarded-expressions",
		"minify-numeric-literals",
		"minify-type-constructors"
	];

	return {
		presets,
		plugins
	};
};
