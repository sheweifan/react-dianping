import React,{ Component } from 'react';
import { ListView , ActivityIndicator , WingBlank , WhiteSpace } from 'antd-mobile';

import MallItem from '../MallItem/index';
import LoadMore from '../LoadMore/index';

import { mallListUrl  } from '../../config/index';
import fetchData from '../../until/fetchData';

import  './index.less';

let MallList = (props)=>{
	return (
		<LoadMore {...props} childComponent={MallItem} url={mallListUrl} />
	)
};

export default MallList