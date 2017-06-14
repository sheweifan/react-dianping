import React,{Component} from 'react';


import { NavBar, Icon } from 'antd-mobile';

import icon_my from '../../static/icons/my.svg';

import  './index.less';

import SearchInput from '../SearchInput/index';


let HomeHeader = (props,context) =>  {
	const { userInfo } = props;
	// console.log('userInfo',typeof userInfo,userInfo,Object.keys(userInfo));
	const { router } = context;
	return (
		<div className="header_contain header_home_contain">
			<NavBar
				mode="light"
				iconName=""
			>
				<div className="header_home_from">
					<SearchInput enterChange={props.enterChange} defaultValue={props.defaultValue}/>
					<Icon type="search" size="xs" className="header_home_icon"/>
					<span className="header_mycenter_btn">
						{
							Object.keys(userInfo).length !== 0
							? <img src={ userInfo.avatar } onClick={ ()=> router.push('/user') } />
							: <Icon type={ icon_my } size="md" onClick={ ()=> router.push('/login') } />
						} 
					</span>
				</div>
			</NavBar>
		</div>
	)
}

HomeHeader.contextTypes = {
    router: Object
}

export default HomeHeader
