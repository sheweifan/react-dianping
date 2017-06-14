import React,{Component} from 'react';

import { ActivityIndicator} from 'antd-mobile';

import  './index.less';


let LoadingWrap = (props) =>{

	return (
		<div>
			{
				props.loading
				? <ActivityIndicator text="正在加载" className="loading_wrap"/>
				: props.children
			}
		</div>
	)
}

export default LoadingWrap;