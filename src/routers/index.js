import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import RouterView from './routerView';
import Login from '../components/Login';

class Router extends Component {
    render() {
        return(
            <HashRouter>
                <Switch>
                    <Route path="/" component={Login} exact key="firstPage" />
                    <Route path="/res" component={Login} exact key="firstPage" />
                    <Route component={RouterView}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
export default Router;