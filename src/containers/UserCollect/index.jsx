import React,{ Component , PropTypes } from 'react';
import { Toast } from 'antd-mobile';
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

		Toast.loading('正在取消收藏',0);
		return new Promise((res,rej)=>{
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
									Toast.hide();
									Toast.success('操作成功',1.8);
									res();
								})
							}
						}else{
							Toast.hide();
							Toast.success('操作失败',1.8);
							rej();
						}
					})
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


}


export default UserCollect;
