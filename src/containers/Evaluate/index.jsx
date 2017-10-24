import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { WhiteSpace, List, TextareaItem, Toast } from 'antd-mobile';
import { connect } from 'react-redux';

import Header from '../../components/Header/index';
import Stars from '../../components/Stars/index';

import StarsEdit from './subpage/StarsEdit/index';

import fetchData from '../../until/fetchData';
import { evaluateUrl } from '../../config/index';

import './index.less';

const Item = List.Item;

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({});
const default_val = 5;

@withRouter
@connect(
  mapStateToProps, 
  mapDispatchToProps
)
class Evaluate extends Component {
  static contextTypes = {
  router: PropTypes.object,
  }
  constructor(props, context) {
   super(props, context);
   this.state = {
     context: '',
     count: default_val,
   };
  }
  handleSubmit() {
   const { count, context } = this.state;
   const { router } = this.context;
   const { id } = this.props.match.params;

   Toast.loading('正在提交', 0);

   fetchData(evaluateUrl, {
     ...this.state,
   }).then((data) => {
     console.log(data);
     if (data.isOk) {
       if (data.submitSuccess) {
         Toast.hide();
         Toast.success('评价成功', 1, () => {
           router.history.goBack();
         });
       }
     }
   });
  }
  render() {
   const { userInfo } = this.props;
   const { context } = this.state;
   const { router } = this.context;
   const { id } = this.props.match.params;
   if (Object.keys(userInfo).length === 0) {
     router.history.push(`/detail/${id}`);
   }
   return (
     <div className="evaluate">
       <List>
         <StarsEdit
           changEnd={(count) => { this.setState({ count }); }}
           defaultValue={default_val}
         />
         <TextareaItem
           rows={4}
           count={100}
           value={context}
           placeholder={'请输入内容'}
           onChange={(e) => { this.setState({ context: e }); }}
         />
       </List>
       <Header
         title={'请输入您的评价'}
         rightContent={
           <span className="" onClick={this.handleSubmit.bind(this)}>发布</span>
         }
       />
     </div>
   );
  }
}


export default Evaluate;
