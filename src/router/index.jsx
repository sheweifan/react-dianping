import React from 'react';
// import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';


import App from '../containers/App/index';
import Home from '../containers/Home/index';
import Search from '../containers/Search/index';
import Detail from '../containers/Detail/index';
import EvaluateList from '../containers/EvaluateList/index';
import Evaluate from '../containers/Evaluate/index';
import Login from '../containers/Login/index';
import User from '../containers/User/index';
import UserCollect from '../containers/UserCollect/index';
import Registe from '../containers/Registe/index';

import NotFound from '../containers/NotFound/index';


const AppRouter = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search/:category/:keyword" component={Search} />
        <Route path="/search/:category/" component={Search} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/evaluateList/:id" component={EvaluateList} />
        <Route path="/evaluate/:id" component={Evaluate} />
        <Route path="/login" component={Login} />
        <Route path="/registe" component={Registe} />
        <Route exact path="/user" component={User} />
        <Route path="/user/collect" component={UserCollect} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>
);

// <Route path="*" component={NotFound} />

export default AppRouter;
