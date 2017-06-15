import React,{ Component , PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import CollectHOC from '../../HOC/Collect';

import icon_collect from '../../static/icons/collect.svg';

import './index.less';

@CollectHOC
class Collect extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="nav_collect">
				<Icon type={icon_collect} />
				<span>收藏</span>
			</div>
		);
	}
	componentDidMount(){
		// console.log(this.props.getId());
	}
};

Collect.PropTypes = {
   
};

export default Collect;