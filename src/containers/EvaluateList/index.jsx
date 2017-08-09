import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from '../../components/Header/index';
import EvaluateList from '../../components/EvaluateList/index';

// let Evaluate = (props) =>{
//     const id = props.routeParams.id;
// 	console.log('Evaluate',props);
//     return (
//          <div>
//                 <EvaluateList body={{_id:id}} />
//                 <Header title="评价列表"/>
//          </div>
//     );
// };

// Evaluate.shouldComponentUpdate = (nextProps)=>{
// 	console.log('nextProps',nextProps)
// 	return false;
// }
@withRouter
class Evaluate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const id = this.props.match.params.id;
    // console.log('id',id)
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
