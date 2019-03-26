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
              to={"/app/" + RouterMap[v.code]}
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
              to={"/app/" + RouterMap[v.code]}
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

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Switch>
          <Route path="/app" component={RouterMap.app}>
            <Route path='/home' component={<ErrorPage />} />
            <Main />
          </Route>
          <Route path="/" component={RouterMap.login} />
          <Route component={<ErrorPage />} />
        </Switch>
      </Router>
    );
  }
}


class ErrorPage extends Component {
  render() {
    return ("404");
  }
}
export default App;
