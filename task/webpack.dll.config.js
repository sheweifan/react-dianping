var path = require('path');
var webpack = require('webpack');

var merge = require('webpack-merge')
// var baseConfig = require('./webpack.config.js')

var cfg = require('./config.js').cfg;

var dll = {
	entry: {
		vendor: ['react','react-dom','react-router','react-redux','redux']
    },
    // 出口
	output: {
		filename: '[name].js',
		path: cfg.DIST_PATH,
	    library: 'vendor'
	},

	plugins: [
		new webpack.DllPlugin({
		     path: './manifest.json',
		     name: 'vendor',
		     context: __dirname,
		})
	]
}


module.exports = dll