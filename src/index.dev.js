// import _ from 'lodash';
// function component() {
//   var element = document.createElement('div');
//   // Lodash, now imported by this script
//   element.innerHTML = _.join(['Hello', 'webpack', 'haha', 'hehe',MyLibrary], ' ');
//   element.classList.add('hello');
//   return element;
// }
// document.body.appendChild(component());
//

// import 'src/style.less';
// import React, { Component, PropTypes } from 'react';
// import { render } from 'react-dom';

// import Test from 'src/Test';

// render(<Test />, document.getElementById('root'));

import React from 'react';
// import 'src/style.less';
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
