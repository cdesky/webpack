import React from "react";

import { BrowserRouter as Router, Route, Switch, Link ,Redirect} from "react-router-dom";
 
import 'antd/dist/antd.min.css';
import '../common/common.css';
import RouterMap from './routerMap';
 
const getRouter = () => ( 
  <Router>
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
        <Route path="/project" component={RouterMap.project} exact/>
        <Route path="/site" component={RouterMap.site} exact/> 
        <Route path="/projectDetail" component={RouterMap.projectDetail} exact/> 
        {/* <Redirect to={RouterMap.home} from={RouterMap.home} exact/>
        <Redirect to={RouterMap.project} from={RouterMap.project} exact/>
        <Redirect to={RouterMap.site} from={RouterMap.site} exact/> */}
      </Switch>
    </div>
  </Router>
);

export default getRouter;
