import { Router, Route, Switch,Redirect } from "react-router-dom";
import "antd/dist/antd.min.css";
import "../common/common.css";
import RouterMap from "./routerMap";
import hashHistory from "router/history";
import { Component } from "react";
console.log("hashHistory", hashHistory);

function Main() {
  let children = JSON.parse(window.sessionStorage.getItem("menuList"));
  return (
    <Switch>
    <main className="app-main">
      {children &&
        children.map(v => { 
          return (
            <Route
              exact
              key={v.code}
              path={RouterMap[v.code]}
              component={RouterMap[v.code]}
            />
          );
        })}
         {children &&
        children.map(v => { 
          return (
            <Redirect
              key={v.code}
              path={RouterMap[v.code]}
              to={v.url}
            />
          );
        })}
    </main>
    </Switch>
  );
}
function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Switch>
          <Route path="/app" component={RouterMap.app} />
          <Main exact path="/app"/>
          <Route  path="/" component={RouterMap.login} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
