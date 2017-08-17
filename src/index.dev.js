import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import AppRoot from './index.jsx';

const rootDom = document.getElementById('ShiSheBuShiYu');


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootDom,
  );
};

render(AppRoot);

if (module.hot) {
  module.hot.accept('./index', () => {
    const NextApp = require('./index').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootDom,
    );
  });
}
