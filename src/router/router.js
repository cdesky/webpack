import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link,withRouter} from 'react-router-dom';

import Home from 'pages/Home/Home';
import project from 'pages/project/project';

const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to={{
                    pathname:'/',
                    query:'',
                    state:{}
                }}>首页</Link></li>
                <li><Link to={{
                    pathname:`/project`,
                    query:'',
                    state:{}
                }}>project</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/project" component={project}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;