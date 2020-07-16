module.exports = function(api) {
	api.cache(true);

	const presets = [
		"@babel/typescript",
		[
			"@babel/env", {
				"targets": {
					"browsers": [
						"last 2 versions",
						"ie >= 9",
						"iOS >= 8"
					]
				},
				"modules": false,
				"loose": true,
				"useBuiltIns": false
			}
		]
	];

	const plugins = [
		[
			"@babel/plugin-transform-runtime", {
				"useESModules": true
			}
		],
		"@babel/plugin-proposal-class-properties",
		"@babel/proposal-object-rest-spread",
		"add-module-exports",
		"transform-inline-consecutive-adds",
		"transform-merge-sibling-variables",
		"transform-minify-booleans",
		"minify-constant-folding",
		"minify-dead-code-elimination",
		"minify-guarded-expressions",
		"minify-numeric-literals",
		"minify-simplify",
		"minify-type-constructors"
	];

	return {
		presets,
		plugins
	};
};
