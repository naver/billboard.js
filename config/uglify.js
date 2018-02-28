module.exports = {
	test: /\.min\.js$/,
	uglifyOptions: {  // https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
		ecma: 5,
		ie8: true,
		output: {
			beautify: false,
			comments: false
		},
		keep_fnames: true,
		warnings: false,
		dead_code: true,
		unused: true
	},
	sourceMap: true
};
