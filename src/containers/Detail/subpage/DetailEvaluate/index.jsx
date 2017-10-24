import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { List, Icon } from 'antd-mobile';

const Item = List.Item;

import LoadingWrap from '../../../../components/LoadingWrap/index';
import EvaluateItem from '../../../../components/EvaluateItem/index';

import { evaluateListUrl } from '../../../../config/index';
import fetchData from '../../../../until/fetchData';

@withRouter
class DetailEvaluate extends Component {
 static contextTypes = {
   router: PropTypes.object,
 }
 constructor(props, context) {
   super(props, context);
   // console.log(props)
   this.state = {
     data: [],
     detailId: props.match.params.id,
   };
 }
 render() {
   const { data, pageTotal, detailId } = this.state;
   const { router } = this.context;
   return (
     <LoadingWrap loading={data.length === 0}>
       <div className="detail_evaluate">
         <List className="detail_evaluate_title">
           <Item
             arrow="horizontal"
             extra="查看全部"
             onClick={() => router.history.push(`/evaluateList/${detailId}`)}
           >
							网上点评（
             {
               pageTotal
             }
							条）
           </Item>
         </List>
         {
           data.length
             ? ['fuck', 'you'].map((item, i) => {
               const _data = data[i];
               return <EvaluateItem key={_data._id} {..._data} />;
             })
             : null
         }

       </div>
     </LoadingWrap>
   );
 }
 componentDidMount() {
   const { detailId } = this.state;

   fetchData(evaluateListUrl, {
     _id: detailId,
   }).then((data) => {
     // console.log(data);
     if (data.isOk) {
       this.setState({
         data: data.data,
         pageTotal: data.pageTotal,
       });
     }
   });
 }
}

export default DetailEvaluate;
