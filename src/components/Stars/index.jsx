import React from 'react'

import { Icon } from 'antd-mobile';


import './index.less';

import icon_star from '../../static/icons/star.svg'

let Stars = (props)=>{

  var {count,className} = props;

  var stats = ['b','i','t','c','h'].map((item,i)=>{
      return <Icon className={ i+1<=count?'star_item active':'star_item' } key={i} type={icon_star} />

  })
  return (
    <span className={className?className+' star_list':'star_list'}>
      {
        stats
      }
    </span>
  )
}


export default Stars;
