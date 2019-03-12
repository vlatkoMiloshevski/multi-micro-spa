const path = require('path');

module.exports = function (...webpackDevConfigParams) {

	return {
		entry: {
			spaModule: 'spa-module.js'
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'src'),
			libraryTarget: 'umd',
			library: 'angularjs'
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					exclude: [path.resolve(__dirname, 'node_modules')],
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.js?$/,
					exclude: [path.resolve(__dirname, 'node_modules')],
					loader: 'babel-loader',
				},
				{
					test: /\.html$/,
					exclude: /node_modules|svelte/,
					loader: 'html-loader',
				},
			],
		},
		resolve: {
			"extensions": [
				".js"
			],
			modules: [
				__dirname,
				'node_modules',
			],
		},
		devtool: 'source-map',
		externals: [
		],
		plugins: [

		],
	};
}