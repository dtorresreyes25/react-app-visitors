import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components";
import {
  Main as MainLayout,
  Minimal as MinimalLayout,
  Dashboard as DashboardLayout
} from "./layouts";

import {
  Dashboard as DashboardView,
  VisitorList as VisitorListView,
  Account as AccountView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  AddForm as NewVisitFormView
} from "./views";

import { requestVisits, saveVisits } from "./store/";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isPending: state.isPending,
    visits: state.visits,
    error: state.error,
    isSaving: state.isSaving,
    savedVisitId: state.savedVisitId,
    errorOnSave: state.errorOnSave
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestVisits: token => dispatch(requestVisits(token)),
    onUpdateVisits: (token, visits) => dispatch(saveVisits(token, visits))
  };
};

const Routes = props => {
  const { isPending,visits,error,isUpdatingVisit,isVisitUpdated,errorOnUpdate,onRequestVisits, onUpdateVisits} = props
  return (
    <Switch>
      <Redirect exact from="/" to="/resumen" />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={DashboardLayout}
        path="/resumen"
        privateRoute
        isPending={isPending}
        visits={visits}
        error={error}
        onRequestVisits={onRequestVisits}
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
        isPending={isPending}
        visits={visits}
        error={error}
        onRequestVisits={onRequestVisits}
        onUpdateVisits={onUpdateVisits}
        isUpdatingVisit={isUpdatingVisit}
        isVisitUpdated={isVisitUpdated}
        errorOnUpdate={errorOnUpdate}
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

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
