module.exports = {
	test: /\.min\.js$/,
	terserOptions: { // https://github.com/terser/terser#minify-options
		ecma: 5,
		ie8: false,
		compress: { // https://github.com/terser/terser#compress-options
			dead_code: true,
			unused: true
		},
		output: {
			beautify: false,
			comments: /^\/*!/,
		},
		warnings: false
	},
	extractComments: false,
	parallel: true
};
