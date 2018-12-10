import React from "react";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Home from "pages/Home/Home";
import Project from "pages/project/project";

const getRouter = () => (
  
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/project?name=fas">project</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/project" component={Project} />
      </Switch>
    </div>
  </Router>
);

export default getRouter;
