import React from 'react';
import { Switch, Redirect } from 'react-router-dom';


import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';


import {
  Dashboard as DashboardView,
  UserList as UserListView,
  Account as AccountView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  AddForm as AddFormView
} from './views';


const Routes = () => {
  return (
    
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"

      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
        privateRoute
      />
       <RouteWithLayout
        component={AddFormView}
        exact
        layout={MainLayout}
        path="/visitor-add"
        privateRoute
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
        privateRoute
      />

      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
        privateRoute
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
        publicRoute
        restricted
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
        publicRoute
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
