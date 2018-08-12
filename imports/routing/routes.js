import React from 'react';
import history from './history';
import { Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Login from '../ui/Login';
import Register from '../ui/Register';
import NotFound from '../ui/NotFound';


// AUTHENTICATED PAGE REDIRECTS
// const pathname = createBrowserHistory().location.pathname;
// const isUnauthenticatedPages = ['/', '/register'];
// const isAuthenticatedPage = [];

// export const onAuthChange = (isAuthenticated) => {
// };

// ROUTES
export const renderRoutes = () => (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
);
