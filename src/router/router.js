import { Router  as HashRouter , Route, Switch, Link } from "react-router-dom";
 
import 'antd/dist/antd.min.css';
import '../common/common.css';
import RouterMap from './routerMap';
import Login from 'pages/login/login'

import hashHistory from 'router/history';
console.log(hashHistory);
const getRouter = () => ( 
  <HashRouter  history={hashHistory}> 
    <div className="wrapBody">
    {hashHistory.location.pathname==='/login' || hashHistory.location.pathname==='/' ? <Login />:  
      <ul>
        <li>
          <Link to="/home">任务</Link>
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
      }
      <Switch>
        <Route path="/login" component={RouterMap.login} exact/>
        <Route path="/home" component={RouterMap.home} />
        <Route path="/project" component={RouterMap.project} />
        <Route path="/site" component={RouterMap.site} /> 
        <Route path="/projectDetail" component={RouterMap.projectDetail} /> 
      </Switch>
    </div>
  </HashRouter >
);

export default getRouter;
