module.exports = {
	include: /\.min\.js$/,
	beautify: false,
	mangle: {
		screw_ie8: true,
		keep_fnames: true
	},
	compress: {
		screw_ie8: true,
		warnings: false
	},
	output: {
		screw_ie8: false
	},
	comments: false,
	sourceMap: true
};
