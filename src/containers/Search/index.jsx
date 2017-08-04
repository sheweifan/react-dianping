import React, { Component, PropTypes } from 'react';

import { MallListUrl } from '../../config/index';
import SearchHeader from '../../components/SearchHeader/index';
import MallList from '../../components/MallList/index';

class Search extends Component {
 static contextTypes = {
	    router: PropTypes.object,
 }

 constructor(props, context) {
   super(props, context);
 }
 render() {
   const { routeParams, location } = this.props;

   const param = routeParams;
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

       <SearchHeader defaultValue={param.keyword} enterChange={(e) => { this.context.router.push(`/search/all/${e}`); }} />
     </div>
   );
 }
}

export default Search;
