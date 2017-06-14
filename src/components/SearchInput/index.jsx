import React,{Component} from 'react';

import { Icon } from 'antd-mobile';

import  './index.less';

import icon_my from '../../static/icons/my.svg';

class SearchInput extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchInputInfo: this.props.defaultValue || ''
		};
	}
	searchInputChange(e){
		this.setState({
			searchInputInfo:e.target.value
		})
	}
	searchInputKeyUp(e){
		var _val = e.target.value;

		if(e.keyCode === 13){
			this.props.enterChange(_val);
		};
	}
	render(){
		let {searchInputInfo} = this.state;
		return (
			<input 
				type="search" 
				className="header_search_input" 
				placeholder="请输入搜索关键字" 
				value={searchInputInfo} 
				onChange={ this.searchInputChange.bind(this) }
				onKeyUp={ this.searchInputKeyUp.bind(this)}
			/>
		)		
	}
}


export default SearchInput