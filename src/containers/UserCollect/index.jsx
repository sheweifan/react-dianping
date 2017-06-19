import React,{ Component , PropTypes } from 'react';

import { connect } from 'react-redux';

import Header from '../../components/Header/index';
import MallList from '../../components/MallList/index';

import { userCollectUrl } from '../../config/index';
// import { removeItem } from '../../until/localStorage';

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
)(UserCollect);;
