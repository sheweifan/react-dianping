import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, InputItem, WingBlank, WhiteSpace, Toast, Icon, List } from 'antd-mobile';

import { appClassNameupdateUpdate } from '../../actions/appClassName';
import { updateUserInfo } from '../../actions/userinfo';

import { loginUrl } from '../../config/index';
import postData from '../../until/postData';
import { setItem } from '../../until/localStorage';

import iconPasswordHide from '../../static/icons/password_hide.svg';
import iconPasswordShow from '../../static/icons/password_show.svg';

import './index.less';


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  clearAppClassName: () => dispatch(appClassNameupdateUpdate('')),
  resetAppClassName: () => dispatch(appClassNameupdateUpdate('has_head')),
  updateUserInfo: data => dispatch(updateUserInfo(data)),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Login extends Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    constructor(props, context) {
      super(props, context);
      const location_state = props.location.state || {};
      this.state = {
        phonenum: location_state.phonenum ? location_state.phonenum : '',
        phoneError: false,
        password: '',
        passwordDisplay: false,
      };
    }
    componentWillMount() {
      const { clearAppClassName } = this.props;
      clearAppClassName();
    }
    handleChange(e, _state) {
      this.setState({
        [_state]: e,
      });
    }
    phonenumVerify(e) {
      if (e.replace(/\s/g, '').length < 11) {
        this.setState({
          phoneError: true,
        });
      } else {
        this.setState({
          phoneError: false,
        });
      }
    }
    handleSubmit() {
      const { phonenum, password } = this.state;
      const { router } = this.context;
      const { updateUserInfo } = this.props;
      console.log(router);
      if (phonenum.replace(/\s/g, '').length < 11) {
        Toast.info('请输入正确的手机号码', 2);
        return;
      }
      if (password.length < 6 || password.length > 15) {
        Toast.info('请输入6-15位密码');
        return;
      }
      Toast.loading('登陆中', 0);
      postData(loginUrl, {
        phonenum, password,
      })
        .then((data) => {
          // console.log(data);
          const { isOk, verified } = data;
          Toast.hide();
          if (isOk) {
            if (verified) {
              setItem('userInfo', JSON.stringify(data.data));
              updateUserInfo(data.data);
              Toast.success('登陆成功', 2, () => {
                // router.goBack();
                // console.log(this.props, this.context);
                router.history.push('/');
              });
            } else {
              Toast.fail('密码错误', 2);
            }
          } else {
            Toast.fail('请求失败', 2);
          }
        });
    }
    render() {
      const { phonenum,
        phoneError,
        passwordDisplay,
        password } = this.state;

      return (
        	<div>
          <img src="http://wx3.sinaimg.cn/mw1024/7ed477c8gy1fgib9y1lzyj20b40b4756.jpg" className="login_img" />
          <List className="login_form">
            <InputItem
              placeholder="请输入手机号码"
              type="phone"
              onChange={(e) => { this.handleChange(e, 'phonenum'); this.phonenumVerify(e); }}
              value={phonenum}
              error={phoneError}
              onErrorClick={() => Toast.info('请输入正确的手机号码', 2)}
            >
                        手机号码
            </InputItem>
            <InputItem
              placeholder="请输入密码"
              type={passwordDisplay ? 'text' : 'password'}
              onChange={(e) => { this.handleChange(e, 'password'); }}
              value={password}
              extra={<Icon
                onClick={() => this.setState({ passwordDisplay: !passwordDisplay })}
                type={passwordDisplay ? iconPasswordShow : iconPasswordHide}
              />}
            >
                        密码
            </InputItem>
          </List>
          <WhiteSpace size="md" />
          <WingBlank size="lg">
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                        登陆
            </Button>
            <Link className="goRegister" to="/registe">还没账号？去注册一个吧</Link>
          </WingBlank>
          <WhiteSpace size="md" />
        </div>
      );
    }
    componentWillUnmount() {
      const { resetAppClassName } = this.props;
      resetAppClassName();
    }
}


export default Login;
