import React,{ Component , PropTypes } from 'react';

import Touch from '../../components/Touch/index';

import './index.less';

const btn_w = '140';

class SwipeOut extends Component{
	static defaultProps = {
		className:''
	}
	constructor(props){
		super(props);
		this.state = {
			pageX:0
		}
	}
	setTransform(x,animateTime){
		this.style.transform =  `translate3d(${ x }px,0,0)`;
		if(this.animateTime!=0){
			this.style.transition = `transform ${animateTime}s`;
		}
	}
	render(){
		let self = this;
		const { pageX } = this.state;
		const { opts , className } = this.props;
		
		let child = opts.map((item,i)=>{
			const { color , text , onClick } = item;
			let style = {}
			if(color){
				style={ background: color };
			}
			return (
				<div 
					style={ style }
					key={ i }
					onClick={ onClick }
					className={ `swipe_out_btn`}
				>
					{ text }
				</div>
			)
		});

		return (
			<Touch
				pageX={ pageX }
				touching={ function(data){
					const { direction , movePageX } = data;
					if(direction === 3 || direction === 4 ){
						// console.log(this.target)
						self.setTransform.call(this.target,movePageX,0)
					}
				} }
				touchEnd={function(data){
					const { direction , movePageX } = data;
					let x = movePageX;
					if(direction === 3 || direction === 4){
						x = movePageX < -150 ? -300 : 0; 
						self.setTransform.call(this.target,x,0.2)
						self.setState({
							pageX:x
						})
					}
				}}
			>
				<div className={className+' swipe_out'}>
					{ this.props.children }
					<div className="swipe_out_btns right">
						{ child }
					</div>
				</div>
			</Touch>
		)
	}
}


export default SwipeOut;
