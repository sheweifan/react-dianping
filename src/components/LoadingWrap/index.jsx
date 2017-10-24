import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'antd-mobile';


import './index.less';

const LoadingWrap = props => (
  <div>
    {
      props.loading
        ? <ActivityIndicator text="正在加载" className="loading_wrap" />
        : props.children
    }
  </div>
);

LoadingWrap.PropTypes = {
  children: PropTypes.element.isRequired,
  loading: PropTypes.element.bool,
};

export default LoadingWrap;
