const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackStripLoader = require('strip-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [].concat([
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

    ]
});