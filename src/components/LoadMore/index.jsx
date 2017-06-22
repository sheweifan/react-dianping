import React,{ Component , PropTypes } from 'react';
import { ListView , ActivityIndicator } from 'antd-mobile';

import ListHeader from '../ListHeader/index'

import { listPageTotal  } from '../../config/index';
import fetchData from '../../until/fetchData';

import  './index.less';

class MallList extends Component{
	constructor(props){
		super(props);

		this.dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});

		this.state = {
			dataSource: this.dataSource.cloneWithRows({}),
			isLoading: true,
			pageNow:0,
			pageCount:null,
		};
		
		this.data = [];
	}
	render(){
		let { dataSource ,pageNow , pageCount ,isLoading } = this.state;

		let MallListFooter = ()=> {
			
			if(isLoading){
				return (
					<ActivityIndicator text="正在加载"  className="loading_tips" />
				)
			}
			
			if(pageCount === 0){
				return (
					<div className="loadend_tips">暂无数据</div>
				)
			}

			if(pageNow !== pageCount){
				return (
					<div className="loadend_tips">上拉加载更多</div>
				)
			}

			return (
				<div>
					<div className="loadend_tips">没有更多了</div>
				</div>
			);
		}
		return (
			<div>

				<ListView
					className={this.props.className+' loadmore_list'}
					useBodyScroll
					dataSource={dataSource}
					renderRow={this.props.childComponent}
					onEndReached={this.onEndReached.bind(this)}
					renderFooter={() => <MallListFooter />}
					onEndReachedThreshold={0}
					pageSize={listPageTotal}
					renderHeader={()=>{
						if(this.props.renderHeader){
							return (
								<ListHeader>
									{
										this.props.renderHeader()
									}
								</ListHeader>
							)
						}else{
							return null
						}
					}
					}
				>
				</ListView>
			</div>
		)
	}
	getData(){
		let { pageNow } = this.state;
		pageNow++
		this.setState({
			isLoading:true,
			pageNow:pageNow
		});

		let { body , url , exclude} = this.props;
		
		let obj = Object.assign(body,{
			pageIndex:pageNow
		});

		fetchData(url,obj)
			.then(data=>{
				if(data.isOk){
					var _data = data.data;
					this.data = this.data.concat(_data);
					this.excludeData(exclude)
					this.setState({
						dataSource:this.state.dataSource.cloneWithRows(this.data),
						pageNow:pageNow,
						isLoading:false,
						pageCount:data.pageCount
					})
				}
			})
	}
	onEndReached(){
		let { pageNow , isLoading , pageCount } = this.state;
		if(isLoading || pageNow === pageCount) return;
		
		this.getData();
	}
	componentDidMount(){
		this.getData();
	}
	componentDidUpdate(prevProps){
        let { body , listUrl } = this.props;
        if (body === prevProps.body && listUrl === prevProps.listUrl) {
            return
        }
		this.setState({
			dataSource: this.dataSource.cloneWithRows({}),
			isLoading: true,
			pageNow:0,
			pageCount:null,
		},()=>{
			this.data = [];
			this.getData();
		});
	}
	excludeData(exclude){
		const data = this.data;

		data.forEach((item,i)=>{
			if( exclude[item._id] ){
				this.data.splice(i,1);
			}
		})

		
	}
	componentWillReceiveProps(nextProps){
		let { exclude } = nextProps;
		this.excludeData(exclude);
		this.setState({
			dataSource: this.dataSource.cloneWithRows(this.data),
		},()=>{
			console.log(this.state.dataSource)
		})
		
	}

}

MallList.PropTypes = {
    className: PropTypes.string,
    body: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    childComponent: PropTypes.element
};

export default MallList