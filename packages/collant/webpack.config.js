const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = () => {
    // Rules
    const rules = [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }
    ];

    // Plugins
    const plugins = [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{ from: 'src/scss/', to: '' }])
    ];

    // Optimization
    let optimization = {
        minimizer: []
    };

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
            library: 'Collant',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        devtool: '',
        module: {
            rules
        },
        node: {
            fs: 'empty' // avoids error messages
        },
        plugins,
        optimization
    };
};

module.exports = config;
