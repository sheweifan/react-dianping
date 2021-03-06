import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import HomeHeader from '../../components/HomeHeader/index';
import Banner from './subpage/Banner/index';
import LinkGrid from './subpage/LinkGrid/index';
import MallList from '../../components/MallList/index';
import ListHeader from '../../components/ListHeader/index';

const Home = (props, context) => {
  const { userInfo } = props;
  const { router } = context;
  return (
    <div>
      <Banner />
      <LinkGrid />
      <MallList renderHeader={() => '猜你喜欢'} body={{ category: 'guess' }} />
      <HomeHeader
        enterChange={(e) => { router.history.push(`/search/all/${encodeURIComponent(e)}`); }}
        userInfo={userInfo}
      />
    </div>
  );
};

Home.contextTypes = {
  router: PropTypes.object,
};


const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

