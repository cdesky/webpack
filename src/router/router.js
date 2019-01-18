import { Router as HashRouter, Route, Switch } from "react-router-dom";

import "antd/dist/antd.min.css";
import "../common/common.css";
import RouterMap from "./routerMap";
// import Login from "pages/login/login";
import Page from "router/index";
import hashHistory from "router/history";
console.log("hashHistory", hashHistory);
 

const getRouter = () => (
  <HashRouter history={hashHistory}> 
    {/* {hashHistory.location.pathname === "/login" ||
      hashHistory.location.pathname === "/" ? (
       <Login />
      ) : (
        null
      )} */}
      <Switch> 
        <Route path="/login" component={RouterMap.login} />
        <Route path="/project" component={RouterMap.project} />
        <Route path="/IndexBody" component={RouterMap.IndexBody} />
        <Route path="/site" component={RouterMap.site} />
        <Route path="/projectDetail" component={RouterMap.projectDetail} />
        <Page />
      </Switch> 
  </HashRouter>
);

export default getRouter;
