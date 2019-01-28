const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: 'src/spa-bootstrapper-module.js'
    },
    output: {
        publicPath: '',
        filename: '[name].js',
        path: path.resolve(__dirname, 'release'),
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
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
            { from: path.resolve(__dirname, 'src/style.css') },
            { from: path.resolve(__dirname, 'libs/system.js') },
        ]),
        new CleanWebpackPlugin(['release'])
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
            "/angular6": {
                target: "http://localhost:9006",
                pathRewrite: { "^/angular6": "" }
            },
            "/ag6doubler": {
                target: "http://localhost:9066",
                pathRewrite: { "^/ag6doubler": "" }
            },
            "/react": {
                target: "http://localhost:9009",
                pathRewrite: { "^/react": "" }
            },
            "/prebuypacing": {
                target: "http://localhost:9099",
                pathRewrite: { "^/prebuypacing": "" }
            },
            "/auth": {
                target: "http://localhost:9091",
                pathRewrite: { "^/auth": "" }
            },
            '/api': {
                target: "http://localhost:7000",
            },
        }
    }
};
