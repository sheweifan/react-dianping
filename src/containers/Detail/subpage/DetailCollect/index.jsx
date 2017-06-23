import React,{ Component , PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import CollectHOC from '../../../../HOC/Collect';

import icon_collect from '../../../../static/icons/collect.svg';
import icon_collected from '../../../../static/icons/collected.svg';
import './index.less';

@CollectHOC
class DetailCollect extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const { collected } = this.props;
		// console.log('collected',collected)
		if(collected){
			return (
				<div className="nav_collect">
				    <Icon type={icon_collected} className="nav_collect_icon" />
					<span className="nav_collect_title">已收藏</span>
				</div>
			);
		}else{
			return (
				<div className="nav_collect">
				   <Icon type={icon_collect} className="nav_collect_icon" />
					<span className="nav_collect_title">收藏</span>
				</div>
			);
		};
	}
};

DetailCollect.PropTypes = {
   collected : PropTypes.bool.isRequired
};

export default DetailCollect;