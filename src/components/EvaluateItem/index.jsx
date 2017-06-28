import React,{ Component , PropTypes } from 'react';

import Stars from '../Stars/index';
import LazyImg from '../LazyImgs';

import './index.less';

let EvaluateItem = (props) => {
	const { avatar , content , imgs , name , stars } = props;
	let _imgs = [];
	let _img = [];

	imgs.map((item,i)=>{
		_img.push(<div key={i} className="img"><div><LazyImg src={item}/></div></div>);
		if(_img.length === 4 || i === imgs.length-1){
			_imgs.push(<div key={i} className="evaluate_item_imgs">{_img}</div>)
			_img = [];
		}
	});

	return (
		<div className="evaluate_item ">
			<div className="evaluate_item_avatar">
				{
					// <img src={avatar}/>
				}
				<LazyImg src={avatar} />
			</div>
			<div className="evaluate_item_info">
				<p className="evaluate_item_name">{name}</p>
				<Stars count={stars} className="evaluate_item_stars"/>
				<p className="evaluate_item_content">{content}</p>
				{
					_imgs
				}
			</div>
		</div>
	)
};

EvaluateItem.PropTypes = {
    avatar: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imgs: PropTypes.array.isRequired,
    stars: PropTypes.number.isRequired,
};

export default EvaluateItem;