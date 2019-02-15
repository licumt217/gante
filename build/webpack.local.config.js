var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var path = require('path')
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var projectRoot = path.resolve(__dirname, '../');
// add hot-reload related code to entry chunks
//Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
//})
var merged=merge(baseWebpackConfig, {
    // // eval-source-map is faster for development
    // devtool: '#eval-source-map',
    // devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.local.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage

        //此三个插件用于页面热加载和实时更新
        //new webpack.optimize.OccurenceOrderPlugin(),//webpack 1.x版本需要
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            // filename: 'index.html',
            template: path.resolve(projectRoot, 'src/index.html'),
            // inject: true
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress:{
        //         dead_code:true,
        //         drop_debugger:true,
        //         toplevel:true,
        //         drop_console:true,
        //
        //     }
        // })
    ]
});
console.log(merged)

module.exports = merged;
