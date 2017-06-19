import React,{ Component , PropTypes } from 'react';

const Touchs = () => {
	return (ComponentWrap)=>{
		return class extends Component{
			constructor(props){
				super(props);
			}

			_touchStart(e){
				console.log('_touchStart',e.touches);
			}

			_touchMove(e){
				console.log('_touchMove',e.touches);
			}

			_touchEnd(e){
				console.log('_touchEnd',e.touches);
			}

			render(){
				return <ComponentWrap 
					{ ...this.props }
					touchs={{
						onTouchStart:this._touchStart,
						onTouchMove:this._touchMove,
						onTouchEnd:this._touchEnd
					}}
				/>
			}
		}
	}
	
};




export default Touchs;