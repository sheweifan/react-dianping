import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'antd-mobile';

const Item = List.Item;

import Stars from '../../../../components/Stars/index';

import './index.less';

const star_info = [
  '',
  '超级垃圾',
  '很垃圾',
  '一般垃圾',
  '有点垃圾',
  '不垃圾',
];


class StarsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.defaultValue,
    };
  }
  starChanger(e) {
    e.preventDefault();
    const stardom = findDOMNode(this.refs.stars);
    const stardomW = stardom.offsetWidth;

    const offleft = stardom.getBoundingClientRect().left;
    const pageX = e.targetTouches[0].pageX;
    const left = pageX - offleft;

    const idx = Math.floor(left / stardomW * 100 / 20) + 1;

    this.setState({
      count: idx >= 5 ? 5 : idx,
    });
  }
  render() {
    const { count } = this.state;
    const { changEnd } = this.props;
    console.log('render');
    return (
      <Item
        extra={<span className="start_info"> {star_info[count]} </span>}
        className="stars_edit"
      >
				分数
        <span
          onTouchStart={this.starChanger.bind(this)}
          onTouchMove={this.starChanger.bind(this)}
          onTouchEnd={() => { changEnd(count); }}
          ref={'stars'}
        >
          <Stars
            count={count}
          />
        </span>

      </Item>
    );
  }
}


export default StarsEdit;
