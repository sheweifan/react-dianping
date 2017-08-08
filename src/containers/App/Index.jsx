import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getItem } from '../../until/localStorage';
import { updateUserInfo } from '../../actions/userinfo';

// import TransitionGroup from 'react-addons-css-transition-group'

class App extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      loading: true,
    };
    // 处理登陆状态
    const userinfo = getItem('userInfo');
    // console.log('userinfo',userinfo);
    if (userinfo) {
      const { updateUserInfo } = this.props;

      updateUserInfo(JSON.parse(userinfo));
    }
  }
  render() {
    const { loading } = this.state.loading;
    const { appClassName } = this.props;
    return (
      <div className={appClassName ? `app_container ${appClassName}` : 'app_container'}>
        {
          loading
            ? <div>loading...</div>
            : this.props.children
        }
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }
}

const mapStateToProps = state => ({
  appClassName: state.appClassName,
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: data => dispatch(updateUserInfo(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
