import { Router as HashRouter, Route, Switch } from "react-router-dom";

import "antd/dist/antd.min.css";
import "../common/common.css";
import RouterMap from "./routerMap";
import Login from "pages/login/login";
import Page from "router/index";
import hashHistory from "router/history";
console.log("hashHistory", hashHistory);

const getRouter = () => (
  <HashRouter history={hashHistory}>
    <Switch>
      <Route path="/IndexBody" component={RouterMap.IndexBody} />
      {/* <Route path="/project" component={RouterMap.project} />
      <Route path="/IndexBody" component={RouterMap.IndexBody} />
      <Route path="/site" component={RouterMap.site} /> */}
      {/* <Route path="/projectDetail" component={RouterMap.projectDetail} /> */}
      <Login />
      <Main>
        <Route>
            <Page />
        </Route>
      </Main>
    </Switch>
  </HashRouter>
);
export default getRouter;

class Main extends Component{
  constructor(){
    super();

  }

  render(){
    let url=window.sessionStorage.getItem("menuList");
    let res=url&&url.map((val)=>{
      return <Route path={val.url} component={val.code} /> 
    })
    
    return (
      res
    );
  }
}
