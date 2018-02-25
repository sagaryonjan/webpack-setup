const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const WebpackNotifierPlugin = require('webpack-notifier');
const alias = require('../path/alias');
const entry = require('../path/entry');

module.exports = {
    entry,
    module: {
        rules: [
            {
                test: /\.s[ac]ss/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['vue-hot-reload-loader', 'babel-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-hot-reload-loader', 'vue-loader'],
            }
        ],
        loaders: [
            {test: /\.js$/, exclude: /(node_modules|dist)/, loader: "babel?presets[]=es2015"},
            {test: /\.css$/, loader: "style!css"},
            {test: /\.less$/, loader: "style!css!less"},
            {test: /\.html$/, loader: "html"},
            {test: /\.(eot|svg|ttf)$/, loader: "file"},
            {test: /\.(png|jpg|gif)$/, loader: "url"},
            {test: /\.woff2?$/, loader: "url?limit=10000&minetype=application/font-woff"}
        ]
    },
    resolve: {
        alias,
        extensions: ['*', '.js', '.vue', '.json']
    },

    plugins: [

        new WebpackNotifierPlugin({ alwaysNotify: true }),

        new ProgressBarPlugin({
            format: `  build [:bar] ${chalk.green.bold(':percent')}  (:elapsed seconds) :msg`,
            clear: false,
            summaryContent: true,
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        new ExtractTextPlugin('[name].[hash].css'),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),

        new ManifestPlugin(),

        new webpack.optimize.OccurrenceOrderPlugin(),

    ],
};
