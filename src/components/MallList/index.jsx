import React,{Component} from 'react';

import { ListView , ActivityIndicator , WingBlank , WhiteSpace} from 'antd-mobile';

import fetchData from '../../until/fetchData';

import { mallListUrl  } from '../../config/index';

import  './index.less';

// import SearchInput from '../SearchInput/index';

// let MallList = (props) => (
// 	<div>
// 		fuck...
// 	</div>
// )

import MallItem from '../MallItem/index';
import LoadMore from '../LoadMore/index';
					// renderHeader={()=>this.props.children}

let MallList = (props)=>{
	return (
		<LoadMore {...props} childComponent={MallItem} url={mallListUrl} />
	)
}


export default MallList