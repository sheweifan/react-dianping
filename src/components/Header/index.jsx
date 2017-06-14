import React,{Component} from 'react';

import { NavBar } from 'antd-mobile';
let header = (props,context) =>  (
	<div className="header_contain header_other_contain">
		<NavBar 
			onLeftClick={()=>{
				if(props.backTo){
					context.router.push(props.backTo);
				}else{
					context.router.goBack();
				}
			}}
		>
			{
				props.title
			}
		</NavBar>
	</div>
)

header.contextTypes = {
    router: Object
}

export default header