import React,{ Component , PropTypes } from 'react';
import { NavBar } from 'antd-mobile';

const header = (props,context) =>  (
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
);

header.contextTypes = {
    router: Object
};


header.PropTypes = {
    title: PropTypes.string.isRequired,
    backTo: PropTypes.string,
};


export default header