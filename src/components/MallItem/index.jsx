import React,{ Component , PropTypes } from 'react';
import { Link } from 'react-router'

import { WingBlank,WhiteSpace } from 'antd-mobile';


import './index.less';

let MallItem = (props,context) =>{

	let {_id,describe,postion,sales,title,img,price} = props;

	return (
		<div className="mall_item">
			<Link to={`/detail/${_id}`}>
				<div className="mall_item_inner">
					<WhiteSpace size="sm"/>
					<WingBlank size="ms" className="clearfix">
						
						<div className="mall_item_img">
							<img src={img} />
						</div>
						<div className="mall_item_info">
							<p className="mall_item_title">
								<span className="postion">{postion}m</span>
								<span className="title">{title}</span>
							</p>
							<p className="mall_item_describe">{describe}</p>
							<p className="mall_item_pirce">
								<span className="sales">已售{sales.toString()}</span>
								<span className="price">¥{price.toString()}</span>
							</p>
						</div>
					</WingBlank>
					<WhiteSpace size="sm"/>
				</div>
			</Link>
			{
				// <div className="mall_item_delete">取消收藏</div>
			}	
		</div>
	)

};

MallItem.contextTypes = {
    router: PropTypes.object
};

MallItem.PropTypes = {
    _id:PropTypes.string.isRequired,
    describe:PropTypes.string.isRequired,
    postion:PropTypes.number.isRequired,
    sales:PropTypes.number.isRequired,
    title:PropTypes.string.isRequired,
    img:PropTypes.string.isRequired,
    price:PropTypes.number.isRequired
};


export default MallItem;