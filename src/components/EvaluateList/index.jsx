import React,{ Component } from 'react';

import EvaluateItem from '../EvaluateItem/index';
import LoadMore from '../LoadMore/index';

import { evaluateListUrl  } from '../../config/index';
import fetchData from '../../until/fetchData';

import  './index.less';

let EvaluateList = (props)=> <LoadMore {...props} childComponent={EvaluateItem} url={evaluateListUrl} />


export default EvaluateList