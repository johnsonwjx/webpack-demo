var
    path = require("path"),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    src = './app/js/',
    dist = 'dist';

module.exports = {
    entry: {
        "plan": src + "/plan/runtime.js",
        "plan-edit": src + '/plan/edit.js',
        "planfinish": src + "/planfinish/runtime.js",
        "planfinish-edit": src + '/planfinish/edit.js'
    },
    output: {
        path: path.join(__dirname, dist + '/js'),
        publicPath: dist,
        filename: "[name].js",
        chunkFilename: "[name].chunk[id].js"
    },
    resolve: {
        root: path.resolve('./app'),
        extensions: ['', '.coffee', '.js']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 'Infinity'
        }),
        new ExtractTextPlugin("../css/[name].css", {
            allChunks: true
        }), new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        // noParse: /node_modules\/quill\/dist\/quill.js/,
        //加载器配置
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style", "css")
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style", "css!sass")
        }, {
            test: /\.html/,
            loader: "html-loader"
        }]
    }
};
