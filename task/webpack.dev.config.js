
var webpack = require('webpack');
var baseConfig = require('./webpack.base.config.js');
var merge = require('webpack-merge')
var cfg = require('./config.js').cfg;

var config = merge(baseConfig,{
	devtool: 'source-map' ,
	// 配置静态服务器
	devServer: {
		hot: true, // 告诉 dev-server 我们在使用 HMR
		contentBase: cfg.DIST_PATH,
		publicPath: '/',
		open: false,
        inline: true,
		disableHostCheck: true
	},
	plugins:[
		new webpack.DefinePlugin({
		    'process.env': {
		        NODE_ENV: JSON.stringify('development'), //定义生产环境
		    },
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			name: 'vendor',
			manifest: require('../manifest.json'),
		})
	],
	module: {
		rules: [
			{
				test: /\.(less|css)$/i,
				use: ['style-loader','css-loader', 'postcss-loader', 'less-loader']
			}
        ]

	}
});
// console.log(config)

module.exports = config;
