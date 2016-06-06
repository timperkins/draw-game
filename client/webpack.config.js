var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: './build',
		filename: 'js/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, { 
			test: /\.less$/, 
			loader: "style!css!less"
		}]
	},
	plugins: [
		new CopyWebpackPlugin([{ from: './src/index.html' }])
	]
};