import React from "react";

<<<<<<< HEAD
import { Router, Route, Switch, Link ,Redirect} from "react-router-dom";
=======
import { Router  as HashRouter , Route, Switch, Link ,Redirect} from "react-router-dom";
>>>>>>> c99b8f7ecf8d44e193252fd33daec6fff355d23c
 
import 'antd/dist/antd.min.css';
import '../common/common.css';
import RouterMap from './routerMap';

import hashHistory from 'router/history';

const getRouter = () => ( 
  <HashRouter  history={hashHistory}>
    <div>
      <ul>
        <li>
          <Link to="/">任务</Link>
        </li>
        <li>
          <Link to="/project">项目</Link>
          <ul>
            <li>
              <Link to="/projectDetail">项目详情</Link>
            </li>  
          </ul>
        </li>  
        <li>
          <Link to="/site">中心</Link> 
        </li>
      </ul>
      <Switch>
        <Route path="/" component={RouterMap.home} exact/>
        <Route path="/project" component={RouterMap.project} />
        <Route path="/site" component={RouterMap.site} /> 
        <Route path="/projectDetail" component={RouterMap.projectDetail} /> 
      </Switch>
    </div>
  </HashRouter >
);

export default getRouter;
