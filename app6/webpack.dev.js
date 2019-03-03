const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [].concat([
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: '@ngtools/webpack'
            }
        ])
    }
});