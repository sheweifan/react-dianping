import React, { Component, PropTypes } from 'react';
import { Grid } from 'antd-mobile';

import './index.less';

const url = 'http://os6x9ewy1.bkt.clouddn.com/';

const data = [
  {
    icon: `${url}icon_1.png`,
    text: '电影',
    category: 'dianying',
  },
  {
    icon: `${url}icon_2.png`,
    text: '度假出行',
    category: 'dujiachuxing',
  },
  {
    icon: `${url}icon_3.png`,
    text: '火锅',
    category: 'huoguo',
  },
  {
    icon: `${url}icon_4.png`,
    text: '酒店',
    category: 'jiudian',
  },
  {
    icon: `${url}icon_5.png`,
    text: '丽人',
    category: 'liren',
  },
  {
    icon: `${url}icon_6.png`,
    text: '美食',
    category: 'meishi',
  },
  {
    icon: `${url}icon_7.png`,
    text: '外卖',
    category: 'waimai',
  },
  {
    icon: `${url}icon_8.png`,
    text: '休闲娱乐',
    category: 'xiuxianyule',
  },
  {
    icon: `${url}icon_9.png`,
    text: '周边游',
    category: 'zhoubianyou',
  },
  {
    icon: `${url}icon_10.png`,
    text: '足疗按摩',
    category: 'zuliaoanmo',
  },

];


const LinkGrid = (props, context) => (
  <Grid
    columnNum={5}
    data={data}
    className="index_link_grid"
    onClick={(el, index) => {
      // context.router.push();
      // context.router.push({ 
      // 	pathname: '/search/'+data[index].category,
      // 	state: {info:data[index].text} 
      // });
      context.router.push({
        pathname: `/search/${encodeURIComponent(data[index].text)}`,
        state: { info: data[index].text },
      });
    }}
  />
);

LinkGrid.contextTypes = {
  router: PropTypes.object,
};

export default LinkGrid;


// li.jingdian {
//     background-image: url(138012-20161022224203170-1528315005.png);
// }
// li.ktv {
//     background-image: url(http://images2015.cnblogs.com/blog/138012/201610/138012-20161022224309185-1519181081.png);
// }
// li.gouwu {
//     background-image: url(http://images2015.cnblogs.com/blog/138012/201610/138012-20161022224150045-30962603.png);
// }
// li.shenghuofuwu {
//     background-image: url(http://images2015.cnblogs.com/blog/138012/201610/138012-20161022224237513-176380794.png);
// }
// li.jianshenyundong {
//     background-image: url(http://images2015.cnblogs.com/blog/138012/201610/138012-20161022224256732-145714491.png);
// }
// li.meifa {
//     background-image: url(http://images2015.cnblogs.com/blog/138012/201610/138012-20161022224222123-643915682.png);
// }


// li.qinzi {
//     background-image: url(http://images2015.cnblogs.com/blog/138012/201610/138012-20161022224229451-475201730.png);
// }

// li.xiaochikuaican {
//     background-image: url(http://images2015.cnblogs.com/blog/138012/201610/138012-20161022224244545-1583700011.png);
// }
// li.zizhucan {
//     background-image: url(http://images2015.cnblogs.com/blog/138012/201610/138012-20161022224113560-1012968440.png);
// }
// li.jiuba {
//     background-image: url(http://images2015.cnblogs.com/blog/138012/201610/138012-20161022224210732-490953965.png);
// }
