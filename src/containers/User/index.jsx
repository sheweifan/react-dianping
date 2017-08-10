import React, { Component, PropTypes } from 'react';
import { Button, WingBlank, WhiteSpace, List, Icon } from 'antd-mobile';
import { connect } from 'react-redux';

import Header from '../../components/Header/index';
import UserTop from './subpage/UserTop/index';

import Login from '../../HOC/Login';

import { updateUserInfo } from '../../actions/userinfo';
import { removeItem } from '../../until/localStorage';


import icon_collected from '../../static/icons/collected.svg';

const Item = List.Item;

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: data => dispatch(updateUserInfo(data)),
});

@connect(mapStateToProps, mapDispatchToProps)
@Login
class User extends Component {
    static contextTypes = {
      router: PropTypes.object,
    }
    constructor(props, context) {
      super(props, context);
    }
    render() {
      const { userInfo, updateUserInfo } = this.props;
      const { router } = this.context;
      return (
        !userInfo || Object.keys(userInfo).length === 0
          ? <div>未登录</div>
          : <div>
            <UserTop userInfo={userInfo} />
            <WhiteSpace size="lg" />
            <List>
              <Item
                arrow="horizontal"
                thumb={<Icon type={icon_collected} />}
                onClick={() => router.history.push('/user/collect')}
              >
                我的收藏
              </Item>
            </List>
            <WingBlank size="md">
              <WhiteSpace size="md" />
              <Button
                onClick={() => {
                  removeItem('userInfo');
                  updateUserInfo({});
                  router.history.replace('/');
                }}
              >
                退出登陆
              </Button>
              <WhiteSpace size="md" />
            </WingBlank>
            <Header title="个人中心" />
          </div>
      );
    }
}


export default User;

