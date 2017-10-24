import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List } from 'antd-mobile';

const Item = List.Item;

import './index.less';

const DetailTime = (props) => {
  const { data } = props;
  return (
    <div>
      <List className="detail_time_title">
        <Item>服务时间</Item>
      </List>
      <div className="detail_time_content">
        {
          data.split('\\n').map((item, i) => <p key={i}>{item}</p>)
        }
      </div>
    </div>
  );
};

export default DetailTime;
