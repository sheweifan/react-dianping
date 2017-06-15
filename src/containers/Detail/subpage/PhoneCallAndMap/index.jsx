import React from 'react'

import { List , Icon } from 'antd-mobile'
const Item = List.Item;

import {runToMap} from '../../../../until/runToMap'

import icon_address from '../../../../static/icons/address.svg'
import icon_phone from '../../../../static/icons/phone.svg'

let PhoneCallAndMap = (props)=>{
    let {coordinate,phone,address} = props.data;
    if(coordinate){
        coordinate = coordinate.split(',');
    }
    return (
        <List className="phonecall_and_map">
            <Item
                arrow="horizontal"
                onClick={()=>runToMap(coordinate[0],coordinate[1],address)}
                thumb={<Icon type={icon_address}/>}
            >
                {address}
            </Item>
            <Item
                arrow="horizontal"
                thumb={<Icon type={icon_phone}/>}
            >
                <a href={"tel://"+phone}>{phone}</a>
            </Item>
        </List>
    )
}

export default PhoneCallAndMap;
