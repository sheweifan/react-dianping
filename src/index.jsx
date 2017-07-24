import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import store from './store/index'
import AppRouter from './router/index';

import './static/styles/normalize.css';
import './static/styles/common.css';


window.__DEV__ = process.env.NODE_ENV === 'development';
console.log('开发环境',__DEV__);


ReactDOM.render(
	<Provider store={store()}>
    	<AppRouter />
    </Provider>,
document.getElementById('ShiSheBuShiYu'));



// let isMobile = false;
// if ((/android/i).test(navigator.userAgent) || (/iphone|ipad/i).test(navigator.userAgent)) {
//   const meta = document.querySelector('meta[name="viewport"]');
//   const content = (meta as any).content;
//   if (!(/initial-scale=1,/g.test(content))) {
//     isMobile = true;
//   }
// }
// windo.dpr = isMobile ? (window.devicePixelRatio || 1) : 1;
