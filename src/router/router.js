import { Router, Route, Switch, Redirect } from "react-router-dom";
import "antd/dist/antd.min.css";
import "../common/common.css";
import RouterMap from "./routerMap";
import hashHistory from "router/history";

function Main() {
  let children = JSON.parse(window.sessionStorage.getItem("menuList"));
  return (
    <Switch>
      <main className="app-main">
        {children &&
          children.map(v => {
            return (
              <Route
                key={v.code}
                path={"/app" + v.url}
                component={RouterMap[v.code]} 
              />
            );
          })}
        {children &&
          children.map(v => {
            return (
              <Redirect
                to={v.to}
                from={v.from}
                key={v.code}
                path={RouterMap[v.code]}
              />
            );
          })}
      </main>
    </Switch>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    
  }


  render() {
    return (
        <Router history={hashHistory}>
          <Switch>
            <Route path="/app" component={RouterMap.app}/>
            <Main path="/app"/>
            <Route exact path="/" component={RouterMap.login} />
            <Redirect from={"*"} to={'/'} />
          </Switch>
        </Router>
    );
  }
}

export default App;
