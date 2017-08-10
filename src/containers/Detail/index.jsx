import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';

import Header from '../../components/Header/index';
import LoadingWrap from '../../components/LoadingWrap/index';
import FixedButton from '../../components/FixedButton/index';

import DetailCollect from './subpage/DetailCollect/index';
import DetailMsg from './subpage/DetailMsg/index';
import PhoneCallAndMap from './subpage/PhoneCallAndMap/index';
import DetailEvaluate from './subpage/DetailEvaluate/index';
import DetailTime from './subpage/DetailTime/index';

import fetchData from '../../until/fetchData';
import { detailMesUrl } from '../../config/index';

import './index.less';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
});

@withRouter
@connect(
  mapStateToProps, 
  mapDispatchToProps
)
class Detail extends Component {
 static contextTypes = {
	    router: PropTypes.object,
 }
 constructor(props, context) {
   super(props, context);
   this.state = {
     detailId: props.match.params.id,
     data: {},
   };
 }
 render() {
   const { data, detailId } = this.state;
   const { router } = this.context;
   const { userInfo } = this.props;
   return (
     <div>
       <LoadingWrap loading={Object.keys(data).length === 0}>
         <DetailMsg data={data} />
         <PhoneCallAndMap data={data} />
       </LoadingWrap>

       <WhiteSpace size="md" />

       <DetailEvaluate detailId={detailId} />

       <WhiteSpace size="md" />

       <LoadingWrap loading={Object.keys(data).length === 0}>
         <DetailTime data={data.time} />
       </LoadingWrap>

       <WhiteSpace size="md" />

       <FixedButton
         options={[
           {
             name: '我也要点评',
             disabledName: '登陆后即可点评',
             light: true,
             onClick: () => {
               router.history.push(`/evaluate/${detailId}`);
             },
             disabledClick: () => {
               router.history.push('login');
             },
             disabled: Object.keys(userInfo).length === 0,
           },
         ]}
       />

       <Header
         title="详情页"
         rightContent={
           <DetailCollect
             userInfo={userInfo}
             collected={data.collected}
             detailId={detailId}
           />
         }
       />
     </div>
   );
 }
 componentDidMount() {
   const { data, detailId } = this.state;
   const { userInfo } = this.props;
   let obj = {
     _id: detailId,
   };
   if (userInfo) {
     obj = Object.assign(obj, {
       userId: userInfo.openId,
     });
   }
   fetchData(detailMesUrl, obj).then((data) => {
     this.setState({
       data: data.data,
     });
   });
 }
}


export default Detail;
