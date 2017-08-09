import React, { Component, PropTypes } from 'react';
import { NavBar } from 'antd-mobile';

const header = (props, context) => (
  <div className="header_contain header_other_contain">
    <NavBar
      onLeftClick={() => {
        if (props.backTo) {
          context.router.history.push(props.backTo);
        } else {
          context.router.history.goBack();
        }
      }}
      rightContent={
        props.rightContent
          ? props.rightContent
          : null
      }
    >
      {
        props.title
      }
    </NavBar>
  </div>
);

header.contextTypes = {
  router: PropTypes.object,
};


header.PropTypes = {
  title: PropTypes.string.isRequired,
  backTo: PropTypes.string,
  rightContent: PropTypes.element,
};


export default header;
