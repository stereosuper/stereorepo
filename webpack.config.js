const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = (env, options) => {
    const devMode = options.mode !== 'production';
    return {
        cache: false,
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            // Public path is important for dynamic imports. It'll help webpack to retrieve bundles by name and not by ids
            publicPath: '/',
            sourceMapFilename: '[file].map?[contenthash]',
            chunkFilename: '[name].js',
        },
        devServer: {
            contentBase: path.join(__dirname, 'src'),
            watchContentBase: true,
            hot: true,
            host: process.env.HOST || '0.0.0.0',
            port: process.env.PORT || 3000,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            compress: true,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(js|vue)$/,
                    enforce: 'pre',
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    test: /\.(css|sass|scss)$/,
                    use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: true,
                            },
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg|ttf|otf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                publicPath: '/',
                                name: '[path][name].[ext]',
                                emitFile: false,
                            },
                        },
                    ],
                },
            ],
        },
        node: {
            fs: 'empty', // avoids error messages
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Stéréorepo',
                template: './src/index.html',
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
        watch: devMode,
        devtool: devMode ? 'source-map' : '',
    };
};

module.exports = [config];
