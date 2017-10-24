import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

const privateProps = {
  children: true,
  direction: true,
  options: true,
  recognizeWith: true,
  vertical: true,
  pageX: true,
  pageY: true,
  touching: true,
  touchEnd: true,
};

const directionInfo = [
  '未滑动',
  '向上',
  '向下',
  '向左',
  '向右',
];

class Touch extends Component {
 static defaultProps = {

 }
 constructor(props) {
   super(props);

   this._TouchStart = this._TouchStart.bind(this);
   this._TouchMove = this._TouchMove.bind(this);
   this._TouchEnd = this._TouchEnd.bind(this);
 }
 getDirection(startx, starty, endx, endy) {
   const angx = endx - startx;
   const angy = endy - starty;
   let result = 0;

   // 如果滑动距离太短
   if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
     return result;
   }

   const angle = Math.atan2(angy, angx) * 180 / Math.PI;

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
 _TouchStart(e) {
   const point = e.touches[0];
   const pos = this.target.getBoundingClientRect();
   // 按下手指
   this.startPontX = point.pageX;
   this.startPontY = point.pageY;
   // 记录相对值
   this.startPageX = this.startPontX - (this.endPageX || 0);
   this.startPageY = this.startPontY - (this.endPageY || 0);
 }
 _TouchMove(e) {
   const { props, startPontX, startPontY, startPageX, startPageY, getDirection } = this;
   const { touching } = props;
   const point = e.touches[0];
   this.movePageX = point.pageX - startPageX;
   this.movePageY = point.pageY - startPageY;

   const direction = getDirection(startPontX, startPontY, point.pageX, point.pageY);

   // touching && touching(this.movePageX,this.movePageY);
   const stop = touching && touching.call(this, {
     direction,
     directionInfo: directionInfo[direction],
     startPageX,
     startPageY,
     movePageX: this.movePageX,
     movePageY: this.movePageY,
   });
   if (stop) {
     e.preventDefault();
   }
 }
 _TouchEnd(e) {
   // 记录结束
   this.endPageX = this.movePageX;
   this.endPageY = this.movePageY;

   const { props, startPontX, startPontY, startPageX, startPageY, getDirection } = this;
   const { touchEnd } = props;
   const point = e.changedTouches[0];

   const direction = getDirection(startPontX, startPontY, point.pageX, point.pageY);

   touchEnd && touchEnd.call(this, {
     direction,
     directionInfo: directionInfo[direction],
     startPageX,
     startPageY,
     movePageX: this.movePageX,
     movePageY: this.movePageY,
     endPageX: this.endPageX,
     endPageY: this.endPageY,
   });
 }
 render() {
    	const { children } = this.props;
    	const props = {

    	};
   Object.keys(this.props).forEach(function (i) {
     if (!privateProps[i]) {
       props[i] = this.props[i];
     }
   }, this);

   props.ref = (target) => {
     if (this.props.ref) {
       this.props.ref(target);
     }
     this.target = target;
   };
       	return cloneElement(Children.only(children), props);
 }
 componentDidMount() {
   this.target.addEventListener('touchstart', this._TouchStart);
   this.target.addEventListener('touchmove', this._TouchMove);
   this.target.addEventListener('touchend', this._TouchEnd);
   this.target.addEventListener('touchcancel', this._TouchEnd);
 }
 componentWillUnmount() {
   this.target.removeEventListener('touchstart', this._TouchStart);
   this.target.removeEventListener('touchmove', this._TouchMove);
   this.target.removeEventListener('touchend', this._TouchEnd);
   this.target.removeEventListener('touchcancel', this._TouchEnd);
 }
 componentWillReceiveProps(nextProps) {
    	const { pageX, pageY } = nextProps;

    	this.endPageX = pageX;
    	this.endPageY = pageY;
 }
}


export default Touch;
