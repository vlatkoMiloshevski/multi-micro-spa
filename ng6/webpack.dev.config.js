const path = require('path');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = function (...webpackDevConfigParams ) {
    const devTypescriptLoader = [
        {
            test: /\.ts$/,
            loader: '@ngtools/webpack'
        }
    ];

    let env = webpackDevConfigParams.env;    
    const analyzeBundle = !!(env && env.analyzeBundle);
    const plugins = [
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
    ];

    if (analyzeBundle) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return {
        entry: {
            spaModule: 'src/spa-module.ts',
            store: 'src/store.ts'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'release'),
            libraryTarget: 'umd',
            library: 'ng6'
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
                        publicPath: '/ng6/'
                    }
                },
                {
                    test: /\.(eot|svg|cur)$/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: '/ng6/'
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
            ].concat(devTypescriptLoader)
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: true,
                    parallel: true,
                    uglifyOptions: {
                        ecma: 6,
                        warnings: false,
                        ie8: false,
                        mangle: true,
                        compress: {
                            pure_getters: true,
                            passes: 2
                        },
                        output: {
                            ascii_only: true,
                            comments: false
                        }
                    }
                })
            ]
        },
        resolve: {
            extensions: [".ts", ".js", '.css'],
            modules: [
                __dirname,
                'node_modules'
            ]
        },
        mode: 'development',
        devtool: 'inline-sourcemap',
        externals: [],
        plugins: plugins,
    }
};