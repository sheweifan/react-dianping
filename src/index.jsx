import React from 'react';
import { Provider } from 'react-redux';

import store from './store/index';
import AppRouter from './router/index';

import './static/styles/normalize.css';
import './static/styles/common.css';

window.__DEV__ = process.env.NODE_ENV === 'development';
console.log('开发环境', __DEV__);

const AppRoot = () => (<Provider store={store()}>
  <AppRouter />
</Provider>);

export default AppRoot;
