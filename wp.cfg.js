const path = require('path');
// const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

// var Visualizer = require('webpack-visualizer-plugin');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    //devtool: 'inline-source-map', // or 'inline-source-map'
    entry: {
        'index': path.resolve(__dirname, 'src/index'),
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: path.join(__dirname, '/dist'),
        publicPath: '/dist/',
    },

    resolve: {
    // modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        root: path.resolve('src/node_modules'),
        extensions: ['', '.web.js', '.jsx', '.js', '.json'],
    // modulesDirectories: ['node_modules', './src'],
    },

    module: {
        noParse: [/moment.js/],
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                include: /src/,
                loader: 'babel',
                query: {
                    plugins: [
                        ['transform-runtime', { polyfill: false }],
                        ['import', [{ 'style': 'css', 'libraryName': 'antd-mobile' }]],
                        // 'transform-decorators-legacy'
                    ],
                    presets: ['es2015', 'stage-0', 'react'],
                },
            },
            { test: /\.(jpg|png)$/,
                loader: 'url?limit=8192',
                include: /src/,
            },
            // svg-sprite for antd-mobile@1.0
            { test: /\.(svg)$/i,
                loader: 'svg-sprite',
                extract:true, 
                include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
                    path.resolve(__dirname, 'src/static/icon'),  // 自己私人的 svg 存放目录
                ],
            },
            // { test: /\.css$/, loader: 'style!css' }, // 把css处理成内联style，动态插入到页面
            {
                test: /\.less$/i,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less') ,
                exclude: /node_modules/,
                include: /src/,
            },
            {
                test: /\.css$/i,
                loader: ExtractTextPlugin.extract('style', 'css!postcss') ,
            },
        ],
    },
    postcss: [
        autoprefixer({
            browsers: ['iOS >= 7', 'Android >= 2'],
            // browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
        pxtorem({ rootValue: 100, propWhiteList: [] }),
    ],
    // externals: {
    //   "react": "React",
    //   "react-dom": "ReactDOM"
    // },
    plugins: [
 	 new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: '../index.html', //生成的html存放路径，相对于 path
            template: './src/index.tpl.html', //html模板路径
            inject: 'body',
            hash: true,
        }),

    
        // new webpack.optimize.CommonsChunkPlugin('shared.js'),
        // new webpack.optimize.CommonsChunkPlugin({
        //   // minChunks: 2,
        //   name: 'shared',
        //   filename: 'shared.js'
        // }),
        new ExtractTextPlugin('[name].css', { allChunks: true }),

    // new Visualizer(),
    // new BundleAnalyzerPlugin(),
    
    ],

};