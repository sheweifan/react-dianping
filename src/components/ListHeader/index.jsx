import React,{Component} from 'react';
import { WingBlank , WhiteSpace} from 'antd-mobile';
import './index.less';
let ListHeader = (props)=>(
	<div className="list_header">
		<WhiteSpace size="md"/>
		<WingBlank size="md">
			{
				props.children
			}
		</WingBlank>
		<WhiteSpace size="sm"/>
	</div>
);

export default ListHeader;