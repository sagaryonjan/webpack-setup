let webpack = require('webpack');
let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const WebpackConfig = require('./webpack.config.base');
const webpackPath = require('./../path.json');

/*Vendor is used for Everyone !*/
module.exports = merge(WebpackConfig, {
    output: {
        path: path.resolve(__dirname, webpackPath.prod),
        filename: '[name].[hash].js',
        publicPath: './public'
    },
    plugins: [

        new CleanWebpackPlugin(webpackPath.prod),

        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
            },
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi], // skip pre-minified libs
        }),

    ],
});
