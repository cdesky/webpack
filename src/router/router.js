import { Router as HashRouter, Route, Switch } from "react-router-dom";

import "antd/dist/antd.min.css";
import "../common/common.css";
import RouterMap from "./routerMap";
import Login from "pages/login/login";
// import Page from "router/index";
import hashHistory from "router/history";
console.log("hashHistory", hashHistory);
const getRouter = () => (
  <HashRouter history={hashHistory}>
    <div className="wrapBody">
      {/* {hashHistory.location.pathname === "/login" ||
      hashHistory.location.pathname === "/" ? (
        <Login />
      ) : (
        <Page />
      )} */}
      <Login />
      <Switch>
        <Route path="/login" component={RouterMap.login} exact />
        <Route path="/project" component={RouterMap.project} />
        <Route path="/IndexBody" component={RouterMap.IndexBody} />
        <Route path="/site" component={RouterMap.site} />
        <Route path="/projectDetail" component={RouterMap.projectDetail} />
      </Switch>
    </div>
  </HashRouter>
);

export default getRouter;
