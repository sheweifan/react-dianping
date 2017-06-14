
const webpack = require('webpack');
var config = require('./wp.cfg.js');

config.devtool = 'inline-source-map'; // or 'inline-source-map'

var setDev = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('development'), //定义生产环境
    },
});
config.plugins.push(setDev);

console.log('______dev______');
module.exports = config;