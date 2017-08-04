import React, { Component, PropTypes } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';

import './index.less';

const ListHeader = props => (
  <div className="list_header">
    <WhiteSpace size="md" />
    <WingBlank size="md">
      {
        props.children
      }
    </WingBlank>
    <WhiteSpace size="sm" />
  </div>
);

ListHeader.PropTypes = {
  children: PropTypes.element.isRequired,
};

export default ListHeader;
