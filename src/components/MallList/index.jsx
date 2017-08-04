import React, { Component } from 'react';
import { ListView, ActivityIndicator, WingBlank, WhiteSpace } from 'antd-mobile';

import MallItem from '../MallItem/index';
import LoadMore from '../LoadMore/index';

import { mallListUrl } from '../../config/index';
import fetchData from '../../until/fetchData';

import './index.less';

const MallList = props => (
  <LoadMore
    {...props}
    childComponent={props.childComponent}
    url={props.listUrl}
  />
);

MallList.defaultProps = {
  listUrl: mallListUrl,
  childComponent: MallItem,
};

export default MallList;
