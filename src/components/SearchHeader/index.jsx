import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon } from 'antd-mobile';

import SearchInput from '../SearchInput/index';
import icon_my from '../../static/icons/my.svg';

import './index.less';

const SearchHeader = (props, context) => {
  const { router } = context;
  const { enterChange, defaultValue } = props;
  return (
    <div className="header_contain header_search_contain">
      <NavBar
        mode="light"
        onLeftClick={() => {
          if (props.backTo) {
            router.history.push(props.backTo);
          } else {
            // router.goBack();
            router.history.push('/');
          }
        }}
      >
        <div className="header_search_from">
          <SearchInput enterChange={enterChange} defaultValue={defaultValue} />
          <Icon type="search" size="xs" className="header_search_icon" />
        </div>
      </NavBar>
    </div>
  );
};

SearchHeader.contextTypes = {
  router: PropTypes.object,
};


export default SearchHeader;
