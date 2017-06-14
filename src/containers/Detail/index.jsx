import React from 'react'
import { WhiteSpace } from 'antd-mobile';

import Header from '../../components/Header/index';
import LoadingWrap from '../../components/LoadingWrap/index';
import DetailMsg from './subpage/DetailMsg/index';
import PhoneCallAndMap from './subpage/PhoneCallAndMap/index';
import DetailEvaluate from './subpage/DetailEvaluate/index';
import DetailTime from './subpage/DetailTime/index';

import fetchData from '../../until/fetchData';
import { detailMesUrl } from '../../config/index';

import './index.less';
class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);

        // console.log()
        this.state={
          detailId:props.routeParams.id,
          data:{}
        }
    }
    render() {
        var {data,detailId} = this.state;

        return (
         	<div>
          
            <LoadingWrap loading={ Object.keys(data).length ===0 }>
              <DetailMsg data={data} />
              <PhoneCallAndMap data={data} />
            </LoadingWrap>

            <WhiteSpace size="md" />

            <DetailEvaluate detailId={detailId} />

            <WhiteSpace size="md" />
            
            <LoadingWrap loading={ Object.keys(data).length ===0 }>
              <DetailTime data={data.time}/>
            </LoadingWrap>

            <WhiteSpace size="md" />

            <Header title="详情页" />
          </div>
        )
    }
    componentDidMount(){

      fetchData(detailMesUrl,{
        _id:this.state.detailId
      }).then(data=>{
        this.setState({
          data:data.data
        })
      })

    }
}


export default Detail;
