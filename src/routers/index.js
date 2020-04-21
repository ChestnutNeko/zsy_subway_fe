import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import RouterView from './routerView';

class Router extends Component {
    render() {
        return(
            <HashRouter>
                <Switch>
                    {/* <Route path="/" render={() => <Redirect to={Home} />} exact key="firstPage" /> */}
                    <Route path='/' component={RouterView}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
export default Router;