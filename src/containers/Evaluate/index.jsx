import React , { Component ,PropTypes } from 'react';
import { WhiteSpace , List , TextareaItem , Toast } from 'antd-mobile';
const Item = List.Item;
import { connect } from 'react-redux';

import Header from '../../components/Header/index';
import Stars from '../../components/Stars/index';

import StarsEdit from './subpage/StarsEdit/index';

import fetchData from '../../until/fetchData';
import { evaluateUrl } from '../../config/index';

import './index.less';

let mapStateToProps = (state)=>{
    return {
        userInfo:state.userInfo
    }
};

let mapDispatchToProps = (dispatch)=>{
    return {}
};
const default_val = 5;

@connect(mapStateToProps,mapDispatchToProps)
class Evaluate extends Component {
	static contextTypes = {
	    router: PropTypes.object
	}
	constructor(props, context) {
		super(props, context);
		console.log(props)
		this.state={
			context:'',
			count:default_val,
		};
	}
	handleSubmit(){
		const { count , context } = this.state;
		const { router } = this.context;
		const { id } = this.props.routeParams;

		console.log(router)
		Toast.loading('正在提交',0)

		fetchData(evaluateUrl,{
			...this.state
		}).then(data=>{
			console.log(data);
			if(data.isOk){
				if(data.submitSuccess){
					Toast.hide();
					Toast.success('评价成功',1,()=>{
						router.goBack();
					})
				}
			}
		})

	}
	render(){
		const { userInfo } = this.props;
		const { context } = this.state;
		const { router } = this.context;
		const { id } = this.props.routeParams;
		if(Object.keys(userInfo).length === 0){
			router.push(`/detail/${id}`)
		};
		return (
			<div className="evaluate">
				<List>
					<StarsEdit 
						changEnd={ (count)=>{ this.setState({count}) } }
						defaultValue={ default_val }
					/>
					<TextareaItem 
						rows={4}
						count={100}
						value={context}
						placeholder={`请输入内容`}
						onChange={(e)=>{ this.setState({context:e}) }}
					/>
				</List>
				<Header 
					title={`请输入您的评价`}
					rightContent={
						<span className="" onClick={ this.handleSubmit.bind(this) }>发布</span>
					}
				/>

			</div>
			
		);
	}
	
}


export default Evaluate;
