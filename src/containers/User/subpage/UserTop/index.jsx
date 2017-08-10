import React, { Component } from 'react';

import './index.less';

const UserTop = (props) => {
  const { avatar, username, phonenum } = props.userInfo;
  const avatarBgStyle = {
    	backgroundImage: `url(${avatar})`,
  };
  return (
    <div className="user_top">
      <div className="bg" style={avatarBgStyle} />
      <div className="img">
        <img src={avatar} />
      </div>
      <p className="username">{ username }</p>
    </div>
  );
};

export default UserTop;
