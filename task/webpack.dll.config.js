const path = require('path');
const webpack = require('webpack');

const merge = require('webpack-merge');
// var baseConfig = require('./webpack.config.js')

const cfg = require('./config.js').cfg;

const dll = {
	entry: {
		vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux'],
	},
	// 出口
	output: {
		filename: '[name].js',
		path: cfg.DIST_PATH,
		library: 'vendor',
	},

	plugins: [
		new webpack.DllPlugin({
			path: './manifest.json',
			name: 'vendor',
			context: __dirname,
		}),
	],
};


module.exports = dll;
