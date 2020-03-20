module.exports = {
	test: /\.min\.js$/,
	terserOptions: { // https://github.com/terser/terser#minify-options
		ecma: 5,
		ie8: false,
		output: {
			beautify: false,
			comments: /^\/*!/,
		},
		warnings: false,
		dead_code: true,
		unused: true
	},
	extractComments: false,
	cache: true,
	parallel: true,
	sourceMap: true
};
