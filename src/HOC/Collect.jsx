import React, { Component, PropTypes } from 'react';
import { Toast, Modal } from 'antd-mobile';

const alert = Modal.alert;

import { collectUrl } from '../config/index';
import postData from '../until/postData';

const CollectHOC = WrappedComponent => class extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      collected: props.collected,
    };
  }
  updateCollectState() {
    const { userInfo, detailId } = this.props;
    postData(collectUrl, {
      _id: detailId,
      userId: userInfo.openId,
    })
      .then((data) => {
        const { isOk, changeSuccess } = data;
        if (isOk) {
          if (changeSuccess) {
            this.setState({
              collected: !this.state.collected,
            });
          }
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
        router.push('/login');
      }, true);
    } else {
      // 已登陆
      if (collected) {
        // 已收藏
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
  }
  render() {
    const { userInfo } = this.props;
    const { collected } = this.state;
    // console.log(this.props)
    // console.log('Object.keys(userInfo).length !== 0 && collected ',Object.keys(userInfo).length , collected )
    return (
      <div onClick={this.handleClick.bind(this)}>
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
};

export default CollectHOC;
