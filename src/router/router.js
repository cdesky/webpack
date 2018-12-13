import React from "react";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
 
import 'antd/dist/antd.min.css'
import '../common/common.css'

import Home from "pages/Home/Home";
import Project from "pages/project/project";
import Site from "pages/site/site";
 
const getRouter = () => ( 
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">任务</Link>
        </li>
        <li>
          <Link to="/project">项目</Link>
        </li>
        <li>
          <Link to="/site">中心</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/project" component={Project} />
        <Route path="/site" component={Site} />
      </Switch>
    </div>
  </Router>
);

export default getRouter;
