
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
const cfg = require('./config.js').cfg;

const config = merge(baseConfig, {
  devtool: 'source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.dev.js',
    ],
    // vendor: ['react','react-dom']
  },
  // 配置静态服务器
  devServer: {
    hot: true, // 告诉 dev-server 我们在使用 HMR
    contentBase: cfg.DIST_PATH,
    publicPath: '/',
    open: false,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
		    'process.env': {
		        NODE_ENV: JSON.stringify('development'), // 定义生产环境
		    },
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      name: 'vendor',
      manifest: require('../manifest.json'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(less|css)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
    ],

  },
});
// console.log(config)

module.exports = config;
