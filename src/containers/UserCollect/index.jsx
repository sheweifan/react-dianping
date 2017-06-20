import React,{ Component , PropTypes } from 'react';

import { connect } from 'react-redux';

import Header from '../../components/Header/index';
import MallItem from '../../components/MallItem/index';
import MallList from '../../components/MallList/index';
import Touch from '../../components/Touch/index';

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

			{
				// <Touch 
				// 	touching={(x,y)=>{
				// 		// console.log(x,y)
				// 	}}
				// 	touchingTop={()=>{
				// 		// console.log('touchingTop');
				// 	}}
				// 	touchingLeft={()=>{
				// 		// console.log('touchingLeft');
				// 	}}
				// 	touchingRight={()=>{
				// 		// console.log('touchingRight');
				// 	}}
				// 	touchingBottom={()=>{
				// 		// console.log('touchingBottom');
				// 	}}
				// 	touchingHorizontal={()=>{
				// 		// console.log('touchHorizontal')
				// 	}}
				// 	touchingVertical={()=>{
				// 		// console.log('touchVertical')
				// 	}}

				// 	touchEnd={(x,y)=>{
				// 		// console.log(x,y)
				// 		console.log('touchEnd')
				// 	}}
				// 	touchEndTop={()=>{
				// 		console.log('touchEndTop');
				// 	}}
				// 	touchEndLeft={()=>{
				// 		console.log('touchEndLeft');

				// 	}}
				// 	touchEndRight={()=>{
				// 		console.log('touchEndRight');
				// 	}}
				// 	touchEndBottom={()=>{
				// 		console.log('touchEndBottom');
				// 	}}
				// 	touchEndHorizontal={()=>{
				// 		console.log('touchEndHorizontal')
				// 	}}
				// 	touchEndVertical={()=>{
				// 		console.log('touchEndVertical')
				// 	}}
				// >
				// 	<div style={{width:'100%',height:'3rem',background:'red'}}></div>
				// </Touch>
			}
			<MallList 
				body={{_id:'openId'}}
				listUrl={ userCollectUrl }
				childComponent={ (props)=>{
					return (
						<Touch
							refs="target"
							touchingLeft={()=>{
								console.log('touchingLeft');
							}}
						>
							<MallItem { ...props } />
						</Touch>
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
