const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (...webpackDevConfigParams) {

	return {
		entry: {
			spaModule: 'spa-module.js'
		},
		output: {
			filename: `bundle.js`,
			path: path.resolve(__dirname, 'test'),
			chunkFilename: `[name].bundle.js`,
			libraryTarget: 'umd',
			library: 'angularjs/src/'
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
			new UglifyJsPlugin({

			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify("production")
				}
			})
		],

	};
}