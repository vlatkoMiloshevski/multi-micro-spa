const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackStripLoader = require('strip-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
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
            }
        ].concat([
            {
                test: [/\.ts$/, /\.js$/],
                exclude: /node_modules/,
                loader: WebpackStripLoader.loader('console.log')
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: '@ngtools/webpack'
            }
        ])
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});