import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';

const Header = (props, context) => {
  const { router } = context;
  return (<div className="header_contain header_other_contain">
    <NavBar
      onLeftClick={() => {
        if (props.backTo) {
          router.history.push(props.backTo);
        } else {
          router.history.goBack();
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
  </div>)
};

Header.contextTypes = {
  router: PropTypes.object,
};


Header.PropTypes = {
  title: PropTypes.string.isRequired,
  backTo: PropTypes.string,
  rightContent: PropTypes.element,
};


export default Header;
