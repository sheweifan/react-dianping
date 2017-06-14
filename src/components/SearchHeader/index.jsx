import React,{Component} from 'react';

import { NavBar, Icon } from 'antd-mobile';

import icon_my from '../../static/icons/my.svg';

import  './index.less';

import SearchInput from '../SearchInput/index';

let SearchHeader = (props,context) => {
	let {router} = context;
	let {enterChange,defaultValue} = props;
	return (
		<div className="header_contain header_search_contain">
			<NavBar
				mode="light"
				onLeftClick={()=>{
					if(props.backTo){
						router.push(props.backTo);
					}else{
						// router.goBack();
						router.push('/');
					}
				}}
			>
				<div className="header_search_from">
					<SearchInput enterChange={enterChange} defaultValue={defaultValue}/>
					<Icon type="search" size="xs" className="header_search_icon"/>
				</div>
			</NavBar>
		</div>
	)
}

SearchHeader.contextTypes = {
    router: Object
}


export default SearchHeader