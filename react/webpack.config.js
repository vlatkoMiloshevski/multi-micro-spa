const path = require('path');

module.exports = {
    entry: {
        spaModule: './src/spa-module.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'release'),
        libraryTarget: 'amd',
        library: 'reactApp'
    },

    module: {
        rules: [
            {
                test: /\.js/,
                use: ['babel-loader?cacheDirectory'],
                exclude: /node_modules/,
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
