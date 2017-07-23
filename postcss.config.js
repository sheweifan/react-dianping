module.exports = {
    plugins: [
    	// 兼容前缀
        require('autoprefixer')({
        	browsers: ['iOS >= 7', 'Android >= 2']
        }),
        // rem
        require('postcss-pxtorem')({ rootValue: 100, propWhiteList: [] }),
    ]
}