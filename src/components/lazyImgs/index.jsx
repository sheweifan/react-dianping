import React,{ Component , PropTypes  } from 'react';
import { findDOMNode } from 'react-dom';
import { ActivityIndicator } from 'antd-mobile';

import './index.less';

const getWinH = ()=>{ return window.innerHeight || document.documentElement.clientHeight; }
let winH = getWinH();

// 屏幕旋转。 待完善
window.addEventListener("orientationchange", function() {
	setTimeout(()=>{winH=getWinH();}
}, false);

const isVisible = (dom) => {
	const _dom = findDOMNode(dom);
	let { top } = _dom.getBoundingClientRect();
	top = parseInt(top);
	// console.log(top);
	// let sct = document.body.scrollTop;
	return top > 0 && top < winH;
}

const loadimg = (src)=>{
	var self = this;
	return new Promise(function(res,rej){
		var img = new Image();
		img.onload = ()=>{
			res();
		}
		img.onerror = ()=>{
			rej();
		}
		img.src = src;
	})
}

const initState = {
	// 1:loading 2:loadend 3:loadfail
	loadstate: 1
}

class LazyImg extends Component{
	constructor(props){
		super(props);

    	this.scrollBox = this.props.scrollBox ? document.querySelect(this.props.scrollBox) : window;
		this.state = initState;
		this.handleScroll = this.handleScroll.bind(this);
	}
	render(){
		const { loadstate } = this.state;
		const { src } = this.props;
		if(loadstate === 1){
			return (
				<div className="lazy_img_loading">
					<ActivityIndicator />
				</div>
			)
		}else if(loadstate === 2){
			return <img src={src}/>
		}else{
			return (
				<div className="lazy_img_loadfail">
					加载失败
				</div>
			)
		}
	}
	componentDidMount(){
    	this.handleScroll();
		this.scrollBox.addEventListener('scroll',this.handleScroll);
	}
	handleScroll(e){
		const { src } = this.props;
		const _isVisible = isVisible(this);
		if(_isVisible){
			this.unmount();
			loadimg(src)
				.then(()=>{
					this.setState({
						loadstate:2
					});
				})
				.catch(()=>{
					this.setState({
						loadstate:3
					});
				})
		}
	}
	componentWillUnmount(){
		this.unmount();
	}
	unmount(){
		this.scrollBox.removeEventListener('scroll',this.handleScroll);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.src !== this.props.src){
			// console.log(1)
			this.unmount();
			this.setState(initState);
	    	this.handleScroll();
			this.scrollBox.addEventListener('scroll',this.handleScroll);
		}
	}

}

export default LazyImg;