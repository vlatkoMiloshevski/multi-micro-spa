const path = require('path');
const WebpackStripLoader = require('strip-loader');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


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
                test: /\.css$/,
                use: ["to-string-loader", 'css-loader']
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
            },
            {
                exclude: [
                    path.join(process.cwd(), "src/styles.scss")
                ],
                test: /\.scss$|\.sass$/,
                use: ["exports-loader?module.exports.toString()", "css-loader", "sass-loader"]
            },
            {
                include: [
                    path.join(process.cwd(), "src/styles.scss")
                ],
                test: /\.scss$|\.sass$/,
                use: ["style-loader", "css-loader", "sass-loader"]
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
            skipCodeGeneration: false,
            platform: 0,
            hostReplacementPaths: {
                "environments/environment.ts": "environments/environment.ts"
            }
        })
    ]
}