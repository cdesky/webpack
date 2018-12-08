import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
 

import Home from 'pages/Home/Home';
import Project from 'pages/project/project';
 


const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to={{
                    pathname:'/Home',
                    query:'',
                    state:{}
                }}>首页</Link></li>
                <li><Link to={{
                    pathname:`/Project`,
                    query:'',
                    state:{}
                }}>project</Link></li>
            </ul>
            <Switch>
                <Route exact path="/Home" component={Home}/>
                <Route path="/Project" component={Project}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;