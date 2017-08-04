import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';

import icon_star from '../../static/icons/star.svg';

import './index.less';

const Stars = (props) => {
  const { count, className } = props;
  const stats = ['b', 'i', 't', 'c', 'h'].map((item, i) => <Icon className={i + 1 <= count ? 'star_item active' : 'star_item'} key={i} type={icon_star} />);
  return (
    <span className={className ? `${className} star_list` : 'star_list'}>
      {
        stats
      }
    </span>
  );
};

Stars.PropTypes = {
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
};


export default Stars;
