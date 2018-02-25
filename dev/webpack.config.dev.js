/* global require,module */
let webpack = require('webpack');
let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const WebpackConfig = require('./webpack.config.base');
const webpackPath = require('./../path.json');
/*Vendor is used for Everyone !*/
module.exports = merge(WebpackConfig, {
    output: {
        path: path.resolve(__dirname, webpackPath.dev),
        filename: '[name].[hash].js',
        publicPath: './public/dev',
        chunkFilename: "[name].[chunkhash].js"
    },
    plugins: [
        new CleanWebpackPlugin(webpackPath.dev),
        new webpack.HotModuleReplacementPlugin(),
    ],
});

