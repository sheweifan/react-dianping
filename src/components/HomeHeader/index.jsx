import React, { Component, PropTypes } from 'react';
import { NavBar, Icon } from 'antd-mobile';

import SearchInput from '../SearchInput/index';

import icon_my from '../../static/icons/my.svg';

import './index.less';

const HomeHeader = (props, context) => {
  const { userInfo, enterChange, defaultValue } = props;
  const { router } = context;
  return (
    <div className="header_contain header_home_contain">
      <NavBar
        mode="light"
        iconName=""
      >
        <div className="header_home_from">
          <SearchInput enterChange={enterChange} defaultValue={defaultValue} />
          <Icon type="search" size="xs" className="header_home_icon" />
          <span className="header_mycenter_btn">
            {
              Object.keys(userInfo).length !== 0
                ? <img src={userInfo.avatar} onClick={() => router.history.push('/user')} />
                : <Icon type={icon_my} size="md" onClick={() => router.history.push('/login')} />
            }
          </span>
        </div>
      </NavBar>
    </div>
  );
};

HomeHeader.contextTypes = {
  router: PropTypes.object,
};

HomeHeader.PropTypes = {
  enterChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  userInfo: PropTypes.object,
};

export default HomeHeader;
