import React from 'react';
import { Router , Route , hashHistory , IndexRoute } from 'react-router';

import App from '../containers/App/index';
import Home from '../containers/Home/index';
import Search from '../containers/Search/index';
import Detail from '../containers/Detail/index';
import EvaluateList from '../containers/EvaluateList/index';
import Login from '../containers/Login/index';
import User from '../containers/User/index';

import NotFound from '../containers/NotFound/index';


let AppRouter = () => (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="search/:category(/:keyword)" component={Search}/>
			<Route path="detail/:id" component={Detail}/>
			<Route path="evaluateList/:id" component={EvaluateList}/>
			<Route path="login" component={Login}/>
			<Route path="user" component={User}/>

			<Route path="*" component={NotFound}/>
		</Route>
	</Router>
)

export default AppRouter;