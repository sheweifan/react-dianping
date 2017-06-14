import React from 'react'

import { List } from 'antd-mobile'
const Item = List.Item;

import './index.less';

let DetailTime = (props)=>{
  let {data} = props;
  // console.log(data);
  return (
    <div>
      <List className="detail_time_title">
        <Item>
          服务时间
        </Item>
      </List>
      <div className="detail_time_content">
        {
          data.split('\\n').map((item,i)=><p key={i}>{item}</p>)
        }
      </div>
    </div>
  )
}

export default DetailTime;
