import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast, Modal } from 'antd-mobile';

import { collectUrl } from '../config/index';
import postData from '../until/postData';

const alert = Modal.alert;

const CollectHOC = WrappedComponent => class extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      collected: props.collected,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const { userInfo } = this.props;
    const { collected } = this.state;
    // console.log(this.props)
    // console.log('Object.keys(userInfo).length !== 0 && collected ',Object.keys(userInfo).length , collected )
    return (
      <div onClick={this.handleClick}>
        <WrappedComponent collected={Object.keys(userInfo).length !== 0 && collected} />
      </div>
    );
  }
  componentWillReceiveProps(nextprops) {
    // console.log('nextprops',nextprops)
    this.setState({
      collected: nextprops.collected,
    });
  }
  updateCollectState() {
    const { userInfo, detailId } = this.props;
    postData(collectUrl, {
      _id: detailId,
      userId: userInfo.openId,
    })
      .then((data) => {
        const { isOk, changeSuccess } = data;
        if (isOk && changeSuccess) {
          this.setState({
            collected: !this.state.collected,
          });
        }
      });
  }
  handleClick() {
    const { userInfo } = this.props;
    const { collected } = this.state;
    const { router } = this.context;
    const self = this;
    if (Object.keys(userInfo).length === 0) {
      // 未登陆
      Toast.fail('请先登录', 2, () => {
        router.history.push('/login');
      }, true);
    } else if (collected) {
      // 已登陆 && 已收藏
      alert('收藏', '确定取消收藏？', [
        {
          text: '取消',
        },
        {
          text: '确认',
          onPress: () => {
            // console.log('ok')
            self.updateCollectState();
          },
        },
      ]);
    } else {
      // 未收藏
      this.updateCollectState();
    }
  }
};

export default CollectHOC;
