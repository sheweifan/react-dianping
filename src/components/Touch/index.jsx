import React,{ Component , PropTypes , cloneElement ,Children  } from 'react';
import { findDOMNode } from 'react-dom';
var privateProps = {
	children: true,
	direction: true,
	options: true,
	recognizeWith: true,
	vertical: true,
	touching: true,
	touchingTop: true,
	touchingLeft: true,
	touchingRight: true,
	touchingBottom: true,
	touchingHorizontal: true,
	touchingVertical: true,
	touchEnd: true,
	touchEndTop: true,
	touchEndLeft: true,
	touchEndRight: true,
	touchEndBottom: true,
	touchEndHorizontal: true,
	touchEndVertical: true,
};
class Touch extends Component{
	static defaultProps = {
		
	}
	constructor(props){
		super(props);

		this._TouchStart = this._TouchStart.bind(this);
		this._TouchMove = this._TouchMove.bind(this);
		this._TouchEnd= this._TouchEnd.bind(this);
	}
	// 1向上 2向下 3向左 4向右 0未滑动
	getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;
 		
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
 
        var angle = Math.atan2(angy, angx) * 180 / Math.PI;

        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }
 
        return result;
    }
	_TouchStart(e){
		const point = e.touches[0];
		const pos = this.target.getBoundingClientRect();
		// 按下手指
		this.startPontX = point.pageX;
		this.startPontY = point.pageY;
		// 记录相对值
		this.startPageX = this.startPontX - ( this.endPageX || 0 )
		this.startPageY = this.startPontY - ( this.endPageY || 0 )
	}
	_TouchMove(e){
		const { props , startPontX , startPontY , startPageX , startPageY , getDirection } = this;
		const { touching , touchingTop , touchingBottom , touchingLeft , touchingRight , touchingHorizontal , touchingVertical  } = props;
		const point = e.touches[0];
		this.movePageX = point.pageX - startPageX;
		this.movePageY = point.pageY - startPageY;

		touching && touching(this.movePageX,this.movePageY);

		const direction = getDirection( startPontX,startPontY,point.pageX,point.pageY);
		if(direction === 1){
			// 上
			touchingTop && touchingTop(this.movePageX,this.movePageY);
		}else if(direction === 2){
			// 下
			touchingBottom && touchingBottom(this.movePageX,this.movePageY);
		}else if(direction === 3){
			// 左
			touchingLeft && touchingLeft(this.movePageX,this.movePageY);
		}else if(direction === 4){
			// 右
			touchingRight && touchingRight(this.movePageX,this.movePageY);
		}

		if(direction === 1 || direction === 2){
			// 垂直
			touchingVertical && touchingVertical(this.movePageX,this.movePageY);
		}else{
			// 水平
			touchingHorizontal && touchingHorizontal(this.movePageX,this.movePageY);
		}
	}
	_TouchEnd(e){
		// 记录结束
		this.endPageX = this.movePageX;
		this.endPageY = this.movePageY;

		const { props , startPontX , startPontY , startPageX , startPageY , getDirection } = this;
		const { touchEnd , touchEndTop , touchEndBottom , touchEndLeft , touchEndRight , touchEndHorizontal , touchEndVertical  } = props;
		const point = e.changedTouches[0];

		touchEnd && touchEnd(this.movePageX,this.movePageY);

		const direction = getDirection( startPontX,startPontY,point.pageX,point.pageY);

		if(direction === 1){
			// 上
			touchEndTop && touchEndTop(this.movePageX,this.movePageY);
		}else if(direction === 2){
			// 下
			touchEndBottom && touchEndBottom(this.movePageX,this.movePageY);
		}else if(direction === 3){
			// 左
			touchEndLeft && touchEndLeft(this.movePageX,this.movePageY);
		}else if(direction === 4){
			// 右
			touchEndRight && touchEndRight(this.movePageX,this.movePageY);
		}

		if(direction === 1 || direction === 2){
			// 垂直
			touchEndVertical && touchEndVertical(this.movePageX,this.movePageY);
		}else{
			// 水平
			touchEndHorizontal && touchEndHorizontal(this.movePageX,this.movePageY);
		}
	}
    render(){
    	const { className , children } = this.props;
    	let props = {};
		Object.keys(this.props).forEach(function (i) {
			if (!privateProps[i]) {
				props[i] = this.props[i];
			}
		}, this);

		var self = this;
		props.ref = function(target) {
			if (self.props.ref) {
				self.props.ref(target);
			}
			self.target = target;
		};
       	return cloneElement(Children.only(children), props)
    }
    componentDidMount(){
		this.target.addEventListener('touchstart',this._TouchStart);
		this.target.addEventListener('touchmove',this._TouchMove);
		this.target.addEventListener('touchend',this._TouchEnd);
    }
    componentWillUnmount(){
		this.target.removeEventListener('touchstart',this._TouchStart);
		this.target.removeEventListener('touchmove',this._TouchMove);
		this.target.removeEventListener('touchend',this._TouchEnd);
    }
}



export default Touch;
