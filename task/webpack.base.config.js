const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cfg = require('./config.js').cfg;

const is_prod = process.argv[1].indexOf('webpack-dev-server') === -1;
module.exports = {

  // 出口
  output: {
    filename: '[name].js',
    path: cfg.DIST_PATH,
    publicPath: '/',
  },
  // 插件
  plugins: [
  	// 模块热加载
  new webpack.HotModuleReplacementPlugin(),
  	// 生成html
    new HtmlWebpackPlugin({
      prod: is_prod,
      title: 'test title',
      template: './src/index.tpl.ejs',
      minify: {
          removeComments: true,
          collapseWhitespace: true
      }
    }),
    // 体积变小，加快运行速度
	    new webpack.optimize.ModuleConcatenationPlugin(),

  ],
  module: {
    // 从 webpack 3.0.0 开始
    // noParse: function(content) {
    //   return /lodash/.test(content);
    // },

	    noParse: [/moment.js/],
    rules: [
      // {
      // 	test: /\.(less|css)$/i,
      // 	use: ExtractTextPlugin.extract({
		 //          fallback: 'style-loader',
		 //          use: [
		 //            'css-loader', 'postcss-loader', 'less-loader'
		 //          ]
		 //        })
      // },
      {
        test: /\.(png|jpg|gif)$/,
   				include: cfg.APP_PATH,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
   				include: cfg.APP_PATH,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
   				include: cfg.APP_PATH,
   				// use: ['babel-loader'/*,'eslint-loader'*/]
   				use: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
            	test: /\.(svg)$/i,
        use: ['svg-sprite-loader'],
        include: [
          require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
          path.resolve(__dirname, '../src/static/icon'), // 自己私人的 svg 存放目录
        ],
      },
      {
        test: /\.(ejs)$/,
   				loader: 'ejs-loader',
      },

    ],
  },
  resolve: {
    mainFiles: ['index.web', 'index'],
    modules: ['app', 'node_modules', path.join(__dirname, './node_modules')],
    extensions: [
      '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx',
      '.js',
      '.jsx',
      '.react.js',
      '.less',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
    // alias: {
    // 	'react': 'react/dist/react.js',
    // 	'react-dom': 'react-dom/dist/react-dom.js'
    // }
  },
  target: 'web',
};
// https://mp.weixin.qq.com/s/Z6CXa_5HP4RccfebxzmNng
// http://blog.csdn.net/qq_24840407/article/details/56035713
// https://doc.webpack-china.org/plugins/dll-plugin/
// https://github.com/ant-design/antd-mobile-samples/blob/master/web-webpack2/webpack.config.js
// https://yaowenjie.github.io/front-end/using-webpack-dashboard
