import React from 'react';
import history from './history';
import { Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Login from '../ui/Login';
import Register from '../ui/Register';
import Dashboard from '../ui/Dashboard';
import NewPost from '../ui/NewPost';
import Post from '../ui/Post';
import NotFound from '../ui/NotFound';

// authenticated page redirects
const unauthenticatedPages = ['/', '/register'];
const authenticatedPages = ['/dashboard', '/newpost', '/post/:id'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.push('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push('/');
  }
}

// ROUTES
export const renderRoutes = () => (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/newpost" component={NewPost}/>
        <Route exact path="/post/:id" component={Post}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
);
