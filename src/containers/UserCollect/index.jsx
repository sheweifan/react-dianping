import React,{ Component , PropTypes } from 'react';

import { connect } from 'react-redux';

import Header from '../../components/Header/index';
import MallItem from '../../components/MallItem/index';
import MallList from '../../components/MallList/index';
import SwipeOut from '../../components/SwipeOut/index';

import { userCollectUrl } from '../../config/index';

import icon_collected from '../../static/icons/collected.svg';

let mapStateToProps = (state)=>{
    return {
        userInfo:state.userInfo
    }
};

let mapDispatchToProps = (dispatch)=>{
    return {}
};

const UserCollect = (props) =>{
	const { userInfo } = props;
	const { openId } = userInfo;
	return (
		<div>
			<MallList 
				body={{_id:'openId'}}
				listUrl={ userCollectUrl }
				childComponent={ (props)=>{
					return (
						<SwipeOut 
							opts={[
								{
									text:'取消收藏',
									onClick:()=>{console.log(1123)}
								},
								{
									text:'取消收藏',
									onClick:()=>{console.log(1123)}
								}
							]}
						>
							<MallItem { ...props } />
						</SwipeOut>
					)
				} }
			/>
			<Header 
				title="我的收藏"
			/>
		</div>
	)

}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCollect);
