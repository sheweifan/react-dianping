import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import store from './store/index';
import AppRouter from './router/index';

import './static/styles/normalize.css';
import './static/styles/common.css';

/* eslint-disable no-undef */
window.__DEV__ = process.env.NODE_ENV === 'development';
console.log('开发环境', __DEV__);

ReactDOM.render(
  <Provider store={store()}>
    <AppRouter />
  </Provider>,
  document.getElementById('ShiSheBuShiYu'));
