import React, { Component, PropTypes } from 'react';
import { Toast } from 'antd-mobile';

const Login = WrappedComponent => class extends WrappedComponent {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props, context) {
    super(props, context);
    const { userInfo } = props;
    this.state = {
      logined: Object.keys(userInfo).length > 0,
    };
  }
  render() {
    if (this.state.logined) {
      // 已登陆
      return super.render();
    }
    // 未登陆
    return null;
  }
  componentDidMount() {
    const { router } = this.context;
    if (!this.state.logined) {
      // 未登陆
      Toast.fail('请先登录', 2, () => {
        router.push('/login');
      }, true);
    }
  }
};

export default Login;
