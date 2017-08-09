import React from 'react';

import { List, Icon } from 'antd-mobile';

const Item = List.Item;

import runToMap from '../../../../until/runToMap';

import iconAddress from '../../../../static/icons/address.svg';
import iconPhone from '../../../../static/icons/phone.svg';

const PhoneCallAndMap = (props) => {
  let { coordinate, phone, address } = props.data;
  if (coordinate) {
    coordinate = coordinate.split(',');
  }
  return (
    <List className="phonecall_and_map">
      <Item
        arrow="horizontal"
        onClick={() => runToMap(coordinate[0], coordinate[1], address)}
        thumb={<Icon type={iconAddress} />}
      >
        {address}
      </Item>
      <Item
        arrow="horizontal"
        thumb={<Icon type={iconPhone} />}
      >
        <a href={`tel://${phone}`}>{phone}</a>
      </Item>
    </List>
  );
};

export default PhoneCallAndMap;
