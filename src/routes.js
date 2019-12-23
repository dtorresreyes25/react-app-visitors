import React from 'react';
import { Switch, Redirect } from 'react-router-dom';


import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout, Dashboard as DashboardLayout } from './layouts';


import {
    Dashboard as DashboardView,
    VisitorList as VisitorListView,
    Account as AccountView,
    SignIn as SignInView,
    NotFound as NotFoundView,
    AddForm as NewVisitFormView
} from './views';


const Routes = () => {
    return (

        <Switch>
      <Redirect
        exact
        from="/"
        to="/resumen"

      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={DashboardLayout}
        path="/resumen"
        privateRoute
      />
       <RouteWithLayout
        component={NewVisitFormView}
        exact
        layout={DashboardLayout}
        path="/visitas/añadir"
        privateRoute
      />
      <RouteWithLayout
        component={VisitorListView}
        exact
        layout={DashboardLayout}
        path="/visitas"
        privateRoute
      />

      <RouteWithLayout
        component={AccountView}
        exact
        layout={DashboardLayout}
        path="/cuenta"
        privateRoute
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/autenticar"
        publicRoute
        restricted
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/no-encontrado"
        publicRoute
      />
      <Redirect to="/no-encontrado" />
    </Switch>
    );
};

export default Routes;