const path = require('path');
const webpack = require('webpack');

module.exports = function (...webpackDevConfigParams) {

	return {
		entry: {
			spaModule: 'spa-module.js'
		},
		output: {
			filename: `[name].js`,
			path: path.resolve(__dirname, 'release'),
			chunkFilename: `[name].bundle.js`,
			libraryTarget: 'umd',
			library: 'angularjs'
		},
		module: {
			rules: [
				{
					test: /\.js?$/,
					exclude: [path.resolve(__dirname, 'node_modules')],
					loader: 'babel-loader'
				},
				{
					test: /\.html$/,
					exclude: [path.resolve(__dirname, 'node_modules')],
					loader: 'html-loader',
				},
				{
					test: /\.css$/,
					use: [
						'style-loader', // the order is important. it executes in reverse order !
						'css-loader' // this will load first !
					]
				}
			]
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
		devtool: 'none',
		externals: [
		],
		plugins: [
		],

	};
}