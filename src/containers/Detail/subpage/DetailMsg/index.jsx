import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Stars from '../../../../components/Stars/index';
import './index.less';

const DetailMsg = (props) => {
  const { capita, describe, environmental, evaluate, img, title, services, star, taste } = props.data;
  return (
    <div size="md" className="detail_msg clearfix">
      <div className="detail_msg_img">
        <img src={img} />
      </div>
      <div className="detail_msg_info">
        <p className="title">{title}</p>
        <p className="start_count_price">
          <Stars count={star} />
          <span className="count">{evaluate}条</span>
          <span className="price">{capita}/人</span>
        </p>
        <p className="describe">{describe}</p>
        <p className="grade">口味：{taste} 环境：{environmental} 服务：{services}</p>
      </div>
    </div>
  );
};

export default DetailMsg;
