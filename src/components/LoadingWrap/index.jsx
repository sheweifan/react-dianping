import React,{ Component , PropTypes } from 'react';
import { ActivityIndicator } from 'antd-mobile';

import  './index.less';

let LoadingWrap = (props) => (
	<div>
		{
			props.loading
			? <ActivityIndicator text="正在加载" className="loading_wrap"/>
			: props.children
		}
	</div>
);

LoadingWrap.PropTypes = {
    children: PropTypes.element.isRequired,
    loading: PropTypes.element.bool
};

export default LoadingWrap;