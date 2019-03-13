const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(common, {
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
				test: /\.(jpe?g|png|webp|gif|otf|ttf|woff2?|ani)$/,
				loader: "url-loader",
				options: {
					name: "[name].[ext]",
					limit: 5000,
					publicPath: '/angularjs/'
				}
			},
			{
				test: /\.(eot|svg|cur)$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					publicPath: '/angularjs/'
				}
			},
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
})