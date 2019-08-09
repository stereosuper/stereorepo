const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const TerserJSPlugin = require('terser-webpack-plugin');

const config = (env, options) => {
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
        new CopyWebpackPlugin([{ from: 'src/scss/', to: 'scss' }])
    ];

    // Optimization
    let optimization = {
        minimizer: [new TerserJSPlugin({})]
    };

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js'
            // Public path is important for dynamic imports. It'll help webpack to retrieve bundles by name and not by ids
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
