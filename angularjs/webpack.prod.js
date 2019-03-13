const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
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
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
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
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				// Eliminate comments
				output: {
					comments: false,
				},
				// Compression specific options
				compress: {
					// remove warnings
					warnings: false,
					// Drop console statements
					drop_console: true
				}
			}
		})
	],
})
