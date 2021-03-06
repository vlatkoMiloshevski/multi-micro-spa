const path = require('path');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;


module.exports = {
    entry: {
        spaModule: 'src/spa-module.ts',
        store: 'src/store.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'release'),
        libraryTarget: 'umd',
        library: 'app6'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            {
                test: /\.(jpe?g|png|webp|gif|otf|ttf|woff2?|ani)$/,
                loader: "url-loader",
                options: {
                    name: "[name].[ext]",
                    limit: 10000,
                    publicPath: '/app6/'
                }
            },
            {
                test: /\.(eot|svg|cur)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    publicPath: '/app6/'
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", '.css'],
        modules: [
            __dirname,
            'node_modules'
        ]
    },
    externals: [],
    plugins: [
        new ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.resolve(__dirname, '../src')
        ),
        new AngularCompilerPlugin({
            mainPath: path.resolve(__dirname, 'src/spa-module.ts'),
            tsConfigPath: path.resolve(__dirname, 'tsconfig.json'),
            sourceMap: true,
            skipCodeGeneration: true,
            platform: 0,
            hostReplacementPaths: {
                "environments/environment.ts": "environments/environment.ts"
            }
        })
    ],
    devServer: {
        // execute custom middleware before all the other middlewares
        before: function (app, server) {
            console.log("before");
        },
        // execute custom middleware after all other middlewares
        after: function (app, server) {
            console.log("after");
        },
        // Response headers for dev mode
        headers: {
            'X-Custom-Webpack-Header': 'yes'
        }
    }
}