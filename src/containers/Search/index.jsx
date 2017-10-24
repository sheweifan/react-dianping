import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { MallListUrl } from '../../config/index';
import SearchHeader from '../../components/SearchHeader/index';
import MallList from '../../components/MallList/index';

@withRouter
class Search extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const { match, location } = this.props;
    const { router } = this.context;

    const param = match.params;
    const keyword = param.keyword;
    const category = param.category;

    const info = location.state ? location.state.info : category;
    const headerInfo = keyword ? `搜索"${keyword}"的结果` : `分类"${info}"`;
    const url = MallListUrl;
    const obj = {};

    if (keyword) {
    obj.keyword = keyword;
    }

    if (category) {
    obj.category = category;
    }

    return (
    <div>
      <MallList
      renderHeader={() => headerInfo}
      body={obj}
      />
      <SearchHeader defaultValue={param.keyword} enterChange={(e) => { router.history.push(`/search/all/${e}`); }} />
    </div>
  );
  }
}

export default Search;
