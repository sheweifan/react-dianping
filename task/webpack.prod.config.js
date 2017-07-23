
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var baseConfig = require('./webpack.base.config.js');
var merge = require('webpack-merge')
var Visualizer = require('webpack-visualizer-plugin'); // remove it in production environment
// 生成一个文件查看项目引用的所有模块的占比。
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractLESS = new ExtractTextPlugin('styles.css')

var cfg = require('./config.js').cfg;

var config = merge(baseConfig,{
	entry: {
		vendor: ['react','react-dom']
    },
	plugins:[
		// 样式
		extractLESS,
		new CleanWebpackPlugin([cfg.DIST_PATH]),
		//压缩代码
		new webpack.optimize.UglifyJsPlugin({
		  // 最紧凑的输出
		    beautify: false,
		    // 删除所有的注释
		    comments: false,
		    compress: {
		      // 在UglifyJs删除没有用到的代码时不输出警告  
		      warnings: false,
		      // 删除所有的 `console` 语句
		      // 还可以兼容ie浏览器
		      drop_console: true,
		      // 内嵌定义了但是只用到一次的变量
		      collapse_vars: true,
		      // 提取出出现多次但是没有定义成变量去引用的静态值
		      reduce_vars: true,
		    }
		}),	
		new Visualizer(),
		new BundleAnalyzerPlugin({
			defaultSizes: 'parsed',
			// generateStatsFile: true,
			statsOptions: { source: false },
		}),
		// 公共js
	    new webpack.optimize.CommonsChunkPlugin({
			names: 'vendor',  //name是提取公共代码块后js文件的名字。
	    }), 
	],
	module: {
		rules: [
			{
				test: /\.(less|css)$/i,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader', 'postcss-loader', 'less-loader'
					]
		        })
			},
        ]

	}
});
// console.log(config)

module.exports = config;
