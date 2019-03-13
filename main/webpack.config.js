const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: 'src/app/spa-bootstrapper-module.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'release'),
        libraryTarget: 'umd',
        library: 'main'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            },
            {
                test: /\.(jpe?g|png|webp|gif|otf|ttf|woff2?|ani)$/,
                loader: "url-loader",
                options: {
                    name: "[name].[ext]",
                    limit: 10000,
                    publicPath: '/main/'
                }
            },
            {
                test: /\.(eot|svg|cur)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    publicPath: '/main/'
                }
            }
        ],
    },
    node: {
        fs: 'empty',
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    plugins: [
        CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'src/index.html') },
            { from: path.resolve(__dirname, 'src/assets/images') },
            { from: path.resolve(__dirname, 'src/app') },
            { from: path.resolve(__dirname, 'src/style.css') },
            { from: path.resolve(__dirname, 'libs/system.js') },
        ])
    ],
    devtool: 'source-map',
    externals: [
    ],
    mode: 'development',
    devServer: {
        contentBase: './release',
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        // Proxy config for development purposes. 
        // In production, the webserver should be configured to do something similar.
        proxy: {
            "/angularjs": {
                target: "http://localhost:9001",
                pathRewrite: { "^/angularjs": "" }
            },
            "/app6": {
                target: "http://localhost:9006",
                pathRewrite: { "^/app6": "" }
            },
            "/react": {
                target: "http://localhost:9009",
                pathRewrite: { "^/react": "" }
            },
            '/api': {
                target: "http://localhost:9999",
            },
        }
    }
};
