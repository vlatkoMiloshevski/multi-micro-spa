const path = require('path');

module.exports = {
    entry: {
        spaModule: './src/spa-module.js',
        store: './src/store.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'release'),
        libraryTarget: 'amd',
        library: 'react'
    },

    module: {
        rules: [
            {
                test: /\.js/,
                use: ['babel-loader?cacheDirectory'],
                exclude: /node_modules/,
            },
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
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/react/',
                        }
                    }
                ]
            },

        ],
    },

    mode: 'development',

    devtool: 'eval-source-map'
};
