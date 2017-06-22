import React,{ Component , PropTypes } from 'react';

import { connect } from 'react-redux';

import Header from '../../components/Header/index';
import MallItem from '../../components/MallItem/index';
import MallList from '../../components/MallList/index';
import SwipeOut from '../../components/SwipeOut/index';

import { userCollectUrl , collectUrl } from '../../config/index';
import postData from '../../until/postData';

import icon_collected from '../../static/icons/collected.svg';

let mapStateToProps = (state)=>{
    return {
        userInfo:state.userInfo
    }
};

let mapDispatchToProps = (dispatch)=>{
    return {}
};


@connect(
    mapStateToProps,
    mapDispatchToProps
)
class UserCollect extends Component{
	constructor(props){
		super(props);
		this.state={
			exclude:{}
		}
	}
	cancelCollect(_id){
		const { userInfo } = this.props;
		const { exclude } = this.state;
		// console.log(exclude)
		postData(collectUrl,{
				_id:_id,
				userId:userInfo.openId
			})
				.then(data=>{
					const { isOk , changeSuccess } = data;
					if(isOk){
						if(changeSuccess){
							exclude[_id] = true
							this.setState({
								exclude: exclude
							},()=>{
								// console.log(this.state.exclude);
							})
						}
					}
				})
	}
	render(){
		const { userInfo } = this.props;
		const { exclude } = this.state;
		const { openId } = userInfo;
		return (
			<div>
				<MallList 
					body={{_id:openId}}
					listUrl={ userCollectUrl }
					exclude={ exclude }
					childComponent={ (props)=>{
						return (
							<SwipeOut 
								opts={[
									{
										text:'取消收藏',
										onClick:()=>this.cancelCollect.call(this,props._id)
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

	shouldComponentUpdate(nextProps,nextState){
		return true
	}
}


export default UserCollect;
