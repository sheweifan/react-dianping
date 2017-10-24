import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EvaluateItem from '../EvaluateItem/index';
import LoadMore from '../LoadMore/index';

import { evaluateListUrl } from '../../config/index';
import fetchData from '../../until/fetchData';

import './index.less';

const EvaluateList = props => <LoadMore {...props} childComponent={EvaluateItem} url={evaluateListUrl} />;


export default EvaluateList;
