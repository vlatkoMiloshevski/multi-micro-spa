const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const StripLoader = require('strip-loader');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", 'css-loader']
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ].concat([     
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: '@ngtools/webpack'
            }
        ])
    }
});