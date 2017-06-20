import React,{ Component , PropTypes } from 'react';

const Touchs = ({
	swipe
}) => {
	return (ComponentWrap)=>{
		return class extends ComponentWrap{
			constructor(props){
				super(props);
				
				this._touchStart = this._touchStart.bind(this)
				this._touchMove = this._touchMove.bind(this)
				this._touchEnd = this._touchEnd.bind(this)
			}

			_touchStart(e){
				console.log('_touchStart',e.touches);
			}

			_touchMove(e){
				console.log('_touchMove',e.touches);
			}

			_touchEnd(e){
				console.log('_touchEnd',e.touches);

				swipe.call(this);
			}

			render(){
				return <ComponentWrap 
					{ ...this.props }
					touchs={{
						onTouchStart:this._touchStart,
						onTouchMove :this._touchMove,
						onTouchEnd  :this._touchEnd
					}}
				/>
			}
		}
	}
	
};




export default Touchs;