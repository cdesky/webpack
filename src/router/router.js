import { Router as HashRouter, Route, Switch } from "react-router-dom";

import "antd/dist/antd.min.css";
import "../common/common.css";
import RouterMap from "./routerMap";
import Login from "pages/login/login";
import Page from "router/index";
import hashHistory from "router/history";
console.log("hashHistory", hashHistory);

function Main() {
  const { children } = JSON.parse(window.sessionStorage.getItem("menuList"));
  return (
    <main className="ccp-app-main">
      <Switch>
        {children.map(v => {
          return (
            <Route key={v.url} path={v.url} component={componentMap[v.code]} />
          );
        })}

        {children.length > 0 ? <Route to="/404" /> : <Route to="/404" />}
      </Switch>
    </main>
  );
}

const getRouter = () => (
  <HashRouter history={hashHistory}>
    <Switch>
      <Route path="/IndexBody" component={RouterMap.IndexBody} />
      <Route path="/404" exact>
        <h1 style={{ textAlign: "center", paddingTop: 200 }}>找不到页面</h1>
      </Route>
      {/* <Route path="/project" component={RouterMap.project} />
      <Route path="/IndexBody" component={RouterMap.IndexBody} />
      <Route path="/site" component={RouterMap.site} /> */}
      {/* <Route path="/projectDetail" component={RouterMap.projectDetail} /> */}
      <Login />
      <Page>
        {/* <Route> */}
          <Main />
        {/* </Route> */}
      </Page>
    </Switch>
  </HashRouter>
);
export default getRouter;
