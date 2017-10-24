import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Touch from '../../components/Touch/index';

import './index.less';

const btn_w = '140';
const dpr = window.devicePixelRatio;
class SwipeOut extends Component {
 static defaultProps = {
   className: '',
 }
 constructor(props) {
   super(props);
   this.state = {
     pageX: 0,
   };
 }
 setTransform(x, animateTime) {
   this.style.transform = `translate3d(${x}px,0,0)`;
   if (this.animateTime != 0) {
     this.style.transition = `transform ${animateTime}s`;
   }
 }
 render() {
   const self = this;
   const { pageX } = this.state;
   const { opts, className } = this.props;
   const max = btn_w * dpr / 2 * opts.length;

   const child = opts.map((item, i) => {
     const { background, text, onClick } = item;
     const style = {
       width: `${btn_w / 100}rem`,
     };
     if (background) {
       style.background = background;
     }
     return (
       <div
         className={className || ''}
         style={style}
         key={i}
         onClick={() => {
           onClick().then(() => {
             self.setState({
               pageX: 0,
             });
             self.setTransform.call(self.target, 0, 0);
           });
         }}
         className={'swipe_out_btn'}
       >
         { text }
       </div>
     );
   });
   return (
     <Touch
       pageX={pageX}
       touching={function (data) {
         const { direction, movePageX } = data;
         if (direction === 3 || direction === 4) {
           // console.log(this.target)
           self.setTransform.call(this.target, movePageX, 0);
         }
       }}
       touchEnd={function (data) {
         const { direction, movePageX } = data;
         let x = movePageX;
         self.target = this.target;
         if (direction === 3 || direction === 4) {
           x = movePageX < max * -0.5 ? max * -1 : 0;
           self.setTransform.call(this.target, x, 0.2);
           self.setState({
             pageX: x,
           });
         }
       }}
     >
       <div className={`${className} swipe_out`}>
         { this.props.children }
         <div className="swipe_out_btns right" style={{ width: `${max}px` }}>
           { child }
         </div>
       </div>
     </Touch>
   );
 }
  // componentWillUpdate(prevProps,prevState){
  // 	const { pageX } = this.state;
  // 	if(pageX !==0){

  // 	}
  // }
  // shouldComponentUpdate(nextProps, nextState){
  // 	if(this.state.pageX !== nextState.pageX){
  // 		return false;
  // 	}

  // 	return true
  // }
}


export default SwipeOut;
