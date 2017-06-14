import React,{Component} from 'react';
import { Grid } from 'antd-mobile';

import './index.less';

const url = 'http://images2015.cnblogs.com/blog/138012/201610/';

let data = [
	{
		icon: url + '138012-20161022224203170-1528315005.png',
		text:'景点',
		category:'jingdian'
	},
	{
		icon: url + '138012-20161022224309185-1519181081.png',
		text:'KTV',
		category:'KTV'
	},
	{
		icon: url + '138012-20161022224150045-30962603.png',
		text:'购物',
		category:'gouwu'
	},
	{
		icon: url + '138012-20161022224237513-176380794.png',
		text:'生活服务',
		category:'shenghuofuwu'
	},
	{
		icon: url + '138012-20161022224256732-145714491.png',
		text:'健身运动',
		category:'jianshenyundong'
	},
	{
		icon: url + '138012-20161022224222123-643915682.png',
		text:'美发',
		category:'meifa'
	},
	{
		icon: url + '138012-20161022224229451-475201730.png',
		text:'亲子',
		category:'qinzi'
	},
	{
		icon: url + '138012-20161022224244545-1583700011.png',
		text:'小吃快餐',
		category:'xiaochikuaican'
	},
	{
		icon: url + '138012-20161022224244545-1583700011.png',
		text:'自助餐',
		category:'zizhucan'
	},
	{
		icon: url + '138012-20161022224210732-490953965.png',
		text:'酒吧',
		category:'jiuba'
	}

];



let LinkGrid = (props,context) => (
	<Grid 
		columnNum={5}
		data={data}
		className="index_link_grid"
		onClick={ (el,index)=>{
			// context.router.push();
			context.router.push({ 
				pathname: '/search/'+data[index].category,
				state: {info:data[index].text} 
			});
		} }
	/>
)

LinkGrid.contextTypes = {
    router: Object
}

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
