import { Router, Route, Switch, Redirect } from "react-router-dom";
import "antd/dist/antd.min.css";
import "../common/common.css";
import RouterMap from "./routerMap";
import hashHistory from "router/history";
import { Component } from "react";
console.log("hashHistory", hashHistory);

function Main() {
  let children = JSON.parse(window.sessionStorage.getItem("menuList"));
  return (
    <main className="app-main">
      {children &&
        children.map(v => {
          return (
            <Route
              key={v.code}
              path={"/app/" + RouterMap[v.code]}
              component={RouterMap[v.code]}
            />
          );
        })}
      {children &&
        children.map(v => {
          return (
            <Redirect
              key={v.code}
              path={"/app/" + RouterMap[v.code]}
              component={RouterMap[v.code]}
            />
          );
        })}
      {children.length < 0 ? <Route to="/404" /> : <Route to="/404" />}
    </main>
  );
}

const getRouter = () => (
  <Router history={hashHistory}>
    <Switch>
      <Route path="/app" component={RouterMap.app}>
        <Main />
      </Route>
      <Route path="/" component={RouterMap.login} />
      <Route component={<ErrorPage />} />
    </Switch>
  </Router>
);

class ErrorPage extends Component {
  render() {
    return "404";
  }
}
export default getRouter;
