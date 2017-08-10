import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from '../../components/Header/index';
import EvaluateList from '../../components/EvaluateList/index';

@withRouter
class Evaluate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const id = this.props.match.params.id;
    return (
      <div>
        <EvaluateList body={{ _id: id }} />
        <Header title="评价列表" />
      </div>
    );
  }
  // TODO fix 路由跳转重复渲染
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.routeParams.id !== this.props.routeParams.id;
  }
}


export default Evaluate;
