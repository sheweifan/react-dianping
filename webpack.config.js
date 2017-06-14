
const webpack = require('webpack');

var config = require('./wp.cfg.js');

config.entry['vendor'] = ['react','react-dom','react-router','redux','react-redux'];

var setDev = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development'), //定义生产环境
  },
});
config.plugins.push(setDev);

var removeCmWr = new webpack.optimize.UglifyJsPlugin({
  mangle: {
    except: ['$super', '$', 'exports', 'require', 'module', '_'],
  },
  output: {
    comments: false, // remove all comments
  },
  compress: {
    warnings: false,
  },
});

config.plugins.push(removeCmWr);


var commonsCk = new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js');
config.plugins.push(commonsCk);

module.exports = config;